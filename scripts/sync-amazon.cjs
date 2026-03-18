/**
 * sync-amazon.cjs
 * Fetches PC components from Amazon PA-API and saves to src/utils/db-amazon.js
 *
 * Usage: node scripts/sync-amazon.cjs
 *
 * Requires .env.local with:
 *   AMAZON_ACCESS_KEY=...
 *   AMAZON_SECRET_KEY=...
 *   AMAZON_PARTNER_TAG=meshal039-21
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// --- Load .env.local ---
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq > 0) {
      process.env[trimmed.substring(0, eq)] = trimmed.substring(eq + 1);
    }
  }
}

const ACCESS_KEY = process.env.AMAZON_ACCESS_KEY;
const SECRET_KEY = process.env.AMAZON_SECRET_KEY;
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG || 'meshal039-21';

if (!ACCESS_KEY || !SECRET_KEY) {
  console.error('ERROR: Missing AMAZON_ACCESS_KEY or AMAZON_SECRET_KEY in .env.local');
  process.exit(1);
}

// --- PA-API Config ---
const HOST = 'webservices.amazon.sa';
const REGION = 'eu-west-1';
const SERVICE = 'ProductAdvertisingAPI';

// --- AWS Sig V4 Signing ---
function hmac(key, data) {
  return crypto.createHmac('sha256', key).update(data).digest();
}

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function getSigningKey(secretKey, dateStamp) {
  const kDate = hmac('AWS4' + secretKey, dateStamp);
  const kRegion = hmac(kDate, REGION);
  const kService = hmac(kRegion, SERVICE);
  return hmac(kService, 'aws4_request');
}

async function paapiRequest(operation, payload) {
  payload.PartnerTag = PARTNER_TAG;
  payload.PartnerType = 'Associates';
  payload.Marketplace = 'www.amazon.sa';

  const apiPath = `/paapi5/${operation.toLowerCase()}`;
  const target = `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${operation}`;

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.substring(0, 8);

  const body = JSON.stringify(payload);
  const bodyHash = sha256(body);

  const headers = {
    'content-encoding': 'amz-1.0',
    'content-type': 'application/json; charset=utf-8',
    'host': HOST,
    'x-amz-date': amzDate,
    'x-amz-target': target,
  };

  const signedHeaderKeys = Object.keys(headers).sort();
  const signedHeaders = signedHeaderKeys.join(';');
  const canonicalHeaders = signedHeaderKeys.map(k => `${k}:${headers[k]}\n`).join('');

  const canonicalRequest = [
    'POST', apiPath, '', canonicalHeaders, signedHeaders, bodyHash
  ].join('\n');

  const credentialScope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256', amzDate, credentialScope, sha256(canonicalRequest)
  ].join('\n');

  const signingKey = getSigningKey(SECRET_KEY, dateStamp);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
  const authorization = `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(`https://${HOST}${apiPath}`, {
    method: 'POST',
    headers: { ...headers, Authorization: authorization },
    body,
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.Errors?.[0]?.Message || data?.__type || JSON.stringify(data);
    throw new Error(`PA-API ${operation} ${res.status}: ${msg}`);
  }
  return data;
}

// --- Category search definitions ---
const SEARCHES = {
  cpu: [
    'AMD Ryzen processor desktop',
    'Intel Core processor desktop',
  ],
  gpu: [
    'NVIDIA RTX graphics card',
    'AMD Radeon graphics card',
  ],
  motherboard: [
    'AM5 motherboard',
    'LGA1700 motherboard',
    'LGA1851 motherboard',
  ],
  ram: [
    'DDR5 RAM desktop 32GB',
    'DDR4 RAM desktop 16GB',
  ],
  ssd: [
    'NVMe SSD M.2',
    'NVMe SSD 2TB',
  ],
  psu: [
    'ATX power supply modular 80 Plus Gold',
    'ATX power supply 1000W',
  ],
  cooler: [
    'AIO liquid cooler 360mm',
    'CPU air cooler tower',
  ],
  case: [
    'ATX mid tower case',
    'ATX gaming case',
  ],
};

// --- Helpers ---
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function formatItem(item) {
  const info = item.ItemInfo || {};
  const title = info.Title?.DisplayValue || '';
  const brand = info.ByLineInfo?.Brand?.DisplayValue || '';
  const features = info.Features?.DisplayValues || [];
  const price = item.Offers?.Listings?.[0]?.Price;
  const image = item.Images?.Primary?.Large || item.Images?.Primary?.Medium;

  return {
    asin: item.ASIN,
    name: title,
    brand,
    price: price ? parseFloat(price.Amount) : null,
    currency: price?.Currency || 'SAR',
    image_url: image?.URL || null,
    url: item.DetailPageURL,
    features,
  };
}

function detectCategory(item, category) {
  const name = item.name.toLowerCase();
  // Filter out clearly irrelevant results
  const irrelevant = ['cable', 'adapter', 'stand', 'cleaning', 'mouse', 'keyboard', 'monitor', 'headset', 'chair'];
  return !irrelevant.some(word => name.includes(word));
}

function guessSpecs(item, category) {
  const name = item.name;
  const specs = {};

  switch (category) {
    case 'cpu': {
      const coresMatch = name.match(/(\d+)[-\s]?Core/i);
      if (coresMatch) specs.cores = parseInt(coresMatch[1]);
      const ghzMatch = name.match(/([\d.]+)\s*GHz/i);
      if (ghzMatch) specs.baseClock = ghzMatch[1];
      break;
    }
    case 'gpu': {
      const vramMatch = name.match(/(\d+)\s*GB/i);
      if (vramMatch) specs.vram = parseInt(vramMatch[1]);
      break;
    }
    case 'ram': {
      const capMatch = name.match(/(\d+)\s*GB/i);
      if (capMatch) specs.size = capMatch[1] + 'GB';
      const speedMatch = name.match(/DDR[45][-\s]?(\d{4})/i);
      if (speedMatch) specs.speed = speedMatch[1];
      const typeMatch = name.match(/(DDR[45])/i);
      if (typeMatch) specs.type = typeMatch[1].toUpperCase();
      break;
    }
    case 'ssd': {
      const capMatch = name.match(/([\d.]+)\s*TB/i) || name.match(/(\d+)\s*GB/i);
      if (capMatch) specs.capacity = capMatch[0];
      if (name.match(/NVMe|PCIe|Gen\s*[45]/i)) specs.interface = 'NVMe';
      else if (name.match(/SATA/i)) specs.interface = 'SATA';
      break;
    }
    case 'psu': {
      const wattMatch = name.match(/(\d{3,4})\s*W/i);
      if (wattMatch) specs.watt = parseInt(wattMatch[1]);
      const ratingMatch = name.match(/80\+?\s*(Titanium|Platinum|Gold|Silver|Bronze)/i);
      if (ratingMatch) specs.rating = '80+ ' + ratingMatch[1];
      break;
    }
    case 'cooler': {
      const radMatch = name.match(/(120|240|280|360)\s*mm/i);
      if (radMatch) specs.radiator = radMatch[1] + 'mm';
      if (name.match(/AIO|liquid|water/i)) specs.type = 'AIO';
      else specs.type = 'Air';
      break;
    }
    case 'case': {
      if (name.match(/mid[-\s]?tower/i)) specs.formFactor = 'Mid Tower';
      else if (name.match(/full[-\s]?tower/i)) specs.formFactor = 'Full Tower';
      else if (name.match(/mini[-\s]?ITX|SFF/i)) specs.formFactor = 'Mini-ITX';
      break;
    }
  }

  return specs;
}

// --- Main ---
async function main() {
  console.log('Amazon PA-API Sync Script');
  console.log('========================');
  console.log(`Partner Tag: ${PARTNER_TAG}`);
  console.log(`Host: ${HOST}\n`);

  const allResults = {};
  let totalCount = 0;

  for (const [category, queries] of Object.entries(SEARCHES)) {
    console.log(`\n--- ${category.toUpperCase()} ---`);
    const categoryItems = [];
    const seenAsins = new Set();

    for (const query of queries) {
      console.log(`  Searching: "${query}"...`);

      try {
        const data = await paapiRequest('SearchItems', {
          Keywords: query,
          SearchIndex: 'Computers',
          ItemCount: 10,
          Resources: [
            'Images.Primary.Large',
            'Images.Primary.Medium',
            'ItemInfo.Title',
            'ItemInfo.ByLineInfo',
            'ItemInfo.Features',
            'ItemInfo.ProductInfo',
            'Offers.Listings.Price',
          ],
        });

        const items = (data.SearchResult?.Items || []).map(formatItem);
        const filtered = items.filter(item => {
          if (seenAsins.has(item.asin)) return false;
          if (!detectCategory(item, category)) return false;
          seenAsins.add(item.asin);
          return true;
        });

        // Add specs guessed from name
        for (const item of filtered) {
          item.specs = guessSpecs(item, category);
          item.category = category;
        }

        console.log(`  -> ${filtered.length} relevant items (${items.length} total)`);
        categoryItems.push(...filtered);
      } catch (err) {
        console.error(`  ERROR: ${err.message}`);
        if (err.message.includes('429') || err.message.includes('TooManyRequests')) {
          console.log('  Rate limited! Waiting 5 seconds...');
          await sleep(5000);
        }
      }

      // Rate limit: 1 request per second
      await sleep(1100);
    }

    allResults[category] = categoryItems;
    totalCount += categoryItems.length;
    console.log(`  Total ${category}: ${categoryItems.length} items`);
  }

  // --- Generate db-amazon.js ---
  console.log(`\n\nGenerating db-amazon.js with ${totalCount} total items...`);

  let js = `// Auto-generated by sync-amazon.cjs on ${new Date().toISOString()}\n`;
  js += `// Source: Amazon PA-API (amazon.sa)\n`;
  js += `// DO NOT EDIT MANUALLY - re-run 'node scripts/sync-amazon.cjs' to update\n\n`;
  js += `export const AMAZON_PRODUCTS = {\n`;

  for (const [category, items] of Object.entries(allResults)) {
    js += `  ${category}: [\n`;
    for (const item of items) {
      js += `    {\n`;
      js += `      asin: ${JSON.stringify(item.asin)},\n`;
      js += `      name: ${JSON.stringify(item.name)},\n`;
      js += `      brand: ${JSON.stringify(item.brand)},\n`;
      js += `      price: ${item.price},\n`;
      js += `      image_url: ${JSON.stringify(item.image_url)},\n`;
      js += `      url: ${JSON.stringify(item.url)},\n`;
      if (Object.keys(item.specs).length > 0) {
        js += `      specs: ${JSON.stringify(item.specs)},\n`;
      }
      js += `    },\n`;
    }
    js += `  ],\n`;
  }

  js += `};\n\n`;
  js += `export const AMAZON_SYNC_DATE = ${JSON.stringify(new Date().toISOString())};\n`;
  js += `export const AMAZON_TOTAL_COUNT = ${totalCount};\n`;

  const outPath = path.join(__dirname, '..', 'src', 'utils', 'db-amazon.js');
  fs.writeFileSync(outPath, js, 'utf8');
  console.log(`Saved to ${outPath}`);

  // --- Summary ---
  console.log('\n=== SUMMARY ===');
  for (const [category, items] of Object.entries(allResults)) {
    const withPrice = items.filter(i => i.price != null);
    const avgPrice = withPrice.length > 0
      ? Math.round(withPrice.reduce((s, i) => s + i.price, 0) / withPrice.length)
      : 0;
    console.log(`  ${category.padEnd(12)} ${items.length.toString().padStart(3)} items, ${withPrice.length} with prices, avg ${avgPrice} SAR`);
  }
  console.log(`  ${'TOTAL'.padEnd(12)} ${totalCount} items`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

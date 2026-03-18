/**
 * sync-amazon.cjs
 * Fetches PC components from Amazon Creators API and saves to src/utils/db-amazon.js
 *
 * Usage: node scripts/sync-amazon.cjs
 *
 * Requires .env.local with:
 *   AMAZON_CLIENT_ID=amzn1.application-oa2-client.xxx
 *   AMAZON_CLIENT_SECRET=amzn1.oa2-cs.v1.xxx
 *   AMAZON_PARTNER_TAG=meshal039-21
 */

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

const CLIENT_ID = process.env.AMAZON_CLIENT_ID;
const CLIENT_SECRET = process.env.AMAZON_CLIENT_SECRET;
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG || 'meshal039-21';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('ERROR: Missing AMAZON_CLIENT_ID or AMAZON_CLIENT_SECRET in .env.local');
  process.exit(1);
}

// --- Creators API Config ---
// Saudi Arabia is in EU region -> use api.amazon.co.uk for token
const TOKEN_URL = 'https://api.amazon.co.uk/auth/o2/token';
const API_BASE = 'https://creatorsapi.amazon/catalog/v1';

// --- Token Cache ---
let cachedToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'creatorsapi::default',
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    const errMsg = data.error_description || data.error || JSON.stringify(data);
    throw new Error(`OAuth token failed (${res.status}): ${errMsg}`);
  }

  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in ? (data.expires_in - 30) * 1000 : 3570000);
  return cachedToken;
}

async function creatorsApiRequest(operation, payload) {
  payload.partnerTag = PARTNER_TAG;
  payload.partnerType = 'Associates';
  payload.marketplace = 'www.amazon.sa';

  const token = await getAccessToken();

  const res = await fetch(`${API_BASE}/${operation}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`,
      'x-marketplace': 'www.amazon.sa',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.errors?.[0]?.message || data?.Errors?.[0]?.Message || JSON.stringify(data);
    throw new Error(`Creators API ${operation} ${res.status}: ${msg}`);
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
  const info = item.itemInfo || item.ItemInfo || {};
  const title = info.title?.displayValue || info.Title?.DisplayValue || '';
  const brand = info.byLineInfo?.brand?.displayValue || info.ByLineInfo?.Brand?.DisplayValue || '';
  const features = info.features?.displayValues || info.Features?.DisplayValues || [];
  const offers = item.offersV2 || item.offers || item.Offers || {};
  const listing = offers.listings?.[0] || offers.Listings?.[0] || {};
  const price = listing.price || listing.Price;
  const images = item.images || item.Images || {};
  const primaryImg = images.primary || images.Primary || {};
  const image = primaryImg.large || primaryImg.Large || primaryImg.medium || primaryImg.Medium;

  return {
    asin: item.asin || item.ASIN,
    name: title,
    brand,
    price: price ? parseFloat(price.amount || price.Amount) : null,
    currency: price?.currency || price?.Currency || 'SAR',
    image_url: image?.url || image?.URL || null,
    url: item.detailPageURL || item.DetailPageURL,
    features,
  };
}

function detectCategory(item) {
  const name = item.name.toLowerCase();
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
  console.log('Amazon Creators API Sync Script');
  console.log('===============================');
  console.log(`Partner Tag: ${PARTNER_TAG}`);
  console.log(`Token URL: ${TOKEN_URL}`);
  console.log(`API Base: ${API_BASE}\n`);

  // Test token first
  console.log('Requesting OAuth access token...');
  try {
    await getAccessToken();
    console.log('Token acquired successfully!\n');
  } catch (err) {
    console.error(`FATAL: ${err.message}`);
    console.error('\nCheck your AMAZON_CLIENT_ID and AMAZON_CLIENT_SECRET in .env.local');
    process.exit(1);
  }

  const allResults = {};
  let totalCount = 0;

  for (const [category, queries] of Object.entries(SEARCHES)) {
    console.log(`\n--- ${category.toUpperCase()} ---`);
    const categoryItems = [];
    const seenAsins = new Set();

    for (const query of queries) {
      console.log(`  Searching: "${query}"...`);

      try {
        const data = await creatorsApiRequest('searchItems', {
          keywords: query,
          searchIndex: 'Computers',
          itemCount: 10,
          resources: [
            'images.primary.large',
            'images.primary.medium',
            'itemInfo.title',
            'itemInfo.byLineInfo',
            'itemInfo.features',
            'itemInfo.productInfo',
            'offersV2.listings.price',
          ],
        });

        const searchResult = data.searchResult || data.SearchResult || {};
        const rawItems = searchResult.items || searchResult.Items || [];
        const items = rawItems.map(formatItem);
        const filtered = items.filter(item => {
          if (seenAsins.has(item.asin)) return false;
          if (!detectCategory(item)) return false;
          seenAsins.add(item.asin);
          return true;
        });

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
  js += `// Source: Amazon Creators API (amazon.sa)\n`;
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

const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eq = trimmed.indexOf('=');
      if (eq > 0) process.env[trimmed.substring(0, eq)] = trimmed.substring(eq + 1);
    }
  }
}

const CLIENT_ID = process.env.AMAZON_CLIENT_ID;
const CLIENT_SECRET = process.env.AMAZON_CLIENT_SECRET;
const TAG = process.env.AMAZON_PARTNER_TAG || 'meshal039-21';
const TOKEN_URL = 'https://api.amazon.co.uk/auth/o2/token';
const API_BASE = 'https://creatorsapi.amazon/catalog/v1';

async function getToken() {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'creatorsapi::default',
  });
  const r = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const d = await r.json();
  if (!d.access_token) {
    console.error('Token error:', d);
    process.exit(1);
  }
  return d.access_token;
}

async function main() {
  console.log('1. Getting OAuth token...');
  const token = await getToken();
  console.log('   Token OK!\n');

  console.log('2. Searching for "RTX 5070 graphics card" on amazon.sa...');
  const payload = {
    keywords: 'RTX 5070 graphics card',
    searchIndex: 'Computers',
    itemCount: 5,
    partnerTag: TAG,
    partnerType: 'Associates',
    marketplace: 'www.amazon.sa',
    resources: [
      'images.primary.large',
      'images.primary.medium',
      'itemInfo.title',
      'itemInfo.byLineInfo',
      'itemInfo.features',
      'itemInfo.productInfo',
      'offersV2.listings.price',
      'browseNodeInfo.browseNodes',
    ],
  };

  const r = await fetch(API_BASE + '/searchItems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + token,
      'x-marketplace': 'www.amazon.sa',
    },
    body: JSON.stringify(payload),
  });

  const data = await r.json();
  console.log('   HTTP Status:', r.status);

  if (r.status !== 200) {
    console.log('   Response:', JSON.stringify(data, null, 2));
    return;
  }

  const result = data.searchResult || data.SearchResult || {};
  const items = result.items || result.Items || [];
  console.log('   Total results:', result.totalResultCount || result.TotalResultCount || 0);
  console.log('   Items returned:', items.length);
  console.log('');

  for (const item of items) {
    const info = item.itemInfo || item.ItemInfo || {};
    const title = info.title?.displayValue || info.Title?.DisplayValue || 'N/A';
    const brand = info.byLineInfo?.brand?.displayValue || info.ByLineInfo?.Brand?.DisplayValue || '?';
    const offers = item.offers || item.Offers || {};
    const listing = offers.listings?.[0] || offers.Listings?.[0] || {};
    const price = listing.price || listing.Price;
    const priceStr = price ? (price.displayAmount || price.DisplayAmount || 'N/A') : 'no price';
    const asin = item.asin || item.ASIN;
    const images = item.images || item.Images || {};
    const img = images.primary?.large?.url || images.Primary?.Large?.URL || 'no image';
    console.log(`   ${asin} | ${brand} | ${title}`);
    console.log(`      Price: ${priceStr} | Image: ${img.substring(0, 60)}...`);
  }

  console.log('\n3. API test complete!');
}

main().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});

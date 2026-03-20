#!/usr/bin/env node
/**
 * PCBux: Newegg Image Finder
 *
 * Scans db.js for components missing images (no ASIN) and generates
 * a report with Newegg search URLs for manual lookup.
 *
 * Usage: node scripts/fetch-newegg-images.cjs
 * Output: scripts/missing-images-report.json
 */

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'src', 'utils', 'db.js');
const dbContent = fs.readFileSync(dbPath, 'utf-8');

console.log('📊 Scanning db.js for components missing images...\n');

// Match component objects: { id: '...', name: '...', ... asin: '...' or asin: null, ... }
const itemRegex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*brand:\s*'([^']+)',\s*price:\s*(\d+),\s*asin:\s*('([^']*)'|null)/g;

const missing = [];
const withAsin = [];
let match;

while ((match = itemRegex.exec(dbContent)) !== null) {
  const [, id, name, brand, price, , asin] = match;
  const entry = { id, name, brand, price: parseInt(price) };

  if (!asin) {
    missing.push(entry);
  } else {
    withAsin.push(entry);
  }
}

const total = missing.length + withAsin.length;
console.log(`Total components scanned: ${total}`);
console.log(`With ASIN (have Amazon images): ${withAsin.length}`);
console.log(`Missing ASIN (need fallback images): ${missing.length}\n`);

// Group by category (derived from ID prefix)
const catMap = { cpu: 'CPU', gpu: 'GPU', mb: 'Motherboard', ram: 'RAM', ssd: 'SSD', psu: 'PSU', cool: 'Cooler', case: 'Case' };
const grouped = {};
missing.forEach(item => {
  const prefix = item.id.split('-')[0];
  const cat = catMap[prefix] || prefix;
  if (!grouped[cat]) grouped[cat] = [];
  grouped[cat].push(item);
});

console.log('📋 Missing images by category:');
Object.entries(grouped).forEach(([cat, items]) => {
  console.log(`  ${cat}: ${items.length} components`);
});

// Generate search URLs
const searchResults = missing.map(item => {
  const shortName = item.name.split(' ').slice(0, 5).join(' ');
  return {
    ...item,
    neweggSearch: `https://www.newegg.com/p/pl?d=${encodeURIComponent(shortName)}`,
    amazonSearch: `https://www.amazon.sa/s?k=${encodeURIComponent(shortName)}&tag=meshal039-21`,
  };
});

// Save full report
const reportPath = path.join(__dirname, 'missing-images-report.json');
fs.writeFileSync(reportPath, JSON.stringify(searchResults, null, 2));

// Show top items by price (higher-priced items are more important to have images for)
const topItems = [...searchResults].sort((a, b) => b.price - a.price).slice(0, 30);
console.log('\n🔝 Top 30 highest-value components needing images:\n');
topItems.forEach((item, i) => {
  console.log(`${String(i + 1).padStart(2)}. [${item.id}] ${item.name} (~${item.price} SAR)`);
  console.log(`    Newegg: ${item.neweggSearch}`);
});

console.log(`\n✅ Full report saved to ${reportPath} (${searchResults.length} items)`);
console.log(`\n📝 NEXT STEPS:`);
console.log(`1. Open Newegg search URLs above`);
console.log(`2. Find the product → copy Newegg Item Number from URL`);
console.log(`   Example URL: newegg.com/p/N82E16814126682 → item code: 14-126-682`);
console.log(`3. Image URL: https://c1.neweggimages.com/ProductImageCompressAll300/14-126-682-V01.jpg`);
console.log(`4. Add to scripts/newegg-image-map.json`);
console.log(`5. Run: node scripts/apply-newegg-images.cjs`);

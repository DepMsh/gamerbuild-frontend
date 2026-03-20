#!/usr/bin/env node
/**
 * PCBux: Apply Newegg Image URLs to db.js
 *
 * Reads component name → image URL mappings from newegg-image-map.json
 * and updates matching components in db.js by setting their image_url field.
 *
 * Usage: node scripts/apply-newegg-images.cjs
 */

const fs = require('fs');
const path = require('path');

const mapPath = path.join(__dirname, 'newegg-image-map.json');
const dbPath = path.join(__dirname, '..', 'src', 'utils', 'db.js');

if (!fs.existsSync(mapPath)) {
  console.error('❌ newegg-image-map.json not found. Create it first.');
  process.exit(1);
}

const imageMap = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
let dbContent = fs.readFileSync(dbPath, 'utf-8');

// Filter out instruction keys
const entries = Object.entries(imageMap).filter(([key]) => !key.startsWith('_'));

if (entries.length === 0) {
  console.log('⚠️ No image mappings found in newegg-image-map.json (only instruction keys).');
  process.exit(0);
}

let updated = 0;
let notFound = 0;

entries.forEach(([name, imageUrl]) => {
  // Escape special regex characters in the name
  const nameEsc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Match: name: 'EXACT NAME', ... image_url: null
  // Replace image_url: null with the actual URL
  const pattern = new RegExp(
    `(name:\\s*'${nameEsc}'[^}]*?)image_url:\\s*null`,
    'g'
  );

  const before = dbContent;
  dbContent = dbContent.replace(pattern, `$1image_url: '${imageUrl}'`);

  if (dbContent !== before) {
    updated++;
    console.log(`  ✅ ${name}`);
  } else {
    notFound++;
    console.log(`  ⚠️ Not found or already set: ${name}`);
  }
});

fs.writeFileSync(dbPath, dbContent);
console.log(`\n📊 Results: ${updated} updated, ${notFound} skipped`);
console.log('✅ db.js has been updated. Run npm run build to verify.');

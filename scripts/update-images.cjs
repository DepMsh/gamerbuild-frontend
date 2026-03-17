#!/usr/bin/env node
// GamerBuild Image Updater
// Scans public/images/{category}/{id}.png and updates db.js image_url fields

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'src', 'utils', 'db.js');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

const CATEGORY_MAP = {
  cpu: 'cpu',
  gpu: 'gpu',
  mb: 'motherboard',
  ram: 'ram',
  ssd: 'ssd',
  psu: 'psu',
  cool: 'cooler',
  case: 'case',
};

function getCategory(id) {
  const prefix = id.split('-')[0];
  return CATEGORY_MAP[prefix] || prefix;
}

function findLocalImage(category, id) {
  const exts = ['.png', '.jpg', '.jpeg', '.webp'];
  for (const ext of exts) {
    const filePath = path.join(IMAGES_DIR, category, id + ext);
    if (fs.existsSync(filePath)) {
      return `/images/${category}/${id}${ext}`;
    }
  }
  return null;
}

// Read db.js
let src = fs.readFileSync(DB_PATH, 'utf8');

// Extract all component IDs and names
const idRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)'/g;
const components = [];
let match;
while ((match = idRegex.exec(src)) !== null) {
  components.push({ id: match[1], name: match[2] });
}

console.log('========================================');
console.log('  GamerBuild Image Updater');
console.log('========================================\n');

let updated = 0;
let found = 0;
let missing = 0;
const categories = {};

for (const comp of components) {
  const category = getCategory(comp.id);
  if (!categories[category]) categories[category] = { found: 0, missing: 0, items: [] };

  const localPath = findLocalImage(category, comp.id);

  if (localPath) {
    // Update image_url in db.js
    const oldPattern = new RegExp(
      `(id:\\s*'${comp.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[^}]*image_url:\\s*)(?:null|'[^']*')`,
    );
    const newValue = `$1'${localPath}'`;
    const newSrc = src.replace(oldPattern, newValue);
    if (newSrc !== src) {
      src = newSrc;
      updated++;
    }
    found++;
    categories[category].found++;
    categories[category].items.push({ id: comp.id, name: comp.name, status: 'found', path: localPath });
  } else {
    missing++;
    categories[category].missing++;
    categories[category].items.push({ id: comp.id, name: comp.name, status: 'missing' });
  }
}

// Write updated db.js
fs.writeFileSync(DB_PATH, src, 'utf8');

// Print results per category
for (const [cat, data] of Object.entries(categories)) {
  const total = data.found + data.missing;
  console.log(`--- ${cat.toUpperCase()} (${data.found}/${total}) ---`);
  for (const item of data.items) {
    const icon = item.status === 'found' ? '\x1b[32m[x]\x1b[0m' : '\x1b[31m[ ]\x1b[0m';
    const suffix = item.status === 'found' ? ` -> ${item.path}` : '';
    console.log(`  ${icon} ${item.id}: ${item.name}${suffix}`);
  }
  console.log('');
}

console.log('========================================');
console.log(`  Total: ${components.length} components`);
console.log(`  Found: \x1b[32m${found}\x1b[0m images`);
console.log(`  Missing: \x1b[31m${missing}\x1b[0m images`);
console.log(`  Updated: ${updated} entries in db.js`);
console.log('========================================\n');

if (missing > 0) {
  console.log('To add images, save them as:');
  console.log('  public/images/{category}/{component-id}.png\n');
  console.log('Example:');
  console.log('  public/images/gpu/gpu-1.png');
  console.log('  public/images/cpu/cpu-3.png\n');
  console.log('Then re-run: node scripts/update-images.cjs');
}

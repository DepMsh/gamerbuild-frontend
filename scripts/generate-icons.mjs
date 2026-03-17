import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const SIZES = [72, 96, 128, 144, 152, 180, 192, 384, 512];
const OUT = join(process.cwd(), 'public', 'icons');

mkdirSync(OUT, { recursive: true });

const svgIcon = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="100%" stop-color="#12121a"/>
    </linearGradient>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="50%" stop-color="#7b2ff7"/>
      <stop offset="100%" stop-color="#ff2d55"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="url(#bg)"/>
  <rect x="${size * 0.06}" y="${size * 0.06}" width="${size * 0.88}" height="${size * 0.88}" rx="${Math.round(size * 0.17)}" fill="none" stroke="url(#g)" stroke-width="${Math.max(2, size * 0.02)}"/>
  <text x="50%" y="42%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="${size * 0.22}" fill="#00f0ff">GAMER</text>
  <text x="50%" y="65%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="${size * 0.18}" fill="#e8e8f0">BUILD</text>
  <text x="50%" y="82%" text-anchor="middle" font-size="${size * 0.09}" fill="#6b6b8a">🎮 جمّع جهازك</text>
</svg>`;

const maskableSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="100%" stop-color="#12121a"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg2)"/>
  <text x="50%" y="42%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="${size * 0.16}" fill="#00f0ff">GAMER</text>
  <text x="50%" y="60%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="${size * 0.13}" fill="#e8e8f0">BUILD</text>
</svg>`;

async function generate() {
  for (const size of SIZES) {
    const svg = Buffer.from(svgIcon(size));
    await sharp(svg).png().toFile(join(OUT, `icon-${size}.png`));
    console.log(`✅ icon-${size}.png`);
  }
  // Maskable 512
  const mask = Buffer.from(maskableSvg(512));
  await sharp(mask).png().toFile(join(OUT, 'icon-512-maskable.png'));
  console.log('✅ icon-512-maskable.png');
  console.log('Done!');
}

generate().catch(console.error);

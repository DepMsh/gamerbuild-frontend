// GamerBuild Component Database — Imported from docyx/pc-part-dataset + BuildCores OpenDB
// Affiliate Tag: meshal039-21
// All prices in SAR (estimated from USD × 3.75)
// Generated: 2026-03-18T03:26:52.024Z

const TAG = 'meshal039-21';

export const CATEGORIES = [
  { key: 'cpu', label: 'المعالج', labelEn: 'CPU', icon: '🧠', required: true },
  { key: 'gpu', label: 'كرت الشاشة', labelEn: 'GPU', icon: '🎨', required: true },
  { key: 'motherboard', label: 'اللوحة الأم', labelEn: 'Motherboard', icon: '📟', required: true },
  { key: 'ram', label: 'الرام', labelEn: 'RAM', icon: '💾', required: true },
  { key: 'ssd', label: 'التخزين', labelEn: 'Storage', icon: '💿', required: true },
  { key: 'psu', label: 'الباور', labelEn: 'PSU', icon: '⚡', required: true },
  { key: 'cooler', label: 'التبريد', labelEn: 'Cooler', icon: '❄️', required: false },
  { key: 'case', label: 'الكيس', labelEn: 'Case', icon: '📦', required: false },
];

export const COMPONENTS = {
  // ═══════ CPUs — 50 total ═══════
  cpu: [
    { id: 'cpu-1', name: 'AMD Ryzen 3 1200 (14nm)', brand: 'AMD', price: 263, asin: null, image_url: null, score: 9, socket: 'AM4', cores: 4, threads: 8, baseClock: 3.1, boostClock: 3.4, tdp: 65, tier: 'budget' },
    { id: 'cpu-2', name: 'AMD Ryzen 5 5500', brand: 'AMD', price: 278, asin: null, image_url: null, score: 18, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.6, boostClock: 4.2, tdp: 65, tier: 'budget' },
    { id: 'cpu-3', name: 'AMD Ryzen 5 4500', brand: 'AMD', price: 294, asin: null, image_url: null, score: 17, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.6, boostClock: 4.1, tdp: 65, tier: 'budget' },
    { id: 'cpu-4', name: 'AMD Ryzen 5 1400', brand: 'AMD', price: 300, asin: null, image_url: null, score: 9, socket: 'AM4', cores: 4, threads: 8, baseClock: 3.2, boostClock: 3.4, tdp: 65, tier: 'budget' },
    { id: 'cpu-5', name: 'Intel Core i3-14100F', brand: 'Intel', price: 338, asin: 'B0CQ1MN1Y2', image_url: null, score: 13, socket: 'LGA1700', cores: 4, threads: 8, baseClock: 3.5, boostClock: 4.7, tdp: 58, tier: 'budget' },
    { id: 'cpu-6', name: 'AMD Ryzen 5 1600 (12nm)', brand: 'AMD', price: 371, asin: null, image_url: null, score: 15, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.2, boostClock: 3.6, tdp: 65, tier: 'budget' },
    { id: 'cpu-7', name: 'AMD Ryzen 3 3300X', brand: 'AMD', price: 416, asin: null, image_url: null, score: 12, socket: 'AM4', cores: 4, threads: 8, baseClock: 3.8, boostClock: 4.3, tdp: 65, tier: 'budget' },
    { id: 'cpu-8', name: 'AMD Ryzen 5 1600 (14nm)', brand: 'AMD', price: 431, asin: null, image_url: null, score: 15, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.2, boostClock: 3.6, tdp: 65, tier: 'budget' },
    { id: 'cpu-9', name: 'Intel Core i3-13100', brand: 'Intel', price: 470, asin: null, image_url: null, score: 13, socket: 'LGA1700', cores: 4, threads: 8, baseClock: 3.4, boostClock: 4.5, tdp: 60, tier: 'budget' },
    { id: 'cpu-10', name: 'Intel Core i5-14400F', brand: 'Intel', price: 472, asin: null, image_url: null, score: 33, socket: 'LGA1700', cores: 10, threads: 16, baseClock: 2.5, boostClock: 4.7, tdp: 65, tier: 'budget' },
    { id: 'cpu-11', name: 'AMD Ryzen 5 5600G', brand: 'AMD', price: 506, asin: null, image_url: null, score: 18, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.9, boostClock: 4.4, tdp: 65, tier: 'budget' },
    { id: 'cpu-12', name: 'AMD Ryzen 5 8400F', brand: 'AMD', price: 516, asin: null, image_url: null, score: 20, socket: 'AM5', cores: 6, threads: 12, baseClock: 4.2, boostClock: 4.7, tdp: 65, tier: 'budget' },
    { id: 'cpu-13', name: 'AMD Ryzen 5 5500GT', brand: 'AMD', price: 532, asin: null, image_url: null, score: 18, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.6, boostClock: 4.4, tdp: 65, tier: 'budget' },
    { id: 'cpu-14', name: 'AMD Ryzen 5 5600XT', brand: 'AMD', price: 544, asin: 'B08166SLDF', image_url: null, score: 20, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.7, boostClock: 4.7, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-15', name: 'AMD Ryzen 5 1500X', brand: 'AMD', price: 562, asin: null, image_url: null, score: 10, socket: 'AM4', cores: 4, threads: 8, baseClock: 3.5, boostClock: 3.7, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-16', name: 'AMD Ryzen 5 8500G', brand: 'AMD', price: 572, asin: null, image_url: null, score: 21, socket: 'AM5', cores: 6, threads: 12, baseClock: 4.1, boostClock: 5, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-17', name: 'AMD Ryzen 5 5600T', brand: 'AMD', price: 601, asin: null, image_url: null, score: 19, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.5, boostClock: 4.5, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-18', name: 'AMD Ryzen 7 1700', brand: 'AMD', price: 619, asin: 'B07F5LLKBX', image_url: null, score: 21, socket: 'AM4', cores: 8, threads: 16, baseClock: 3, boostClock: 3.7, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-19', name: 'AMD Ryzen 7 2700X', brand: 'AMD', price: 641, asin: null, image_url: null, score: 24, socket: 'AM4', cores: 8, threads: 16, baseClock: 3.7, boostClock: 4.3, tdp: 105, tier: 'mid-range' },
    { id: 'cpu-20', name: 'Intel Core i7-12700KF', brand: 'Intel', price: 656, asin: null, image_url: null, score: 42, socket: 'LGA1700', cores: 12, threads: 16, baseClock: 3.6, boostClock: 5, tdp: 125, tier: 'mid-range' },
    { id: 'cpu-21', name: 'AMD Ryzen 7 5800X', brand: 'AMD', price: 675, asin: 'B09VCJ2SHD', image_url: null, score: 26, socket: 'AM4', cores: 8, threads: 16, baseClock: 3.8, boostClock: 4.7, tdp: 105, tier: 'mid-range' },
    { id: 'cpu-22', name: 'Intel Core Ultra 5 225F', brand: 'Intel', price: 716, asin: null, image_url: null, score: 34, socket: 'LGA1851', cores: 10, threads: 16, baseClock: 3.3, boostClock: 4.9, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-23', name: 'AMD Ryzen 5 7600', brand: 'AMD', price: 739, asin: 'B0BBJDS62N', image_url: null, score: 21, socket: 'AM5', cores: 6, threads: 12, baseClock: 3.8, boostClock: 5.1, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-24', name: 'Intel Core Ultra 5 225', brand: 'Intel', price: 799, asin: null, image_url: null, score: 34, socket: 'LGA1851', cores: 10, threads: 16, baseClock: 3.3, boostClock: 4.9, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-25', name: 'Intel Core i5-13500', brand: 'Intel', price: 881, asin: null, image_url: null, score: 47, socket: 'LGA1700', cores: 14, threads: 20, baseClock: 2.5, boostClock: 4.8, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-26', name: 'AMD Ryzen 7 8700F', brand: 'AMD', price: 900, asin: null, image_url: null, score: 28, socket: 'AM5', cores: 8, threads: 16, baseClock: 4.1, boostClock: 5, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-27', name: 'AMD Ryzen 9 5900XT', brand: 'AMD', price: 937, asin: null, image_url: null, score: 53, socket: 'AM4', cores: 16, threads: 32, baseClock: 3.3, boostClock: 4.8, tdp: 105, tier: 'mid-range' },
    { id: 'cpu-28', name: 'Intel Core i7-13700F', brand: 'Intel', price: 956, asin: null, image_url: null, score: 58, socket: 'LGA1700', cores: 16, threads: 20, baseClock: 2.1, boostClock: 5.2, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-29', name: 'Intel Core Ultra 5 235', brand: 'Intel', price: 994, asin: null, image_url: null, score: 49, socket: 'LGA1851', cores: 14, threads: 20, baseClock: 3.4, boostClock: 5, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-30', name: 'Intel Core Ultra 7 265K', brand: 'Intel', price: 1012, asin: 'B0DFK2MH2D', image_url: null, score: 76, socket: 'LGA1851', cores: 20, threads: 27, baseClock: 3.9, boostClock: 5.5, tdp: 125, tier: 'mid-range' },
    { id: 'cpu-31', name: 'Intel Core Ultra 7 265KF', brand: 'Intel', price: 1040, asin: 'B0DFK2MH2D', image_url: null, score: 76, socket: 'LGA1851', cores: 20, threads: 27, baseClock: 3.9, boostClock: 5.5, tdp: 125, tier: 'high-end' },
    { id: 'cpu-32', name: 'Intel Core i9-12900K', brand: 'Intel', price: 1072, asin: null, image_url: null, score: 58, socket: 'LGA1700', cores: 16, threads: 20, baseClock: 3.2, boostClock: 5.2, tdp: 125, tier: 'high-end' },
    { id: 'cpu-33', name: 'AMD Ryzen 7 7700', brand: 'AMD', price: 1102, asin: null, image_url: null, score: 29, socket: 'AM5', cores: 8, threads: 16, baseClock: 3.6, boostClock: 5.3, tdp: 65, tier: 'high-end' },
    { id: 'cpu-34', name: 'Intel Core i7-13700KF', brand: 'Intel', price: 1121, asin: null, image_url: null, score: 60, socket: 'LGA1700', cores: 16, threads: 20, baseClock: 3.4, boostClock: 5.4, tdp: 125, tier: 'high-end' },
    { id: 'cpu-35', name: 'Intel Core i7-14700', brand: 'Intel', price: 1150, asin: 'B0CGJ41C9W', image_url: null, score: 75, socket: 'LGA1700', cores: 20, threads: 27, baseClock: 2.1, boostClock: 5.4, tdp: 65, tier: 'high-end' },
    { id: 'cpu-36', name: 'Intel Core i7-14700KF', brand: 'Intel', price: 1177, asin: 'B0CGJ41C9W', image_url: null, score: 78, socket: 'LGA1700', cores: 20, threads: 27, baseClock: 3.4, boostClock: 5.6, tdp: 125, tier: 'high-end' },
    { id: 'cpu-37', name: 'AMD Ryzen 7 7800X3D', brand: 'AMD', price: 1275, asin: 'B0BTZB7F88', image_url: null, score: 32, socket: 'AM5', cores: 8, threads: 16, baseClock: 4.2, boostClock: 5, tdp: 120, tier: 'high-end' },
    { id: 'cpu-38', name: 'AMD Ryzen 9 9900X', brand: 'AMD', price: 1346, asin: 'B0DWGWN8GY', image_url: null, score: 47, socket: 'AM5', cores: 12, threads: 24, baseClock: 4.4, boostClock: 5.6, tdp: 120, tier: 'high-end' },
    { id: 'cpu-39', name: 'Intel Core Ultra 7 265', brand: 'Intel', price: 1406, asin: 'B0DFK2MH2D', image_url: null, score: 74, socket: 'LGA1851', cores: 20, threads: 27, baseClock: 2.4, boostClock: 5.3, tdp: 65, tier: 'high-end' },
    { id: 'cpu-40', name: 'Intel Core i7-13700K', brand: 'Intel', price: 1464, asin: null, image_url: null, score: 60, socket: 'LGA1700', cores: 16, threads: 20, baseClock: 3.4, boostClock: 5.4, tdp: 125, tier: 'high-end' },
    { id: 'cpu-41', name: 'Intel Core i9-14900KF', brand: 'Intel', price: 1575, asin: 'B0CGJDKLB8', image_url: null, score: 100, socket: 'LGA1700', cores: 24, threads: 32, baseClock: 3.2, boostClock: 6, tdp: 125, tier: 'high-end' },
    { id: 'cpu-42', name: 'Intel Core i9-13900KS', brand: 'Intel', price: 1609, asin: null, image_url: null, score: 100, socket: 'LGA1700', cores: 24, threads: 32, baseClock: 3, boostClock: 6, tdp: 150, tier: 'high-end' },
    { id: 'cpu-43', name: 'Intel Core i9-13900K', brand: 'Intel', price: 1628, asin: null, image_url: null, score: 97, socket: 'LGA1700', cores: 24, threads: 32, baseClock: 3, boostClock: 5.8, tdp: 125, tier: 'high-end' },
    { id: 'cpu-44', name: 'AMD Ryzen 9 7950X', brand: 'AMD', price: 1687, asin: 'B0BTRH9MNS', image_url: null, score: 63, socket: 'AM5', cores: 16, threads: 32, baseClock: 4.5, boostClock: 5.7, tdp: 170, tier: 'enthusiast' },
    { id: 'cpu-45', name: 'AMD Ryzen 5 9600', brand: 'AMD', price: 1753, asin: 'B0D6NN6TM7', image_url: null, score: 22, socket: 'AM5', cores: 6, threads: 12, baseClock: 3.8, boostClock: 5.2, tdp: 65, tier: 'enthusiast' },
    { id: 'cpu-46', name: 'Intel Core i9-13900F', brand: 'Intel', price: 1937, asin: 'B0BN5ZTG66', image_url: null, score: 93, socket: 'LGA1700', cores: 24, threads: 32, baseClock: 2, boostClock: 5.6, tdp: 65, tier: 'enthusiast' },
    { id: 'cpu-47', name: 'Intel Core Ultra 9 285K', brand: 'Intel', price: 2100, asin: 'B0DFKC99VL', image_url: null, score: 95, socket: 'LGA1851', cores: 24, threads: 32, baseClock: 3.7, boostClock: 5.7, tdp: 125, tier: 'enthusiast' },
    { id: 'cpu-48', name: 'AMD Ryzen 5 3600XT', brand: 'AMD', price: 2287, asin: null, image_url: null, score: 19, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.8, boostClock: 4.5, tdp: 95, tier: 'enthusiast' },
    { id: 'cpu-49', name: 'AMD Ryzen 9 9950X3D', brand: 'AMD', price: 2437, asin: 'B0DVZSG8D5', image_url: null, score: 73, socket: 'AM5', cores: 16, threads: 32, baseClock: 4.3, boostClock: 5.7, tdp: 170, tier: 'enthusiast' },
    { id: 'cpu-50', name: 'AMD Ryzen 9 7950X3D', brand: 'AMD', price: 2885, asin: 'B0BTRH9MNS', image_url: null, score: 73, socket: 'AM5', cores: 16, threads: 32, baseClock: 4.2, boostClock: 5.7, tdp: 120, tier: 'enthusiast' },
  ],

  // ═══════ GPUs — 70 total ═══════
  gpu: [
    { id: 'gpu-1', name: 'ASRock Intel Arc A380 Challenger ITX', brand: 'Intel', price: 525, asin: 'B0BFD8DSM3', search: 'ASRock+ASRock+Intel+Arc+A380+Challenger+ITX', image_url: null, score: 7, vram: 6, tdp: 200, tier: 'budget' },
    { id: 'gpu-2', name: 'Sparkle ELF', brand: 'Intel', price: 562, asin: null, search: 'Sparkle+Sparkle+ELF', image_url: null, score: 7, vram: 6, tdp: 200, tier: 'budget' },
    { id: 'gpu-3', name: 'Asus DUAL OC', brand: 'NVIDIA', price: 750, asin: null, search: 'ASUS+Asus+DUAL+OC', image_url: null, score: 4, vram: 6, tdp: 130, tier: 'budget' },
    { id: 'gpu-4', name: 'ASRock Challenger D', brand: 'AMD', price: 825, asin: null, search: 'ASRock+ASRock+Challenger+D', image_url: null, score: 6, vram: 8, tdp: 132, tier: 'budget' },
    { id: 'gpu-5', name: 'MSI ARMOR OC', brand: 'NVIDIA', price: 867, asin: null, search: 'MSI+MSI+ARMOR+OC', image_url: null, score: 4, vram: 6, tdp: 120, tier: 'budget' },
    { id: 'gpu-6', name: 'EVGA SC ULTRA GAMING', brand: 'NVIDIA', price: 881, asin: null, search: 'EVGA+EVGA+SC+ULTRA+GAMING', image_url: null, score: 4, vram: 6, tdp: 120, tier: 'budget' },
    { id: 'gpu-7', name: 'Acer Nitro OC', brand: 'Intel', price: 900, asin: null, search: 'Acer+Acer+Nitro+OC', image_url: null, score: 8, vram: 10, tdp: 150, tier: 'budget' },
    { id: 'gpu-8', name: 'Asus DUAL', brand: 'NVIDIA', price: 937, asin: null, search: 'ASUS+Asus+DUAL', image_url: null, score: 9, vram: 8, tdp: 200, tier: 'budget' },
    { id: 'gpu-9', name: 'Zotac GAMING SOLO', brand: 'NVIDIA', price: 937, asin: null, search: 'Zotac+Zotac+GAMING+SOLO', image_url: null, score: 9, vram: 8, tdp: 200, tier: 'budget' },
    { id: 'gpu-10', name: 'Zotac GAMING Twin Fan', brand: 'NVIDIA', price: 956, asin: null, search: 'Zotac+Zotac+GAMING+Twin+Fan', image_url: null, score: 4, vram: 6, tdp: 125, tier: 'budget' },
    { id: 'gpu-11', name: 'ONIX ODYSSEY', brand: 'Intel', price: 975, asin: null, search: 'ONIX+ONIX+ODYSSEY', image_url: null, score: 12, vram: 12, tdp: 190, tier: 'budget' },
    { id: 'gpu-12', name: 'Sparkle GUARDIAN OC', brand: 'Intel', price: 975, asin: null, search: 'Sparkle+Sparkle+GUARDIAN+OC', image_url: null, score: 8, vram: 10, tdp: 150, tier: 'budget' },
    { id: 'gpu-13', name: 'Intel Limited Edition', brand: 'Intel', price: 1087, asin: null, search: 'Intel+Intel+Limited+Edition', image_url: null, score: 12, vram: 12, tdp: 190, tier: 'budget' },
    { id: 'gpu-14', name: 'MSI GeForce RTX 3060 Ventus 2X 12G', brand: 'NVIDIA', price: 1125, asin: 'B08WRVQ4KR', search: 'MSI+MSI+GeForce+RTX+3060+Ventus+2X+12G', image_url: null, score: 11, vram: 12, tdp: 170, tier: 'budget' },
    { id: 'gpu-15', name: 'MSI SHADOW 2X OC', brand: 'NVIDIA', price: 1125, asin: null, search: 'MSI+MSI+SHADOW+2X+OC', image_url: null, score: 6, vram: 8, tdp: 145, tier: 'budget' },
    { id: 'gpu-16', name: 'Sparkle TITAN OC', brand: 'Intel', price: 1200, asin: null, search: 'Sparkle+Sparkle+TITAN+OC', image_url: null, score: 12, vram: 12, tdp: 190, tier: 'budget' },
    { id: 'gpu-17', name: 'Asus Dual GeForce RTX 3060 V2 OC Edition', brand: 'NVIDIA', price: 1237, asin: 'B08L8LG4M3', search: 'ASUS+Asus+Dual+GeForce+RTX+3060+V2+OC+Edition', image_url: null, score: 11, vram: 12, tdp: 170, tier: 'budget' },
    { id: 'gpu-18', name: 'MSI VENTUS XS OC', brand: 'NVIDIA', price: 1271, asin: null, search: 'MSI+MSI+VENTUS+XS+OC', image_url: null, score: 4, vram: 6, tdp: 125, tier: 'budget' },
    { id: 'gpu-19', name: 'PNY VCQRTX4000-PB', brand: 'NVIDIA', price: 1312, asin: null, search: 'PNY+PNY+VCQRTX4000-PB', image_url: null, score: 9, vram: 8, tdp: 200, tier: 'mid-range' },
    { id: 'gpu-20', name: 'ASRock Challenger OC', brand: 'AMD', price: 1387, asin: null, search: 'ASRock+ASRock+Challenger+OC', image_url: null, score: 17, vram: 16, tdp: 200, tier: 'mid-range' },
    { id: 'gpu-21', name: 'Sapphire PULSE', brand: 'AMD', price: 1425, asin: null, search: 'Sapphire+Sapphire+PULSE', image_url: null, score: 17, vram: 16, tdp: 200, tier: 'mid-range' },
    { id: 'gpu-22', name: 'Gigabyte GAMING OC', brand: 'AMD', price: 1462, asin: null, search: 'Gigabyte+Gigabyte+GAMING+OC', image_url: null, score: 17, vram: 16, tdp: 200, tier: 'mid-range' },
    { id: 'gpu-23', name: 'Sparkle ROC OC', brand: 'Intel', price: 1517, asin: null, search: 'Sparkle+Sparkle+ROC+OC', image_url: null, score: 20, vram: 16, tdp: 225, tier: 'mid-range' },
    { id: 'gpu-24', name: 'Asus TUF Gaming EVO OC', brand: 'NVIDIA', price: 1575, asin: null, search: 'ASUS+Asus+TUF+Gaming+EVO+OC', image_url: null, score: 4, vram: 6, tdp: 120, tier: 'mid-range' },
    { id: 'gpu-25', name: 'MSI GAMING X', brand: 'NVIDIA', price: 1594, asin: null, search: 'MSI+MSI+GAMING+X', image_url: null, score: 4, vram: 6, tdp: 120, tier: 'mid-range' },
    { id: 'gpu-26', name: 'Gigabyte WINDFORCE OC', brand: 'NVIDIA', price: 1612, asin: null, search: 'Gigabyte+Gigabyte+WINDFORCE+OC', image_url: null, score: 5, vram: 8, tdp: 115, tier: 'mid-range' },
    { id: 'gpu-27', name: 'MSI VENTUS 2X BLACK OC', brand: 'NVIDIA', price: 1687, asin: null, search: 'MSI+MSI+VENTUS+2X+BLACK+OC', image_url: null, score: 5, vram: 8, tdp: 115, tier: 'mid-range' },
    { id: 'gpu-28', name: 'Sapphire NITRO+', brand: 'AMD', price: 1695, asin: null, search: 'Sapphire+Sapphire+NITRO+', image_url: null, score: 7, vram: 8, tdp: 160, tier: 'mid-range' },
    { id: 'gpu-29', name: 'Asus PRIME', brand: 'NVIDIA', price: 1800, asin: null, search: 'ASUS+Asus+PRIME', image_url: null, score: 16, vram: 16, tdp: 180, tier: 'mid-range' },
    { id: 'gpu-30', name: 'Asus ROG STRIX GAMING OC V2', brand: 'NVIDIA', price: 1819, asin: 'B07FKTSWNG', search: 'ASUS+Asus+ROG+STRIX+GAMING+OC+V2', image_url: null, score: 9, vram: 8, tdp: 200, tier: 'mid-range' },
    { id: 'gpu-31', name: 'NVIDIA Founders Edition', brand: 'NVIDIA', price: 1834, asin: null, search: 'NVIDIA+NVIDIA+Founders+Edition', image_url: null, score: 9, vram: 8, tdp: 200, tier: 'mid-range' },
    { id: 'gpu-32', name: 'Gigabyte WINDFORCE', brand: 'NVIDIA', price: 1879, asin: null, search: 'Gigabyte+Gigabyte+WINDFORCE', image_url: null, score: 16, vram: 16, tdp: 180, tier: 'mid-range' },
    { id: 'gpu-33', name: 'MSI GeForce RTX 3070 VENTUS 3X OC', brand: 'NVIDIA', price: 2003, asin: null, search: 'MSI+MSI+GeForce+RTX+3070+VENTUS+3X+OC', image_url: null, score: 10, vram: 8, tdp: 220, tier: 'mid-range' },
    { id: 'gpu-34', name: 'Gigabyte EAGLE', brand: 'AMD', price: 2006, asin: null, search: 'Gigabyte+Gigabyte+EAGLE', image_url: null, score: 6, vram: 8, tdp: 132, tier: 'mid-range' },
    { id: 'gpu-35', name: 'PNY OC', brand: 'NVIDIA', price: 2062, asin: null, search: 'PNY+PNY+OC', image_url: null, score: 16, vram: 12, tdp: 250, tier: 'mid-range' },
    { id: 'gpu-36', name: 'Asus PRIME OC', brand: 'NVIDIA', price: 2212, asin: null, search: 'ASUS+Asus+PRIME+OC', image_url: null, score: 16, vram: 12, tdp: 250, tier: 'mid-range' },
    { id: 'gpu-37', name: 'Gigabyte GAMING OC PRO Rev 3.0', brand: 'NVIDIA', price: 2245, asin: null, search: 'Gigabyte+Gigabyte+GAMING+OC+PRO+Rev+3.0', image_url: null, score: 9, vram: 8, tdp: 200, tier: 'mid-range' },
    { id: 'gpu-38', name: 'ASRock Challenger', brand: 'AMD', price: 2250, asin: null, search: 'ASRock+ASRock+Challenger', image_url: null, score: 19, vram: 16, tdp: 220, tier: 'mid-range' },
    { id: 'gpu-39', name: 'PowerColor RX7800XT 16G-P', brand: 'AMD', price: 2250, asin: null, search: 'PowerColor+PowerColor+RX7800XT+16G-P', image_url: null, score: 23, vram: 16, tdp: 263, tier: 'mid-range' },
    { id: 'gpu-40', name: 'MSI RX 6600 XT MECH 2X 8G OC', brand: 'AMD', price: 2430, asin: 'B07WNSP41M', search: 'MSI+MSI+RX+6600+XT+MECH+2X+8G+OC', image_url: null, score: 7, vram: 8, tdp: 160, tier: 'mid-range' },
    { id: 'gpu-41', name: 'Zotac GAMING Twin Edge OC White Edition', brand: 'NVIDIA', price: 2471, asin: null, search: 'Zotac+Zotac+GAMING+Twin+Edge+OC+White+Edition', image_url: null, score: 10, vram: 8, tdp: 220, tier: 'mid-range' },
    { id: 'gpu-42', name: 'XFX RX-79GMERCB9', brand: 'AMD', price: 2512, asin: null, search: 'XFX+XFX+RX-79GMERCB9', image_url: null, score: 23, vram: 16, tdp: 260, tier: 'mid-range' },
    { id: 'gpu-43', name: 'Gigabyte GAMING OC Rev 2.0', brand: 'NVIDIA', price: 2621, asin: null, search: 'Gigabyte+Gigabyte+GAMING+OC+Rev+2.0', image_url: null, score: 10, vram: 8, tdp: 220, tier: 'high-end' },
    { id: 'gpu-44', name: 'XFX Speedster MERC 319 CORE', brand: 'AMD', price: 2696, asin: null, search: 'XFX+XFX+Speedster+MERC+319+CORE', image_url: null, score: 26, vram: 16, tdp: 300, tier: 'high-end' },
    { id: 'gpu-45', name: 'PNY VERTO OC', brand: 'NVIDIA', price: 2850, asin: null, search: 'PNY+PNY+VERTO+OC', image_url: null, score: 14, vram: 12, tdp: 220, tier: 'high-end' },
    { id: 'gpu-46', name: 'PowerColor Red Devil Ultimate', brand: 'AMD', price: 2887, asin: null, search: 'PowerColor+PowerColor+Red+Devil+Ultimate', image_url: null, score: 26, vram: 16, tdp: 300, tier: 'high-end' },
    { id: 'gpu-47', name: 'PowerColor Red Devil', brand: 'AMD', price: 3094, asin: null, search: 'PowerColor+PowerColor+Red+Devil', image_url: null, score: 15, vram: 12, tdp: 230, tier: 'high-end' },
    { id: 'gpu-48', name: 'MSI GeForce RTX 3080 VENTUS 3X 10G OC', brand: 'NVIDIA', price: 3300, asin: null, search: 'MSI+MSI+GeForce+RTX+3080+VENTUS+3X+10G+OC', image_url: null, score: 17, vram: 10, tdp: 320, tier: 'high-end' },
    { id: 'gpu-49', name: 'ASRock Phantom Gaming OC', brand: 'AMD', price: 3375, asin: null, search: 'ASRock+ASRock+Phantom+Gaming+OC', image_url: null, score: 46, vram: 24, tdp: 355, tier: 'high-end' },
    { id: 'gpu-50', name: 'EVGA FTW3 ULTRA GAMING', brand: 'NVIDIA', price: 3375, asin: null, search: 'EVGA+EVGA+FTW3+ULTRA+GAMING', image_url: null, score: 17, vram: 10, tdp: 320, tier: 'high-end' },
    { id: 'gpu-51', name: 'MSI GAMING Z TRIO', brand: 'AMD', price: 3709, asin: null, search: 'MSI+MSI+GAMING+Z+TRIO', image_url: null, score: 26, vram: 16, tdp: 300, tier: 'high-end' },
    { id: 'gpu-52', name: 'XFX Speedster MERC 310', brand: 'AMD', price: 3738, asin: null, search: 'XFX+XFX+Speedster+MERC+310', image_url: null, score: 33, vram: 20, tdp: 300, tier: 'high-end' },
    { id: 'gpu-53', name: 'Asus TUF GAMING OC', brand: 'NVIDIA', price: 3746, asin: null, search: 'ASUS+Asus+TUF+GAMING+OC', image_url: null, score: 26, vram: 16, tdp: 300, tier: 'high-end' },
    { id: 'gpu-54', name: 'Asus TUF GAMING OC V2', brand: 'NVIDIA', price: 3934, asin: null, search: 'ASUS+Asus+TUF+GAMING+OC+V2', image_url: null, score: 17, vram: 10, tdp: 320, tier: 'high-end' },
    { id: 'gpu-55', name: 'XFX Speedster MERC 310 Black Edition', brand: 'AMD', price: 3937, asin: null, search: 'XFX+XFX+Speedster+MERC+310+Black+Edition', image_url: null, score: 46, vram: 24, tdp: 355, tier: 'high-end' },
    { id: 'gpu-56', name: 'AMD ‎100-438373', brand: 'AMD', price: 4125, asin: null, search: 'AMD+AMD+‎100-438373', image_url: null, score: 26, vram: 16, tdp: 300, tier: 'high-end' },
    { id: 'gpu-57', name: 'MSI Radeon RX 6900 XT GAMING X TRIO 16G', brand: 'AMD', price: 4256, asin: 'B07XSJ2F8S', search: 'MSI+MSI+Radeon+RX+6900+XT+GAMING+X+TRIO+16G', image_url: null, score: 26, vram: 16, tdp: 300, tier: 'high-end' },
    { id: 'gpu-58', name: 'PowerColor Hellhound', brand: 'AMD', price: 4403, asin: null, search: 'PowerColor+PowerColor+Hellhound', image_url: null, score: 46, vram: 24, tdp: 355, tier: 'high-end' },
    { id: 'gpu-59', name: 'PNY VCNRTX4000ADA-PB', brand: 'NVIDIA', price: 4840, asin: null, search: 'PNY+PNY+VCNRTX4000ADA-PB', image_url: null, score: 22, vram: 20, tdp: 200, tier: 'high-end' },
    { id: 'gpu-60', name: 'EVGA FTW3 ULTRA GAMING LE iCX3', brand: 'NVIDIA', price: 4868, asin: null, search: 'EVGA+EVGA+FTW3+ULTRA+GAMING+LE+iCX3', image_url: null, score: 23, vram: 12, tdp: 350, tier: 'high-end' },
    { id: 'gpu-61', name: 'Gigabyte WINDFORCE V2', brand: 'NVIDIA', price: 5809, asin: null, search: 'Gigabyte+Gigabyte+WINDFORCE+V2', image_url: null, score: 28, vram: 16, tdp: 320, tier: 'enthusiast' },
    { id: 'gpu-62', name: 'MSI VENTUS 3X OC PLUS', brand: 'NVIDIA', price: 6000, asin: null, search: 'MSI+MSI+VENTUS+3X+OC+PLUS', image_url: null, score: 31, vram: 16, tdp: 360, tier: 'enthusiast' },
    { id: 'gpu-63', name: 'Asus STRIX GAMING OC', brand: 'NVIDIA', price: 6000, asin: null, search: 'ASUS+Asus+STRIX+GAMING+OC', image_url: null, score: 46, vram: 24, tdp: 350, tier: 'enthusiast' },
    { id: 'gpu-64', name: 'MSI GAMING X TRIO', brand: 'NVIDIA', price: 6731, asin: null, search: 'MSI+MSI+GAMING+X+TRIO', image_url: null, score: 28, vram: 16, tdp: 320, tier: 'enthusiast' },
    { id: 'gpu-65', name: 'MSI VENTUS 3X OC', brand: 'NVIDIA', price: 6750, asin: null, search: 'MSI+MSI+VENTUS+3X+OC', image_url: null, score: 28, vram: 16, tdp: 320, tier: 'enthusiast' },
    { id: 'gpu-66', name: 'PowerColor Red Devil OC', brand: 'AMD', price: 6824, asin: null, search: 'PowerColor+PowerColor+Red+Devil+OC', image_url: null, score: 8, vram: 8, tdp: 180, tier: 'enthusiast' },
    { id: 'gpu-67', name: 'Gigabyte AORUS MASTER', brand: 'NVIDIA', price: 11022, asin: null, search: 'Gigabyte+Gigabyte+AORUS+MASTER', image_url: null, score: 100, vram: 32, tdp: 575, tier: 'enthusiast' },
    { id: 'gpu-68', name: 'MSI GAMING TRIO OC', brand: 'NVIDIA', price: 11437, asin: null, search: 'MSI+MSI+GAMING+TRIO+OC', image_url: null, score: 100, vram: 32, tdp: 575, tier: 'enthusiast' },
    { id: 'gpu-69', name: 'Asus ROG Astral OC', brand: 'NVIDIA', price: 12600, asin: null, search: 'ASUS+Asus+ROG+Astral+OC', image_url: null, score: 100, vram: 32, tdp: 575, tier: 'enthusiast' },
    { id: 'gpu-70', name: 'PNY VCNRTX5000ADA-PB', brand: 'NVIDIA', price: 15378, asin: null, search: 'PNY+PNY+VCNRTX5000ADA-PB', image_url: null, score: 35, vram: 32, tdp: 200, tier: 'enthusiast' },
  ],

  // ═══════ Motherboards — 60 total ═══════
  mb: [
    { id: 'mb-1', name: 'ASRock A520M-HDV', brand: 'ASRock', price: 236, asin: null, search: 'ASRock+ASRock+A520M-HDV', image_url: null, socket: 'AM4', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 2, maxRam: 64, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-2', name: 'Asus PRO H610M-CT D4-CSM', brand: 'ASUS', price: 337, asin: null, search: 'ASUS+Asus+PRO+H610M-CT+D4-CSM', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 2, maxRam: 64, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-3', name: 'Gigabyte A520I AC', brand: 'Gigabyte', price: 375, asin: null, search: 'Gigabyte+Gigabyte+A520I+AC', image_url: null, socket: 'AM4', chipset: 'Unknown', formFactor: 'mITX', ramType: 'DDR4', ramSlots: 2, maxRam: 64, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-4', name: 'Gigabyte A520M DS3H V2', brand: 'Gigabyte', price: 382, asin: null, search: 'Gigabyte+Gigabyte+A520M+DS3H+V2', image_url: null, socket: 'AM4', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-5', name: 'Asus PRIME B550M-A AC', brand: 'ASUS', price: 412, asin: 'B081PZTZ4B', search: 'ASUS+Asus+PRIME+B550M-A+AC', image_url: null, socket: 'AM4', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-6', name: 'Asus PRIME H610M-K D4', brand: 'ASUS', price: 431, asin: null, search: 'ASUS+Asus+PRIME+H610M-K+D4', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 2, maxRam: 64, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-7', name: 'Gigabyte A520M DS3H AC', brand: 'Gigabyte', price: 463, asin: null, search: 'Gigabyte+Gigabyte+A520M+DS3H+AC', image_url: null, socket: 'AM4', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-8', name: 'Gigabyte B550 EAGLE WIFI6', brand: 'Gigabyte', price: 487, asin: null, search: 'Gigabyte+Gigabyte+B550+EAGLE+WIFI6', image_url: null, socket: 'AM4', chipset: 'B550', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: true, tier: 'budget' },
    { id: 'mb-9', name: 'Gigabyte H610M H V3 DDR4', brand: 'Gigabyte', price: 491, asin: null, search: 'Gigabyte+Gigabyte+H610M+H+V3+DDR4', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 2, maxRam: 64, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-10', name: 'Gigabyte B760M GAMING PLUS WIFI DDR4', brand: 'Gigabyte', price: 523, asin: null, search: 'Gigabyte+Gigabyte+B760M+GAMING+PLUS+WIFI+DDR4', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: true, tier: 'budget' },
    { id: 'mb-11', name: 'MSI PRO H610M-G', brand: 'MSI', price: 527, asin: null, search: 'MSI+MSI+PRO+H610M-G', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 2, maxRam: 96, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-12', name: 'ASRock A620M-HDV/M.2+', brand: 'ASRock', price: 558, asin: null, search: 'ASRock+ASRock+A620M-HDV/M.2+', image_url: null, socket: 'AM5', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 2, maxRam: 96, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-13', name: 'Asus PRIME B760M-A D4', brand: 'ASUS', price: 562, asin: null, search: 'ASUS+Asus+PRIME+B760M-A+D4', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-14', name: 'ASRock B760M-H2/M.2', brand: 'ASRock', price: 577, asin: null, search: 'ASRock+ASRock+B760M-H2/M.2', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 2, maxRam: 96, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-15', name: 'Asus TUF GAMING B550M-PLUS', brand: 'ASUS', price: 592, asin: null, search: 'ASUS+Asus+TUF+GAMING+B550M-PLUS', image_url: null, socket: 'AM4', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-16', name: 'MSI PRO B860M-A WIFI', brand: 'MSI', price: 600, asin: 'B0DQ66PD4L', search: 'MSI+MSI+PRO+B860M-A+WIFI', image_url: null, socket: 'LGA1851', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-17', name: 'MSI B450 Gaming Plus MAX', brand: 'MSI', price: 608, asin: 'B07V9L4RT6', search: 'MSI+MSI+B450+Gaming+Plus+MAX', image_url: null, socket: 'AM4', chipset: 'B450', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'mid-range' },
    { id: 'mb-18', name: 'Gigabyte B650M D3HP', brand: 'Gigabyte', price: 635, asin: null, search: 'Gigabyte+Gigabyte+B650M+D3HP', image_url: null, socket: 'AM5', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: false, tier: 'mid-range' },
    { id: 'mb-19', name: 'Asus B650E MAX GAMING WIFI', brand: 'ASUS', price: 637, asin: null, search: 'ASUS+Asus+B650E+MAX+GAMING+WIFI', image_url: null, socket: 'AM5', chipset: 'B650E', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-20', name: 'ASRock B760M Pro RS/D4 WiFi', brand: 'ASRock', price: 646, asin: null, search: 'ASRock+ASRock+B760M+Pro+RS/D4+WiFi', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-21', name: 'Gigabyte B760M DS3H AX DDR4', brand: 'Gigabyte', price: 671, asin: null, search: 'Gigabyte+Gigabyte+B760M+DS3H+AX+DDR4', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'mid-range' },
    { id: 'mb-22', name: 'MSI PRO Z790-VC WIFI', brand: 'MSI', price: 675, asin: null, search: 'MSI+MSI+PRO+Z790-VC+WIFI', image_url: null, socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-23', name: 'Gigabyte Z790 AORUS ELITE AX', brand: 'Gigabyte', price: 694, asin: null, search: 'Gigabyte+Gigabyte+Z790+AORUS+ELITE+AX', image_url: null, socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: false, tier: 'mid-range' },
    { id: 'mb-24', name: 'Gigabyte Z890 UD WIFI6E', brand: 'Gigabyte', price: 712, asin: null, search: 'Gigabyte+Gigabyte+Z890+UD+WIFI6E', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-25', name: 'Gigabyte B860 AORUS ELITE WIFI7 ICE', brand: 'Gigabyte', price: 712, asin: 'B07SH7DHBS', search: 'Gigabyte+Gigabyte+B860+AORUS+ELITE+WIFI7+ICE', image_url: null, socket: 'LGA1851', chipset: 'B860', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-26', name: 'Asus TUF GAMING B450-PLUS II', brand: 'ASUS', price: 723, asin: null, search: 'ASUS+Asus+TUF+GAMING+B450-PLUS+II', image_url: null, socket: 'AM4', chipset: 'B450', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'mid-range' },
    { id: 'mb-27', name: 'MSI MAG B650M MORTAR WIFI', brand: 'MSI', price: 746, asin: 'B0BHC39YG7', search: 'MSI+MSI+MAG+B650M+MORTAR+WIFI', image_url: null, socket: 'AM5', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-28', name: 'Gigabyte B650M AORUS ELITE AX', brand: 'Gigabyte', price: 750, asin: null, search: 'Gigabyte+Gigabyte+B650M+AORUS+ELITE+AX', image_url: null, socket: 'AM5', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: false, tier: 'mid-range' },
    { id: 'mb-29', name: 'ASRock X870 Pro-A WiFi', brand: 'ASRock', price: 750, asin: null, search: 'ASRock+ASRock+X870+Pro-A+WiFi', image_url: null, socket: 'AM5', chipset: 'X870', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-30', name: 'Gigabyte Q670M D3H', brand: 'Gigabyte', price: 784, asin: null, search: 'Gigabyte+Gigabyte+Q670M+D3H', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'mid-range' },
    { id: 'mb-31', name: 'Asus TUF GAMING B650EM-E WIFI', brand: 'ASUS', price: 787, asin: 'B08W6PSC52', search: 'ASUS+Asus+TUF+GAMING+B650EM-E+WIFI', image_url: null, socket: 'AM5', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-32', name: 'Asus ROG STRIX B650E-I GAMING WIFI', brand: 'ASUS', price: 825, asin: 'B0DGQ91QLK', search: 'ASUS+Asus+ROG+STRIX+B650E-I+GAMING+WIFI', image_url: null, socket: 'AM5', chipset: 'B650E', formFactor: 'mITX', ramType: 'DDR5', ramSlots: 2, maxRam: 96, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-33', name: 'ASRock B860I Lightning WiFi', brand: 'ASRock', price: 825, asin: null, search: 'ASRock+ASRock+B860I+Lightning+WiFi', image_url: null, socket: 'LGA1851', chipset: 'Unknown', formFactor: 'mITX', ramType: 'DDR5', ramSlots: 2, maxRam: 128, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-34', name: 'NZXT N5 Z690', brand: 'NZXT', price: 855, asin: null, search: 'NZXT+NZXT+N5+Z690', image_url: null, socket: 'LGA1700', chipset: 'Z690', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'mid-range' },
    { id: 'mb-35', name: 'Asus TUF GAMING H670-PRO WIFI D4', brand: 'ASUS', price: 862, asin: 'B09NWFPC34', search: 'ASUS+Asus+TUF+GAMING+H670-PRO+WIFI+D4', image_url: null, socket: 'LGA1700', chipset: 'H670', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-36', name: 'Asus PRIME A320M-E', brand: 'ASUS', price: 889, asin: null, search: 'ASUS+Asus+PRIME+A320M-E', image_url: null, socket: 'AM4', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 2, maxRam: 64, m2Slots: 2, wifi: false, tier: 'mid-range' },
    { id: 'mb-37', name: 'Asus PRIME Z890-P WIFI', brand: 'ASUS', price: 900, asin: null, search: 'ASUS+Asus+PRIME+Z890-P+WIFI', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: true, tier: 'high-end' },
    { id: 'mb-38', name: 'Gigabyte Z890 AORUS ELITE WIFI7', brand: 'Gigabyte', price: 920, asin: null, search: 'Gigabyte+Gigabyte+Z890+AORUS+ELITE+WIFI7', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: true, tier: 'high-end' },
    { id: 'mb-39', name: 'MSI B760M GAMING PLUS WIFI', brand: 'MSI', price: 946, asin: null, search: 'MSI+MSI+B760M+GAMING+PLUS+WIFI', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: true, tier: 'high-end' },
    { id: 'mb-40', name: 'ASRock Z890 Steel Legend WiFi', brand: 'ASRock', price: 975, asin: null, search: 'ASRock+ASRock+Z890+Steel+Legend+WiFi', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: true, tier: 'high-end' },
    { id: 'mb-41', name: 'Gigabyte Z790 D AX', brand: 'Gigabyte', price: 997, asin: null, search: 'Gigabyte+Gigabyte+Z790+D+AX', image_url: null, socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: false, tier: 'high-end' },
    { id: 'mb-42', name: 'MSI PRO X870-P WIFI', brand: 'MSI', price: 1024, asin: null, search: 'MSI+MSI+PRO+X870-P+WIFI', image_url: null, socket: 'AM5', chipset: 'X870', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: true, tier: 'high-end' },
    { id: 'mb-43', name: 'Asus PROART B760-CREATOR D4', brand: 'ASUS', price: 1071, asin: null, search: 'ASUS+Asus+PROART+B760-CREATOR+D4', image_url: null, socket: 'LGA1700', chipset: 'B760', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'high-end' },
    { id: 'mb-44', name: 'Asus ROG STRIX B660-F GAMING WIFI', brand: 'ASUS', price: 1121, asin: 'B0DGQ91QLK', search: 'ASUS+Asus+ROG+STRIX+B660-F+GAMING+WIFI', image_url: null, socket: 'LGA1700', chipset: 'B660', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: true, tier: 'high-end' },
    { id: 'mb-45', name: 'NZXT N7-Z69XT-W1', brand: 'NZXT', price: 1133, asin: null, search: 'NZXT+NZXT+N7-Z69XT-W1', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'high-end' },
    { id: 'mb-46', name: 'Gigabyte Z890 EAGLE', brand: 'Gigabyte', price: 1171, asin: null, search: 'Gigabyte+Gigabyte+Z890+EAGLE', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: false, tier: 'high-end' },
    { id: 'mb-47', name: 'MSI MPG Z890I EDGE TI WIFI', brand: 'MSI', price: 1237, asin: null, search: 'MSI+MSI+MPG+Z890I+EDGE+TI+WIFI', image_url: null, socket: 'LGA1851', chipset: 'Unknown', formFactor: 'mITX', ramType: 'DDR5', ramSlots: 2, maxRam: 128, m2Slots: 2, wifi: true, tier: 'high-end' },
    { id: 'mb-48', name: 'Gigabyte Z890 AORUS PRO ICE', brand: 'Gigabyte', price: 1271, asin: null, search: 'Gigabyte+Gigabyte+Z890+AORUS+PRO+ICE', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: false, tier: 'high-end' },
    { id: 'mb-49', name: 'Biostar B760M-SILVER', brand: 'Biostar', price: 1333, asin: null, search: 'Biostar+Biostar+B760M-SILVER', image_url: null, socket: 'LGA1700', chipset: 'Unknown', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: false, tier: 'high-end' },
    { id: 'mb-50', name: 'MSI MPG B550 GAMING CARBON WIFI', brand: 'MSI', price: 1410, asin: null, search: 'MSI+MSI+MPG+B550+GAMING+CARBON+WIFI', image_url: null, socket: 'AM4', chipset: 'B550', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: true, tier: 'high-end' },
    { id: 'mb-51', name: 'MSI MPG Z790 EDGE TI MAX WIFI', brand: 'MSI', price: 1496, asin: null, search: 'MSI+MSI+MPG+Z790+EDGE+TI+MAX+WIFI', image_url: null, socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: true, tier: 'high-end' },
    { id: 'mb-52', name: 'Asus ROG STRIX X670E-F GAMING WIFI', brand: 'ASUS', price: 1568, asin: 'B0DGQ91QLK', search: 'ASUS+Asus+ROG+STRIX+X670E-F+GAMING+WIFI', image_url: null, socket: 'AM5', chipset: 'X670E', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: true, tier: 'enthusiast' },
    { id: 'mb-53', name: 'Asus ROG STRIX Z790-F GAMING WIFI', brand: 'ASUS', price: 1661, asin: 'B0DGQ91QLK', search: 'ASUS+Asus+ROG+STRIX+Z790-F+GAMING+WIFI', image_url: null, socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: true, tier: 'enthusiast' },
    { id: 'mb-54', name: 'NZXT N9 X870E', brand: 'NZXT', price: 1725, asin: null, search: 'NZXT+NZXT+N9+X870E', image_url: null, socket: 'AM5', chipset: 'X870E', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: false, tier: 'enthusiast' },
    { id: 'mb-55', name: 'Asus ProArt Z890-CREATOR WIFI', brand: 'ASUS', price: 1837, asin: null, search: 'ASUS+Asus+ProArt+Z890-CREATOR+WIFI', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: true, tier: 'enthusiast' },
    { id: 'mb-56', name: 'Gigabyte Z790 AORUS MASTER', brand: 'Gigabyte', price: 1954, asin: null, search: 'Gigabyte+Gigabyte+Z790+AORUS+MASTER', image_url: null, socket: 'LGA1700', chipset: 'Z790', formFactor: 'EATX', ramType: 'DDR4', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: false, tier: 'enthusiast' },
    { id: 'mb-57', name: 'Gigabyte Z790 AORUS ELITE AX-W', brand: 'Gigabyte', price: 2195, asin: null, search: 'Gigabyte+Gigabyte+Z790+AORUS+ELITE+AX-W', image_url: null, socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: false, tier: 'enthusiast' },
    { id: 'mb-58', name: 'Gigabyte Z890 AORUS MASTER AI TOP', brand: 'Gigabyte', price: 2625, asin: null, search: 'Gigabyte+Gigabyte+Z890+AORUS+MASTER+AI+TOP', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'EATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: false, tier: 'enthusiast' },
    { id: 'mb-59', name: 'Biostar Z690 VALKYRIE', brand: 'Biostar', price: 3094, asin: null, search: 'Biostar+Biostar+Z690+VALKYRIE', image_url: null, socket: 'LGA1700', chipset: 'Z690', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 192, m2Slots: 2, wifi: false, tier: 'enthusiast' },
    { id: 'mb-60', name: 'ASRock X570 Phantom Gaming 4S', brand: 'ASRock', price: 11044, asin: null, search: 'ASRock+ASRock+X570+Phantom+Gaming+4S', image_url: null, socket: 'AM4', chipset: 'Unknown', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'enthusiast' },
  ],

  // ═══════ RAM — 50 total ═══════
  ram: [
    { id: 'ram-1', name: 'PNY XLR8 16 GB', brand: 'PNY', price: 120, asin: null, search: 'PNY+PNY+XLR8+16+GB', image_url: null, type: 'DDR4', size: 16, speed: 3200, latency: 'CL16', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-2', name: 'TEAMGROUP T-Create Classic 16 GB', brand: 'TeamGroup', price: 150, asin: null, search: 'TeamGroup+TEAMGROUP+T-Create+Classic+16+GB', image_url: null, type: 'DDR4', size: 16, speed: 3200, latency: 'CL22', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-3', name: 'TEAMGROUP Vulcan Z 16 GB', brand: 'TeamGroup', price: 161, asin: null, search: 'TeamGroup+TEAMGROUP+Vulcan+Z+16+GB', image_url: null, type: 'DDR4', size: 16, speed: 3600, latency: 'CL18', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-4', name: 'G.Skill Ripjaws V 16 GB', brand: 'G.Skill', price: 172, asin: null, search: 'G.Skill+G.Skill+Ripjaws+V+16+GB', image_url: null, type: 'DDR4', size: 16, speed: 3200, latency: 'CL16', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-5', name: 'Crucial CT16G4DFRA32A 16 GB', brand: 'Crucial', price: 194, asin: null, search: 'Crucial+Crucial+CT16G4DFRA32A+16+GB', image_url: null, type: 'DDR4', size: 16, speed: 3200, latency: 'CL22', modules: '1x16GB', tier: 'budget' },
    { id: 'ram-6', name: 'G.Skill Sniper X 16 GB', brand: 'G.Skill', price: 200, asin: null, search: 'G.Skill+G.Skill+Sniper+X+16+GB', image_url: null, type: 'DDR4', size: 16, speed: 3200, latency: 'CL16', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-7', name: 'Mushkin Redline Lumina 16 GB', brand: 'Mushkin', price: 215, asin: null, search: 'Mushkin+Mushkin+Redline+Lumina+16+GB', image_url: null, type: 'DDR4', size: 16, speed: 3600, latency: 'CL18', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-8', name: 'Crucial CT2K8G4DFS832A 16 GB', brand: 'Crucial', price: 242, asin: null, search: 'Crucial+Crucial+CT2K8G4DFS832A+16+GB', image_url: null, type: 'DDR4', size: 16, speed: 3200, latency: 'CL22', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-9', name: 'G.Skill Trident Z 16 GB', brand: 'G.Skill', price: 260, asin: null, search: 'G.Skill+G.Skill+Trident+Z+16+GB', image_url: null, type: 'DDR4', size: 16, speed: 3200, latency: 'CL16', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-10', name: 'Crucial CT2K16G48C40S5 32 GB', brand: 'Crucial', price: 266, asin: null, search: 'Crucial+Crucial+CT2K16G48C40S5+32+GB', image_url: null, type: 'DDR5', size: 32, speed: 4800, latency: 'CL40', modules: '2x16GB', tier: 'budget' },
    { id: 'ram-11', name: 'TEAMGROUP T-Create Classic 32 GB', brand: 'TeamGroup', price: 281, asin: null, search: 'TeamGroup+TEAMGROUP+T-Create+Classic+32+GB', image_url: null, type: 'DDR5', size: 32, speed: 5600, latency: 'CL46', modules: '2x16GB', tier: 'budget' },
    { id: 'ram-12', name: 'TEAMGROUP Elite 32 GB', brand: 'TeamGroup', price: 296, asin: null, search: 'TeamGroup+TEAMGROUP+Elite+32+GB', image_url: null, type: 'DDR4', size: 32, speed: 3200, latency: 'CL22', modules: '2x16GB', tier: 'budget' },
    { id: 'ram-13', name: 'Corsair Vengeance RGB RS 16 GB', brand: 'Corsair', price: 311, asin: null, search: 'Corsair+Corsair+Vengeance+RGB+RS+16+GB', image_url: null, type: 'DDR4', size: 16, speed: 3200, latency: 'CL16', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-14', name: 'G.Skill Flare X5 32 GB', brand: 'G.Skill', price: 337, asin: null, search: 'G.Skill+G.Skill+Flare+X5+32+GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL36', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-15', name: 'PNY XLR8 Gaming RGB 32 GB', brand: 'PNY', price: 356, asin: null, search: 'PNY+PNY+XLR8+Gaming+RGB+32+GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL36', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-16', name: 'Crucial CT2K16G52C42U5 32 GB', brand: 'Crucial', price: 360, asin: null, search: 'Crucial+Crucial+CT2K16G52C42U5+32+GB', image_url: null, type: 'DDR5', size: 32, speed: 5200, latency: 'CL42', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-17', name: 'Crucial CT2K16G4DFRA32A 32 GB', brand: 'Crucial', price: 375, asin: null, search: 'Crucial+Crucial+CT2K16G4DFRA32A+32+GB', image_url: null, type: 'DDR4', size: 32, speed: 3200, latency: 'CL22', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-18', name: 'Patriot Viper Elite 5 RGB 32 GB', brand: 'Patriot', price: 386, asin: null, search: 'Patriot+Patriot+Viper+Elite+5+RGB+32+GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL30', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-19', name: 'G.Skill Ripjaws S5 32 GB', brand: 'G.Skill', price: 412, asin: null, search: 'G.Skill+G.Skill+Ripjaws+S5+32+GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL30', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-20', name: 'Crucial CT32G56C46S5 32 GB', brand: 'Crucial', price: 428, asin: null, search: 'Crucial+Crucial+CT32G56C46S5+32+GB', image_url: null, type: 'DDR5', size: 32, speed: 5600, latency: 'CL46', modules: '1x32GB', tier: 'mid-range' },
    { id: 'ram-21', name: 'G.Skill Trident Z5 Neo 32 GB', brand: 'G.Skill', price: 439, asin: null, search: 'G.Skill+G.Skill+Trident+Z5+Neo+32+GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL30', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-22', name: 'Crucial Pro 48 GB', brand: 'Crucial', price: 465, asin: null, search: 'Crucial+Crucial+Pro+48+GB', image_url: null, type: 'DDR5', size: 48, speed: 6000, latency: 'CL48', modules: '2x24GB', tier: 'mid-range' },
    { id: 'ram-23', name: 'Patriot Viper Elite 5 RGB TUF GAMING ALLIANCE 48 GB', brand: 'Patriot', price: 487, asin: null, search: 'Patriot+Patriot+Viper+Elite+5+RGB+TUF+GAMING+ALLIANCE+48+GB', image_url: null, type: 'DDR5', size: 48, speed: 6000, latency: 'CL36', modules: '2x24GB', tier: 'mid-range' },
    { id: 'ram-24', name: 'Crucial Pro 64 GB', brand: 'Crucial', price: 525, asin: null, search: 'Crucial+Crucial+Pro+64+GB', image_url: null, type: 'DDR5', size: 64, speed: 5600, latency: 'CL46', modules: '2x32GB', tier: 'mid-range' },
    { id: 'ram-25', name: 'Mushkin Redline Lumina 32 GB', brand: 'Mushkin', price: 565, asin: null, search: 'Mushkin+Mushkin+Redline+Lumina+32+GB', image_url: null, type: 'DDR4', size: 32, speed: 3600, latency: 'CL18', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-26', name: 'G.Skill F5-6000J3636F32GX2-FX5 64 GB', brand: 'G.Skill', price: 581, asin: null, search: 'G.Skill+G.Skill+F5-6000J3636F32GX2-FX5+64+GB', image_url: null, type: 'DDR5', size: 64, speed: 6000, latency: 'CL36', modules: '2x32GB', tier: 'mid-range' },
    { id: 'ram-27', name: 'Kingston Server Premier 32 GB', brand: 'Kingston', price: 595, asin: null, search: 'Kingston+Kingston+Server+Premier+32+GB', image_url: null, type: 'DDR4', size: 32, speed: 3200, latency: 'CL22', modules: '1x32GB', tier: 'mid-range' },
    { id: 'ram-28', name: 'Crucial CT2K32G48C40S5 64 GB', brand: 'Crucial', price: 619, asin: null, search: 'Crucial+Crucial+CT2K32G48C40S5+64+GB', image_url: null, type: 'DDR5', size: 64, speed: 4800, latency: 'CL40', modules: '2x32GB', tier: 'mid-range' },
    { id: 'ram-29', name: 'Crucial CT2K32G48C40U5 64 GB', brand: 'Crucial', price: 634, asin: null, search: 'Crucial+Crucial+CT2K32G48C40U5+64+GB', image_url: null, type: 'DDR5', size: 64, speed: 4800, latency: 'CL40', modules: '2x32GB', tier: 'mid-range' },
    { id: 'ram-30', name: 'Kingston FURY Renegade 48 GB', brand: 'Kingston', price: 652, asin: null, search: 'Kingston+Kingston+FURY+Renegade+48+GB', image_url: null, type: 'DDR5', size: 48, speed: 6000, latency: 'CL32', modules: '1x48GB', tier: 'mid-range' },
    { id: 'ram-31', name: 'Corsair Dominator Titanium 32 GB', brand: 'Corsair', price: 679, asin: null, search: 'Corsair+Corsair+Dominator+Titanium+32+GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL30', modules: '2x16GB', tier: 'high-end' },
    { id: 'ram-32', name: 'G.Skill TridentZ RGB 16 GB', brand: 'G.Skill', price: 709, asin: null, search: 'G.Skill+G.Skill+TridentZ+RGB+16+GB', image_url: null, type: 'DDR4', size: 16, speed: 4000, latency: 'CL17', modules: '2x8GB', tier: 'high-end' },
    { id: 'ram-33', name: 'Mushkin Enhanced Redline 64 GB', brand: 'Mushkin', price: 712, asin: null, search: 'Mushkin+Mushkin+Enhanced+Redline+64+GB', image_url: null, type: 'DDR5', size: 64, speed: 5600, latency: 'CL28', modules: '2x32GB', tier: 'high-end' },
    { id: 'ram-34', name: 'Kingston KSM48R40BD8KMM-32HMR 32 GB', brand: 'Kingston', price: 750, asin: null, search: 'Kingston+Kingston+KSM48R40BD8KMM-32HMR+32+GB', image_url: null, type: 'DDR5', size: 32, speed: 4800, latency: 'CL40', modules: '1x32GB', tier: 'high-end' },
    { id: 'ram-35', name: 'Mushkin Redline ST 64 GB', brand: 'Mushkin', price: 787, asin: null, search: 'Mushkin+Mushkin+Redline+ST+64+GB', image_url: null, type: 'DDR5', size: 64, speed: 6400, latency: 'CL30', modules: '2x32GB', tier: 'high-end' },
    { id: 'ram-36', name: 'Mushkin Redline 96 GB', brand: 'Mushkin', price: 844, asin: null, search: 'Mushkin+Mushkin+Redline+96+GB', image_url: null, type: 'DDR5', size: 96, speed: 4800, latency: 'CL40', modules: '2x48GB', tier: 'high-end' },
    { id: 'ram-37', name: 'Kingston ValueRAM 64 GB', brand: 'Kingston', price: 899, asin: null, search: 'Kingston+Kingston+ValueRAM+64+GB', image_url: null, type: 'DDR5', size: 64, speed: 4800, latency: 'CL40', modules: '2x32GB', tier: 'high-end' },
    { id: 'ram-38', name: 'Patriot Signature Line 64 GB', brand: 'Patriot', price: 957, asin: null, search: 'Patriot+Patriot+Signature+Line+64+GB', image_url: null, type: 'DDR4', size: 64, speed: 3200, latency: 'CL22', modules: '2x32GB', tier: 'high-end' },
    { id: 'ram-39', name: 'Corsair Dominator Titanium First Edition 48 GB', brand: 'Corsair', price: 1027, asin: null, search: 'Corsair+Corsair+Dominator+Titanium+First+Edition+48+GB', image_url: null, type: 'DDR5', size: 48, speed: 7200, latency: 'CL36', modules: '2x24GB', tier: 'high-end' },
    { id: 'ram-40', name: 'G.Skill Ripjaws S5 96 GB', brand: 'G.Skill', price: 1069, asin: null, search: 'G.Skill+G.Skill+Ripjaws+S5+96+GB', image_url: null, type: 'DDR5', size: 96, speed: 6400, latency: 'CL32', modules: '2x48GB', tier: 'high-end' },
    { id: 'ram-41', name: 'Thermaltake TOUGHRAM XG RGB 32 GB', brand: 'Thermaltake', price: 1125, asin: null, search: 'Thermaltake+Thermaltake+TOUGHRAM+XG+RGB+32+GB', image_url: null, type: 'DDR4', size: 32, speed: 3600, latency: 'CL18', modules: '2x16GB', tier: 'high-end' },
    { id: 'ram-42', name: 'G.Skill Trident Z RGB 128 GB', brand: 'G.Skill', price: 1237, asin: null, search: 'G.Skill+G.Skill+Trident+Z+RGB+128+GB', image_url: null, type: 'DDR4', size: 128, speed: 3600, latency: 'CL18', modules: '4x32GB', tier: 'high-end' },
    { id: 'ram-43', name: 'Corsair Vengeance RGB Pro SL 128 GB', brand: 'Corsair', price: 1380, asin: null, search: 'Corsair+Corsair+Vengeance+RGB+Pro+SL+128+GB', image_url: null, type: 'DDR4', size: 128, speed: 3200, latency: 'CL16', modules: '4x32GB', tier: 'high-end' },
    { id: 'ram-44', name: 'Kingston HyperX Fury 64 GB', brand: 'Kingston', price: 1496, asin: null, search: 'Kingston+Kingston+HyperX+Fury+64+GB', image_url: null, type: 'DDR4', size: 64, speed: 3600, latency: 'CL18', modules: '2x32GB', tier: 'enthusiast' },
    { id: 'ram-45', name: 'TEAMGROUP T-Create Master 64 GB', brand: 'TeamGroup', price: 1579, asin: null, search: 'TeamGroup+TEAMGROUP+T-Create+Master+64+GB', image_url: null, type: 'DDR5', size: 64, speed: 6000, latency: 'CL32', modules: '4x16GB', tier: 'enthusiast' },
    { id: 'ram-46', name: 'G.Skill Trident Z Neo 128 GB', brand: 'G.Skill', price: 1752, asin: null, search: 'G.Skill+G.Skill+Trident+Z+Neo+128+GB', image_url: null, type: 'DDR4', size: 128, speed: 3600, latency: 'CL16', modules: '4x32GB', tier: 'enthusiast' },
    { id: 'ram-47', name: 'Corsair Vengeance 192 GB', brand: 'Corsair', price: 2306, asin: null, search: 'Corsair+Corsair+Vengeance+192+GB', image_url: null, type: 'DDR5', size: 192, speed: 5200, latency: 'CL38', modules: '4x48GB', tier: 'enthusiast' },
    { id: 'ram-48', name: 'G.Skill Zeta R5 Neo 128 GB', brand: 'G.Skill', price: 2850, asin: null, search: 'G.Skill+G.Skill+Zeta+R5+Neo+128+GB', image_url: null, type: 'DDR5', size: 128, speed: 6000, latency: 'CL30', modules: '4x32GB', tier: 'enthusiast' },
    { id: 'ram-49', name: 'Corsair Vengeance RGB Pro 64 GB', brand: 'Corsair', price: 3695, asin: null, search: 'Corsair+Corsair+Vengeance+RGB+Pro+64+GB', image_url: null, type: 'DDR4', size: 64, speed: 3200, latency: 'CL16', modules: '4x16GB', tier: 'enthusiast' },
    { id: 'ram-50', name: 'Kingston FURY Renegade Pro 256 GB', brand: 'Kingston', price: 8143, asin: null, search: 'Kingston+Kingston+FURY+Renegade+Pro+256+GB', image_url: null, type: 'DDR5', size: 256, speed: 6800, latency: 'CL34', modules: '8x32GB', tier: 'enthusiast' },
  ],

  // ═══════ SSDs — 50 total ═══════
  ssd: [
    { id: 'ssd-1', name: 'Patriot Burst Elite', brand: 'Patriot', price: 101, asin: null, search: 'Patriot+Patriot+Burst+Elite', image_url: null, interface: 'SATA', capacity: 480, read: 560, write: 530, tier: 'budget' },
    { id: 'ssd-2', name: 'TEAMGROUP GX2', brand: 'TeamGroup', price: 124, asin: null, search: 'TeamGroup+TEAMGROUP+GX2', image_url: null, interface: 'SATA', capacity: 512, read: 560, write: 530, tier: 'budget' },
    { id: 'ssd-3', name: 'Patriot P310', brand: 'Patriot', price: 135, asin: null, search: 'Patriot+Patriot+P310', image_url: null, interface: 'NVMe Gen4', capacity: 480, read: 7000, write: 5500, tier: 'budget' },
    { id: 'ssd-4', name: 'Gigabyte GP-GSTFS31480GNTD', brand: 'Gigabyte', price: 175, asin: null, search: 'Gigabyte+Gigabyte+GP-GSTFS31480GNTD', image_url: null, interface: 'SATA', capacity: 480, read: 560, write: 530, tier: 'budget' },
    { id: 'ssd-5', name: 'MSI SPATIUM M450', brand: 'MSI', price: 187, asin: null, search: 'MSI+MSI+SPATIUM+M450', image_url: null, interface: 'NVMe Gen4', capacity: 500, read: 7000, write: 5500, tier: 'budget' },
    { id: 'ssd-6', name: 'TEAMGROUP MP33 PRO', brand: 'TeamGroup', price: 206, asin: null, search: 'TeamGroup+TEAMGROUP+MP33+PRO', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'budget' },
    { id: 'ssd-7', name: 'TEAMGROUP MP44L', brand: 'TeamGroup', price: 217, asin: null, search: 'TeamGroup+TEAMGROUP+MP44L', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'budget' },
    { id: 'ssd-8', name: 'TEAMGROUP MP44Q', brand: 'TeamGroup', price: 225, asin: null, search: 'TeamGroup+TEAMGROUP+MP44Q', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'budget' },
    { id: 'ssd-9', name: 'Patriot P400', brand: 'Patriot', price: 244, asin: null, search: 'Patriot+Patriot+P400', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'budget' },
    { id: 'ssd-10', name: 'Intel DC S3110', brand: 'Intel', price: 252, asin: null, search: 'Intel+Intel+DC+S3110', image_url: null, interface: 'SATA', capacity: 256, read: 560, write: 530, tier: 'budget' },
    { id: 'ssd-11', name: 'Corsair MP600 CORE XT', brand: 'Corsair', price: 262, asin: null, search: 'Corsair+Corsair+MP600+CORE+XT', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'budget' },
    { id: 'ssd-12', name: 'PNY CS3140', brand: 'PNY', price: 281, asin: null, search: 'PNY+PNY+CS3140', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'budget' },
    { id: 'ssd-13', name: 'MSI SPATIUM M390', brand: 'MSI', price: 300, asin: null, search: 'MSI+MSI+SPATIUM+M390', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'budget' },
    { id: 'ssd-14', name: 'TEAMGROUP T-FORCE GA PRO', brand: 'TeamGroup', price: 337, asin: null, search: 'TeamGroup+TEAMGROUP+T-FORCE+GA+PRO', image_url: null, interface: 'NVMe Gen5', capacity: 1000, read: 12000, write: 10000, tier: 'mid-range' },
    { id: 'ssd-15', name: 'Samsung 870 Evo', brand: 'Samsung', price: 348, asin: 'B08W5TLTL2', search: 'Samsung+Samsung+870+Evo', image_url: null, interface: 'SATA', capacity: 1000, read: 560, write: 530, tier: 'mid-range' },
    { id: 'ssd-16', name: 'Mushkin Vortex-LX', brand: 'Mushkin', price: 363, asin: null, search: 'Mushkin+Mushkin+Vortex-LX', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-17', name: 'PNY CS2241', brand: 'PNY', price: 375, asin: null, search: 'PNY+PNY+CS2241', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-18', name: 'Western Digital WD_BLACK SN850P for PS5', brand: 'WD', price: 391, asin: null, search: 'WD+Western+Digital+WD_BLACK+SN850P+for+PS5', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-19', name: 'Seagate FireCuda 520N', brand: 'Seagate', price: 404, asin: null, search: 'Seagate+Seagate+FireCuda+520N', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-20', name: 'SK Hynix Platinum P41', brand: 'SK Hynix', price: 431, asin: null, search: 'SK+Hynix+SK+Hynix+Platinum+P41', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-21', name: 'MSI SPATIUM M480 PRO', brand: 'MSI', price: 450, asin: null, search: 'MSI+MSI+SPATIUM+M480+PRO', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-22', name: 'Patriot Viper VP4300', brand: 'Patriot', price: 465, asin: null, search: 'Patriot+Patriot+Viper+VP4300', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-23', name: 'Samsung 990 EVO Plus', brand: 'Samsung', price: 487, asin: 'B0DHLCRF91', search: 'Samsung+Samsung+990+EVO+Plus', image_url: null, interface: 'NVMe Gen5', capacity: 2000, read: 12000, write: 10000, tier: 'mid-range' },
    { id: 'ssd-24', name: 'Crucial P1', brand: 'Crucial', price: 506, asin: null, search: 'Crucial+Crucial+P1', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-25', name: 'Seagate BarraCuda 510', brand: 'Seagate', price: 525, asin: null, search: 'Seagate+Seagate+BarraCuda+510', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-26', name: 'Samsung 960 Evo', brand: 'Samsung', price: 548, asin: null, search: 'Samsung+Samsung+960+Evo', image_url: null, interface: 'NVMe Gen4', capacity: 500, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-27', name: 'Corsair MP600 ELITE', brand: 'Corsair', price: 562, asin: null, search: 'Corsair+Corsair+MP600+ELITE', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-28', name: 'Intel DC P4511', brand: 'Intel', price: 596, asin: null, search: 'Intel+Intel+DC+P4511', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-29', name: 'Crucial T500 W/Heatsink', brand: 'Crucial', price: 619, asin: null, search: 'Crucial+Crucial+T500+W/Heatsink', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-30', name: 'Western Digital WD_BLACK SN770M', brand: 'WD', price: 637, asin: null, search: 'WD+Western+Digital+WD_BLACK+SN770M', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7000, write: 5500, tier: 'mid-range' },
    { id: 'ssd-31', name: 'Seagate FireCuda 530R w/Heatsink', brand: 'Seagate', price: 675, asin: null, search: 'Seagate+Seagate+FireCuda+530R+w/Heatsink', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7000, write: 5500, tier: 'high-end' },
    { id: 'ssd-32', name: 'Intel DC S3500', brand: 'Intel', price: 694, asin: null, search: 'Intel+Intel+DC+S3500', image_url: null, interface: 'SATA', capacity: 480, read: 560, write: 530, tier: 'high-end' },
    { id: 'ssd-33', name: 'Western Digital Black', brand: 'WD', price: 750, asin: null, search: 'WD+Western+Digital+Black', image_url: null, interface: 'NVMe Gen4', capacity: 512, read: 7000, write: 5500, tier: 'high-end' },
    { id: 'ssd-34', name: 'Western Digital BLACK SN850 Call of Duty Edition', brand: 'WD', price: 814, asin: null, search: 'WD+Western+Digital+BLACK+SN850+Call+of+Duty+Edition', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'high-end' },
    { id: 'ssd-35', name: 'Intel DC P4510', brand: 'Intel', price: 866, asin: null, search: 'Intel+Intel+DC+P4510', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7000, write: 5500, tier: 'high-end' },
    { id: 'ssd-36', name: 'Crucial P2', brand: 'Crucial', price: 937, asin: null, search: 'Crucial+Crucial+P2', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7000, write: 5500, tier: 'high-end' },
    { id: 'ssd-37', name: 'Intel SSDSC2BB480G601', brand: 'Intel', price: 1080, asin: null, search: 'Intel+Intel+SSDSC2BB480G601', image_url: null, interface: 'SATA', capacity: 480, read: 560, write: 530, tier: 'high-end' },
    { id: 'ssd-38', name: 'Samsung SM843TN', brand: 'Samsung', price: 1125, asin: null, search: 'Samsung+Samsung+SM843TN', image_url: null, interface: 'SATA', capacity: 480, read: 560, write: 530, tier: 'high-end' },
    { id: 'ssd-39', name: 'Intel 530', brand: 'Intel', price: 1207, asin: null, search: 'Intel+Intel+530', image_url: null, interface: 'SATA', capacity: 480, read: 560, write: 530, tier: 'high-end' },
    { id: 'ssd-40', name: 'Crucial T705 W/Heatsink', brand: 'Crucial', price: 1387, asin: null, search: 'Crucial+Crucial+T705+W/Heatsink', image_url: null, interface: 'NVMe Gen5', capacity: 4000, read: 12000, write: 10000, tier: 'high-end' },
    { id: 'ssd-41', name: 'Crucial T700', brand: 'Crucial', price: 1425, asin: 'B0C3K7MTSY', search: 'Crucial+Crucial+T700', image_url: null, interface: 'NVMe Gen5', capacity: 4000, read: 12000, write: 10000, tier: 'high-end' },
    { id: 'ssd-42', name: 'TEAMGROUP T-Force GE PRO AirFlow', brand: 'TeamGroup', price: 1500, asin: null, search: 'TeamGroup+TEAMGROUP+T-Force+GE+PRO+AirFlow', image_url: null, interface: 'NVMe Gen5', capacity: 4000, read: 12000, write: 10000, tier: 'high-end' },
    { id: 'ssd-43', name: 'Crucial P5', brand: 'Crucial', price: 1624, asin: null, search: 'Crucial+Crucial+P5', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 5500, tier: 'high-end' },
    { id: 'ssd-44', name: 'Samsung MZ-75E4T0B', brand: 'Samsung', price: 1875, asin: null, search: 'Samsung+Samsung+MZ-75E4T0B', image_url: null, interface: 'SATA', capacity: 4000, read: 560, write: 530, tier: 'enthusiast' },
    { id: 'ssd-45', name: 'Corsair MP700 PRO SE with Air Cooler', brand: 'Corsair', price: 2100, asin: null, search: 'Corsair+Corsair+MP700+PRO+SE+with+Air+Cooler', image_url: null, interface: 'NVMe Gen5', capacity: 4000, read: 12000, write: 10000, tier: 'enthusiast' },
    { id: 'ssd-46', name: 'Intel D3-S4620', brand: 'Intel', price: 2546, asin: null, search: 'Intel+Intel+D3-S4620', image_url: null, interface: 'SATA', capacity: 3840, read: 560, write: 530, tier: 'enthusiast' },
    { id: 'ssd-47', name: 'Western Digital Black AN1500', brand: 'WD', price: 3329, asin: null, search: 'WD+Western+Digital+Black+AN1500', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7000, write: 5500, tier: 'enthusiast' },
    { id: 'ssd-48', name: 'Seagate Nytro Enterprise', brand: 'Seagate', price: 3750, asin: null, search: 'Seagate+Seagate+Nytro+Enterprise', image_url: null, interface: 'SATA', capacity: 1920, read: 560, write: 530, tier: 'enthusiast' },
    { id: 'ssd-49', name: 'Intel D3-S4610', brand: 'Intel', price: 5569, asin: null, search: 'Intel+Intel+D3-S4610', image_url: null, interface: 'SATA', capacity: 7680, read: 560, write: 530, tier: 'enthusiast' },
    { id: 'ssd-50', name: 'Seagate Pulsar.2', brand: 'Seagate', price: 17917, asin: null, search: 'Seagate+Seagate+Pulsar.2', image_url: null, interface: 'NVMe Gen4', capacity: 800, read: 7000, write: 5500, tier: 'enthusiast' },
  ],

  // ═══════ PSUs — 45 total ═══════
  psu: [
    { id: 'psu-1', name: 'Thermaltake Smart', brand: 'Thermaltake', price: 150, asin: null, search: 'Thermaltake+Thermaltake+Smart', image_url: null, watt: 500, rating: '80+ Plus', modular: 'Non', tier: 'budget' },
    { id: 'psu-2', name: 'EVGA 650 N1', brand: 'EVGA', price: 244, asin: null, search: 'EVGA+EVGA+650+N1', image_url: null, watt: 650, rating: null, modular: 'Non', tier: 'budget' },
    { id: 'psu-3', name: 'ASRock Challenger CL-750G', brand: 'ASRock', price: 262, asin: null, search: 'ASRock+ASRock+Challenger+CL-750G', image_url: null, watt: 750, rating: '80+ Gold', modular: 'Non', tier: 'budget' },
    { id: 'psu-4', name: 'ASRock Challenger CL-750B', brand: 'ASRock', price: 281, asin: null, search: 'ASRock+ASRock+Challenger+CL-750B', image_url: null, watt: 750, rating: '80+ Bronze', modular: 'Non', tier: 'budget' },
    { id: 'psu-5', name: 'EVGA 700 GD', brand: 'EVGA', price: 334, asin: null, search: 'EVGA+EVGA+700+GD', image_url: null, watt: 700, rating: '80+ Gold', modular: 'Non', tier: 'budget' },
    { id: 'psu-6', name: 'Thermaltake Toughpower GX3', brand: 'Thermaltake', price: 345, asin: null, search: 'Thermaltake+Thermaltake+Toughpower+GX3', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Non', tier: 'budget' },
    { id: 'psu-7', name: 'NZXT C650', brand: 'NZXT', price: 375, asin: null, search: 'NZXT+NZXT+C650', image_url: null, watt: 650, rating: '80+ Bronze', modular: 'Semi', tier: 'budget' },
    { id: 'psu-8', name: 'XFX P1-650X-CAG9', brand: 'XFX', price: 380, asin: null, search: 'XFX+XFX+P1-650X-CAG9', image_url: null, watt: 650, rating: '80+ Bronze', modular: 'Full', tier: 'budget' },
    { id: 'psu-9', name: 'Antec Earthwatts Green', brand: 'Antec', price: 405, asin: null, search: 'Antec+Antec+Earthwatts+Green', image_url: null, watt: 500, rating: '80+ Plus', modular: 'Non', tier: 'budget' },
    { id: 'psu-10', name: 'MSI MAG A750GL PCIE5 II', brand: 'MSI', price: 431, asin: null, search: 'MSI+MSI+MAG+A750GL+PCIE5+II', image_url: null, watt: 750, rating: '80+ Gold', modular: 'Full', tier: 'budget' },
    { id: 'psu-11', name: 'Corsair RM750x (2024)', brand: 'Corsair', price: 450, asin: 'B0C61XRJBG', search: 'Corsair+Corsair+RM750x+(2024)', image_url: null, watt: 750, rating: null, modular: 'Full', tier: 'budget' },
    { id: 'psu-12', name: 'be quiet! Pure Power 12 M', brand: 'be quiet!', price: 468, asin: null, search: 'be+quiet!+be+quiet!+Pure+Power+12+M', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'budget' },
    { id: 'psu-13', name: 'Asus TUF Gaming 750G', brand: 'ASUS', price: 474, asin: null, search: 'ASUS+Asus+TUF+Gaming+750G', image_url: null, watt: 750, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-14', name: 'MSI MAG A650GL', brand: 'MSI', price: 487, asin: null, search: 'MSI+MSI+MAG+A650GL', image_url: null, watt: 650, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-15', name: 'Asus TUF Gaming 850G', brand: 'ASUS', price: 502, asin: null, search: 'ASUS+Asus+TUF+Gaming+850G', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-16', name: 'FSP Group Dagger Pro', brand: 'FSP', price: 515, asin: null, search: 'FSP+FSP+Group+Dagger+Pro', image_url: null, watt: 650, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-17', name: 'FSP Group Hydro PTM PRO', brand: 'FSP', price: 525, asin: null, search: 'FSP+FSP+Group+Hydro+PTM+PRO', image_url: null, watt: 850, rating: '80+ Platinum', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-18', name: 'Gigabyte UD-GM PG5', brand: 'Gigabyte', price: 550, asin: null, search: 'Gigabyte+Gigabyte+UD-GM+PG5', image_url: null, watt: 750, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-19', name: 'ASRock Phantom Gaming PG-1000G', brand: 'ASRock', price: 562, asin: null, search: 'ASRock+ASRock+Phantom+Gaming+PG-1000G', image_url: null, watt: 1000, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-20', name: 'Corsair RM750x SHIFT', brand: 'Corsair', price: 581, asin: 'B0C61XRJBG', search: 'Corsair+Corsair+RM750x+SHIFT', image_url: null, watt: 750, rating: '80+ Gold', modular: 'Full / Side', tier: 'mid-range' },
    { id: 'psu-21', name: 'Silverstone TX500-G', brand: 'SilverStone', price: 599, asin: null, search: 'SilverStone+Silverstone+TX500-G', image_url: null, watt: 500, rating: '80+ Gold', modular: 'Non', tier: 'mid-range' },
    { id: 'psu-22', name: 'NZXT C1000 (2024)', brand: 'NZXT', price: 619, asin: null, search: 'NZXT+NZXT+C1000+(2024)', image_url: null, watt: 1000, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-23', name: 'Antec GSK ATX3.1', brand: 'Antec', price: 649, asin: null, search: 'Antec+Antec+GSK+ATX3.1', image_url: null, watt: 750, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-24', name: 'Cooler Master MWE Bronze V2', brand: 'Cooler Master', price: 673, asin: null, search: 'Cooler+Master+Cooler+Master+MWE+Bronze+V2', image_url: null, watt: 750, rating: '80+ Bronze', modular: 'Non', tier: 'mid-range' },
    { id: 'psu-25', name: 'FSP Group Hydro PTM X PRO,Gen5', brand: 'FSP', price: 675, asin: null, search: 'FSP+FSP+Group+Hydro+PTM+X+PRO,Gen5', image_url: null, watt: 1000, rating: '80+ Platinum', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-26', name: 'Silverstone SX700-PT', brand: 'SilverStone', price: 701, asin: null, search: 'SilverStone+Silverstone+SX700-PT', image_url: null, watt: 700, rating: '80+ Platinum', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-27', name: 'Corsair SF850 (2024)', brand: 'Corsair', price: 731, asin: null, search: 'Corsair+Corsair+SF850+(2024)', image_url: null, watt: 850, rating: '80+ Platinum', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-28', name: 'NZXT C1200 (2024)', brand: 'NZXT', price: 750, asin: null, search: 'NZXT+NZXT+C1200+(2024)', image_url: null, watt: 1200, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-29', name: 'Corsair RM850x', brand: 'Corsair', price: 757, asin: 'B07JWT8YV3', search: 'Corsair+Corsair+RM850x', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-30', name: 'MSI MAG A1250GL PCIE5', brand: 'MSI', price: 787, asin: null, search: 'MSI+MSI+MAG+A1250GL+PCIE5', image_url: null, watt: 1250, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-31', name: 'Corsair HX1200i', brand: 'Corsair', price: 825, asin: 'B0F1NF61BQ', search: 'Corsair+Corsair+HX1200i', image_url: null, watt: 1200, rating: '80+ Platinum', modular: 'Full', tier: 'high-end' },
    { id: 'psu-32', name: 'Corsair RM1200x SHIFT', brand: 'Corsair', price: 862, asin: 'B0BP88MYM4', search: 'Corsair+Corsair+RM1200x+SHIFT', image_url: null, watt: 1200, rating: '80+ Gold', modular: 'Full / Side', tier: 'high-end' },
    { id: 'psu-33', name: 'MSI MPG A850GF', brand: 'MSI', price: 891, asin: null, search: 'MSI+MSI+MPG+A850GF', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-34', name: 'Corsair RM1000x', brand: 'Corsair', price: 934, asin: 'B015YEI7LK', search: 'Corsair+Corsair+RM1000x', image_url: null, watt: 1000, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-35', name: 'SeaSonic Prime Fanless PX-500', brand: 'Seasonic', price: 957, asin: null, search: 'Seasonic+SeaSonic+Prime+Fanless+PX-500', image_url: null, watt: 500, rating: '80+ Platinum', modular: 'Full', tier: 'high-end' },
    { id: 'psu-36', name: 'Corsair HX1000i (2022)', brand: 'Corsair', price: 975, asin: null, search: 'Corsair+Corsair+HX1000i+(2022)', image_url: null, watt: 1000, rating: '80+ Platinum', modular: 'Full', tier: 'high-end' },
    { id: 'psu-37', name: 'Asus ROG STRIX 1000G', brand: 'ASUS', price: 1091, asin: null, search: 'ASUS+Asus+ROG+STRIX+1000G', image_url: null, watt: 1000, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-38', name: 'Asus ROG LOKI', brand: 'ASUS', price: 1162, asin: null, search: 'ASUS+Asus+ROG+LOKI', image_url: null, watt: 1200, rating: '80+ Titanium', modular: 'Full', tier: 'high-end' },
    { id: 'psu-39', name: 'SeaSonic VERTEX PX-750', brand: 'Seasonic', price: 1217, asin: null, search: 'Seasonic+SeaSonic+VERTEX+PX-750', image_url: null, watt: 750, rating: '80+ Platinum', modular: 'Full', tier: 'high-end' },
    { id: 'psu-40', name: 'Thermaltake Toughpower PF1 - TT Premium Edition', brand: 'Thermaltake', price: 1358, asin: null, search: 'Thermaltake+Thermaltake+Toughpower+PF1+-+TT+Premium+Edition', image_url: null, watt: 1050, rating: '80+ Platinum', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-41', name: 'Cooler Master V1300 Platinum', brand: 'Cooler Master', price: 1470, asin: null, search: 'Cooler+Master+Cooler+Master+V1300+Platinum', image_url: null, watt: 1300, rating: '80+ Platinum', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-42', name: 'Corsair HX1000i', brand: 'Corsair', price: 1612, asin: null, search: 'Corsair+Corsair+HX1000i', image_url: null, watt: 1000, rating: '80+ Platinum', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-43', name: 'EVGA SuperNOVA 1000 P2', brand: 'EVGA', price: 1871, asin: null, search: 'EVGA+EVGA+SuperNOVA+1000+P2', image_url: null, watt: 1000, rating: '80+ Platinum', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-44', name: 'Corsair AX1600i', brand: 'Corsair', price: 2287, asin: null, search: 'Corsair+Corsair+AX1600i', image_url: null, watt: 1600, rating: '80+ Titanium', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-45', name: 'Asus ROG THOR 1600T Gaming', brand: 'ASUS', price: 3701, asin: null, search: 'ASUS+Asus+ROG+THOR+1600T+Gaming', image_url: null, watt: 1600, rating: '80+ Titanium', modular: 'Full', tier: 'enthusiast' },
  ],

  // ═══════ Coolers — 40 total ═══════
  cool: [
    { id: 'cool-1', name: 'ARCTIC Alpine AM4', brand: 'Arctic', price: 38, asin: null, search: 'Arctic+ARCTIC+Alpine+AM4', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-2', name: 'Thermalright Assassin X Refined SE', brand: 'Thermalright', price: 67, asin: null, search: 'Thermalright+Thermalright+Assassin+X+Refined+SE', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-3', name: 'ID-COOLING BLITZ X4', brand: 'ID-COOLING', price: 75, asin: null, search: 'ID-COOLING+ID-COOLING+BLITZ+X4', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-4', name: 'Thermalright Burst Assassin 120 SE ARGB', brand: 'Thermalright', price: 88, asin: null, search: 'Thermalright+Thermalright+Burst+Assassin+120+SE+ARGB', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-5', name: 'Cooler Master Hyper 212 Black Edition', brand: 'Cooler Master', price: 97, asin: 'B07H25DYM3', search: 'Cooler+Master+Cooler+Master+Hyper+212+Black+Edition', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-6', name: 'Thermalright Silver Soul 110', brand: 'Thermalright', price: 112, asin: null, search: 'Thermalright+Thermalright+Silver+Soul+110', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-7', name: 'ARCTIC Freezer i35 RGB', brand: 'Arctic', price: 125, asin: null, search: 'Arctic+ARCTIC+Freezer+i35+RGB', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-8', name: 'Antec A400i', brand: 'Antec', price: 134, asin: null, search: 'Antec+Antec+A400i', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-9', name: 'Thermalright Phantom Spirit 120 SE ARGB', brand: 'Thermalright', price: 142, asin: null, search: 'Thermalright+Thermalright+Phantom+Spirit+120+SE+ARGB', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-10', name: 'ID-COOLING FROZN A410 ARGB WHITE', brand: 'ID-COOLING', price: 150, asin: null, search: 'ID-COOLING+ID-COOLING+FROZN+A410+ARGB+WHITE', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-11', name: 'Silverstone AR08', brand: 'SilverStone', price: 171, asin: null, search: 'SilverStone+Silverstone+AR08', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'mid-range' },
    { id: 'cool-12', name: 'Thermalright Frost Commander 140', brand: 'Thermalright', price: 183, asin: null, search: 'Thermalright+Thermalright+Frost+Commander+140', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'mid-range' },
    { id: 'cool-13', name: 'Silverstone AR06', brand: 'SilverStone', price: 193, asin: null, search: 'SilverStone+Silverstone+AR06', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'mid-range' },
    { id: 'cool-14', name: 'Thermalright Frozen Notte ARGB', brand: 'Thermalright', price: 208, asin: null, search: 'Thermalright+Thermalright+Frozen+Notte+ARGB', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'mid-range' },
    { id: 'cool-15', name: 'ID-COOLING FX360 PRO', brand: 'ID-COOLING', price: 225, asin: null, search: 'ID-COOLING+ID-COOLING+FX360+PRO', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'mid-range' },
    { id: 'cool-16', name: 'Noctua NH-U9DXi4', brand: 'Noctua', price: 244, asin: null, search: 'Noctua+Noctua+NH-U9DXi4', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'mid-range' },
    { id: 'cool-17', name: 'Noctua NH-L9a-AM4 chromax.black', brand: 'Noctua', price: 262, asin: null, search: 'Noctua+Noctua+NH-L9a-AM4+chromax.black', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'mid-range' },
    { id: 'cool-18', name: 'Montech HyperFlow Silent 240', brand: 'Montech', price: 281, asin: null, search: 'Montech+Montech+HyperFlow+Silent+240', image_url: null, type: 'AIO 240mm', tdpMax: 250, tier: 'mid-range' },
    { id: 'cool-19', name: 'Thermaltake TH240 V2 ARGB Sync', brand: 'Thermaltake', price: 300, asin: null, search: 'Thermaltake+Thermaltake+TH240+V2+ARGB+Sync', image_url: null, type: 'AIO 240mm', tdpMax: 250, tier: 'mid-range' },
    { id: 'cool-20', name: 'Silverstone Hydrogon D120 ARGB V2', brand: 'SilverStone', price: 331, asin: null, search: 'SilverStone+Silverstone+Hydrogon+D120+ARGB+V2', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'mid-range' },
    { id: 'cool-21', name: 'MSI MAG CORELIQUID I240', brand: 'MSI', price: 356, asin: null, search: 'MSI+MSI+MAG+CORELIQUID+I240', image_url: null, type: 'AIO 240mm', tdpMax: 250, tier: 'mid-range' },
    { id: 'cool-22', name: 'Noctua NH-D12L', brand: 'Noctua', price: 375, asin: null, search: 'Noctua+Noctua+NH-D12L', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'mid-range' },
    { id: 'cool-23', name: 'Thermaltake Floe Riing RGB 240 TT Premium Edition', brand: 'Thermaltake', price: 394, asin: null, search: 'Thermaltake+Thermaltake+Floe+Riing+RGB+240+TT+Premium+Edition', image_url: null, type: 'AIO 240mm', tdpMax: 250, tier: 'mid-range' },
    { id: 'cool-24', name: 'Noctua NH-U14S TR4-SP3', brand: 'Noctua', price: 412, asin: null, search: 'Noctua+Noctua+NH-U14S+TR4-SP3', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'mid-range' },
    { id: 'cool-25', name: 'Enermax LIQMAXFLO 420', brand: 'Enermax', price: 430, asin: null, search: 'Enermax+Enermax+LIQMAXFLO+420', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-26', name: 'ID-COOLING SL PRO SE', brand: 'ID-COOLING', price: 450, asin: null, search: 'ID-COOLING+ID-COOLING+SL+PRO+SE', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-27', name: 'Noctua NH-D15', brand: 'Noctua', price: 487, asin: 'B07Y87YHRH', search: 'Noctua+Noctua+NH-D15', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'high-end' },
    { id: 'cool-28', name: 'MSI MAG CORELIQUID E360', brand: 'MSI', price: 499, asin: null, search: 'MSI+MSI+MAG+CORELIQUID+E360', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-29', name: 'MSI MAG CORELIQUID 360R V2', brand: 'MSI', price: 525, asin: null, search: 'MSI+MSI+MAG+CORELIQUID+360R+V2', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-30', name: 'EK EK-Nucleus AIO CR360 Lux D-RGB', brand: 'EK', price: 563, asin: null, search: 'EK+EK+EK-Nucleus+AIO+CR360+Lux+D-RGB', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-31', name: 'Enermax LIQMAXFLO 360', brand: 'Enermax', price: 604, asin: null, search: 'Enermax+Enermax+LIQMAXFLO+360', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-32', name: 'Thermalright Silver Arrow 130', brand: 'Thermalright', price: 673, asin: null, search: 'Thermalright+Thermalright+Silver+Arrow+130', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'high-end' },
    { id: 'cool-33', name: 'Asus ROG RYUO III 360 ARGB', brand: 'ASUS', price: 711, asin: null, search: 'ASUS+Asus+ROG+RYUO+III+360+ARGB', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-34', name: 'Lian Li HydroShift LCD 360R RGB', brand: 'Lian Li', price: 750, asin: null, search: 'Lian+Li+Lian+Li+HydroShift+LCD+360R+RGB', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-35', name: 'NZXT Kraken Plus RGB', brand: 'NZXT', price: 825, asin: null, search: 'NZXT+NZXT+Kraken+Plus+RGB', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'enthusiast' },
    { id: 'cool-36', name: 'Corsair iCUE LINK H150i RGB', brand: 'Corsair', price: 900, asin: 'B0C6PWQ6L3', search: 'Corsair+Corsair+iCUE+LINK+H150i+RGB', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'enthusiast' },
    { id: 'cool-37', name: 'Silverstone IceGem 360', brand: 'SilverStone', price: 997, asin: null, search: 'SilverStone+Silverstone+IceGem+360', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'enthusiast' },
    { id: 'cool-38', name: 'NZXT Kraken Elite 360 RGB', brand: 'NZXT', price: 1125, asin: null, search: 'NZXT+NZXT+Kraken+Elite+360+RGB', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'enthusiast' },
    { id: 'cool-39', name: 'NZXT Kraken Elite 240', brand: 'NZXT', price: 1329, asin: null, search: 'NZXT+NZXT+Kraken+Elite+240', image_url: null, type: 'AIO 240mm', tdpMax: 250, tier: 'enthusiast' },
    { id: 'cool-40', name: 'Asus ROG STRIX LC 360 RGB GUNDAM', brand: 'ASUS', price: 6079, asin: 'B07S7YK51M', search: 'ASUS+Asus+ROG+STRIX+LC+360+RGB+GUNDAM', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'enthusiast' },
  ],

  // ═══════ Cases — 40 total ═══════
  case: [
    { id: 'case-1', name: 'Cooler Master MasterBox Q300L', brand: 'Cooler Master', price: 172, asin: null, search: 'Cooler+Master+Cooler+Master+MasterBox+Q300L', image_url: null, formFactor: 'Mini Tower', maxGPU: 340, tier: 'budget' },
    { id: 'case-2', name: 'Cougar MX330-X', brand: 'Cougar', price: 210, asin: null, search: 'Cougar+Cougar+MX330-X', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'budget' },
    { id: 'case-3', name: 'Cooler Master Elite 301 Lite', brand: 'Cooler Master', price: 244, asin: null, search: 'Cooler+Master+Cooler+Master+Elite+301+Lite', image_url: null, formFactor: 'Mini Tower', maxGPU: 340, tier: 'budget' },
    { id: 'case-4', name: 'Cooler Master MasterBox MB400L with ODD', brand: 'Cooler Master', price: 266, asin: null, search: 'Cooler+Master+Cooler+Master+MasterBox+MB400L+with+ODD', image_url: null, formFactor: 'Mini Tower', maxGPU: 340, tier: 'budget' },
    { id: 'case-5', name: 'Silverstone ML05B', brand: 'SilverStone', price: 281, asin: null, search: 'SilverStone+Silverstone+ML05B', image_url: null, formFactor: 'Mini ITX', maxGPU: 310, tier: 'budget' },
    { id: 'case-6', name: 'be quiet! Pure Base 500', brand: 'be quiet!', price: 300, asin: 'B087D7KNL9', search: 'be+quiet!+be+quiet!+Pure+Base+500', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'budget' },
    { id: 'case-7', name: 'Lian Li Lancool 207', brand: 'Lian Li', price: 307, asin: null, search: 'Lian+Li+Lian+Li+Lancool+207', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'budget' },
    { id: 'case-8', name: 'Montech Heritage', brand: 'Montech', price: 337, asin: null, search: 'Montech+Montech+Heritage', image_url: null, formFactor: 'Mini Tower', maxGPU: 340, tier: 'budget' },
    { id: 'case-9', name: 'Silverstone ML06B', brand: 'SilverStone', price: 347, asin: null, search: 'SilverStone+Silverstone+ML06B', image_url: null, formFactor: 'Mini ITX', maxGPU: 310, tier: 'budget' },
    { id: 'case-10', name: 'Montech HS02', brand: 'Montech', price: 360, asin: null, search: 'Montech+Montech+HS02', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'budget' },
    { id: 'case-11', name: 'Fractal Design Pop Air RGB', brand: 'Fractal', price: 375, asin: null, search: 'Fractal+Fractal+Design+Pop+Air+RGB', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-12', name: 'Silverstone FARA 511Z', brand: 'SilverStone', price: 390, asin: null, search: 'SilverStone+Silverstone+FARA+511Z', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-13', name: 'be quiet! Pure Base 501 Airflow', brand: 'be quiet!', price: 401, asin: null, search: 'be+quiet!+be+quiet!+Pure+Base+501+Airflow', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-14', name: 'Fractal Design Meshify C', brand: 'Fractal', price: 412, asin: null, search: 'Fractal+Fractal+Design+Meshify+C', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-15', name: 'Antec P10C', brand: 'Antec', price: 426, asin: null, search: 'Antec+Antec+P10C', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-16', name: 'Silverstone ML07B', brand: 'SilverStone', price: 445, asin: null, search: 'SilverStone+Silverstone+ML07B', image_url: null, formFactor: 'Mini ITX', maxGPU: 310, tier: 'mid-range' },
    { id: 'case-17', name: 'Thermaltake Divider 300 TG Air Snow', brand: 'Thermaltake', price: 450, asin: null, search: 'Thermaltake+Thermaltake+Divider+300+TG+Air+Snow', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-18', name: 'Fractal Design Define 7 Compact', brand: 'Fractal', price: 469, asin: null, search: 'Fractal+Fractal+Design+Define+7+Compact', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-19', name: 'MSI MAG PANO M100R PZ', brand: 'MSI', price: 487, asin: null, search: 'MSI+MSI+MAG+PANO+M100R+PZ', image_url: null, formFactor: 'Mini Tower', maxGPU: 340, tier: 'mid-range' },
    { id: 'case-20', name: 'Thermaltake CTE T500 Air', brand: 'Thermaltake', price: 506, asin: null, search: 'Thermaltake+Thermaltake+CTE+T500+Air', image_url: null, formFactor: 'Full Tower', maxGPU: 450, tier: 'mid-range' },
    { id: 'case-21', name: 'Thermaltake Core P3 TG Pro', brand: 'Thermaltake', price: 528, asin: null, search: 'Thermaltake+Thermaltake+Core+P3+TG+Pro', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-22', name: 'Fractal Design Meshify 2 Compact TG Light Tint', brand: 'Fractal', price: 555, asin: 'B093HJNWWX', search: 'Fractal+Fractal+Design+Meshify+2+Compact+TG+Light+Tint', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-23', name: 'Thermaltake Divider 370 TG ARGB', brand: 'Thermaltake', price: 566, asin: null, search: 'Thermaltake+Thermaltake+Divider+370+TG+ARGB', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-24', name: 'Silverstone SG04B-F', brand: 'SilverStone', price: 583, asin: null, search: 'SilverStone+Silverstone+SG04B-F', image_url: null, formFactor: 'Mini Tower', maxGPU: 340, tier: 'mid-range' },
    { id: 'case-25', name: 'Corsair 2500X Obsidian', brand: 'Corsair', price: 600, asin: null, search: 'Corsair+Corsair+2500X+Obsidian', image_url: null, formFactor: 'Mini Tower', maxGPU: 340, tier: 'high-end' },
    { id: 'case-26', name: 'Fractal Design Meshify 2', brand: 'Fractal', price: 619, asin: 'B093HJNWWX', search: 'Fractal+Fractal+Design+Meshify+2', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'high-end' },
    { id: 'case-27', name: 'Silverstone GD10B', brand: 'SilverStone', price: 644, asin: null, search: 'SilverStone+Silverstone+GD10B', image_url: null, formFactor: 'Mini ITX', maxGPU: 310, tier: 'high-end' },
    { id: 'case-28', name: 'Lian Li LANCOOL III RGB', brand: 'Lian Li', price: 675, asin: 'B0B9WF5FW1', search: 'Lian+Li+Lian+Li+LANCOOL+III+RGB', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'high-end' },
    { id: 'case-29', name: 'Fractal Design Meshify 3 XL', brand: 'Fractal', price: 694, asin: null, search: 'Fractal+Fractal+Design+Meshify+3+XL', image_url: null, formFactor: 'Full Tower', maxGPU: 450, tier: 'high-end' },
    { id: 'case-30', name: 'Asus TUF Gaming GT502 Horizon', brand: 'ASUS', price: 731, asin: null, search: 'ASUS+Asus+TUF+Gaming+GT502+Horizon', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'high-end' },
    { id: 'case-31', name: 'be quiet! Light Base 900 DX', brand: 'be quiet!', price: 768, asin: null, search: 'be+quiet!+be+quiet!+Light+Base+900+DX', image_url: null, formFactor: 'Full Tower', maxGPU: 450, tier: 'high-end' },
    { id: 'case-32', name: 'Thermaltake View 51 Snow ARGB Edition', brand: 'Thermaltake', price: 805, asin: null, search: 'Thermaltake+Thermaltake+View+51+Snow+ARGB+Edition', image_url: null, formFactor: 'Full Tower', maxGPU: 450, tier: 'high-end' },
    { id: 'case-33', name: 'Lian Li O11 Dynamic Mini', brand: 'Lian Li', price: 859, asin: null, search: 'Lian+Li+Lian+Li+O11+Dynamic+Mini', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'high-end' },
    { id: 'case-34', name: 'Corsair Crystal 280X RGB', brand: 'Corsair', price: 900, asin: null, search: 'Corsair+Corsair+Crystal+280X+RGB', image_url: null, formFactor: 'Mini Tower', maxGPU: 340, tier: 'high-end' },
    { id: 'case-35', name: 'Fractal Design Define 7 XL Dark', brand: 'Fractal', price: 956, asin: null, search: 'Fractal+Fractal+Design+Define+7+XL+Dark', image_url: null, formFactor: 'Full Tower', maxGPU: 450, tier: 'enthusiast' },
    { id: 'case-36', name: 'Asus ProArt PA602 Wood Edition', brand: 'ASUS', price: 1050, asin: null, search: 'ASUS+Asus+ProArt+PA602+Wood+Edition', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'enthusiast' },
    { id: 'case-37', name: 'Silverstone ALTA F1', brand: 'SilverStone', price: 1123, asin: null, search: 'SilverStone+Silverstone+ALTA+F1', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'enthusiast' },
    { id: 'case-38', name: 'Supermicro SuperChassis 721TQ-350B2', brand: 'Supermicro', price: 1357, asin: null, search: 'Supermicro+Supermicro+SuperChassis+721TQ-350B2', image_url: null, formFactor: 'Mini ITX', maxGPU: 310, tier: 'enthusiast' },
    { id: 'case-39', name: 'Lian Li V3000 PLUS White GGF Edition', brand: 'Lian Li', price: 1856, asin: null, search: 'Lian+Li+Lian+Li+V3000+PLUS+White+GGF+Edition', image_url: null, formFactor: 'Full Tower', maxGPU: 450, tier: 'enthusiast' },
    { id: 'case-40', name: 'Lian Li ODYSSEY X', brand: 'Lian Li', price: 5505, asin: null, search: 'Lian+Li+Lian+Li+ODYSSEY+X', image_url: null, formFactor: 'Full Tower', maxGPU: 450, tier: 'enthusiast' },
  ],
};

// ═══════ PRESETS ═══════

export const PRESETS = [
  {
    key: 'budget',
    name: 'اقتصادية',
    icon: '🎮',
    color: '#10b981',
    budget: '3,500 - 5,000',
    desc: 'ألعاب 1080p + استخدام يومي',
    build: {
      cpu: 'cpu-1',
      gpu: 'gpu-1',
      motherboard: 'mb-1',
      ram: 'ram-1',
      ssd: 'ssd-1',
      psu: 'psu-1',
      cooler: 'cool-1',
      case: 'case-1'
    }
  },
  {
    key: 'midRange',
    name: 'متوسطة',
    icon: '⚡',
    color: '#3b82f6',
    budget: '7,000 - 9,000',
    desc: 'ألعاب 1440p + ستريم',
    build: {
      cpu: 'cpu-16',
      gpu: 'gpu-19',
      motherboard: 'mb-18',
      ram: 'ram-14',
      ssd: 'ssd-14',
      psu: 'psu-13',
      cooler: 'cool-11',
      case: 'case-11'
    }
  },
  {
    key: 'highEnd',
    name: 'عالية',
    icon: '🔥',
    color: '#8b5cf6',
    budget: '10,000 - 16,000',
    desc: 'ألعاب 4K + مونتاج + ستريم',
    build: {
      cpu: 'cpu-33',
      gpu: 'gpu-43',
      motherboard: 'mb-42',
      ram: 'ram-31',
      ssd: 'ssd-31',
      psu: 'psu-28',
      cooler: 'cool-25',
      case: 'case-25'
    }
  },
  {
    key: 'enthusiast',
    name: 'خرافية',
    icon: '💎',
    color: '#ff2d55',
    budget: '20,000+',
    desc: 'أقصى أداء بدون حدود',
    build: {
      cpu: 'cpu-44',
      gpu: 'gpu-61',
      motherboard: 'mb-52',
      ram: 'ram-44',
      ssd: 'ssd-44',
      psu: 'psu-40',
      cooler: 'cool-35',
      case: 'case-35'
    }
  }
];

// ═══════ SMART COMPATIBILITY ═══════

export function getCompatible(category, currentBuild) {
  const items = COMPONENTS[category] || [];
  if (!currentBuild) return items.map(c => ({ ...c, compatible: true, reason: null }));

  return items.map(component => {
    const issues = [];

    if (category === 'motherboard' && currentBuild.cpu) {
      if (component.socket !== currentBuild.cpu.socket)
        issues.push(`سوكت ${component.socket} مو متوافق مع المعالج (${currentBuild.cpu.socket})`);
    }
    if (category === 'cpu' && currentBuild.motherboard) {
      if (component.socket !== currentBuild.motherboard.socket)
        issues.push(`سوكت ${component.socket} مو متوافق مع اللوحة (${currentBuild.motherboard.socket})`);
    }
    if (category === 'ram' && currentBuild.motherboard) {
      if (component.type !== currentBuild.motherboard.ramType)
        issues.push(`${component.type} مو متوافق مع اللوحة (${currentBuild.motherboard.ramType})`);
    }
    if (category === 'psu') {
      const needed = estimateWattage(currentBuild);
      if (component.watt < needed)
        issues.push(`${component.watt}W أقل من المطلوب (~${needed}W)`);
    }
    if (category === 'cooler' && currentBuild.cpu) {
      if (component.tdpMax < currentBuild.cpu.tdp)
        issues.push(`التبريد (${component.tdpMax}W max) ضعيف للمعالج (${currentBuild.cpu.tdp}W)`);
    }

    return { ...component, compatible: issues.length === 0, reason: issues.length > 0 ? issues[0] : null };
  });
}

// ═══════ WATTAGE CALCULATOR ═══════

export function estimateWattage(build) {
  let total = 50;
  if (build.cpu) total += build.cpu.tdp || 0;
  if (build.gpu) total += build.gpu.tdp || 0;
  if (build.ram) total += 10;
  if (build.ssd) total += 10;
  return Math.ceil(total * 1.2);
}

export function getRecommendedPSU(build) {
  const needed = estimateWattage(build);
  if (needed <= 450) return 550;
  if (needed <= 550) return 650;
  if (needed <= 650) return 750;
  if (needed <= 750) return 850;
  if (needed <= 900) return 1000;
  if (needed <= 1100) return 1200;
  return 1500;
}

// ═══════ AMAZON PRODUCT IMAGES ═══════

export function getAmazonImageUrl(component) {
  if (!component) return null;
  if (component.image_url) return component.image_url;
  if (component.asin) {
    return `https://m.media-amazon.com/images/P/${component.asin}._AC_SL300_.jpg`;
  }
  return null;
}

// ═══════ AMAZON LINKS ═══════

export function getAmazonLink(component) {
  if (!component) return `https://www.amazon.sa/?tag=${TAG}`;
  if (component.asin) return `https://www.amazon.sa/dp/${component.asin}?tag=${TAG}`;
  const search = component.search || encodeURIComponent(component.name);
  return `https://www.amazon.sa/s?k=${search}&tag=${TAG}`;
}

export function getAmazonCartLink(components) {
  const names = Object.values(components).filter(Boolean).map(c => c.name).join(' ');
  return `https://www.amazon.sa/s?k=${encodeURIComponent(names)}&tag=${TAG}`;
}

// Get component by ID
export function getById(id) {
  for (const items of Object.values(COMPONENTS)) {
    const found = items.find(c => c.id === id);
    if (found) return found;
  }
  return null;
}

// Get all components flat
export function getAllComponents() {
  const all = [];
  for (const [type, items] of Object.entries(COMPONENTS))
    items.forEach(item => all.push({ ...item, type }));
  return all;
}

// Load preset build
export function loadPreset(presetKey) {
  const preset = PRESETS.find(p => p.key === presetKey);
  if (!preset) return {};
  const build = {};
  for (const [cat, id] of Object.entries(preset.build))
    build[cat] = getById(id);
  return build;
}

// Calculate total price
export function calcTotal(build) {
  return Object.values(build).reduce((sum, c) => sum + (c?.price || 0), 0);
}

// Full compatibility check
export function fullCompatCheck(build) {
  const errors = [], warnings = [], ok = [];
  let hasCustom = false;

  // Detect custom components and warn
  const entries = Object.entries(build).filter(([, v]) => v);
  for (const [cat, comp] of entries) {
    if (comp.isCustom) {
      hasCustom = true;
      if (cat === 'cpu' && !comp.socket) warnings.push('معالج مخصص — لا يمكن التحقق من توافق السوكت');
      if (cat === 'gpu' && (comp.vram == null || comp.tdp == null)) warnings.push('كرت شاشة مخصص — تحقق من التوافق يدوياً');
      if (cat === 'motherboard' && !comp.socket) warnings.push('لوحة أم مخصصة — لا يمكن التحقق من توافق السوكت');
      if (cat === 'psu' && !comp.watt) warnings.push('باور مخصص — تحقق من الواط يدوياً');
      if (cat === 'ram' && !comp.type) warnings.push('رام مخصصة — تحقق من توافق DDR يدوياً');
      if (cat === 'cooler' && !comp.tdpMax) warnings.push('تبريد مخصص — تحقق من كفاية التبريد يدوياً');
    }
  }

  if (build.cpu && build.motherboard) {
    if (build.cpu.isCustom || build.motherboard.isCustom) {
      if (build.cpu.socket && build.motherboard.socket) {
        if (build.cpu.socket !== build.motherboard.socket)
          errors.push(`سوكت المعالج (${build.cpu.socket}) ≠ اللوحة (${build.motherboard.socket})`);
        else ok.push('السوكت متوافق');
      }
    } else {
      if (build.cpu.socket !== build.motherboard.socket)
        errors.push(`سوكت المعالج (${build.cpu.socket}) ≠ اللوحة (${build.motherboard.socket})`);
      else ok.push('السوكت متوافق');
    }
  }

  if (build.ram && build.motherboard) {
    if (!build.ram.isCustom && !build.motherboard.isCustom) {
      if (build.ram.type !== build.motherboard.ramType)
        errors.push(`الرام ${build.ram.type} ≠ اللوحة ${build.motherboard.ramType}`);
      else ok.push('الرام متوافقة');
    }
  }

  const needed = estimateWattage(build);
  if (build.psu) {
    if (!build.psu.isCustom) {
      if (build.psu.watt < needed)
        errors.push(`الباور ${build.psu.watt}W < المطلوب ~${needed}W`);
      else if (build.psu.watt < needed * 1.1)
        warnings.push(`الباور يكفي بالكاد — يفضل ${getRecommendedPSU(build)}W`);
      else ok.push('الباور كافي');
    }
  }

  if (build.cpu && build.cooler) {
    if (!build.cpu.isCustom && !build.cooler.isCustom) {
      if (build.cooler.tdpMax < build.cpu.tdp)
        warnings.push(`التبريد (${build.cooler.tdpMax}W) ضعيف للمعالج (${build.cpu.tdp}W)`);
      else ok.push('التبريد كافي');
    }
  }

  return { errors, warnings, ok, hasCustom };
}
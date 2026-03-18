// GamerBuild Component Database — Generated from BuildCores OpenDB
// Affiliate Tag: meshal039-21
// All prices in SAR (estimated)

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
  // ═══════ CPUs — 20 total ═══════
  cpu: [
    { id: 'cpu-1', name: 'AMD Ryzen 9 9950X3D', brand: 'AMD', price: 3339, asin: 'B0DVZSG8D5', image_url: null, score: 100, socket: 'AM5', cores: 16, threads: 32, baseClock: 4.3, boostClock: 5.7, tdp: 170, tier: 'enthusiast' },
    { id: 'cpu-2', name: 'AMD Ryzen 9 9900X3D', brand: 'AMD', price: 2399, asin: 'B0DWGWN8GY', image_url: null, score: 99, socket: 'AM5', cores: 12, threads: 24, baseClock: 4.4, boostClock: 5.5, tdp: 120, tier: 'enthusiast' },
    { id: 'cpu-3', name: 'AMD Ryzen 7 9800X3D', brand: 'AMD', price: 1794, asin: 'B0DKFMSMYK', image_url: null, score: 98, socket: 'AM5', cores: 8, threads: 16, baseClock: 4.7, boostClock: 5.2, tdp: 120, tier: 'high-end' },
    { id: 'cpu-4', name: 'AMD Ryzen 5 9600X', brand: 'AMD', price: 880, asin: 'B0D6NN6TM7', image_url: null, score: 80, socket: 'AM5', cores: 6, threads: 12, baseClock: 3.9, boostClock: 5.4, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-5', name: 'AMD Ryzen 9 9900X', brand: 'AMD', price: 1699, asin: 'B0DWGWN8GY', image_url: null, score: 90, socket: 'AM5', cores: 12, threads: 24, baseClock: 4.4, boostClock: 5.5, tdp: 120, tier: 'high-end' },
    { id: 'cpu-6', name: 'AMD Ryzen 7 9700X', brand: 'AMD', price: 1199, asin: 'B0D6NMDNNX', image_url: null, score: 82, socket: 'AM5', cores: 8, threads: 16, baseClock: 3.8, boostClock: 5.5, tdp: 65, tier: 'mid-range' },
    { id: 'cpu-7', name: 'Intel Core Ultra 9 285K', brand: 'Intel', price: 2297, asin: 'B0DFKC99VL', image_url: null, score: 95, socket: 'LGA1851', cores: 24, threads: 24, baseClock: 3.7, boostClock: 5.7, tdp: 125, tier: 'enthusiast' },
    { id: 'cpu-8', name: 'Intel Core Ultra 7 265K', brand: 'Intel', price: 1504, asin: 'B0DFK2MH2D', image_url: null, score: 88, socket: 'LGA1851', cores: 20, threads: 20, baseClock: 3.9, boostClock: 5.5, tdp: 125, tier: 'high-end' },
    { id: 'cpu-9', name: 'Intel Core Ultra 5 245K', brand: 'Intel', price: 939, asin: 'B0DFK8HHK4', image_url: null, score: 68, socket: 'LGA1851', cores: 14, threads: 14, baseClock: 4.2, boostClock: 5.2, tdp: 125, tier: 'mid-range' },
    { id: 'cpu-10', name: 'AMD Ryzen 7 7800X3D', brand: 'AMD', price: 1349, asin: 'B0BTZB7F88', image_url: null, score: 85, socket: 'AM5', cores: 8, threads: 16, baseClock: 4.2, boostClock: 5, tdp: 120, tier: 'mid-range' },
    { id: 'cpu-11', name: 'AMD Ryzen 5 7600X', brand: 'AMD', price: 699, asin: 'B0BBJDS62N', image_url: null, score: 72, socket: 'AM5', cores: 6, threads: 12, baseClock: 4.7, boostClock: 5.3, tdp: 105, tier: 'budget' },
    { id: 'cpu-12', name: 'AMD Ryzen 9 7950X', brand: 'AMD', price: 1899, asin: 'B0BTRH9MNS', image_url: null, score: 88, socket: 'AM5', cores: 16, threads: 32, baseClock: 4.2, boostClock: 5.7, tdp: 120, tier: 'high-end' },
    { id: 'cpu-13', name: 'Intel Core i9-14900K', brand: 'Intel', price: 2249, asin: 'B0CGJDKLB8', image_url: null, score: 83, socket: 'LGA1700', cores: 24, threads: 32, baseClock: 3.2, boostClock: 6, tdp: 125, tier: 'enthusiast' },
    { id: 'cpu-14', name: 'Intel Core i7-14700K', brand: 'Intel', price: 1449, asin: 'B0CGJ41C9W', image_url: null, score: 80, socket: 'LGA1700', cores: 20, threads: 28, baseClock: 3.4, boostClock: 5.6, tdp: 125, tier: 'high-end' },
    { id: 'cpu-15', name: 'Intel Core i5-14600K', brand: 'Intel', price: 999, asin: 'B0CGJ9STNF', image_url: null, score: 73, socket: 'LGA1700', cores: 14, threads: 20, baseClock: 3.5, boostClock: 5.3, tdp: 125, tier: 'mid-range' },
    { id: 'cpu-16', name: 'Intel Core i3-14100F', brand: 'Intel', price: 349, asin: 'B0CQ1MN1Y2', image_url: null, score: 42, socket: 'LGA1700', cores: 4, threads: 8, baseClock: 3.5, boostClock: 4.7, tdp: 58, tier: 'budget' },
    { id: 'cpu-17', name: 'Intel Core i5-13600K', brand: 'Intel', price: 899, asin: 'B0BCDR9M33', image_url: null, score: 65, socket: 'LGA1700', cores: 14, threads: 20, baseClock: 3.5, boostClock: 5.1, tdp: 125, tier: 'mid-range' },
    { id: 'cpu-18', name: 'Intel Core i5-12400F', brand: 'Intel', price: 449, asin: 'B09NPJRDGD', image_url: null, score: 50, socket: 'LGA1700', cores: 6, threads: 12, baseClock: 2.5, boostClock: 4.4, tdp: 65, tier: 'budget' },
    { id: 'cpu-19', name: 'AMD Ryzen 5 5600X', brand: 'AMD', price: 449, asin: 'B08166SLDF', image_url: null, score: 55, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.7, boostClock: 4.6, tdp: 65, tier: 'budget' },
    { id: 'cpu-20', name: 'AMD Ryzen 7 5800X3D', brand: 'AMD', price: 849, asin: 'B09VCJ2SHD', image_url: null, score: 70, socket: 'AM4', cores: 8, threads: 16, baseClock: 3.4, boostClock: 4.5, tdp: 105, tier: 'budget' },
  ],

  // ═══════ GPUs — 28 total ═══════
  gpu: [
    { id: 'gpu-1', name: 'NVIDIA RTX 5090', brand: 'NVIDIA', price: 14999, asin: 'B0F1ZLXNJS', search: 'Zotac+GAMING+SOLID+GeForce+RTX+5090+32GB+GDDR7+Black+Copper', image_url: null, score: 100, vram: 32, tdp: 575, tier: 'enthusiast' },
    { id: 'gpu-2', name: 'NVIDIA RTX 5080', brand: 'NVIDIA', price: 5500, asin: 'B0FSP9H8BN', search: 'Asus+ROG+Astral+OC+HATSUNE+MIKU+EDITION+GeForce+RTX+5080+16GB+GDDR7+Turquoise+/+Pink', image_url: null, score: 92, vram: 16, tdp: 360, tier: 'enthusiast' },
    { id: 'gpu-3', name: 'NVIDIA RTX 5070 Ti', brand: 'NVIDIA', price: 3500, asin: 'B0FLSMNFVP', search: 'MSI+GeForce+RTX+5070+Ti+16G+EXPERT+OC', image_url: null, score: 85, vram: 16, tdp: 300, tier: 'enthusiast' },
    { id: 'gpu-4', name: 'NVIDIA RTX 5070', brand: 'NVIDIA', price: 2500, asin: 'B0DYGFJK7C', search: 'MSI+SHADOW+2X+OC+GeForce+RTX+5070+12+GB+BLACK', image_url: null, score: 78, vram: 12, tdp: 250, tier: 'high-end' },
    { id: 'gpu-5', name: 'NVIDIA RTX 5060 Ti', brand: 'NVIDIA', price: 2100, asin: 'B0BVSP96C3', search: 'MSI+VENTUS+2X+PLUS+GeForce+RTX+5060+Ti+8GB+GDDR7+Black+/+Gray', image_url: null, score: 65, vram: 8, tdp: 180, tier: 'mid-range' },
    { id: 'gpu-6', name: 'NVIDIA RTX 5060', brand: 'NVIDIA', price: 1400, asin: 'B0F8R25VRX', search: 'Palit+Dual+GeForce+RTX+5060+8GB+GDDR7', image_url: null, score: 52, vram: 8, tdp: 145, tier: 'mid-range' },
    { id: 'gpu-7', name: 'AMD RX 9070 XT', brand: 'AMD', price: 2800, asin: 'B0DXVPZDL5', search: 'XFX+Quicksilver+AMD+Radeon+RX+9070XT+White+Magnetic+Air+Edition', image_url: null, score: 80, vram: 16, tdp: 304, tier: 'high-end' },
    { id: 'gpu-8', name: 'AMD RX 9070', brand: 'AMD', price: 2200, asin: 'B0F1GFKD47', search: 'XFX+Swift+AMD+Radeon+RX+9070+OC+Triple+90mm+Fan+Gaming+Edition+RX-97SWFT3BA', image_url: null, score: 70, vram: 16, tdp: 220, tier: 'high-end' },
    { id: 'gpu-9', name: 'NVIDIA RTX 4090', brand: 'NVIDIA', price: 7299, asin: 'B0BGP8FGNZ', search: 'Gigabyte+GAMING+OC+GeForce+RTX+4090+24+GB', image_url: null, score: 88, vram: 24, tdp: 450, tier: 'enthusiast' },
    { id: 'gpu-10', name: 'NVIDIA RTX 4080 Super', brand: 'NVIDIA', price: 4199, asin: 'B0CSBFBT9S', search: 'ZOTAC+GAMING+GeForce+RTX+4080+SUPER+AMP+Extreme+AIRO+16GB+GDDR6X', image_url: null, score: 73, vram: 16, tdp: 320, tier: 'enthusiast' },
    { id: 'gpu-11', name: 'NVIDIA RTX 4070 Ti Super', brand: 'NVIDIA', price: 2899, asin: 'B0CZ2JR1JL', search: 'MSI+GeForce+RTX+4070+Ti+SUPER+EXPERT+16GB+GDDR6X+Silver', image_url: null, score: 66, vram: 16, tdp: 285, tier: 'high-end' },
    { id: 'gpu-12', name: 'NVIDIA RTX 4070 Super', brand: 'NVIDIA', price: 2399, asin: 'B0CS7MBND4', search: 'MSI+GAMING+X+SLIM+GeForce+RTX+4070+SUPER+12GB+GDDR6X+Black', image_url: null, score: 60, vram: 12, tdp: 220, tier: 'high-end' },
    { id: 'gpu-13', name: 'NVIDIA RTX 4060 Ti', brand: 'NVIDIA', price: 1599, asin: 'B0C5BBWWJP', search: 'MSI+VENTUS+3X+OC+GeForce+RTX+4060+Ti+8+GB', image_url: null, score: 48, vram: 8, tdp: 160, tier: 'mid-range' },
    { id: 'gpu-14', name: 'NVIDIA RTX 4060', brand: 'NVIDIA', price: 1199, asin: 'B0C5S5F9F5', search: 'ZOTAC+GAMING+GeForce+RTX+4060+8GB+Twin+Edge+OC', image_url: null, score: 40, vram: 8, tdp: 115, tier: 'budget' },
    { id: 'gpu-15', name: 'AMD RX 7900 XTX', brand: 'AMD', price: 3499, asin: 'B0C1Z7HG27', search: 'PowerColor+Hellhound+Spectral+Radeon+RX+7900+XTX+24GB+GDDR6+White', image_url: null, score: 70, vram: 24, tdp: 355, tier: 'enthusiast' },
    { id: 'gpu-16', name: 'AMD RX 7900 XT', brand: 'AMD', price: 2799, asin: 'B0CST1D8CD', search: 'ASRock+Radeon+RX+7900+XT+Phantom+Gaming+OC+20GB+GDDR6+White', image_url: null, score: 62, vram: 20, tdp: 300, tier: 'high-end' },
    { id: 'gpu-17', name: 'AMD RX 7800 XT', brand: 'AMD', price: 1799, asin: 'B0CFPWPL67', search: 'PowerColor+Red+Devil+Limited+Edition+AMD+Radeon+RX+7800+XT+16GB+GDDR6+Graphics+Card', image_url: null, score: 55, vram: 16, tdp: 225, tier: 'mid-range' },
    { id: 'gpu-18', name: 'AMD RX 7700 XT', brand: 'AMD', price: 1599, asin: 'B0CFPQPMVX', search: 'PowerColor+Fighter+Radeon+RX+7700+XT+12GB+GDDR6+PCI+Express+4.0+x16+ATX+Video+Card+RX7700XT+12G-F/OC', image_url: null, score: 45, vram: 12, tdp: 245, tier: 'mid-range' },
    { id: 'gpu-19', name: 'AMD RX 7600', brand: 'AMD', price: 999, asin: 'B0DNP7Q1PH', search: 'Asus+DUAL+EVO+OC+Radeon+RX+7600+8GB+GDDR6+Black', image_url: null, score: 38, vram: 8, tdp: 165, tier: 'budget' },
    { id: 'gpu-20', name: 'NVIDIA RTX 3090', brand: 'NVIDIA', price: 2799, asin: 'B08HR6ZBYJ', search: 'NVIDIA+Founders+Edition+GeForce+RTX+3090+24GB+GDDR6X', image_url: null, score: 60, vram: 24, tdp: 350, tier: 'high-end' },
    { id: 'gpu-21', name: 'NVIDIA RTX 3080 Ti', brand: 'NVIDIA', price: 2199, asin: 'B083HZGMWZ', search: 'Gigabyte+GAMING+OC+GeForce+RTX+3080+Ti+12+GB', image_url: null, score: 58, vram: 12, tdp: 350, tier: 'mid-range' },
    { id: 'gpu-22', name: 'NVIDIA RTX 3080', brand: 'NVIDIA', price: 1999, asin: 'B08HHDP9DW', search: 'ASUS+TUF+Gaming+GeForce+RTX+3080', image_url: null, score: 55, vram: 10, tdp: 225, tier: 'mid-range' },
    { id: 'gpu-23', name: 'NVIDIA RTX 3070 Ti', brand: 'NVIDIA', price: 1499, asin: 'B096M7P5R6', search: 'GeForce+RTX™+3070+Ti+SUPRIM+X+8G', image_url: null, score: 50, vram: 8, tdp: 310, tier: 'mid-range' },
    { id: 'gpu-24', name: 'NVIDIA RTX 3070', brand: 'NVIDIA', price: 1399, asin: 'B09G5Y1QGP', search: 'ZOTAC+GAMING+GeForce+RTX+3070+Twin+Edge+OC+White+Edition+LHR', image_url: null, score: 48, vram: 8, tdp: 220, tier: 'budget' },
    { id: 'gpu-25', name: 'NVIDIA RTX 3060 Ti', brand: 'NVIDIA', price: 1099, asin: 'B08P3XJLJJ', search: 'ZOTAC+GAMING+GeForce+RTX+3060+Ti+Twin+Edge+OC+LHR', image_url: null, score: 42, vram: 8, tdp: 200, tier: 'budget' },
    { id: 'gpu-26', name: 'NVIDIA RTX 3060', brand: 'NVIDIA', price: 999, asin: 'B0BL7Y69YP', search: 'MSI+VENTUS+2X+OC+GeForce+RTX+3060+8GB+GDDR6+Black', image_url: null, score: 35, vram: 8, tdp: 170, tier: 'budget' },
    { id: 'gpu-27', name: 'NVIDIA GTX 1660 Super', brand: 'NVIDIA', price: 599, asin: 'B07ZK69HDK', search: 'MSI+GAMING+X+GeForce+GTX+1660+SUPER+6GB+GDDR6+Black', image_url: null, score: 20, vram: 6, tdp: 125, tier: 'budget' },
    { id: 'gpu-28', name: 'Intel Arc B580', brand: 'Intel', price: 899, asin: 'B0DPM9923G', search: 'Intel+Arc+B580+Graphics', image_url: null, score: 40, vram: 12, tdp: 190, tier: 'budget' },
  ],

  // ═══════ Motherboards — 20 total ═══════
  motherboard: [
    { id: 'mb-1', name: 'ASUS ROG Strix X870E-E WiFi', brand: 'ASUS', price: 2249, asin: 'B0DDZNZF76 ', search: 'ASUS+ROG+Strix+X870E-E+WiFi', image_url: null, socket: 'AM5', chipset: 'X870E', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 6, wifi: true, tier: 'enthusiast' },
    { id: 'mb-2', name: 'MSI MAG X870 Tomahawk WiFi', brand: 'MSI', price: 1199, asin: 'B0DG3HK897', search: 'MSI+MAG+X870+Tomahawk+WiFi', image_url: null, socket: 'AM5', chipset: 'X870', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 4, wifi: true, tier: 'high-end' },
    { id: 'mb-3', name: 'Gigabyte B850 AORUS Elite WiFi7', brand: 'Gigabyte', price: 923, asin: 'B0DQLHVQSF', search: 'Gigabyte+B850+AORUS+Elite+WiFi7', image_url: null, socket: 'AM5', chipset: 'B850', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 3, wifi: true, tier: 'mid-range' },
    { id: 'mb-4', name: 'MSI MAG B650 Tomahawk WiFi', brand: 'MSI', price: 749, asin: 'B0BHCCNSRH', search: 'MSI+MAG+B650+Tomahawk+WiFi', image_url: null, socket: 'AM5', chipset: 'B650', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 6, wifi: false, tier: 'mid-range' },
    { id: 'mb-5', name: 'ASUS ROG Strix X670E-E WiFi', brand: 'ASUS', price: 1799, asin: null, search: 'ASUS+ROG+Strix+X670E-E+WiFi', image_url: null, socket: 'AM5', chipset: 'X670E', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'high-end' },
    { id: 'mb-6', name: 'Gigabyte B650 AORUS Elite AX', brand: 'Gigabyte', price: 699, asin: 'B0CMJSH15D', search: 'Gigabyte+B650+AORUS+Elite+AX', image_url: null, socket: 'AM5', chipset: 'B650', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 3, wifi: false, tier: 'mid-range' },
    { id: 'mb-7', name: 'Gigabyte B850 Eagle WiFi6E', brand: 'Gigabyte', price: 699, asin: 'B0DQNW4J1G', search: 'Gigabyte+B850+Eagle+WiFi6E', image_url: null, socket: 'AM5', chipset: 'B850', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 6, wifi: false, tier: 'mid-range' },
    { id: 'mb-8', name: 'ASUS ROG Maximus Z890 Hero', brand: 'ASUS', price: 2499, asin: 'B0DT7J49K7', search: 'ASUS+ROG+Maximus+Z890+Hero', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 10, wifi: false, tier: 'enthusiast' },
    { id: 'mb-9', name: 'ASUS ROG Strix Z890-E WiFi', brand: 'ASUS', price: 1992, asin: null, search: 'ASUS+ROG+Strix+Z890-E+WiFi', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'enthusiast' },
    { id: 'mb-10', name: 'MSI MAG Z890 Tomahawk WiFi', brand: 'MSI', price: 1356, asin: 'B0DH6SF5LB', search: 'MSI+MAG+Z890+Tomahawk+WiFi', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 8, wifi: false, tier: 'high-end' },
    { id: 'mb-11', name: 'MSI PRO B860M-A WiFi', brand: 'MSI', price: 599, asin: 'B0DQ66PD4L', search: 'MSI+PRO+B860M-A+WiFi', image_url: null, socket: 'LGA1851', chipset: 'B860', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: true, tier: 'budget' },
    { id: 'mb-12', name: 'MSI MAG B860 Tomahawk WiFi', brand: 'MSI', price: 849, asin: null, search: 'MSI+MAG+B860+Tomahawk+WiFi', image_url: null, socket: 'LGA1851', chipset: 'B860', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'mid-range' },
    { id: 'mb-13', name: 'ASUS ROG Maximus Z790 Hero', brand: 'ASUS', price: 2299, asin: 'B0D3D28BXG', search: 'ASUS+ROG+Maximus+Z790+Hero', image_url: null, socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 192, m2Slots: 8, wifi: false, tier: 'enthusiast' },
    { id: 'mb-14', name: 'MSI MAG Z790 Tomahawk WiFi', brand: 'MSI', price: 1199, asin: null, search: 'MSI+MAG+Z790+Tomahawk+WiFi', image_url: null, socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'high-end' },
    { id: 'mb-15', name: 'MSI PRO B760M-A WiFi', brand: 'MSI', price: 399, asin: 'B0BPB484K5', search: 'MSI+PRO+B760M-A+WiFi', image_url: null, socket: 'LGA1700', chipset: 'B760', formFactor: 'mATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: true, tier: 'budget' },
    { id: 'mb-16', name: 'MSI MAG B550 Tomahawk', brand: 'MSI', price: 499, asin: 'B09ZJ73LDY', search: 'MSI+MAG+B550+Tomahawk', image_url: null, socket: 'AM4', chipset: 'B550', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 5, wifi: false, tier: 'budget' },
    { id: 'mb-17', name: 'ASUS TUF Gaming B850-PLUS WiFi', brand: 'ASUS', price: 849, asin: null, search: 'ASUS+TUF+Gaming+B850-PLUS+WiFi', image_url: null, socket: 'AM5', chipset: 'B850', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'mid-range' },
    { id: 'mb-18', name: 'ASUS TUF Gaming X870-PLUS WiFi', brand: 'ASUS', price: 1099, asin: 'B0DP5DQPRC', search: 'ASUS+TUF+Gaming+X870-PLUS+WiFi', image_url: null, socket: 'AM5', chipset: 'B850', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 4, wifi: true, tier: 'high-end' },
    { id: 'mb-19', name: 'Gigabyte B850M AORUS Elite WiFi', brand: 'Gigabyte', price: 699, asin: 'B0DQLJGTRM', search: 'Gigabyte+B850M+AORUS+Elite+WiFi', image_url: null, socket: 'AM5', chipset: 'B850', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-20', name: 'MSI MAG B650M Mortar WiFi', brand: 'MSI', price: 649, asin: 'B0BHC39YG7', search: 'MSI+MAG+B650M+Mortar+WiFi', image_url: null, socket: 'AM5', chipset: 'B650', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 4, maxRam: 192, m2Slots: 4, wifi: false, tier: 'budget' },
  ],

  // ═══════ RAM — 18 total ═══════
  ram: [
    { id: 'ram-1', name: 'TeamGroup DDR5-8000 32GB', brand: 'TeamGroup', price: 1022, asin: 'B0BWM1T88J', search: 'TeamGroup+DDR5-8000+32GB', image_url: null, type: 'DDR5', size: 32, speed: 8000, latency: 'CL38', modules: '2x16GB', tier: 'enthusiast' },
    { id: 'ram-2', name: 'G.Skill Trident Z5 Neo DDR5-7200 32GB', brand: 'G.Skill', price: 662, asin: 'B0DD243MYB', search: 'G.Skill+Trident+Z5+Neo+DDR5-7200+32GB', image_url: null, type: 'DDR5', size: 32, speed: 7200, latency: 'CL34', modules: '2x16GB', tier: 'high-end' },
    { id: 'ram-3', name: 'Corsair Dominator Titanium DDR5-7200 32GB', brand: 'Corsair', price: 849, asin: 'B0CHSGVHCB', search: 'Corsair+Dominator+Titanium+DDR5-7200+32GB', image_url: null, type: 'DDR5', size: 32, speed: 7200, latency: 'CL34', modules: '2x16GB', tier: 'enthusiast' },
    { id: 'ram-4', name: 'G.Skill Trident Z5 RGB DDR5-6000 32GB', brand: 'G.Skill', price: 499, asin: 'B0DD295SB7', search: 'G.Skill+Trident+Z5+RGB+DDR5-6000+32GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL28', modules: '2x16GB', tier: 'high-end' },
    { id: 'ram-5', name: 'Corsair Vengeance DDR5-5600 32GB', brand: 'Corsair', price: 399, asin: 'B09NCNF2ZQ', search: 'Corsair+Vengeance+DDR5-5600+32GB', image_url: null, type: 'DDR5', size: 32, speed: 5600, latency: 'CL36', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-6', name: 'Kingston Fury Beast DDR5-5200 16GB', brand: 'Kingston', price: 199, asin: 'B0BD5VYFCV', search: 'Kingston+Fury+Beast+DDR5-5200+16GB', image_url: null, type: 'DDR5', size: 16, speed: 5200, latency: 'CL36', modules: '1x16GB', tier: 'budget' },
    { id: 'ram-7', name: 'G.Skill Trident Z5 RGB DDR5-6400 64GB', brand: 'G.Skill', price: 899, asin: 'B0BJ814ZHK', search: 'G.Skill+Trident+Z5+RGB+DDR5-6400+64GB', image_url: null, type: 'DDR5', size: 64, speed: 6400, latency: 'CL32', modules: '2x32GB', tier: 'enthusiast' },
    { id: 'ram-8', name: 'Corsair Vengeance LPX DDR4-3200 16GB', brand: 'Corsair', price: 149, asin: 'B0943Y1T4X', search: 'Corsair+Vengeance+LPX+DDR4-3200+16GB', image_url: null, type: 'DDR4', size: 16, speed: 3200, latency: 'CL16', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-9', name: 'G.Skill Ripjaws V DDR4-3600 32GB', brand: 'G.Skill', price: 299, asin: 'B07Z86WC1Z', search: 'G.Skill+Ripjaws+V+DDR4-3600+32GB', image_url: null, type: 'DDR4', size: 32, speed: 3600, latency: 'CL18', modules: '2x16GB', tier: 'budget' },
    { id: 'ram-10', name: 'Kingston Fury Renegade DDR5-8000 32GB', brand: 'Kingston', price: 1199, asin: 'B0CKZ7YRR2', search: 'Kingston+Fury+Renegade+DDR5-8000+32GB', image_url: null, type: 'DDR5', size: 32, speed: 8000, latency: 'CL38', modules: '2x16GB', tier: 'enthusiast' },
    { id: 'ram-11', name: 'G.Skill Flare X5 DDR5-6000 32GB', brand: 'G.Skill', price: 699, asin: 'B0BFGB2D2Z', search: 'G.Skill+Flare+X5+DDR5-6000+32GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL36', modules: '2x16GB', tier: 'high-end' },
    { id: 'ram-12', name: 'Kingston Fury Renegade DDR5-6400 32GB', brand: 'Kingston', price: 599, asin: 'B0BZJKC2NJ', search: 'Kingston+Fury+Renegade+DDR5-6400+32GB', image_url: null, type: 'DDR5', size: 32, speed: 6400, latency: 'CL32', modules: '2x16GB', tier: 'high-end' },
    { id: 'ram-13', name: 'Corsair Vengeance DDR5-5200 32GB', brand: 'Corsair', price: 329, asin: 'B0B6PQC25X', search: 'Corsair+Vengeance+DDR5-5200+32GB', image_url: null, type: 'DDR5', size: 32, speed: 5200, latency: 'CL40', modules: '2x16GB', tier: 'budget' },
    { id: 'ram-14', name: 'G.Skill Trident Z5 RGB DDR5-8000 32GB', brand: 'G.Skill', price: 750, asin: 'B0BQ73LSQL', search: 'G.Skill+Trident+Z5+RGB+DDR5-8000+32GB', image_url: null, type: 'DDR5', size: 32, speed: 8000, latency: 'CL38', modules: '2x16GB', tier: 'high-end' },
    { id: 'ram-15', name: 'TeamGroup T-Force Delta DDR5-6400 32GB', brand: 'TeamGroup', price: 399, asin: 'B0CBBGG4Z8', search: 'TeamGroup+T-Force+Delta+DDR5-6400+32GB', image_url: null, type: 'DDR5', size: 32, speed: 6400, latency: 'CL32', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-16', name: 'Corsair Vengeance DDR5-6000 32GB CL30', brand: 'Corsair', price: 449, asin: 'B0C3RYHZJQ', search: 'Corsair+Vengeance+DDR5-6000+32GB+CL30', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL30', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-17', name: 'Kingston Fury Beast DDR5-6000 32GB', brand: 'Kingston', price: 399, asin: 'B0CYHB1WTV', search: 'Kingston+Fury+Beast+DDR5-6000+32GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL30', modules: '1x32GB', tier: 'mid-range' },
    { id: 'ram-18', name: 'G.Skill Trident Z5 Neo DDR5-6000 32GB', brand: 'G.Skill', price: 449, asin: 'B0DTPFW2FF', search: 'G.Skill+Trident+Z5+Neo+DDR5-6000+32GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL26', modules: '2x16GB', tier: 'mid-range' },
  ],

  // ═══════ SSDs — 18 total ═══════
  ssd: [
    { id: 'ssd-1', name: 'WD Black SN8100 2TB', brand: 'WD', price: 1199, asin: 'B0F3BD1W6R', search: 'WD+Black+SN8100+2TB', image_url: null, interface: 'NVMe Gen5', capacity: 2000, read: 14900, write: 11000, tier: 'enthusiast' },
    { id: 'ssd-2', name: 'Crucial T705 2TB', brand: 'Crucial', price: 1299, asin: 'B0CTRVZKG7', search: 'Crucial+T705+2TB', image_url: null, interface: 'NVMe Gen5', capacity: 2000, read: 14500, write: 12700, tier: 'enthusiast' },
    { id: 'ssd-3', name: 'Samsung 990 EVO Plus 2TB', brand: 'Samsung', price: 549, asin: 'B0DHLCRF91', search: 'Samsung+990+EVO+Plus+2TB', image_url: null, interface: 'NVMe Gen5', capacity: 2000, read: 7250, write: 6300, tier: 'mid-range' },
    { id: 'ssd-4', name: 'Samsung 990 Pro 1TB', brand: 'Samsung', price: 449, asin: 'B0BHJGV9WR', search: 'Samsung+990+Pro+1TB', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7450, write: 6900, tier: 'mid-range' },
    { id: 'ssd-5', name: 'Samsung 990 Pro 2TB', brand: 'Samsung', price: 749, asin: 'B0BHJDY57J', search: 'Samsung+990+Pro+2TB', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7450, write: 6900, tier: 'high-end' },
    { id: 'ssd-6', name: 'WD Black SN850X 1TB', brand: 'WD', price: 349, asin: 'B0B7CKVCCV', search: 'WD+Black+SN850X+1TB', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7300, write: 6300, tier: 'budget' },
    { id: 'ssd-7', name: 'Kingston NV2 1TB', brand: 'Kingston', price: 199, asin: 'B0BBWH1R8H', search: 'Kingston+NV2+1TB', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 3500, write: 2100, tier: 'budget' },
    { id: 'ssd-8', name: 'Samsung 870 EVO 1TB', brand: 'Samsung', price: 399, asin: 'B08W5TLTL2', search: 'Samsung+870+EVO+1TB', image_url: null, interface: 'SATA', capacity: 1000, read: 560, write: 530, tier: 'mid-range' },
    { id: 'ssd-9', name: 'Crucial T700 2TB', brand: 'Crucial', price: 999, asin: 'B0C3K7MTSY', search: 'Crucial+T700+2TB', image_url: null, interface: 'NVMe Gen5', capacity: 2000, read: 12400, write: 11800, tier: 'high-end' },
    { id: 'ssd-10', name: 'Samsung 990 EVO Plus 4TB', brand: 'Samsung', price: 1118, asin: 'B0DHLBDSP7', search: 'Samsung+990+EVO+Plus+4TB', image_url: null, interface: 'NVMe Gen5', capacity: 4000, read: 7250, write: 6300, tier: 'enthusiast' },
    { id: 'ssd-11', name: 'Crucial T500 2TB', brand: 'Crucial', price: 699, asin: 'B0CK2RKPBL', search: 'Crucial+T500+2TB', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7400, write: 7000, tier: 'high-end' },
    { id: 'ssd-12', name: 'WD Black SN770 1TB', brand: 'WD', price: 299, asin: 'B0CHJXHVZM', search: 'WD+Black+SN770+1TB', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 5150, write: 4900, tier: 'budget' },
    { id: 'ssd-13', name: 'Samsung 870 QVO 2TB', brand: 'Samsung', price: 649, asin: 'B07STZZ7X1', search: 'Samsung+870+QVO+2TB', image_url: null, interface: 'SATA', capacity: 2000, read: 560, write: 530, tier: 'high-end' },
    { id: 'ssd-14', name: 'WD Black SN8100 1TB', brand: 'WD', price: 499, asin: 'B0F3BMBQ75', search: 'WD+Black+SN8100+1TB', image_url: null, interface: 'NVMe Gen5', capacity: 1000, read: 14900, write: 11000, tier: 'mid-range' },
    { id: 'ssd-15', name: 'Corsair MP700 Pro 2TB', brand: 'Corsair', price: 999, asin: 'B0CM43DR1N', search: 'Corsair+MP700+Pro+2TB', image_url: null, interface: 'NVMe Gen5', capacity: 2000, read: 12400, write: 11800, tier: 'high-end' },
    { id: 'ssd-16', name: 'SK Hynix P41 Platinum 1TB', brand: 'SK Hynix', price: 399, asin: 'B09QX6SL2Y', search: 'SK+Hynix+P41+Platinum+1TB', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7000, write: 6500, tier: 'mid-range' },
    { id: 'ssd-17', name: 'WD Blue SN580 1TB', brand: 'WD', price: 249, asin: 'B0C8XMH264', search: 'WD+Blue+SN580+1TB', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 4150, write: 4150, tier: 'budget' },
    { id: 'ssd-18', name: 'Samsung 990 Pro 4TB', brand: 'Samsung', price: 1399, asin: 'B0CHHFR1LG', search: 'Samsung+990+Pro+4TB', image_url: null, interface: 'NVMe Gen4', capacity: 4000, read: 7450, write: 6900, tier: 'enthusiast' },
  ],

  // ═══════ PSUs — 18 total ═══════
  psu: [
    { id: 'psu-1', name: 'Corsair HX1500i ATX 3.1', brand: 'Corsair', price: 1499, asin: 'B0F1NGKBK3', search: 'Corsair+HX1500i+ATX+3.1', image_url: null, watt: 1500, rating: '80+ Platinum', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-2', name: 'Corsair RM1200x Shift', brand: 'Corsair', price: 990, asin: 'B0BP88MYM4', search: 'Corsair+RM1200x+Shift', image_url: null, watt: 1200, rating: '80+ Gold', modular: 'Non', tier: 'high-end' },
    { id: 'psu-3', name: 'Seasonic Vertex PX-1200', brand: 'Seasonic', price: 1283, asin: 'B0C571DW23', search: 'Seasonic+Vertex+PX-1200', image_url: null, watt: 1200, rating: '80+ Platinum', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-4', name: 'Corsair RM1000x', brand: 'Corsair', price: 699, asin: 'B015YEI7LK', search: 'Corsair+RM1000x', image_url: null, watt: 1000, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-5', name: 'Corsair RM850x', brand: 'Corsair', price: 549, asin: 'B07JWT8YV3', search: 'Corsair+RM850x', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-6', name: 'Seasonic Focus GX-850', brand: 'Seasonic', price: 479, asin: 'B0C5B888CM', search: 'Seasonic+Focus+GX-850', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-7', name: 'Corsair RM750x', brand: 'Corsair', price: 399, asin: 'B0C61XRJBG', search: 'Corsair+RM750x', image_url: null, watt: 750, rating: '80+ Gold', modular: 'Non', tier: 'budget' },
    { id: 'psu-8', name: 'EVGA 700 BR', brand: 'EVGA', price: 199, asin: 'B07DTP6MWS', search: 'EVGA+700+BR', image_url: null, watt: 700, rating: '80+ Bronze', modular: 'Non', tier: 'budget' },
    { id: 'psu-9', name: 'be quiet! Dark Power Pro 13 1000W', brand: 'be quiet!', price: 999, asin: null, search: 'be+quiet!+Dark+Power+Pro+13+1000W', image_url: null, watt: 1000, rating: null, modular: null, tier: 'enthusiast' },
    { id: 'psu-10', name: 'Corsair HX1200i ATX 3.1', brand: 'Corsair', price: 1480, asin: 'B0F1NF61BQ', search: 'Corsair+HX1200i+ATX+3.1', image_url: null, watt: 1200, rating: '80+ Platinum', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-11', name: 'Thermaltake Toughpower GF3 1000W', brand: 'Thermaltake', price: 699, asin: 'B0BF4MCGBS', search: 'Thermaltake+Toughpower+GF3+1000W', image_url: null, watt: 750, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-12', name: 'MSI MAG A850GL 850W', brand: 'MSI', price: 459, asin: 'B0FF7TGMD2', search: 'MSI+MAG+A850GL+850W', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'budget' },
    { id: 'psu-13', name: 'Corsair RM850e 850W', brand: 'Corsair', price: 499, asin: 'B0DZXLK5BY', search: 'Corsair+RM850e+850W', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-14', name: 'Seasonic Vertex GX-1200', brand: 'Seasonic', price: 949, asin: 'B0BVP4GM9S', search: 'Seasonic+Vertex+GX-1200', image_url: null, watt: 1200, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-15', name: 'be quiet! Pure Power 12M 850W', brand: 'be quiet!', price: 449, asin: 'B0BVY62M5F', search: 'be+quiet!+Pure+Power+12M+850W', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'budget' },
    { id: 'psu-16', name: 'Corsair RM1000e 1000W', brand: 'Corsair', price: 599, asin: 'B0DPR5RZ1T', search: 'Corsair+RM1000e+1000W', image_url: null, watt: 1000, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-17', name: 'NZXT C1200 ATX 3.1 1200W', brand: 'NZXT', price: 999, asin: 'B0BQX19J1R', search: 'NZXT+C1200+ATX+3.1+1200W', image_url: null, watt: 1200, rating: '80+ Gold', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-18', name: 'Corsair SF750 SFX', brand: 'Corsair', price: 599, asin: 'B07M63H81H', search: 'Corsair+SF750+SFX', image_url: null, watt: 750, rating: '80+ Platinum', modular: 'Full', tier: 'mid-range' },
  ],

  // ═══════ Coolers — 16 total ═══════
  cooler: [
    { id: 'cool-1', name: 'Arctic Liquid Freezer III 360 A-RGB', brand: 'Arctic', price: 747, asin: 'B09VGMGJ7W', search: 'Arctic+Liquid+Freezer+III+360+A-RGB', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'enthusiast' },
    { id: 'cool-2', name: 'DeepCool LS720 SE', brand: 'DeepCool', price: 239, asin: 'B0BLV7MNCC', search: 'DeepCool+LS720+SE', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'mid-range' },
    { id: 'cool-3', name: 'Corsair iCUE LINK H150i RGB', brand: 'Corsair', price: 741, asin: 'B0C6PWQ6L3', search: 'Corsair+iCUE+LINK+H150i+RGB', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'enthusiast' },
    { id: 'cool-4', name: 'Noctua NH-D15 chromax.Black', brand: 'Noctua', price: 349, asin: 'B07Y87YHRH', search: 'Noctua+NH-D15+chromax.Black', image_url: null, type: 'Air Tower', tdpMax: 250, tier: 'mid-range' },
    { id: 'cool-5', name: 'Thermalright PA 120 SE ARGB', brand: 'Thermalright', price: 199, asin: 'B0DMVZ3YQ7', search: 'Thermalright+PA+120+SE+ARGB', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-6', name: 'DeepCool AK400', brand: 'DeepCool', price: 99, asin: null, search: 'DeepCool+AK400', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-7', name: 'NZXT Kraken X73 RGB 360mm', brand: 'NZXT', price: 699, asin: 'B08MB7WQW9', search: 'NZXT+Kraken+X73+RGB+360mm', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'enthusiast' },
    { id: 'cool-8', name: 'Corsair iCUE H150i Elite 360mm', brand: 'Corsair', price: 599, asin: 'B08G1Q3GZR', search: 'Corsair+iCUE+H150i+Elite+360mm', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'enthusiast' },
    { id: 'cool-9', name: 'Arctic Liquid Freezer II 240', brand: 'Arctic', price: 349, asin: 'B09VH4M76W', search: 'Arctic+Liquid+Freezer+II+240', image_url: null, type: 'AIO 240mm', tdpMax: 200, tier: 'mid-range' },
    { id: 'cool-10', name: 'Cooler Master Hyper 212 Black', brand: 'CM', price: 149, asin: 'B07H25DYM3', search: 'Cooler+Master+Hyper+212+Black', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-11', name: 'be quiet! Dark Rock Pro 5', brand: 'be quiet!', price: 449, asin: 'B0CJY3DYQ3', search: 'be+quiet!+Dark+Rock+Pro+5', image_url: null, type: 'Air Tower', tdpMax: 250, tier: 'high-end' },
    { id: 'cool-12', name: 'Thermalright Frozen Prism 360 ARGB', brand: 'Thermalright', price: 279, asin: 'B0BWJS56BF', search: 'Thermalright+Frozen+Prism+360+ARGB', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'mid-range' },
    { id: 'cool-13', name: 'NZXT Kraken 240 RGB', brand: 'NZXT', price: 549, asin: null, search: 'NZXT+Kraken+240+RGB', image_url: null, type: 'AIO 240mm', tdpMax: 200, tier: 'high-end' },
    { id: 'cool-14', name: 'Arctic Liquid Freezer III 240', brand: 'Arctic', price: 399, asin: 'B09VH4M76W', search: 'Arctic+Liquid+Freezer+III+240', image_url: null, type: 'AIO 240mm', tdpMax: 200, tier: 'high-end' },
    { id: 'cool-15', name: 'Noctua NH-D15 G2', brand: 'Noctua', price: 549, asin: 'B0D5B4KWMD', search: 'Noctua+NH-D15+G2', image_url: null, type: 'Air Tower', tdpMax: 250, tier: 'high-end' },
    { id: 'cool-16', name: 'ID-COOLING SE-214-XT ARGB', brand: 'ID-COOLING', price: 79, asin: 'B09Z6M8NK5', search: 'ID-COOLING+SE-214-XT+ARGB', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
  ],

  // ═══════ Cases — 18 total ═══════
  case: [
    { id: 'case-1', name: 'Hyte Y70 Touch', brand: 'Hyte', price: 899, asin: 'B0DKJKG9V5', search: 'Hyte+Y70+Touch', image_url: null, formFactor: 'Mid Tower', maxGPU: 422, tier: 'enthusiast' },
    { id: 'case-2', name: 'Hyte Y70', brand: 'Hyte', price: 1283, asin: 'B0DKWNJ7QB', search: 'Hyte+Y70', image_url: null, formFactor: 'Mid Tower', maxGPU: 422, tier: 'enthusiast' },
    { id: 'case-3', name: 'Lian Li O11 Dynamic EVO', brand: 'Lian Li', price: 599, asin: 'B0CRKVN35N', search: 'Lian+Li+O11+Dynamic+EVO', image_url: null, formFactor: 'Mid Tower', maxGPU: 455.7, tier: 'high-end' },
    { id: 'case-4', name: 'Fractal Design North', brand: 'Fractal', price: 687, asin: 'B0CJCJ3ZZB', search: 'Fractal+Design+North', image_url: null, formFactor: 'Full Tower', maxGPU: 413, tier: 'high-end' },
    { id: 'case-5', name: 'Lian Li Lancool III', brand: 'Lian Li', price: 619, asin: 'B0B9WF5FW1', search: 'Lian+Li+Lancool+III', image_url: null, formFactor: 'Mid Tower', maxGPU: 435, tier: 'high-end' },
    { id: 'case-6', name: 'NZXT H7 Flow', brand: 'NZXT', price: 449, asin: 'B0CV4QGT6W', search: 'NZXT+H7+Flow', image_url: null, formFactor: 'Mid Tower', maxGPU: 410, tier: 'mid-range' },
    { id: 'case-7', name: 'Corsair 4000D Airflow', brand: 'Corsair', price: 349, asin: 'B0CM6XNPDH', search: 'Corsair+4000D+Airflow', image_url: null, formFactor: 'Mid Tower', maxGPU: 360, tier: 'mid-range' },
    { id: 'case-8', name: 'Fractal Design Meshify 2', brand: 'Fractal', price: 499, asin: 'B093HJNWWX', search: 'Fractal+Design+Meshify+2', image_url: null, formFactor: 'Mid Tower', maxGPU: 450, tier: 'high-end' },
    { id: 'case-9', name: 'Montech AIR 903 MAX', brand: 'Montech', price: 299, asin: 'B0C98RRPXL', search: 'Montech+AIR+903+MAX', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'budget' },
    { id: 'case-10', name: 'NZXT H5 Flow', brand: 'NZXT', price: 299, asin: 'B0D2MK6NML', search: 'NZXT+H5+Flow', image_url: null, formFactor: 'Mid Tower', maxGPU: 410, tier: 'budget' },
    { id: 'case-11', name: 'Montech AIR 903 BASE', brand: 'Montech', price: 239, asin: 'B0C98TR925', search: 'Montech+AIR+903+BASE', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'budget' },
    { id: 'case-12', name: 'Corsair 5000D Airflow', brand: 'Corsair', price: 549, asin: 'B08M49WW51', search: 'Corsair+5000D+Airflow', image_url: null, formFactor: 'Mid Tower', maxGPU: 420, tier: 'high-end' },
    { id: 'case-13', name: 'Lian Li LANCOOL 216', brand: 'Lian Li', price: 399, asin: 'B0BVH7ZM6N', search: 'Lian+Li+LANCOOL+216', image_url: null, formFactor: 'Mid Tower', maxGPU: 392, tier: 'mid-range' },
    { id: 'case-14', name: 'be quiet! Pure Base 500DX', brand: 'be quiet!', price: 449, asin: 'B087D7KNL9', search: 'be+quiet!+Pure+Base+500DX', image_url: null, formFactor: 'Mid Tower', maxGPU: 369, tier: 'mid-range' },
    { id: 'case-15', name: 'Corsair 3500X', brand: 'Corsair', price: 399, asin: 'B0CZVDHZFD', search: 'Corsair+3500X', image_url: null, formFactor: 'Mid Tower', maxGPU: 410, tier: 'mid-range' },
    { id: 'case-16', name: 'Phanteks NV7', brand: 'Phanteks', price: 699, asin: 'B0BYQSBYYS', search: 'Phanteks+NV7', image_url: null, formFactor: 'Full Tower', maxGPU: 450, tier: 'enthusiast' },
    { id: 'case-17', name: 'NZXT H6 Flow', brand: 'NZXT', price: 349, asin: 'B0C89S5PC5', search: 'NZXT+H6+Flow', image_url: null, formFactor: 'Mid Tower', maxGPU: 365, tier: 'mid-range' },
    { id: 'case-18', name: 'Fractal Design Torrent', brand: 'Fractal', price: 699, asin: 'B0869DD92T', search: 'Fractal+Design+Torrent', image_url: null, formFactor: 'Mid Tower', maxGPU: 461, tier: 'enthusiast' },
  ],
};

// ═══════ PRESETS ═══════

export const PRESETS = [
  {
    key: 'budget', name: 'اقتصادية', icon: '🎮', color: '#10b981',
    budget: '3,500 - 5,000', desc: 'ألعاب 1080p + استخدام يومي',
    build: { cpu: 'cpu-18', gpu: 'gpu-26', motherboard: 'mb-15', ram: 'ram-8', ssd: 'ssd-7', psu: 'psu-8', cooler: 'cool-16', case: 'case-11' },
  },
  {
    key: 'midRange', name: 'متوسطة', icon: '⚡', color: '#3b82f6',
    budget: '7,000 - 9,000', desc: 'ألعاب 1440p + ستريم',
    build: { cpu: 'cpu-3', gpu: 'gpu-7', motherboard: 'mb-3', ram: 'ram-4', ssd: 'ssd-6', psu: 'psu-5', cooler: 'cool-2', case: 'case-7' },
  },
  {
    key: 'highEnd', name: 'عالية', icon: '🔥', color: '#8b5cf6',
    budget: '10,000 - 16,000', desc: 'ألعاب 4K + مونتاج + ستريم',
    build: { cpu: 'cpu-1', gpu: 'gpu-3', motherboard: 'mb-2', ram: 'ram-2', ssd: 'ssd-3', psu: 'psu-4', cooler: 'cool-1', case: 'case-3' },
  },
  {
    key: 'enthusiast', name: 'خرافية', icon: '💎', color: '#ff2d55',
    budget: '20,000+', desc: 'أقصى أداء بدون حدود',
    build: { cpu: 'cpu-1', gpu: 'gpu-1', motherboard: 'mb-1', ram: 'ram-10', ssd: 'ssd-1', psu: 'psu-1', cooler: 'cool-3', case: 'case-1' },
  },
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

  if (build.cpu && build.motherboard) {
    if (build.cpu.socket !== build.motherboard.socket)
      errors.push(`سوكت المعالج (${build.cpu.socket}) ≠ اللوحة (${build.motherboard.socket})`);
    else ok.push('السوكت متوافق');
  }

  if (build.ram && build.motherboard) {
    if (build.ram.type !== build.motherboard.ramType)
      errors.push(`الرام ${build.ram.type} ≠ اللوحة ${build.motherboard.ramType}`);
    else ok.push('الرام متوافقة');
  }

  const needed = estimateWattage(build);
  if (build.psu) {
    if (build.psu.watt < needed)
      errors.push(`الباور ${build.psu.watt}W < المطلوب ~${needed}W`);
    else if (build.psu.watt < needed * 1.1)
      warnings.push(`الباور يكفي بالكاد — يفضل ${getRecommendedPSU(build)}W`);
    else ok.push('الباور كافي');
  }

  if (build.cpu && build.cooler) {
    if (build.cooler.tdpMax < build.cpu.tdp)
      warnings.push(`التبريد (${build.cooler.tdpMax}W) ضعيف للمعالج (${build.cpu.tdp}W)`);
    else ok.push('التبريد كافي');
  }

  return { errors, warnings, ok };
}
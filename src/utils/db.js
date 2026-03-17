// GamerBuild Component Database — Amazon.sa Only
// Affiliate Tag: meshal039-21
// All prices in SAR from Amazon.sa (March 2026)

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
  // ═══════ CPUs — 17 total ═══════
  cpu: [
    // AMD Ryzen 9000 X3D (AM5)
    { id: 'cpu-1', name: 'AMD Ryzen 9 9950X3D', brand: 'AMD', price: 3339, asin: 'B0DVZSG8D5', image_url: 'https://tpucdn.com/review/amd-ryzen-9-9950x3d/images/cpu-front.jpg', score: 100, socket: 'AM5', cores: 16, threads: 32, baseClock: 4.3, boostClock: 5.7, tdp: 170, tier: 'enthusiast' },
    { id: 'cpu-2', name: 'AMD Ryzen 9 9900X3D', brand: 'AMD', price: 2399, asin: 'B0DWGWN8GY', image_url: null, score: 99, socket: 'AM5', cores: 12, threads: 24, baseClock: 4.4, boostClock: 5.5, tdp: 120, tier: 'enthusiast' },
    { id: 'cpu-3', name: 'AMD Ryzen 7 9800X3D', brand: 'AMD', price: 1794, asin: 'B0DKFMSMYK', image_url: 'https://tpucdn.com/review/amd-ryzen-7-9800x3d/images/cpu-front.jpg', score: 98, socket: 'AM5', cores: 8, threads: 16, baseClock: 4.7, boostClock: 5.2, tdp: 120, tier: 'high-end' },
    { id: 'cpu-4', name: 'AMD Ryzen 5 9600X', brand: 'AMD', price: 880, asin: 'B0D6NN6TM7', image_url: 'https://tpucdn.com/review/amd-ryzen-5-9600x/images/cpu-front.jpg', score: 80, socket: 'AM5', cores: 6, threads: 12, baseClock: 3.9, boostClock: 5.4, tdp: 65, tier: 'mid-range' },
    // Intel Arrow Lake (LGA1851)
    { id: 'cpu-5', name: 'Intel Core Ultra 9 285K', brand: 'Intel', price: 2297, asin: 'B0DFKC99VL', image_url: 'https://tpucdn.com/review/intel-core-ultra-9-285k/images/cpu-front.jpg', score: 95, socket: 'LGA1851', cores: 24, threads: 24, baseClock: 3.7, boostClock: 5.7, tdp: 125, tier: 'enthusiast' },
    { id: 'cpu-6', name: 'Intel Core Ultra 7 265K', brand: 'Intel', price: 1504, asin: 'B0DFK2MH2D', image_url: 'https://tpucdn.com/review/intel-core-ultra-7-265k/images/cpu-front.jpg', score: 88, socket: 'LGA1851', cores: 20, threads: 20, baseClock: 3.9, boostClock: 5.5, tdp: 125, tier: 'high-end' },
    { id: 'cpu-7', name: 'Intel Core Ultra 5 245K', brand: 'Intel', price: 939, asin: 'B0DFK2P311', image_url: 'https://tpucdn.com/review/intel-core-ultra-5-245k/images/cpu-front.jpg', score: 68, socket: 'LGA1851', cores: 14, threads: 14, baseClock: 4.2, boostClock: 5.2, tdp: 125, tier: 'mid-range' },
    // AMD Ryzen 7000 (AM5)
    { id: 'cpu-8', name: 'AMD Ryzen 7 7800X3D', brand: 'AMD', price: 1349, asin: 'B0BTZB7F88', image_url: 'https://tpucdn.com/review/amd-ryzen-7-7800x3d/images/cpu-front.jpg', score: 85, socket: 'AM5', cores: 8, threads: 16, baseClock: 4.2, boostClock: 5.0, tdp: 120, tier: 'high-end' },
    { id: 'cpu-9', name: 'AMD Ryzen 5 7600X', brand: 'AMD', price: 699, asin: 'B0BBJMS1TN', image_url: 'https://tpucdn.com/review/amd-ryzen-5-7600x/images/cpu-front.jpg', score: 72, socket: 'AM5', cores: 6, threads: 12, baseClock: 4.7, boostClock: 5.3, tdp: 105, tier: 'mid-range' },
    { id: 'cpu-12', name: 'AMD Ryzen 9 7950X', brand: 'AMD', price: 1899, asin: 'B0BBHHT8LY', image_url: 'https://tpucdn.com/review/amd-ryzen-9-7950x/images/cpu-front.jpg', score: 88, socket: 'AM5', cores: 16, threads: 32, baseClock: 4.5, boostClock: 5.7, tdp: 170, tier: 'enthusiast' },
    // Intel 14th/13th Gen (LGA1700)
    { id: 'cpu-10', name: 'Intel Core i7-14700K', brand: 'Intel', price: 1449, asin: 'B0CGJ41C9W', image_url: 'https://tpucdn.com/review/intel-core-i7-14700k/images/cpu-front.jpg', score: 80, socket: 'LGA1700', cores: 20, threads: 28, baseClock: 3.4, boostClock: 5.6, tdp: 125, tier: 'high-end' },
    { id: 'cpu-11', name: 'Intel Core i5-14600K', brand: 'Intel', price: 999, asin: 'B0CGJ9STNF', image_url: 'https://tpucdn.com/review/intel-core-i5-14600k/images/cpu-front.jpg', score: 73, socket: 'LGA1700', cores: 14, threads: 20, baseClock: 3.5, boostClock: 5.3, tdp: 125, tier: 'mid-range' },
    { id: 'cpu-13', name: 'Intel Core i9-14900K', brand: 'Intel', price: 2249, asin: 'B0CGJDKLB8', image_url: 'https://tpucdn.com/review/intel-core-i9-14900k/images/cpu-front.jpg', score: 83, socket: 'LGA1700', cores: 24, threads: 32, baseClock: 3.2, boostClock: 6.0, tdp: 253, tier: 'enthusiast' },
    { id: 'cpu-15', name: 'Intel Core i3-14100F', brand: 'Intel', price: 349, asin: 'B0CQ1MN1Y2', image_url: 'https://tpucdn.com/review/intel-core-i3-14100/images/cpu-front.jpg', score: 42, socket: 'LGA1700', cores: 4, threads: 8, baseClock: 3.5, boostClock: 4.7, tdp: 58, tier: 'budget' },
    { id: 'cpu-17', name: 'Intel Core i5-13600K', brand: 'Intel', price: 899, asin: 'B0BCDR9M33', image_url: 'https://tpucdn.com/review/intel-core-i5-13600k/images/cpu-front.jpg', score: 65, socket: 'LGA1700', cores: 14, threads: 20, baseClock: 3.5, boostClock: 5.1, tdp: 125, tier: 'mid-range' },
    // AMD Ryzen 5000 (AM4)
    { id: 'cpu-14', name: 'AMD Ryzen 5 5600X', brand: 'AMD', price: 449, asin: 'B08166SLDF', image_url: 'https://tpucdn.com/review/amd-ryzen-5-5600x/images/cpu-front.jpg', score: 55, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.7, boostClock: 4.6, tdp: 65, tier: 'budget' },
    { id: 'cpu-16', name: 'AMD Ryzen 7 5800X3D', brand: 'AMD', price: 849, asin: 'B09VCJ2GHJ', image_url: 'https://tpucdn.com/review/amd-ryzen-7-5800x3d/images/cpu-front.jpg', score: 70, socket: 'AM4', cores: 8, threads: 16, baseClock: 3.4, boostClock: 4.5, tdp: 105, tier: 'mid-range' },
  ],

  // ═══════ GPUs — 26 total ═══════
  gpu: [
    // NVIDIA RTX 50 Series (Blackwell)
    { id: 'gpu-1', name: 'NVIDIA RTX 5090', brand: 'NVIDIA', price: 14999, asin: 'B0DYDY8KSC', search: 'NVIDIA+GeForce+RTX+5090+Founders+Edition+32GB', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-5090-founders-edition/images/title.jpg', score: 100, vram: 32, tdp: 575, tier: 'enthusiast' },
    { id: 'gpu-2', name: 'NVIDIA RTX 5080', brand: 'NVIDIA', price: 5500, asin: 'B0DYVCGVK4', search: 'NVIDIA+GeForce+RTX+5080+Founders+Edition+16GB', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-5080-founders-edition/images/title.jpg', score: 92, vram: 16, tdp: 360, tier: 'enthusiast' },
    { id: 'gpu-3', name: 'NVIDIA RTX 5070 Ti', brand: 'NVIDIA', price: 3500, asin: null, search: 'RTX+5070+Ti+16GB', image_url: 'https://tpucdn.com/review/msi-geforce-rtx-5070-ti-gaming-trio-oc/images/title.jpg', score: 85, vram: 16, tdp: 300, tier: 'high-end' },
    { id: 'gpu-4', name: 'NVIDIA RTX 5070', brand: 'NVIDIA', price: 2500, asin: null, search: 'RTX+5070+12GB+Founders+Edition', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-5070-founders-edition/images/title.jpg', score: 78, vram: 12, tdp: 250, tier: 'high-end' },
    { id: 'gpu-18', name: 'NVIDIA RTX 5060 Ti 16GB', brand: 'NVIDIA', price: 2100, asin: null, search: 'RTX+5060+Ti+16GB', image_url: null, score: 65, vram: 16, tdp: 180, tier: 'mid-range' },
    { id: 'gpu-19', name: 'NVIDIA RTX 5060 Ti 8GB', brand: 'NVIDIA', price: 1800, asin: null, search: 'RTX+5060+Ti+8GB', image_url: null, score: 62, vram: 8, tdp: 180, tier: 'mid-range' },
    { id: 'gpu-20', name: 'NVIDIA RTX 5060', brand: 'NVIDIA', price: 1400, asin: null, search: 'RTX+5060+8GB', image_url: null, score: 52, vram: 8, tdp: 150, tier: 'budget' },
    // AMD RX 9000 Series (RDNA 4)
    { id: 'gpu-5', name: 'AMD RX 9070 XT', brand: 'AMD', price: 2800, asin: null, search: 'Sapphire+PULSE+AMD+Radeon+RX+9070+XT+16GB', image_url: 'https://tpucdn.com/review/sapphire-radeon-rx-9070-xt-nitro/images/title.jpg', score: 80, vram: 16, tdp: 300, tier: 'high-end' },
    { id: 'gpu-6', name: 'AMD RX 9070', brand: 'AMD', price: 2200, asin: null, search: 'ASUS+Prime+AMD+Radeon+RX+9070+16GB+OC', image_url: null, score: 70, vram: 16, tdp: 250, tier: 'mid-range' },
    // NVIDIA RTX 40 Series (Ada Lovelace)
    { id: 'gpu-9', name: 'NVIDIA RTX 4090', brand: 'NVIDIA', price: 7299, asin: 'B0BG94PS2F', search: 'MSI+GeForce+RTX+4090+Gaming+X+Trio+24G', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-4090-founders-edition/images/title.jpg', score: 88, vram: 24, tdp: 450, tier: 'enthusiast' },
    { id: 'gpu-10', name: 'NVIDIA RTX 4080 Super', brand: 'NVIDIA', price: 4199, asin: 'B0CSJYJRKD', search: 'Gigabyte+GeForce+RTX+4080+Super+Gaming+OC+16G', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-4080-super-founders-edition/images/title.jpg', score: 73, vram: 16, tdp: 320, tier: 'high-end' },
    { id: 'gpu-11', name: 'NVIDIA RTX 4070 Ti Super', brand: 'NVIDIA', price: 2899, asin: 'B0CSGCTMT2', search: 'MSI+RTX+4070+Ti+Super+16G+Gaming+X+Slim', image_url: null, score: 66, vram: 16, tdp: 285, tier: 'high-end' },
    { id: 'gpu-12', name: 'NVIDIA RTX 4070 Super', brand: 'NVIDIA', price: 2399, asin: 'B0CT8LQZ47', search: 'Nvidia+GeForce+RTX+4070+Super+Founders+Edition+12GB', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-4070-super-founders-edition/images/title.jpg', score: 60, vram: 12, tdp: 220, tier: 'mid-range' },
    { id: 'gpu-13', name: 'NVIDIA RTX 4060 Ti', brand: 'NVIDIA', price: 1599, asin: 'B0C5B4XNWR', search: 'MSI+GeForce+RTX+4060+Ti+Ventus+2X+Black+8G+OC', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-4060-ti-founders-edition/images/title.jpg', score: 48, vram: 8, tdp: 160, tier: 'mid-range' },
    { id: 'gpu-14', name: 'NVIDIA RTX 4060', brand: 'NVIDIA', price: 1199, asin: 'B0C8BPW1SP', search: 'MSI+GeForce+RTX+4060+Ventus+2X+Black+8G+OC', image_url: null, score: 40, vram: 8, tdp: 115, tier: 'budget' },
    // AMD RX 7000 Series (RDNA 3)
    { id: 'gpu-15', name: 'AMD RX 7900 XTX', brand: 'AMD', price: 3499, asin: 'B0BMWG9N16', search: 'PowerColor+AMD+Radeon+RX+7900+XTX+24GB', image_url: 'https://tpucdn.com/review/amd-radeon-rx-7900-xtx/images/title.jpg', score: 70, vram: 24, tdp: 355, tier: 'high-end' },
    { id: 'gpu-16', name: 'AMD RX 7800 XT', brand: 'AMD', price: 1799, asin: 'B0CGRMJF6C', search: 'Gigabyte+Radeon+RX+7800+XT+Gaming+OC+16G', image_url: 'https://tpucdn.com/review/amd-radeon-rx-7800-xt/images/title.jpg', score: 55, vram: 16, tdp: 263, tier: 'mid-range' },
    { id: 'gpu-17', name: 'AMD RX 7600', brand: 'AMD', price: 999, asin: 'B0C488N4BF', search: 'PowerColor+Fighter+AMD+Radeon+RX+7600+8GB', image_url: 'https://tpucdn.com/review/amd-radeon-rx-7600/images/title.jpg', score: 38, vram: 8, tdp: 165, tier: 'budget' },
    // NVIDIA RTX 30 Series (Ampere)
    { id: 'gpu-21', name: 'NVIDIA RTX 3090 24GB', brand: 'NVIDIA', price: 2799, asin: 'B08HRBW6VB', search: 'NVIDIA+GeForce+RTX+3090+24GB', image_url: 'https://tpucdn.com/review/msi-geforce-rtx-3090-gaming-x-trio/images/title.jpg', score: 60, vram: 24, tdp: 350, tier: 'enthusiast' },
    { id: 'gpu-22', name: 'NVIDIA RTX 3080 Ti 12GB', brand: 'NVIDIA', price: 2199, asin: 'B096L83WV8', search: 'NVIDIA+GeForce+RTX+3080+Ti+12GB', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-3080-ti-founders-edition/images/title.jpg', score: 58, vram: 12, tdp: 350, tier: 'high-end' },
    { id: 'gpu-23', name: 'NVIDIA RTX 3080 10GB', brand: 'NVIDIA', price: 1999, asin: 'B08HR7SV3M', search: 'NVIDIA+GeForce+RTX+3080+10GB', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-3080-founders-edition/images/title.jpg', score: 55, vram: 10, tdp: 320, tier: 'high-end' },
    { id: 'gpu-24', name: 'NVIDIA RTX 3070 Ti 8GB', brand: 'NVIDIA', price: 1499, asin: 'B097PZT7J3', search: 'NVIDIA+GeForce+RTX+3070+Ti+8GB', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-3070-ti-founders-edition/images/title.jpg', score: 50, vram: 8, tdp: 290, tier: 'mid-range' },
    { id: 'gpu-25', name: 'NVIDIA RTX 3070 8GB', brand: 'NVIDIA', price: 1399, asin: 'B08HBJB7YD', search: 'NVIDIA+GeForce+RTX+3070+8GB', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-3070-founders-edition/images/title.jpg', score: 48, vram: 8, tdp: 220, tier: 'mid-range' },
    { id: 'gpu-26', name: 'NVIDIA RTX 3060 Ti 8GB', brand: 'NVIDIA', price: 1099, asin: 'B08PW559LL', search: 'NVIDIA+GeForce+RTX+3060+Ti+8GB', image_url: 'https://tpucdn.com/review/nvidia-geforce-rtx-3060-ti-founders-edition/images/title.jpg', score: 42, vram: 8, tdp: 200, tier: 'budget' },
    { id: 'gpu-27', name: 'NVIDIA RTX 3060 12GB', brand: 'NVIDIA', price: 999, asin: 'B08WPRMVWB', search: 'NVIDIA+GeForce+RTX+3060+12GB', image_url: 'https://tpucdn.com/review/msi-geforce-rtx-3060-gaming-x-trio/images/title.jpg', score: 35, vram: 12, tdp: 170, tier: 'budget' },
    { id: 'gpu-28', name: 'NVIDIA GTX 1660 Super 6GB', brand: 'NVIDIA', price: 599, asin: 'B084NW6VFC', search: 'NVIDIA+GeForce+GTX+1660+Super+6GB', image_url: 'https://tpucdn.com/review/msi-geforce-gtx-1660-super-gaming-x/images/title.jpg', score: 20, vram: 6, tdp: 125, tier: 'budget' },
  ],

  // ═══════ Motherboards — 16 total ═══════
  motherboard: [
    // AM5 — X870E / X870 / B850 / B650
    { id: 'mb-1', name: 'ASUS ROG Strix X870E-E WiFi', brand: 'ASUS', price: 2249, asin: 'B0DGQ7NHT2', search: 'ASUS+ROG+Strix+X870E-E+Gaming+WiFi+AM5', image_url: null, socket: 'AM5', chipset: 'X870E', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 5, wifi: true, tier: 'enthusiast' },
    { id: 'mb-2', name: 'MSI MAG X870 Tomahawk WiFi', brand: 'MSI', price: 1199, asin: 'B0DCVVXK8D', search: 'MSI+MAG+X870+Tomahawk+WiFi+DDR5+AM5', image_url: null, socket: 'AM5', chipset: 'X870', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 4, wifi: true, tier: 'high-end' },
    { id: 'mb-3', name: 'Gigabyte B850 AORUS Elite WiFi7', brand: 'Gigabyte', price: 923, asin: 'B0DQLKRXKW', search: 'Gigabyte+B850+AORUS+Elite+WiFi7+ICE+AM5', image_url: null, socket: 'AM5', chipset: 'B850', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 3, wifi: true, tier: 'mid-range' },
    { id: 'mb-4', name: 'MSI MAG B650 Tomahawk WiFi', brand: 'MSI', price: 749, asin: 'B0BHCCNSRH', search: 'MSI+MAG+B650+Tomahawk+WiFi+DDR5+AM5', image_url: null, socket: 'AM5', chipset: 'B650', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-11', name: 'ASUS ROG Strix X670E-E WiFi', brand: 'ASUS', price: 1799, asin: 'B0BDTHQTJV', search: 'ASUS+ROG+Strix+X670E-E+Gaming+WiFi+AM5', image_url: null, socket: 'AM5', chipset: 'X670E', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 4, wifi: true, tier: 'high-end' },
    { id: 'mb-12', name: 'Gigabyte B650 AORUS Elite AX', brand: 'Gigabyte', price: 699, asin: 'B0BH7GTY9C', search: 'Gigabyte+B650+AORUS+Elite+AX+AM5+DDR5+WiFi+6E', image_url: null, socket: 'AM5', chipset: 'B650', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-15', name: 'Gigabyte B850 Eagle WiFi6E', brand: 'Gigabyte', price: 699, asin: 'B0DQLJWRDX', search: 'Gigabyte+B850+Eagle+WiFi6E+AM5+DDR5', image_url: null, socket: 'AM5', chipset: 'B850', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 3, wifi: true, tier: 'budget' },
    // LGA1851 — Z890 / B860 (Intel Arrow Lake)
    { id: 'mb-16', name: 'ASUS ROG Maximus Z890 Hero', brand: 'ASUS', price: 2499, asin: null, search: 'ASUS+ROG+Maximus+Z890+Hero+WiFi+LGA1851+DDR5', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 5, wifi: true, tier: 'enthusiast' },
    { id: 'mb-5', name: 'ASUS ROG Strix Z890-E WiFi', brand: 'ASUS', price: 1992, asin: 'B0DGWRK1PN', search: 'ASUS+ROG+Strix+Z890-E+Gaming+WiFi+LGA1851', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 5, wifi: true, tier: 'enthusiast' },
    { id: 'mb-6', name: 'MSI MAG Z890 Tomahawk WiFi', brand: 'MSI', price: 1356, asin: 'B0DH6SF5LB', search: 'MSI+MAG+Z890+Tomahawk+WiFi+DDR5+LGA1851', image_url: null, socket: 'LGA1851', chipset: 'Z890', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 4, wifi: true, tier: 'high-end' },
    { id: 'mb-7', name: 'MSI PRO B860M-A WiFi', brand: 'MSI', price: 599, asin: 'B0DQB38722', search: 'MSI+PRO+B860M-A+WiFi+DDR5+LGA1851', image_url: null, socket: 'LGA1851', chipset: 'B860', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 2, maxRam: 96, m2Slots: 2, wifi: true, tier: 'budget' },
    { id: 'mb-14', name: 'MSI MAG B860 Tomahawk WiFi', brand: 'MSI', price: 849, asin: 'B0DQBJ64KH', search: 'MSI+MAG+B860+Tomahawk+WiFi+DDR5+LGA1851', image_url: null, socket: 'LGA1851', chipset: 'B860', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 256, m2Slots: 3, wifi: true, tier: 'mid-range' },
    // LGA1700 — Z790 / B760 (Intel 13th/14th Gen)
    { id: 'mb-8', name: 'ASUS ROG Maximus Z790 Hero', brand: 'ASUS', price: 2299, asin: 'B0BG6M53DG', search: 'ASUS+ROG+Maximus+Z790+Hero+WiFi+6E+DDR5', image_url: null, socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 5, wifi: true, tier: 'enthusiast' },
    { id: 'mb-9', name: 'MSI MAG Z790 Tomahawk WiFi', brand: 'MSI', price: 1199, asin: 'B0BL8K1YH1', search: 'MSI+MAG+Z790+Tomahawk+WiFi+DDR5+LGA1700', image_url: null, socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 4, wifi: true, tier: 'high-end' },
    { id: 'mb-10', name: 'MSI PRO B760M-A WiFi', brand: 'MSI', price: 399, asin: 'B0C15VWF1H', search: 'MSI+PRO+B760M-A+WiFi+DDR5+LGA1700', image_url: null, socket: 'LGA1700', chipset: 'B760', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 2, maxRam: 64, m2Slots: 2, wifi: false, tier: 'budget' },
    // AM4 — B550
    { id: 'mb-13', name: 'MSI MAG B550 Tomahawk', brand: 'MSI', price: 499, asin: 'B089CWDHFZ', search: 'MSI+MAG+B550+Tomahawk+Gaming+AM4+DDR4', image_url: null, socket: 'AM4', chipset: 'B550', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'budget' },
  ],

  // ═══════ RAM — 15 total ═══════
  ram: [
    // DDR5 High Speed
    { id: 'ram-1', name: 'TeamGroup DDR5-8000 32GB', brand: 'TeamGroup', price: 1022, asin: 'B0BWM1T88J', search: 'TeamGroup+T-Force+Delta+RGB+DDR5+8000+32GB+2x16GB', image_url: null, type: 'DDR5', size: 32, speed: 8000, latency: 'CL38', modules: '2x16GB', tier: 'enthusiast' },
    { id: 'ram-10', name: 'Kingston Fury Renegade DDR5-8000 32GB', brand: 'Kingston', price: 1199, asin: 'B0CKZ9SGFY', search: 'Kingston+Fury+Renegade+DDR5+8000+32GB+RGB', image_url: null, type: 'DDR5', size: 32, speed: 8000, latency: 'CL38', modules: '2x16GB', tier: 'enthusiast' },
    { id: 'ram-2', name: 'G.Skill Trident Z5 Neo DDR5-7200 32GB', brand: 'G.Skill', price: 662, asin: 'B0DD243MYB', search: 'G.Skill+Trident+Z5+Neo+RGB+DDR5+7200+CL34+32GB', image_url: null, type: 'DDR5', size: 32, speed: 7200, latency: 'CL34', modules: '2x16GB', tier: 'high-end' },
    { id: 'ram-3', name: 'Corsair Dominator Titanium DDR5-7200 32GB', brand: 'Corsair', price: 849, asin: 'B0CHSBX471', search: 'Corsair+Dominator+Titanium+DDR5+7200+CL34+32GB', image_url: null, type: 'DDR5', size: 32, speed: 7200, latency: 'CL34', modules: '2x16GB', tier: 'high-end' },
    // DDR5 Mid Speed
    { id: 'ram-4', name: 'G.Skill Trident Z5 RGB DDR5-6000 32GB', brand: 'G.Skill', price: 499, asin: 'B0BFCV7JZ8', search: 'G.Skill+Trident+Z5+NEO+32GB+DDR5+6000MHz+CL30+2x16GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL30', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-5', name: 'Corsair Vengeance DDR5-5600 32GB', brand: 'Corsair', price: 399, asin: 'B09WH64X5M', search: 'Corsair+Vengeance+DDR5+32GB+5600MHz+CL36+2x16GB', image_url: null, type: 'DDR5', size: 32, speed: 5600, latency: 'CL36', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-6', name: 'Kingston Fury Beast DDR5-5200 16GB', brand: 'Kingston', price: 199, asin: 'B09T97ZSVB', search: 'Kingston+Fury+Beast+16GB+5200MT+DDR5+CL40+2x8GB', image_url: null, type: 'DDR5', size: 16, speed: 5200, latency: 'CL40', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-7', name: 'G.Skill Trident Z5 RGB DDR5-6400 64GB', brand: 'G.Skill', price: 899, asin: 'B0BJ7X9P1W', search: 'G.Skill+Trident+Z5+RGB+64GB+DDR5+6400+CL32+2x32GB', image_url: null, type: 'DDR5', size: 64, speed: 6400, latency: 'CL32', modules: '2x32GB', tier: 'enthusiast' },
    // DDR4
    { id: 'ram-8', name: 'Corsair Vengeance LPX DDR4-3200 16GB', brand: 'Corsair', price: 149, asin: 'B0143UM4TC', search: 'Corsair+Vengeance+LPX+16GB+DDR4+3200+CL16+2x8GB', image_url: null, type: 'DDR4', size: 16, speed: 3200, latency: 'CL16', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-9', name: 'G.Skill Ripjaws V DDR4-3600 32GB', brand: 'G.Skill', price: 299, asin: 'B081374T3G', search: 'G.Skill+Ripjaws+V+32GB+DDR4+3600+CL18+2x16GB', image_url: null, type: 'DDR4', size: 32, speed: 3600, latency: 'CL18', modules: '2x16GB', tier: 'mid-range' },
    // New DDR5
    { id: 'ram-11', name: 'G.Skill Flare X5 DDR5-6000 32GB', brand: 'G.Skill', price: 699, asin: 'B0BFG9VTKL', search: 'G.Skill+Flare+X5+DDR5+6000+32GB+2x16GB', image_url: null, type: 'DDR5', size: 32, speed: 6000, latency: 'CL32', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-12', name: 'Kingston Fury Renegade DDR5-6400 32GB', brand: 'Kingston', price: 599, asin: 'B0B72BM63Q', search: 'Kingston+Fury+Renegade+DDR5+6400+32GB+RGB', image_url: null, type: 'DDR5', size: 32, speed: 6400, latency: 'CL32', modules: '2x16GB', tier: 'high-end' },
    { id: 'ram-13', name: 'Corsair Vengeance DDR5-5200 32GB', brand: 'Corsair', price: 329, asin: 'B09NCPTVX5', search: 'Corsair+Vengeance+DDR5+5200+32GB+2x16GB', image_url: null, type: 'DDR5', size: 32, speed: 5200, latency: 'CL40', modules: '2x16GB', tier: 'budget' },
    { id: 'ram-14', name: 'G.Skill Trident Z5 RGB DDR5-8000 32GB', brand: 'G.Skill', price: 750, asin: null, search: 'G.Skill+Trident+Z5+RGB+DDR5+8000+CL36+32GB+2x16GB', image_url: null, type: 'DDR5', size: 32, speed: 8000, latency: 'CL36', modules: '2x16GB', tier: 'enthusiast' },
    { id: 'ram-15', name: 'TeamGroup T-Force Delta DDR5-6400 32GB', brand: 'TeamGroup', price: 399, asin: null, search: 'TeamGroup+T-Force+Delta+RGB+DDR5+6400+32GB+2x16GB', image_url: null, type: 'DDR5', size: 32, speed: 6400, latency: 'CL32', modules: '2x16GB', tier: 'mid-range' },
  ],

  // ═══════ SSDs — 14 total ═══════
  ssd: [
    // Gen5 NVMe
    { id: 'ssd-1', name: 'WD Black SN8100 2TB', brand: 'WD', price: 1199, asin: 'B0F3BD1W6R', search: 'WD+BLACK+SN8100+2TB+NVMe+Gen5+SSD', image_url: null, interface: 'NVMe Gen5', capacity: 2000, read: 14900, write: 11000, tier: 'enthusiast' },
    { id: 'ssd-2', name: 'Crucial T705 2TB', brand: 'Crucial', price: 1299, asin: 'B0CTRVZKG7', search: 'Crucial+T705+2TB+Gen5+NVMe+M.2+SSD', image_url: null, interface: 'NVMe Gen5', capacity: 2000, read: 14500, write: 12700, tier: 'enthusiast' },
    { id: 'ssd-9', name: 'Crucial T700 2TB', brand: 'Crucial', price: 999, asin: 'B0C3K7MTSY', search: 'Crucial+T700+2TB+Gen5+NVMe+M.2+SSD', image_url: null, interface: 'NVMe Gen5', capacity: 2000, read: 12400, write: 11800, tier: 'enthusiast' },
    // Gen4 NVMe
    { id: 'ssd-3', name: 'Samsung 990 EVO Plus 2TB', brand: 'Samsung', price: 549, asin: 'B0DHLCRF91', search: 'Samsung+990+EVO+Plus+2TB+PCIe+Gen4+NVMe', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7250, write: 6300, tier: 'high-end' },
    { id: 'ssd-4', name: 'Samsung 990 Pro 1TB', brand: 'Samsung', price: 449, asin: 'B0BHJF2VRN', search: 'Samsung+990+PRO+1TB+PCIe+Gen4+NVMe+M.2', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7450, write: 6900, tier: 'high-end' },
    { id: 'ssd-5', name: 'Samsung 990 Pro 2TB', brand: 'Samsung', price: 749, asin: 'B0BHJJ9Y77', search: 'Samsung+990+PRO+2TB+PCIe+Gen4+NVMe+M.2', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7450, write: 6900, tier: 'high-end' },
    { id: 'ssd-6', name: 'WD Black SN850X 1TB', brand: 'WD', price: 349, asin: 'B0B7CKVCCV', search: 'WD_BLACK+SN850X+1TB+NVMe+Gen4+SSD', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 7300, write: 6300, tier: 'mid-range' },
    { id: 'ssd-10', name: 'Samsung 990 EVO Plus 4TB', brand: 'Samsung', price: 1118, asin: 'B0DHLBDSP7', search: 'Samsung+990+EVO+Plus+4TB+NVMe', image_url: null, interface: 'NVMe Gen4', capacity: 4000, read: 7250, write: 6300, tier: 'enthusiast' },
    // Budget
    { id: 'ssd-7', name: 'Kingston NV2 1TB', brand: 'Kingston', price: 199, asin: 'B0BBWH1R8H', search: 'Kingston+NV2+1TB+M.2+2280+PCIe+4.0+NVMe', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 3500, write: 2100, tier: 'budget' },
    { id: 'ssd-8', name: 'Samsung 870 EVO 1TB', brand: 'Samsung', price: 399, asin: 'B08QBJ2YMG', search: 'Samsung+870+EVO+1TB+SATA+SSD', image_url: null, interface: 'SATA', capacity: 1000, read: 560, write: 530, tier: 'budget' },
    // New Gen4 / SATA
    { id: 'ssd-11', name: 'Crucial T500 2TB', brand: 'Crucial', price: 699, asin: 'B0CK2TC9XQ', search: 'Crucial+T500+2TB+NVMe+Gen4+SSD', image_url: null, interface: 'NVMe Gen4', capacity: 2000, read: 7400, write: 7000, tier: 'high-end' },
    { id: 'ssd-12', name: 'WD Black SN770 1TB', brand: 'WD', price: 299, asin: 'B09QV692XY', search: 'WD+Black+SN770+1TB+NVMe+Gen4+SSD', image_url: null, interface: 'NVMe Gen4', capacity: 1000, read: 5150, write: 4900, tier: 'mid-range' },
    { id: 'ssd-13', name: 'Samsung 870 QVO 2TB', brand: 'Samsung', price: 649, asin: 'B089C6LZ42', search: 'Samsung+870+QVO+2TB+SATA+SSD', image_url: null, interface: 'SATA', capacity: 2000, read: 560, write: 530, tier: 'budget' },
    { id: 'ssd-14', name: 'WD Black SN8100 1TB', brand: 'WD', price: 499, asin: null, search: 'WD+BLACK+SN8100+1TB+NVMe+Gen5+SSD', image_url: null, interface: 'NVMe Gen5', capacity: 1000, read: 14900, write: 11000, tier: 'high-end' },
  ],

  // ═══════ PSUs — 15 total ═══════
  psu: [
    // 1200W+ (for RTX 5090 / high-TDP builds)
    { id: 'psu-1', name: 'Corsair HX1500i ATX 3.1', brand: 'Corsair', price: 1499, asin: 'B0F1NGKBK3', search: 'Corsair+HX1500i+1500W+ATX+3.1+Platinum', image_url: null, watt: 1500, rating: '80+ Platinum', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-2', name: 'Corsair RM1200x Shift', brand: 'Corsair', price: 990, asin: 'B0BP88MYM4', search: 'Corsair+RM1200x+Shift+1200W+80+Plus+Gold+ATX+3.0', image_url: null, watt: 1200, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-3', name: 'Seasonic Vertex PX-1200', brand: 'Seasonic', price: 1283, asin: 'B0C571DW23', search: 'Seasonic+Vertex+PX-1200+1200W+80+Platinum+ATX+3.0', image_url: null, watt: 1200, rating: '80+ Platinum', modular: 'Full', tier: 'high-end' },
    { id: 'psu-10', name: 'Corsair HX1200i ATX 3.1', brand: 'Corsair', price: 1480, asin: 'B0F3JD7M8M', search: 'Corsair+HX1200i+1200W+ATX+3.1+Platinum', image_url: null, watt: 1200, rating: '80+ Platinum', modular: 'Full', tier: 'high-end' },
    // 850W-1000W
    { id: 'psu-4', name: 'Corsair RM1000x', brand: 'Corsair', price: 699, asin: 'B0D9C1HG19', search: 'Corsair+RM1000x+1000W+80+Plus+Gold+Fully+Modular', image_url: null, watt: 1000, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-9', name: 'be quiet! Dark Power 13 1000W', brand: 'be quiet!', price: 999, asin: 'B0BV6CWS2Z', search: 'be+quiet+Dark+Power+13+1000W+80+Plus+Titanium', image_url: null, watt: 1000, rating: '80+ Titanium', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-5', name: 'Corsair RM850x', brand: 'Corsair', price: 549, asin: 'B08R5JPTMZ', search: 'Corsair+RM850x+850W+80+Plus+Gold+Fully+Modular', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-6', name: 'Seasonic Focus GX-850', brand: 'Seasonic', price: 479, asin: 'B073H3ZZQZ', search: 'Seasonic+Focus+GX-850+850W+80+Plus+Gold+Full+Modular', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    // 700W-750W
    { id: 'psu-7', name: 'Corsair RM750x', brand: 'Corsair', price: 399, asin: 'B079HGN5QS', search: 'Corsair+RM750x+750W+80+Plus+Gold+Fully+Modular', image_url: null, watt: 750, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-8', name: 'EVGA 700 BR', brand: 'EVGA', price: 199, asin: 'B07DTP6MWS', search: 'EVGA+700+BR+80+Plus+Bronze+700W+Power+Supply', image_url: null, watt: 700, rating: '80+ Bronze', modular: 'Non', tier: 'budget' },
    // New PSUs
    { id: 'psu-11', name: 'Thermaltake Toughpower GF3 1000W', brand: 'Thermaltake', price: 699, asin: 'B0BF3R83W8', search: 'Thermaltake+Toughpower+GF3+1000W+ATX+3.0+Gold', image_url: null, watt: 1000, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-12', name: 'MSI MAG A850GL 850W', brand: 'MSI', price: 459, asin: 'B0CB9MSJ5N', search: 'MSI+MAG+A850GL+850W+80+Plus+Gold', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-13', name: 'Corsair RM850e 850W', brand: 'Corsair', price: 499, asin: 'B0BYQPH5J3', search: 'Corsair+RM850e+850W+80+Plus+Gold+ATX+3.0', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-14', name: 'Seasonic Vertex GX-1200', brand: 'Seasonic', price: 949, asin: null, search: 'Seasonic+Vertex+GX-1200+1200W+80+Plus+Gold+ATX+3.0', image_url: null, watt: 1200, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-15', name: 'be quiet! Pure Power 12M 850W', brand: 'be quiet!', price: 449, asin: null, search: 'be+quiet+Pure+Power+12M+850W+80+Plus+Gold', image_url: null, watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
  ],

  // ═══════ Coolers — 13 total ═══════
  cooler: [
    // AIO 360mm
    { id: 'cool-1', name: 'Arctic Liquid Freezer III 360 A-RGB', brand: 'Arctic', price: 747, asin: 'B0DLWFCVSD', search: 'Arctic+Liquid+Freezer+III+360+A-RGB+AIO', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-3', name: 'Corsair iCUE LINK H150i RGB', brand: 'Corsair', price: 741, asin: 'B0C6PWQ6L3', search: 'Corsair+iCUE+LINK+H150i+RGB+360mm+AIO', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-7', name: 'NZXT Kraken X73 RGB 360mm', brand: 'NZXT', price: 699, asin: 'B082DYKB1F', search: 'NZXT+Kraken+X73+RGB+360mm+AIO+CPU+Liquid+Cooler', image_url: null, type: 'AIO 360mm', tdpMax: 300, tier: 'high-end' },
    { id: 'cool-8', name: 'Corsair iCUE H150i Elite 360mm', brand: 'Corsair', price: 599, asin: 'B08G1Q3GZR', search: 'Corsair+iCUE+H150i+Elite+Capellix+360mm+AIO', image_url: null, type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-2', name: 'DeepCool LS720 SE', brand: 'DeepCool', price: 239, asin: 'B0BLYS73TK', search: 'DeepCool+LS720+SE+360mm+AIO+ARGB', image_url: null, type: 'AIO 360mm', tdpMax: 300, tier: 'mid-range' },
    // AIO 240mm
    { id: 'cool-9', name: 'Arctic Liquid Freezer II 240', brand: 'Arctic', price: 349, asin: 'B07WSDLRVP', search: 'Arctic+Liquid+Freezer+II+240mm+AIO+CPU+Cooler', image_url: null, type: 'AIO 240mm', tdpMax: 200, tier: 'mid-range' },
    // Air Tower
    { id: 'cool-4', name: 'Noctua NH-D15 chromax.Black', brand: 'Noctua', price: 349, asin: 'B07Y87YHRH', search: 'Noctua+NH-D15+chromax.Black+Dual+Tower+CPU+Cooler', image_url: null, type: 'Air Tower', tdpMax: 250, tier: 'high-end' },
    { id: 'cool-5', name: 'Thermalright PA 120 SE ARGB', brand: 'Thermalright', price: 199, asin: 'B09SDG4DFF', search: 'Thermalright+Peerless+Assassin+120+SE+ARGB', image_url: null, type: 'Air Tower', tdpMax: 200, tier: 'budget' },
    { id: 'cool-6', name: 'DeepCool AK400', brand: 'DeepCool', price: 99, asin: 'B0BB6W1JS3', search: 'DeepCool+AK400+Performance+CPU+Cooler+120mm', image_url: null, type: 'Air Tower', tdpMax: 150, tier: 'budget' },
    { id: 'cool-10', name: 'Cooler Master Hyper 212 Black', brand: 'CM', price: 149, asin: 'B07H25DYM3', search: 'Cooler+Master+Hyper+212+Black+Edition+CPU+Cooler', image_url: null, type: 'Air Tower', tdpMax: 150, tier: 'budget' },
    // New Coolers
    { id: 'cool-11', name: 'be quiet! Dark Rock Pro 5', brand: 'be quiet!', price: 449, asin: 'B0CJY3DYQ3', search: 'be+quiet+Dark+Rock+Pro+5+CPU+Cooler', image_url: null, type: 'Air Tower', tdpMax: 270, tier: 'high-end' },
    { id: 'cool-12', name: 'Thermalright Frozen Prism 360 ARGB', brand: 'Thermalright', price: 279, asin: 'B0C4FGZKFB', search: 'Thermalright+Frozen+Prism+360+ARGB+AIO', image_url: null, type: 'AIO 360mm', tdpMax: 300, tier: 'mid-range' },
    { id: 'cool-13', name: 'NZXT Kraken 240 RGB', brand: 'NZXT', price: 549, asin: 'B0BY3FJ4WQ', search: 'NZXT+Kraken+240+RGB+AIO+Cooler', image_url: null, type: 'AIO 240mm', tdpMax: 250, tier: 'mid-range' },
  ],

  // ═══════ Cases — 14 total ═══════
  case: [
    { id: 'case-1', name: 'Hyte Y70', brand: 'Hyte', price: 1283, asin: 'B0CX595GDJ', search: 'Hyte+Y70+Dual+Chamber+Mid+Tower+Case+Black', image_url: null, formFactor: 'Mid Tower', maxGPU: 430, tier: 'enthusiast' },
    { id: 'case-2', name: 'Lian Li O11 Dynamic EVO', brand: 'Lian Li', price: 599, asin: 'B09QHJZ7LK', search: 'Lian+Li+O11+Dynamic+EVO+Black+ATX+Mid+Tower', image_url: null, formFactor: 'Mid Tower', maxGPU: 420, tier: 'high-end' },
    { id: 'case-3', name: 'Fractal Design North', brand: 'Fractal', price: 687, asin: 'B09V878FXQ', search: 'Fractal+Design+North+Black+Mesh+Mid+Tower', image_url: null, formFactor: 'Mid Tower', maxGPU: 355, tier: 'high-end' },
    { id: 'case-4', name: 'Lian Li Lancool III', brand: 'Lian Li', price: 619, asin: 'B0B7NSQS5Q', search: 'Lian+Li+Lancool+III+White+ATX+Mid+Tower', image_url: null, formFactor: 'Mid Tower', maxGPU: 420, tier: 'mid-range' },
    { id: 'case-5', name: 'NZXT H7 Flow', brand: 'NZXT', price: 449, asin: 'B0B17JZCLB', search: 'NZXT+H7+Flow+ATX+Mid+Tower+White', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-6', name: 'Corsair 4000D Airflow', brand: 'Corsair', price: 349, asin: 'B08C7BGV3D', search: 'Corsair+4000D+Airflow+Tempered+Glass+Mid+Tower+Black', image_url: null, formFactor: 'Mid Tower', maxGPU: 360, tier: 'mid-range' },
    { id: 'case-7', name: 'Fractal Design Meshify 2', brand: 'Fractal', price: 499, asin: 'B0822Y6H34', search: 'Fractal+Design+Meshify+2+Black+ATX+Mid+Tower', image_url: null, formFactor: 'Mid Tower', maxGPU: 467, tier: 'high-end' },
    { id: 'case-8', name: 'Montech AIR 903 MAX', brand: 'Montech', price: 299, asin: 'B0C98RRPXL', search: 'Montech+AIR+903+MAX+E-ATX+Mid+Tower+ARGB', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'budget' },
    { id: 'case-9', name: 'NZXT H5 Flow', brand: 'NZXT', price: 299, asin: 'B0B6Y15C5L', search: 'NZXT+H5+Flow+Compact+ATX+Mid+Tower', image_url: null, formFactor: 'Mid Tower', maxGPU: 365, tier: 'budget' },
    { id: 'case-10', name: 'Montech AIR 903 BASE', brand: 'Montech', price: 239, asin: 'B0C98RFQXJ', search: 'Montech+AIR+903+BASE+Mid+Tower+Case', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'budget' },
    // New Cases
    { id: 'case-11', name: 'Corsair 5000D Airflow', brand: 'Corsair', price: 549, asin: 'B08M49WW51', search: 'Corsair+5000D+Airflow+Tempered+Glass+Mid+Tower', image_url: null, formFactor: 'Mid Tower', maxGPU: 400, tier: 'high-end' },
    { id: 'case-12', name: 'Lian Li LANCOOL 216', brand: 'Lian Li', price: 399, asin: 'B0BN3SY5XW', search: 'Lian+Li+LANCOOL+216+ATX+Mid+Tower', image_url: null, formFactor: 'Mid Tower', maxGPU: 392, tier: 'mid-range' },
    { id: 'case-13', name: 'be quiet! Pure Base 500DX', brand: 'be quiet!', price: 449, asin: 'B087D7DBW6', search: 'be+quiet+Pure+Base+500DX+ATX+Mid+Tower', image_url: null, formFactor: 'Mid Tower', maxGPU: 369, tier: 'mid-range' },
    { id: 'case-14', name: 'Hyte Y70 Touch', brand: 'Hyte', price: 899, asin: null, search: 'Hyte+Y70+Touch+Dual+Chamber+Mid+Tower+Case', image_url: null, formFactor: 'Mid Tower', maxGPU: 430, tier: 'enthusiast' },
  ],
};

// ═══════ SMART COMPATIBILITY ═══════

// Get compatible components based on current build
export function getCompatible(category, currentBuild) {
  const items = COMPONENTS[category] || [];
  if (!currentBuild) return items.map(c => ({ ...c, compatible: true, reason: null }));

  return items.map(component => {
    const issues = [];

    // Motherboard ↔ CPU socket
    if (category === 'motherboard' && currentBuild.cpu) {
      if (component.socket !== currentBuild.cpu.socket) {
        issues.push(`سوكت ${component.socket} مو متوافق مع المعالج (${currentBuild.cpu.socket})`);
      }
    }
    if (category === 'cpu' && currentBuild.motherboard) {
      if (component.socket !== currentBuild.motherboard.socket) {
        issues.push(`سوكت ${component.socket} مو متوافق مع اللوحة (${currentBuild.motherboard.socket})`);
      }
    }

    // RAM ↔ Motherboard type
    if (category === 'ram' && currentBuild.motherboard) {
      if (component.type !== currentBuild.motherboard.ramType) {
        issues.push(`${component.type} مو متوافق مع اللوحة (${currentBuild.motherboard.ramType})`);
      }
    }

    // PSU wattage check
    if (category === 'psu') {
      const needed = estimateWattage(currentBuild);
      if (component.watt < needed) {
        issues.push(`${component.watt}W أقل من المطلوب (~${needed}W)`);
      }
    }

    // Cooler TDP check
    if (category === 'cooler' && currentBuild.cpu) {
      if (component.tdpMax < currentBuild.cpu.tdp) {
        issues.push(`التبريد (${component.tdpMax}W max) ضعيف للمعالج (${currentBuild.cpu.tdp}W)`);
      }
    }

    return {
      ...component,
      compatible: issues.length === 0,
      reason: issues.length > 0 ? issues[0] : null,
    };
  });
}

// ═══════ WATTAGE CALCULATOR ═══════

export function estimateWattage(build) {
  let total = 50; // base system (fans, USB, etc.)
  if (build.cpu) total += build.cpu.tdp || 0;
  if (build.gpu) total += build.gpu.tdp || 0;
  if (build.ram) total += 10;
  if (build.ssd) total += 10;
  return Math.ceil(total * 1.2); // 20% headroom
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
  if (component.asin) {
    return `https://www.amazon.sa/dp/${component.asin}?tag=${TAG}`;
  }
  const search = component.search || encodeURIComponent(component.name);
  return `https://www.amazon.sa/s?k=${search}&tag=${TAG}`;
}

export function getAmazonCartLink(components) {
  // Link to Amazon search for all selected parts
  const names = Object.values(components).filter(Boolean).map(c => c.name).join(' ');
  return `https://www.amazon.sa/s?k=${encodeURIComponent(names)}&tag=${TAG}`;
}

// ═══════ PRESETS ═══════

export const PRESETS = [
  {
    key: 'budget', name: 'اقتصادية', icon: '🎮', color: '#10b981',
    budget: '3,500 - 5,000', desc: 'ألعاب 1080p + استخدام يومي',
    build: { cpu: 'cpu-4', gpu: 'gpu-20', motherboard: 'mb-15', ram: 'ram-6', ssd: 'ssd-7', psu: 'psu-8', cooler: 'cool-6', case: 'case-10' },
  },
  {
    key: 'midRange', name: 'متوسطة', icon: '⚡', color: '#3b82f6',
    budget: '7,000 - 9,000', desc: 'ألعاب 1440p + ستريم',
    build: { cpu: 'cpu-3', gpu: 'gpu-5', motherboard: 'mb-3', ram: 'ram-4', ssd: 'ssd-6', psu: 'psu-5', cooler: 'cool-2', case: 'case-6' },
  },
  {
    key: 'highEnd', name: 'عالية', icon: '🔥', color: '#8b5cf6',
    budget: '10,000 - 16,000', desc: 'ألعاب 4K + مونتاج + ستريم',
    build: { cpu: 'cpu-1', gpu: 'gpu-3', motherboard: 'mb-2', ram: 'ram-2', ssd: 'ssd-3', psu: 'psu-4', cooler: 'cool-1', case: 'case-2' },
  },
  {
    key: 'enthusiast', name: 'خرافية', icon: '💎', color: '#ff2d55',
    budget: '20,000+', desc: 'أقصى أداء بدون حدود',
    build: { cpu: 'cpu-1', gpu: 'gpu-1', motherboard: 'mb-1', ram: 'ram-1', ssd: 'ssd-1', psu: 'psu-1', cooler: 'cool-3', case: 'case-1' },
  },
];

// Get component by ID
export function getById(id) {
  for (const items of Object.values(COMPONENTS)) {
    const found = items.find(c => c.id === id);
    if (found) return found;
  }
  return null;
}

// Get all components flat (with type field added)
export function getAllComponents() {
  const all = [];
  for (const [type, items] of Object.entries(COMPONENTS)) {
    items.forEach(item => all.push({ ...item, type }));
  }
  return all;
}

// Load preset build
export function loadPreset(presetKey) {
  const preset = PRESETS.find(p => p.key === presetKey);
  if (!preset) return {};
  const build = {};
  for (const [cat, id] of Object.entries(preset.build)) {
    build[cat] = getById(id);
  }
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

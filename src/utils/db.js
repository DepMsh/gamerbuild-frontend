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
  cpu: [
    { id: 'cpu-1', name: 'AMD Ryzen 7 7800X3D', brand: 'AMD', price: 1349, asin: 'B0BTZB7F88', score: 95, socket: 'AM5', cores: 8, threads: 16, baseClock: 4.2, boostClock: 5.0, tdp: 120, tier: 'high-end' },
    { id: 'cpu-2', name: 'AMD Ryzen 5 7600X', brand: 'AMD', price: 699, asin: 'B0BBJMS1TN', score: 82, socket: 'AM5', cores: 6, threads: 12, baseClock: 4.7, boostClock: 5.3, tdp: 105, tier: 'mid-range' },
    { id: 'cpu-3', name: 'Intel Core i7-14700K', brand: 'Intel', price: 1449, asin: 'B0CGJ41C9W', score: 93, socket: 'LGA1700', cores: 20, threads: 28, baseClock: 3.4, boostClock: 5.6, tdp: 125, tier: 'high-end' },
    { id: 'cpu-4', name: 'Intel Core i5-14600K', brand: 'Intel', price: 999, asin: 'B0CGJ9STNF', score: 85, socket: 'LGA1700', cores: 14, threads: 20, baseClock: 3.5, boostClock: 5.3, tdp: 125, tier: 'mid-range' },
    { id: 'cpu-5', name: 'AMD Ryzen 9 7950X', brand: 'AMD', price: 1899, asin: 'B0BBHHT8LY', score: 98, socket: 'AM5', cores: 16, threads: 32, baseClock: 4.5, boostClock: 5.7, tdp: 170, tier: 'enthusiast' },
    { id: 'cpu-6', name: 'Intel Core i9-14900K', brand: 'Intel', price: 2249, asin: 'B0CGJDKLB8', score: 97, socket: 'LGA1700', cores: 24, threads: 32, baseClock: 3.2, boostClock: 6.0, tdp: 253, tier: 'enthusiast' },
    { id: 'cpu-7', name: 'AMD Ryzen 5 5600X', brand: 'AMD', price: 449, asin: 'B08166SLDF', score: 72, socket: 'AM4', cores: 6, threads: 12, baseClock: 3.7, boostClock: 4.6, tdp: 65, tier: 'budget' },
    { id: 'cpu-8', name: 'Intel Core i3-14100F', brand: 'Intel', price: 349, asin: 'B0CQ1MN1Y2', score: 58, socket: 'LGA1700', cores: 4, threads: 8, baseClock: 3.5, boostClock: 4.7, tdp: 58, tier: 'budget' },
    { id: 'cpu-9', name: 'AMD Ryzen 7 5800X3D', brand: 'AMD', price: 849, asin: 'B09VCJ2GHJ', score: 85, socket: 'AM4', cores: 8, threads: 16, baseClock: 3.4, boostClock: 4.5, tdp: 105, tier: 'mid-range' },
    { id: 'cpu-10', name: 'Intel Core i5-13600K', brand: 'Intel', price: 899, asin: 'B0BCDR9M33', score: 78, socket: 'LGA1700', cores: 14, threads: 20, baseClock: 3.5, boostClock: 5.1, tdp: 125, tier: 'mid-range' },
  ],

  gpu: [
    { id: 'gpu-1', name: 'NVIDIA RTX 4090', brand: 'NVIDIA', price: 7299, asin: 'B0BG94PS2F', search: 'MSI+GeForce+RTX+4090+Gaming+X+Trio+24G', score: 100, vram: 24, tdp: 450, tier: 'enthusiast' },
    { id: 'gpu-2', name: 'NVIDIA RTX 4070 Ti Super', brand: 'NVIDIA', price: 2899, asin: 'B0CSGCTMT2', search: 'MSI+RTX+4070+Ti+Super+16G+Gaming+X+Slim', score: 85, vram: 16, tdp: 285, tier: 'high-end' },
    { id: 'gpu-3', name: 'NVIDIA RTX 4070 Super', brand: 'NVIDIA', price: 2399, asin: 'B0CT8LQZ47', search: 'Nvidia+GeForce+RTX+4070+Super+Founders+Edition+12GB', score: 78, vram: 12, tdp: 220, tier: 'high-end' },
    { id: 'gpu-4', name: 'AMD RX 7900 XTX', brand: 'AMD', price: 3499, asin: 'B0BMWG9N16', search: 'PowerColor+AMD+Radeon+RX+7900+XTX+24GB', score: 88, vram: 24, tdp: 355, tier: 'high-end' },
    { id: 'gpu-5', name: 'NVIDIA RTX 4060 Ti', brand: 'NVIDIA', price: 1599, asin: 'B0C5B4XNWR', search: 'MSI+GeForce+RTX+4060+Ti+Ventus+2X+Black+8G+OC', score: 65, vram: 8, tdp: 160, tier: 'mid-range' },
    { id: 'gpu-6', name: 'AMD RX 7800 XT', brand: 'AMD', price: 1799, asin: 'B0CGRMJF6C', search: 'Gigabyte+Radeon+RX+7800+XT+Gaming+OC+16G', score: 72, vram: 16, tdp: 263, tier: 'mid-range' },
    { id: 'gpu-7', name: 'NVIDIA RTX 4060', brand: 'NVIDIA', price: 1199, asin: 'B0C8BPW1SP', search: 'MSI+GeForce+RTX+4060+Ventus+2X+Black+8G+OC', score: 55, vram: 8, tdp: 115, tier: 'budget' },
    { id: 'gpu-8', name: 'AMD RX 7600', brand: 'AMD', price: 999, asin: 'B0C488N4BF', search: 'PowerColor+Fighter+AMD+Radeon+RX+7600+8GB', score: 50, vram: 8, tdp: 165, tier: 'budget' },
    { id: 'gpu-9', name: 'NVIDIA RTX 4080 Super', brand: 'NVIDIA', price: 4199, asin: 'B0CSJYJRKD', search: 'Gigabyte+GeForce+RTX+4080+Super+Gaming+OC+16G', score: 93, vram: 16, tdp: 320, tier: 'enthusiast' },
  ],

  motherboard: [
    { id: 'mb-1', name: 'ASUS ROG Strix X670E-E', brand: 'ASUS', price: 1799, asin: 'B0BDTHQTJV', search: 'ASUS+ROG+Strix+X670E-E+Gaming+WiFi+AM5', socket: 'AM5', chipset: 'X670E', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 4, wifi: true, tier: 'high-end' },
    { id: 'mb-2', name: 'MSI MAG B650 Tomahawk', brand: 'MSI', price: 749, asin: 'B0BHCCNSRH', search: 'MSI+MAG+B650+Tomahawk+WiFi+DDR5+AM5', socket: 'AM5', chipset: 'B650', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-3', name: 'ASUS ROG Maximus Z790 Hero', brand: 'ASUS', price: 2299, asin: 'B0BG6M53DG', search: 'ASUS+ROG+Maximus+Z790+Hero+WiFi+6E+DDR5', socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 5, wifi: true, tier: 'enthusiast' },
    { id: 'mb-4', name: 'MSI PRO B760M-A', brand: 'MSI', price: 399, asin: 'B0C15VWF1H', search: 'MSI+PRO+B760M-A+WiFi+DDR5+LGA1700', socket: 'LGA1700', chipset: 'B760', formFactor: 'mATX', ramType: 'DDR5', ramSlots: 2, maxRam: 64, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-5', name: 'Gigabyte B650 AORUS Elite AX', brand: 'Gigabyte', price: 699, asin: 'B0BH7GTY9C', search: 'Gigabyte+B650+AORUS+Elite+AX+AM5+DDR5+WiFi+6E', socket: 'AM5', chipset: 'B650', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: true, tier: 'mid-range' },
    { id: 'mb-6', name: 'MSI MAG B550 Tomahawk', brand: 'MSI', price: 499, asin: 'B089CWDHFZ', search: 'MSI+MAG+B550+Tomahawk+Gaming+AM4+DDR4', socket: 'AM4', chipset: 'B550', formFactor: 'ATX', ramType: 'DDR4', ramSlots: 4, maxRam: 128, m2Slots: 2, wifi: false, tier: 'budget' },
    { id: 'mb-7', name: 'MSI MAG Z790 Tomahawk', brand: 'MSI', price: 1199, asin: 'B0BL8K1YH1', search: 'MSI+MAG+Z790+Tomahawk+WiFi+DDR5+LGA1700', socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ramType: 'DDR5', ramSlots: 4, maxRam: 128, m2Slots: 4, wifi: true, tier: 'high-end' },
  ],

  ram: [
    { id: 'ram-1', name: 'G.Skill Trident Z5 RGB 32GB', brand: 'G.Skill', price: 499, asin: 'B0BFCV7JZ8', search: 'G.Skill+Trident+Z5+NEO+32GB+DDR5+6000MHz+CL30+2x16GB', type: 'DDR5', size: 32, speed: 6000, latency: 'CL30', modules: '2x16GB', tier: 'high-end' },
    { id: 'ram-2', name: 'Corsair Vengeance 32GB DDR5', brand: 'Corsair', price: 399, asin: 'B09WH64X5M', search: 'Corsair+Vengeance+DDR5+32GB+5600MHz+CL36+2x16GB', type: 'DDR5', size: 32, speed: 5600, latency: 'CL36', modules: '2x16GB', tier: 'mid-range' },
    { id: 'ram-3', name: 'Kingston Fury Beast 16GB DDR5', brand: 'Kingston', price: 199, asin: 'B09T97ZSVB', search: 'Kingston+Fury+Beast+16GB+5200MT+DDR5+CL40+2x8GB', type: 'DDR5', size: 16, speed: 5200, latency: 'CL40', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-4', name: 'G.Skill Trident Z5 RGB 64GB', brand: 'G.Skill', price: 899, asin: 'B0BJ7X9P1W', search: 'G.Skill+Trident+Z5+RGB+64GB+DDR5+6400+CL32+2x32GB', type: 'DDR5', size: 64, speed: 6400, latency: 'CL32', modules: '2x32GB', tier: 'enthusiast' },
    { id: 'ram-5', name: 'Corsair Vengeance 16GB DDR4', brand: 'Corsair', price: 149, asin: 'B0143UM4TC', search: 'Corsair+Vengeance+LPX+16GB+DDR4+3200+CL16+2x8GB', type: 'DDR4', size: 16, speed: 3200, latency: 'CL16', modules: '2x8GB', tier: 'budget' },
    { id: 'ram-6', name: 'G.Skill Ripjaws V 32GB DDR4', brand: 'G.Skill', price: 299, asin: 'B081374T3G', search: 'G.Skill+Ripjaws+V+32GB+DDR4+3600+CL18+2x16GB', type: 'DDR4', size: 32, speed: 3600, latency: 'CL18', modules: '2x16GB', tier: 'mid-range' },
  ],

  ssd: [
    { id: 'ssd-1', name: 'Samsung 990 Pro 1TB', brand: 'Samsung', price: 449, asin: 'B0BHJF2VRN', search: 'Samsung+990+PRO+1TB+PCIe+Gen4+NVMe+M.2', interface: 'NVMe Gen4', capacity: 1000, read: 7450, write: 6900, tier: 'high-end' },
    { id: 'ssd-2', name: 'Samsung 990 Pro 2TB', brand: 'Samsung', price: 749, asin: 'B0BHJJ9Y77', search: 'Samsung+990+PRO+2TB+PCIe+Gen4+NVMe+M.2', interface: 'NVMe Gen4', capacity: 2000, read: 7450, write: 6900, tier: 'enthusiast' },
    { id: 'ssd-3', name: 'WD Black SN850X 1TB', brand: 'WD', price: 349, asin: 'B0B7CKVCCV', search: 'WD_BLACK+SN850X+1TB+NVMe+Gen4+SSD', interface: 'NVMe Gen4', capacity: 1000, read: 7300, write: 6300, tier: 'high-end' },
    { id: 'ssd-4', name: 'Kingston NV2 1TB', brand: 'Kingston', price: 199, asin: 'B0BBWH1R8H', search: 'Kingston+NV2+1TB+M.2+2280+PCIe+4.0+NVMe', interface: 'NVMe Gen4', capacity: 1000, read: 3500, write: 2100, tier: 'budget' },
    { id: 'ssd-5', name: 'Samsung 980 Pro 500GB', brand: 'Samsung', price: 249, asin: 'B08GL575DB', search: 'Samsung+980+PRO+500GB+PCIe+NVMe+Gen4+M.2', interface: 'NVMe Gen4', capacity: 500, read: 7000, write: 5000, tier: 'budget' },
    { id: 'ssd-6', name: 'Crucial T700 2TB', brand: 'Crucial', price: 999, asin: 'B0C3K7MTSY', search: 'Crucial+T700+2TB+Gen5+NVMe+M.2+SSD', interface: 'NVMe Gen5', capacity: 2000, read: 12400, write: 11800, tier: 'enthusiast' },
  ],

  psu: [
    { id: 'psu-1', name: 'Corsair RM1000x', brand: 'Corsair', price: 699, asin: 'B0D9C1HG19', search: 'Corsair+RM1000x+1000W+80+Plus+Gold+Fully+Modular', watt: 1000, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
    { id: 'psu-2', name: 'Seasonic Focus GX-850', brand: 'Seasonic', price: 479, asin: 'B073H3ZZQZ', search: 'Seasonic+Focus+GX-850+850W+80+Plus+Gold+Full+Modular', watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-3', name: 'EVGA 700 BR', brand: 'EVGA', price: 199, asin: 'B07DTP6MWS', search: 'EVGA+700+BR+80+Plus+Bronze+700W+Power+Supply', watt: 700, rating: '80+ Bronze', modular: 'Non', tier: 'budget' },
    { id: 'psu-4', name: 'be quiet! Dark Power 13 1000W', brand: 'be quiet!', price: 999, asin: 'B0BV6CWS2Z', search: 'be+quiet+Dark+Power+13+1000W+80+Plus+Titanium', watt: 1000, rating: '80+ Titanium', modular: 'Full', tier: 'enthusiast' },
    { id: 'psu-5', name: 'Corsair RM750x', brand: 'Corsair', price: 399, asin: 'B079HGN5QS', search: 'Corsair+RM750x+750W+80+Plus+Gold+Fully+Modular', watt: 750, rating: '80+ Gold', modular: 'Full', tier: 'mid-range' },
    { id: 'psu-6', name: 'Corsair RM850x', brand: 'Corsair', price: 549, asin: 'B08R5JPTMZ', search: 'Corsair+RM850x+850W+80+Plus+Gold+Fully+Modular', watt: 850, rating: '80+ Gold', modular: 'Full', tier: 'high-end' },
  ],

  cooler: [
    { id: 'cool-1', name: 'NZXT Kraken X73 RGB 360mm', brand: 'NZXT', price: 699, asin: 'B082DYKB1F', search: 'NZXT+Kraken+X73+RGB+360mm+AIO+CPU+Liquid+Cooler', type: 'AIO 360mm', tdpMax: 300, tier: 'high-end' },
    { id: 'cool-2', name: 'Noctua NH-D15', brand: 'Noctua', price: 349, asin: 'B07Y87YHRH', search: 'Noctua+NH-D15+chromax.Black+Dual+Tower+CPU+Cooler', type: 'Air Tower', tdpMax: 250, tier: 'high-end' },
    { id: 'cool-3', name: 'DeepCool AK400', brand: 'DeepCool', price: 99, asin: 'B0BB6W1JS3', search: 'DeepCool+AK400+Performance+CPU+Cooler+120mm', type: 'Air Tower', tdpMax: 150, tier: 'budget' },
    { id: 'cool-4', name: 'Corsair iCUE H150i Elite 360mm', brand: 'Corsair', price: 599, asin: 'B08G1Q3GZR', search: 'Corsair+iCUE+H150i+Elite+Capellix+360mm+AIO', type: 'AIO 360mm', tdpMax: 350, tier: 'high-end' },
    { id: 'cool-5', name: 'Arctic Liquid Freezer II 240', brand: 'Arctic', price: 349, asin: 'B07WSDLRVP', search: 'Arctic+Liquid+Freezer+II+240mm+AIO+CPU+Cooler', type: 'AIO 240mm', tdpMax: 200, tier: 'mid-range' },
    { id: 'cool-6', name: 'Cooler Master Hyper 212', brand: 'CM', price: 149, asin: 'B07H25DYM3', search: 'Cooler+Master+Hyper+212+Black+Edition+CPU+Cooler', type: 'Air Tower', tdpMax: 150, tier: 'budget' },
  ],

  case: [
    { id: 'case-1', name: 'Lian Li O11 Dynamic EVO', brand: 'Lian Li', price: 599, asin: 'B09QHJZ7LK', search: 'Lian+Li+O11+Dynamic+EVO+Black+ATX+Mid+Tower', formFactor: 'Mid Tower', maxGPU: 420, tier: 'high-end' },
    { id: 'case-2', name: 'NZXT H7 Flow', brand: 'NZXT', price: 449, asin: 'B0B17JZCLB', search: 'NZXT+H7+Flow+ATX+Mid+Tower+White', formFactor: 'Mid Tower', maxGPU: 400, tier: 'mid-range' },
    { id: 'case-3', name: 'Corsair 4000D Airflow', brand: 'Corsair', price: 349, asin: 'B08C7BGV3D', search: 'Corsair+4000D+Airflow+Tempered+Glass+Mid+Tower+Black', formFactor: 'Mid Tower', maxGPU: 360, tier: 'mid-range' },
    { id: 'case-4', name: 'Fractal Design Meshify 2', brand: 'Fractal', price: 499, asin: 'B0822Y6H34', search: 'Fractal+Design+Meshify+2+Black+ATX+Mid+Tower', formFactor: 'Mid Tower', maxGPU: 467, tier: 'high-end' },
    { id: 'case-5', name: 'NZXT H5 Flow', brand: 'NZXT', price: 299, asin: 'B0B6Y15C5L', search: 'NZXT+H5+Flow+Compact+ATX+Mid+Tower', formFactor: 'Mid Tower', maxGPU: 365, tier: 'budget' },
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
  return 1000;
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
    budget: '3,000 - 4,500', desc: 'ألعاب 1080p + استخدام يومي',
    build: { cpu: 'cpu-8', gpu: 'gpu-8', motherboard: 'mb-4', ram: 'ram-3', ssd: 'ssd-4', psu: 'psu-3', cooler: 'cool-3', case: 'case-5' },
  },
  {
    key: 'midRange', name: 'متوسطة', icon: '⚡', color: '#3b82f6',
    budget: '5,000 - 8,000', desc: 'ألعاب 1440p + ستريم',
    build: { cpu: 'cpu-2', gpu: 'gpu-6', motherboard: 'mb-2', ram: 'ram-2', ssd: 'ssd-3', psu: 'psu-2', cooler: 'cool-5', case: 'case-3' },
  },
  {
    key: 'highEnd', name: 'عالية', icon: '🔥', color: '#8b5cf6',
    budget: '9,000 - 14,000', desc: 'ألعاب 4K + مونتاج + ستريم',
    build: { cpu: 'cpu-1', gpu: 'gpu-2', motherboard: 'mb-1', ram: 'ram-1', ssd: 'ssd-1', psu: 'psu-6', cooler: 'cool-1', case: 'case-1' },
  },
  {
    key: 'enthusiast', name: 'خرافية', icon: '💎', color: '#ff2d55',
    budget: '15,000+', desc: 'أقصى أداء بدون حدود',
    build: { cpu: 'cpu-5', gpu: 'gpu-1', motherboard: 'mb-1', ram: 'ram-4', ssd: 'ssd-6', psu: 'psu-4', cooler: 'cool-4', case: 'case-4' },
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

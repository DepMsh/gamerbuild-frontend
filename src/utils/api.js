const API_BASE = import.meta.env.VITE_API_URL || 'https://walrus-app-38wan.ondigitalocean.app';

// Track API connectivity
let apiAvailable = null; // null = unknown, true/false after first attempt

async function fetchAPI(endpoint, options = {}) {
  // If we already know API is down, skip and use fallback immediately
  if (apiAvailable === false) {
    throw new Error('API offline — using local data');
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      ...options,
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    apiAvailable = true;
    return await res.json();
  } catch (err) {
    // Detect CORS or network errors
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      console.warn(`⚠️ CORS/Network error on ${endpoint} — make sure backend has CORS headers`);
      console.warn('💡 Add CORSMiddleware to FastAPI: allow_origins=["*"]');
      apiAvailable = false;
    } else if (err.name === 'AbortError') {
      console.warn(`⏱️ API timeout on ${endpoint}`);
      apiAvailable = false;
    }
    console.error(`Failed to fetch ${endpoint}:`, err);
    throw err;
  }
}

// Check if API is reachable (call on app startup)
export async function checkAPIHealth() {
  try {
    const res = await fetch(`${API_BASE}/`, { method: 'HEAD', mode: 'cors' });
    apiAvailable = res.ok;
  } catch {
    apiAvailable = false;
    console.warn('🔌 API unreachable — running in demo mode with local data');
  }
  return apiAvailable;
}

export function isAPIAvailable() {
  return apiAvailable;
}

export const api = {
  // Components
  getComponents: (type) => fetchAPI(`/api/components${type ? `?type=${type}` : ''}`),
  getComponent: (id) => fetchAPI(`/api/components/${id}`),
  
  // Smart Build
  smartBuild: (budget, usage) => fetchAPI('/api/smart-build', {
    method: 'POST',
    body: JSON.stringify({ budget, usage }),
  }),
  
  // Compatibility
  checkCompatibility: (components) => fetchAPI('/api/compatibility', {
    method: 'POST',
    body: JSON.stringify({ components }),
  }),
  
  // Compare
  compare: (ids) => fetchAPI(`/api/compare?ids=${ids.join(',')}`),
  
  // Deals
  getDeals: () => fetchAPI('/api/deals'),
  
  // Benchmarks
  getBenchmarks: (id) => fetchAPI(`/api/benchmarks/${id}`),
  
  // Stores
  getStores: () => fetchAPI('/api/stores'),
};

// Fallback data for when API is unavailable (demo mode)
export const DEMO_DATA = {
  cpus: [
    { id: 'cpu-1', name: 'AMD Ryzen 7 7800X3D', type: 'cpu', brand: 'AMD', price: 1289, image: null, specs: { cores: 8, threads: 16, base_clock: '4.2 GHz', boost_clock: '5.0 GHz', tdp: '120W', socket: 'AM5' }, benchmark_score: 95, tier: 'high-end' },
    { id: 'cpu-2', name: 'AMD Ryzen 5 7600X', type: 'cpu', brand: 'AMD', price: 679, image: null, specs: { cores: 6, threads: 12, base_clock: '4.7 GHz', boost_clock: '5.3 GHz', tdp: '105W', socket: 'AM5' }, benchmark_score: 82, tier: 'mid-range' },
    { id: 'cpu-3', name: 'Intel Core i7-14700K', type: 'cpu', brand: 'Intel', price: 1399, image: null, specs: { cores: 20, threads: 28, base_clock: '3.4 GHz', boost_clock: '5.6 GHz', tdp: '125W', socket: 'LGA1700' }, benchmark_score: 93, tier: 'high-end' },
    { id: 'cpu-4', name: 'Intel Core i5-14600K', type: 'cpu', brand: 'Intel', price: 969, image: null, specs: { cores: 14, threads: 20, base_clock: '3.5 GHz', boost_clock: '5.3 GHz', tdp: '125W', socket: 'LGA1700' }, benchmark_score: 85, tier: 'mid-range' },
    { id: 'cpu-5', name: 'AMD Ryzen 9 7950X', type: 'cpu', brand: 'AMD', price: 1849, image: null, specs: { cores: 16, threads: 32, base_clock: '4.5 GHz', boost_clock: '5.7 GHz', tdp: '170W', socket: 'AM5' }, benchmark_score: 98, tier: 'enthusiast' },
    { id: 'cpu-6', name: 'Intel Core i9-14900K', type: 'cpu', brand: 'Intel', price: 2199, image: null, specs: { cores: 24, threads: 32, base_clock: '3.2 GHz', boost_clock: '6.0 GHz', tdp: '125W', socket: 'LGA1700' }, benchmark_score: 97, tier: 'enthusiast' },
    { id: 'cpu-7', name: 'AMD Ryzen 5 5600X', type: 'cpu', brand: 'AMD', price: 429, image: null, specs: { cores: 6, threads: 12, base_clock: '3.7 GHz', boost_clock: '4.6 GHz', tdp: '65W', socket: 'AM4' }, benchmark_score: 72, tier: 'budget' },
    { id: 'cpu-8', name: 'Intel Core i3-14100F', type: 'cpu', brand: 'Intel', price: 329, image: null, specs: { cores: 4, threads: 8, base_clock: '3.5 GHz', boost_clock: '4.7 GHz', tdp: '58W', socket: 'LGA1700' }, benchmark_score: 58, tier: 'budget' },
  ],
  gpus: [
    { id: 'gpu-1', name: 'NVIDIA RTX 4090', type: 'gpu', brand: 'NVIDIA', price: 6999, image: null, specs: { vram: '24GB GDDR6X', boost_clock: '2520 MHz', tdp: '450W', ray_tracing: true, dlss: '3.0' }, benchmark_score: 100, tier: 'enthusiast' },
    { id: 'gpu-2', name: 'NVIDIA RTX 4070 Ti Super', type: 'gpu', brand: 'NVIDIA', price: 2849, image: null, specs: { vram: '16GB GDDR6X', boost_clock: '2610 MHz', tdp: '285W', ray_tracing: true, dlss: '3.0' }, benchmark_score: 85, tier: 'high-end' },
    { id: 'gpu-3', name: 'NVIDIA RTX 4070 Super', type: 'gpu', brand: 'NVIDIA', price: 2349, image: null, specs: { vram: '12GB GDDR6X', boost_clock: '2475 MHz', tdp: '220W', ray_tracing: true, dlss: '3.0' }, benchmark_score: 78, tier: 'high-end' },
    { id: 'gpu-4', name: 'AMD RX 7900 XTX', type: 'gpu', brand: 'AMD', price: 3399, image: null, specs: { vram: '24GB GDDR6', boost_clock: '2500 MHz', tdp: '355W', ray_tracing: true, fsr: '3.0' }, benchmark_score: 88, tier: 'high-end' },
    { id: 'gpu-5', name: 'NVIDIA RTX 4060 Ti', type: 'gpu', brand: 'NVIDIA', price: 1549, image: null, specs: { vram: '8GB GDDR6', boost_clock: '2535 MHz', tdp: '160W', ray_tracing: true, dlss: '3.0' }, benchmark_score: 65, tier: 'mid-range' },
    { id: 'gpu-6', name: 'AMD RX 7800 XT', type: 'gpu', brand: 'AMD', price: 1749, image: null, specs: { vram: '16GB GDDR6', boost_clock: '2430 MHz', tdp: '263W', ray_tracing: true, fsr: '3.0' }, benchmark_score: 72, tier: 'mid-range' },
    { id: 'gpu-7', name: 'NVIDIA RTX 4060', type: 'gpu', brand: 'NVIDIA', price: 1149, image: null, specs: { vram: '8GB GDDR6', boost_clock: '2460 MHz', tdp: '115W', ray_tracing: true, dlss: '3.0' }, benchmark_score: 55, tier: 'budget' },
    { id: 'gpu-8', name: 'AMD RX 7600', type: 'gpu', brand: 'AMD', price: 949, image: null, specs: { vram: '8GB GDDR6', boost_clock: '2655 MHz', tdp: '165W', ray_tracing: true, fsr: '3.0' }, benchmark_score: 50, tier: 'budget' },
  ],
  motherboards: [
    { id: 'mb-1', name: 'ASUS ROG Strix X670E-E', type: 'motherboard', brand: 'ASUS', price: 1749, specs: { socket: 'AM5', chipset: 'X670E', form_factor: 'ATX', ram_slots: 4, max_ram: '128GB DDR5', m2_slots: 4, wifi: true }, tier: 'high-end' },
    { id: 'mb-2', name: 'MSI MAG B650 Tomahawk', type: 'motherboard', brand: 'MSI', price: 729, specs: { socket: 'AM5', chipset: 'B650', form_factor: 'ATX', ram_slots: 4, max_ram: '128GB DDR5', m2_slots: 2, wifi: true }, tier: 'mid-range' },
    { id: 'mb-3', name: 'ASUS ROG Maximus Z790 Hero', type: 'motherboard', brand: 'ASUS', price: 2249, specs: { socket: 'LGA1700', chipset: 'Z790', form_factor: 'ATX', ram_slots: 4, max_ram: '128GB DDR5', m2_slots: 5, wifi: true }, tier: 'enthusiast' },
    { id: 'mb-4', name: 'MSI PRO B760M-A', type: 'motherboard', brand: 'MSI', price: 389, specs: { socket: 'LGA1700', chipset: 'B760', form_factor: 'mATX', ram_slots: 2, max_ram: '64GB DDR5', m2_slots: 2, wifi: false }, tier: 'budget' },
    { id: 'mb-5', name: 'Gigabyte B650 AORUS Elite AX', type: 'motherboard', brand: 'Gigabyte', price: 679, specs: { socket: 'AM5', chipset: 'B650', form_factor: 'ATX', ram_slots: 4, max_ram: '128GB DDR5', m2_slots: 2, wifi: true }, tier: 'mid-range' },
  ],
  ram: [
    { id: 'ram-1', name: 'G.Skill Trident Z5 RGB 32GB', type: 'ram', brand: 'G.Skill', price: 479, specs: { capacity: '32GB (2x16GB)', speed: 'DDR5-6000', latency: 'CL30', rgb: true }, tier: 'high-end' },
    { id: 'ram-2', name: 'Corsair Vengeance 32GB', type: 'ram', brand: 'Corsair', price: 389, specs: { capacity: '32GB (2x16GB)', speed: 'DDR5-5600', latency: 'CL36', rgb: false }, tier: 'mid-range' },
    { id: 'ram-3', name: 'Kingston Fury Beast 16GB', type: 'ram', brand: 'Kingston', price: 189, specs: { capacity: '16GB (2x8GB)', speed: 'DDR5-5200', latency: 'CL40', rgb: false }, tier: 'budget' },
    { id: 'ram-4', name: 'G.Skill Trident Z5 RGB 64GB', type: 'ram', brand: 'G.Skill', price: 869, specs: { capacity: '64GB (2x32GB)', speed: 'DDR5-6400', latency: 'CL32', rgb: true }, tier: 'enthusiast' },
  ],
  psu: [
    { id: 'psu-1', name: 'Corsair RM1000x', type: 'psu', brand: 'Corsair', price: 679, specs: { wattage: '1000W', efficiency: '80+ Gold', modular: 'Full', fan_size: '135mm' }, tier: 'high-end' },
    { id: 'psu-2', name: 'Seasonic Focus GX-850', type: 'psu', brand: 'Seasonic', price: 469, specs: { wattage: '850W', efficiency: '80+ Gold', modular: 'Full', fan_size: '120mm' }, tier: 'mid-range' },
    { id: 'psu-3', name: 'EVGA 700 BR', type: 'psu', brand: 'EVGA', price: 189, specs: { wattage: '700W', efficiency: '80+ Bronze', modular: 'Non', fan_size: '120mm' }, tier: 'budget' },
    { id: 'psu-4', name: 'be quiet! Dark Power 13 1000W', type: 'psu', brand: 'be quiet!', price: 979, specs: { wattage: '1000W', efficiency: '80+ Titanium', modular: 'Full', fan_size: '135mm' }, tier: 'enthusiast' },
  ],
  coolers: [
    { id: 'cool-1', name: 'NZXT Kraken X73 RGB', type: 'cooler', brand: 'NZXT', price: 679, specs: { type: 'AIO Liquid', radiator: '360mm', fans: 3, noise: '21-36 dBA', rgb: true }, tier: 'high-end' },
    { id: 'cool-2', name: 'Noctua NH-D15', type: 'cooler', brand: 'Noctua', price: 339, specs: { type: 'Air Tower', radiator: null, fans: 2, noise: '19-24 dBA', rgb: false }, tier: 'high-end' },
    { id: 'cool-3', name: 'DeepCool AK400', type: 'cooler', brand: 'DeepCool', price: 95, specs: { type: 'Air Tower', radiator: null, fans: 1, noise: '25 dBA', rgb: false }, tier: 'budget' },
    { id: 'cool-4', name: 'Corsair iCUE H150i Elite', type: 'cooler', brand: 'Corsair', price: 579, specs: { type: 'AIO Liquid', radiator: '360mm', fans: 3, noise: '10-36 dBA', rgb: true }, tier: 'high-end' },
  ],
  cases: [
    { id: 'case-1', name: 'Lian Li O11 Dynamic EVO', type: 'case', brand: 'Lian Li', price: 579, specs: { form_factor: 'Mid Tower', motherboard: 'ATX/mATX/ITX', gpu_length: '420mm', fans_included: 0, tempered_glass: true }, tier: 'high-end' },
    { id: 'case-2', name: 'NZXT H7 Flow', type: 'case', brand: 'NZXT', price: 429, specs: { form_factor: 'Mid Tower', motherboard: 'ATX/mATX/ITX', gpu_length: '400mm', fans_included: 2, tempered_glass: true }, tier: 'mid-range' },
    { id: 'case-3', name: 'Corsair 4000D Airflow', type: 'case', brand: 'Corsair', price: 339, specs: { form_factor: 'Mid Tower', motherboard: 'ATX/mATX/ITX', gpu_length: '360mm', fans_included: 2, tempered_glass: true }, tier: 'mid-range' },
    { id: 'case-4', name: 'Fractal Design Meshify 2', type: 'case', brand: 'Fractal', price: 489, specs: { form_factor: 'Mid Tower', motherboard: 'ATX/mATX/ITX', gpu_length: '467mm', fans_included: 3, tempered_glass: true }, tier: 'high-end' },
  ],
  stores: [
    { id: 'store-1', name: 'حاسبات العرب', name_en: 'Arab Computers', url: 'https://arabcomp.sa', logo: null, rating: 4.5 },
    { id: 'store-2', name: 'جرير', name_en: 'Jarir', url: 'https://jarir.com', logo: null, rating: 4.3 },
    { id: 'store-3', name: 'اكسترا', name_en: 'Extra', url: 'https://extra.com', logo: null, rating: 4.1 },
    { id: 'store-4', name: 'نون', name_en: 'Noon', url: 'https://noon.com', logo: null, rating: 4.0 },
    { id: 'store-5', name: 'أمازون السعودية', name_en: 'Amazon SA', url: 'https://amazon.sa', logo: null, rating: 4.4 },
  ],
  smartBuilds: {
    budget: {
      name: 'تجميعة اقتصادية',
      budget: '3,000 - 4,500 ريال',
      usage: 'ألعاب 1080p + استخدام يومي',
      components: ['cpu-8', 'gpu-8', 'mb-4', 'ram-3', 'psu-3', 'cool-3', 'case-3'],
    },
    midRange: {
      name: 'تجميعة متوسطة',
      budget: '5,000 - 8,000 ريال',
      usage: 'ألعاب 1440p + ستريم',
      components: ['cpu-2', 'gpu-6', 'mb-2', 'ram-2', 'psu-2', 'cool-2', 'case-2'],
    },
    highEnd: {
      name: 'تجميعة عالية',
      budget: '9,000 - 14,000 ريال',
      usage: 'ألعاب 4K + مونتاج + ستريم',
      components: ['cpu-1', 'gpu-2', 'mb-1', 'ram-1', 'psu-1', 'cool-1', 'case-1'],
    },
    enthusiast: {
      name: 'تجميعة خرافية',
      budget: '15,000+ ريال',
      usage: 'أقصى أداء بدون حدود',
      components: ['cpu-5', 'gpu-1', 'mb-1', 'ram-4', 'psu-4', 'cool-4', 'case-4'],
    },
  },
};

// Helper to get all components from demo data
export function getAllDemoComponents() {
  return [
    ...DEMO_DATA.cpus,
    ...DEMO_DATA.gpus,
    ...DEMO_DATA.motherboards,
    ...DEMO_DATA.ram,
    ...DEMO_DATA.psu,
    ...DEMO_DATA.coolers,
    ...DEMO_DATA.cases,
  ];
}

export function getDemoComponentById(id) {
  return getAllDemoComponents().find(c => c.id === id);
}

export function getDemoComponentsByType(type) {
  const map = {
    cpu: DEMO_DATA.cpus,
    gpu: DEMO_DATA.gpus,
    motherboard: DEMO_DATA.motherboards,
    ram: DEMO_DATA.ram,
    psu: DEMO_DATA.psu,
    cooler: DEMO_DATA.coolers,
    case: DEMO_DATA.cases,
  };
  return map[type] || [];
}

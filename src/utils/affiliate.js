// PCBux Affiliate System
// Amazon Associates Tag: meshal039-21

const AMAZON_TAG = 'meshal039-21';

// Amazon.sa product ASINs / search mappings
const PRODUCT_LINKS = {
  // CPUs
  'cpu-1': { asin: 'B0BTZB7F88', search: 'AMD+Ryzen+7+7800X3D' },
  'cpu-2': { asin: 'B0BBJMS1TN', search: 'AMD+Ryzen+5+7600X' },
  'cpu-3': { asin: 'B0CCZML5NR', search: 'Intel+Core+i7+14700K' },
  'cpu-4': { asin: 'B0CGJ4MLC4', search: 'Intel+Core+i5+14600K' },
  'cpu-5': { asin: 'B0BBHHT8LY', search: 'AMD+Ryzen+9+7950X' },
  'cpu-6': { asin: 'B0CGJDNTL3', search: 'Intel+Core+i9+14900K' },
  'cpu-7': { asin: 'B08166SLDF', search: 'AMD+Ryzen+5+5600X' },
  'cpu-8': { asin: 'B0CGJDKLH8', search: 'Intel+Core+i3+14100F' },

  // GPUs
  'gpu-1': { asin: null, search: 'RTX+4090+graphics+card' },
  'gpu-2': { asin: null, search: 'RTX+4070+Ti+Super+graphics+card' },
  'gpu-3': { asin: null, search: 'RTX+4070+Super+graphics+card' },
  'gpu-4': { asin: null, search: 'RX+7900+XTX+graphics+card' },
  'gpu-5': { asin: null, search: 'RTX+4060+Ti+graphics+card' },
  'gpu-6': { asin: null, search: 'RX+7800+XT+graphics+card' },
  'gpu-7': { asin: null, search: 'RTX+4060+graphics+card' },
  'gpu-8': { asin: null, search: 'RX+7600+graphics+card' },

  // Motherboards
  'mb-1': { asin: null, search: 'ASUS+ROG+Strix+X670E' },
  'mb-2': { asin: null, search: 'MSI+MAG+B650+Tomahawk' },
  'mb-3': { asin: null, search: 'ASUS+ROG+Maximus+Z790+Hero' },
  'mb-4': { asin: null, search: 'MSI+PRO+B760M' },
  'mb-5': { asin: null, search: 'Gigabyte+B650+AORUS+Elite' },

  // RAM
  'ram-1': { asin: null, search: 'G.Skill+Trident+Z5+32GB+DDR5+6000' },
  'ram-2': { asin: null, search: 'Corsair+Vengeance+32GB+DDR5+5600' },
  'ram-3': { asin: null, search: 'Kingston+Fury+Beast+16GB+DDR5' },
  'ram-4': { asin: null, search: 'G.Skill+Trident+Z5+64GB+DDR5' },

  // PSU
  'psu-1': { asin: null, search: 'Corsair+RM1000x+power+supply' },
  'psu-2': { asin: null, search: 'Seasonic+Focus+GX+850' },
  'psu-3': { asin: null, search: 'EVGA+700+BR+power+supply' },
  'psu-4': { asin: null, search: 'be+quiet+Dark+Power+13+1000W' },

  // Coolers
  'cool-1': { asin: null, search: 'NZXT+Kraken+X73+RGB' },
  'cool-2': { asin: null, search: 'Noctua+NH-D15' },
  'cool-3': { asin: null, search: 'DeepCool+AK400' },
  'cool-4': { asin: null, search: 'Corsair+iCUE+H150i+Elite' },

  // Cases
  'case-1': { asin: null, search: 'Lian+Li+O11+Dynamic+EVO' },
  'case-2': { asin: null, search: 'NZXT+H7+Flow' },
  'case-3': { asin: null, search: 'Corsair+4000D+Airflow' },
  'case-4': { asin: null, search: 'Fractal+Design+Meshify+2' },
};

// Generate Amazon affiliate link
export function getAmazonLink(componentId) {
  const product = PRODUCT_LINKS[componentId];
  if (!product) {
    // Fallback: search by component name
    return `https://www.amazon.sa/s?k=computer+parts&tag=${AMAZON_TAG}`;
  }

  if (product.asin) {
    return `https://www.amazon.sa/dp/${product.asin}?tag=${AMAZON_TAG}`;
  }

  return `https://www.amazon.sa/s?k=${product.search}&tag=${AMAZON_TAG}`;
}

// Generate affiliate link from component name (for dynamic products)
export function getAmazonSearchLink(query) {
  const encoded = encodeURIComponent(query);
  return `https://www.amazon.sa/s?k=${encoded}&tag=${AMAZON_TAG}`;
}

// Get the affiliate tag
export function getTag() {
  return AMAZON_TAG;
}

// Track click (for analytics - can be expanded later)
export function trackAffiliateClick(componentId, componentName) {
  try {
    // Log to console for now - can add analytics later
    console.log(`[Affiliate] Click: ${componentName} (${componentId})`);

    // Could send to your backend API:
    // fetch(`${API_BASE}/api/track`, { method: 'POST', body: JSON.stringify({ id: componentId, name: componentName, timestamp: Date.now() }) });
  } catch (e) {
    // Silent fail
  }
}

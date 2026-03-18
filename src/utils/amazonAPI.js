/**
 * Amazon PA-API Frontend Service
 * Calls serverless functions at /api/amazon and /api/amazon-product
 * with localStorage caching (1 hour TTL).
 */

const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const CACHE_PREFIX = 'amz_cache_';

// --- Cache helpers ---

function getCached(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function setCache(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // localStorage full — clear old Amazon cache entries
    clearExpiredCache();
  }
}

function clearExpiredCache() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX));
  for (const key of keys) {
    try {
      const { ts } = JSON.parse(localStorage.getItem(key));
      if (Date.now() - ts > CACHE_TTL) {
        localStorage.removeItem(key);
      }
    } catch {
      localStorage.removeItem(key);
    }
  }
}

// --- API calls ---

/**
 * Search for parts by category and/or query.
 * @param {string} category - e.g. 'gpu', 'cpu', 'motherboard'
 * @param {string} [query] - optional search query (e.g. 'RTX 5070')
 * @returns {Promise<{items: Array, count: number, total: number}>}
 */
export async function searchParts(category, query = '') {
  const cacheKey = `search_${category}_${query}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (query) params.set('q', query);

  const res = await fetch(`/api/amazon?${params}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error ${res.status}`);
  }

  const data = await res.json();
  setCache(cacheKey, data);
  return data;
}

/**
 * Get product details by ASIN (supports multiple, comma-separated).
 * @param {string} asin - single ASIN or comma-separated ASINs
 * @returns {Promise<{items: Array, count: number}>}
 */
export async function getProduct(asin) {
  const cacheKey = `product_${asin}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const res = await fetch(`/api/amazon-product?asin=${encodeURIComponent(asin)}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error ${res.status}`);
  }

  const data = await res.json();
  setCache(cacheKey, data);
  return data;
}

/**
 * Search all categories in parallel.
 * Returns { cpu: [...], gpu: [...], ... }
 */
export async function searchAllCategories() {
  const categories = ['cpu', 'gpu', 'motherboard', 'ram', 'ssd', 'psu', 'cooler', 'case'];

  const results = await Promise.allSettled(
    categories.map(cat => searchParts(cat))
  );

  const output = {};
  categories.forEach((cat, i) => {
    if (results[i].status === 'fulfilled') {
      output[cat] = results[i].value.items;
    } else {
      console.warn(`Failed to fetch ${cat}:`, results[i].reason?.message);
      output[cat] = [];
    }
  });

  return output;
}

/**
 * Fetch live prices for components that have ASINs.
 * @param {Array} components - array of components with .asin field
 * @returns {Promise<Map<string, {price: number, image_url: string}>>} ASIN -> updated data
 */
export async function fetchLivePrices(components) {
  const withAsin = components.filter(c => c.asin);
  if (withAsin.length === 0) return new Map();

  // PA-API GetItems supports max 10 ASINs per request
  const chunks = [];
  for (let i = 0; i < withAsin.length; i += 10) {
    chunks.push(withAsin.slice(i, i + 10).map(c => c.asin).join(','));
  }

  const results = new Map();

  // Process chunks sequentially to respect rate limits (1 req/sec)
  for (const chunk of chunks) {
    try {
      const data = await getProduct(chunk);
      for (const item of data.items) {
        results.set(item.asin, {
          price: item.price,
          image_url: item.image_url,
          name: item.name,
        });
      }
    } catch (err) {
      console.warn('Failed to fetch prices for chunk:', err.message);
    }

    // Wait 1.1s between requests to respect rate limit
    if (chunks.indexOf(chunk) < chunks.length - 1) {
      await new Promise(r => setTimeout(r, 1100));
    }
  }

  return results;
}

/**
 * Clear all Amazon cache entries from localStorage.
 */
export function clearCache() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX));
  keys.forEach(k => localStorage.removeItem(k));
}

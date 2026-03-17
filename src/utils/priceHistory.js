// Price History Generator — Seeded PRNG for consistent fake data
import { getAllComponents } from './db';

// Simple seeded PRNG (mulberry32)
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return h;
}

// Cache generated histories
const cache = {};

/**
 * Generate 90 days of price history for a component
 * @param {string} componentId
 * @returns {{ date: string, price: number }[]}
 */
export function getPriceHistory(componentId) {
  if (cache[componentId]) return cache[componentId];

  const all = getAllComponents();
  const comp = all.find(c => c.id === componentId);
  if (!comp) return [];

  const basePrice = comp.price;
  const seed = hashString(componentId);
  const rand = mulberry32(seed);

  // Determine trend based on seed
  const trendRoll = rand();
  let trendFactor; // daily drift
  if (trendRoll < 0.35) trendFactor = -0.0008;       // downward trend
  else if (trendRoll < 0.65) trendFactor = 0.0001;    // stable
  else trendFactor = 0.0006;                           // upward trend

  // Volatility based on price tier
  const volatility = basePrice > 3000 ? 0.012 : basePrice > 1000 ? 0.008 : 0.006;

  // Generate "deal dips" — random periods of 10-20% drops
  const dealDips = [];
  const numDips = Math.floor(rand() * 3); // 0-2 dips
  for (let d = 0; d < numDips; d++) {
    const start = Math.floor(rand() * 70) + 5; // day 5-75
    const duration = Math.floor(rand() * 5) + 3; // 3-7 days
    const depth = 0.10 + rand() * 0.10; // 10-20% drop
    dealDips.push({ start, duration, depth });
  }

  const history = [];
  const today = new Date();
  let currentPrice = basePrice * (1 + (rand() - 0.5) * 0.12); // start ±6% from current

  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    // Apply daily drift + noise
    const noise = (rand() - 0.5) * 2 * volatility;
    currentPrice = currentPrice * (1 + trendFactor + noise);

    // Mean reversion toward base price
    const deviation = (currentPrice - basePrice) / basePrice;
    currentPrice -= deviation * basePrice * 0.02;

    // Apply deal dips
    const dayIndex = 89 - i;
    for (const dip of dealDips) {
      if (dayIndex >= dip.start && dayIndex < dip.start + dip.duration) {
        currentPrice = basePrice * (1 - dip.depth);
        break;
      }
    }

    // Clamp within reasonable bounds (±20% of base)
    currentPrice = Math.max(basePrice * 0.80, Math.min(basePrice * 1.20, currentPrice));

    // On the last day (today), snap closer to the actual base price
    if (i === 0) {
      currentPrice = basePrice;
    }

    history.push({
      date: dateStr,
      price: Math.round(currentPrice),
    });
  }

  cache[componentId] = history;
  return history;
}

/**
 * Get price stats for a component
 * @param {string} componentId
 * @returns {{ current: number, lowest: number, lowestDate: string, highest: number, highestDate: string, average: number, trend: 'up'|'down'|'stable' }}
 */
export function getPriceStats(componentId) {
  const history = getPriceHistory(componentId);
  if (!history.length) return null;

  const prices = history.map(h => h.price);
  const current = prices[prices.length - 1];
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const lowestEntry = history.find(h => h.price === lowestPrice);
  const highestEntry = history.find(h => h.price === highestPrice);
  const average = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

  // Trend: compare last 7 days average vs first 7 days average
  const first7 = prices.slice(0, 7).reduce((a, b) => a + b, 0) / 7;
  const last7 = prices.slice(-7).reduce((a, b) => a + b, 0) / 7;
  const change = (last7 - first7) / first7;
  const trend = change < -0.03 ? 'down' : change > 0.03 ? 'up' : 'stable';

  return {
    current,
    lowest: lowestPrice,
    lowestDate: lowestEntry?.date,
    highest: highestPrice,
    highestDate: highestEntry?.date,
    average,
    trend,
    isNearLowest: current <= lowestPrice * 1.05,
    isNearHighest: current >= highestPrice * 0.95,
  };
}

import { useState, useEffect, useRef } from 'react';

const cache = {};
const CACHE_TTL = 60 * 60 * 1000; // 1 hour (Amazon ToS)

export function useLivePrices(asins) {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const prevKey = useRef('');

  useEffect(() => {
    const filtered = (asins || []).filter(Boolean);
    const key = filtered.sort().join(',');
    if (!key || key === prevKey.current) return;
    prevKey.current = key;

    // Serve from cache immediately
    const fromCache = {};
    const uncached = [];
    filtered.forEach(a => {
      if (cache[a] && Date.now() - cache[a].ts < CACHE_TTL) {
        fromCache[a] = cache[a].data;
      } else {
        uncached.push(a);
      }
    });

    if (Object.keys(fromCache).length) setPrices(p => ({ ...p, ...fromCache }));
    if (!uncached.length) return;

    setLoading(true);
    fetch('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ asins: uncached }),
    })
      .then(r => r.json())
      .then(d => {
        if (d.ok && d.prices) {
          Object.entries(d.prices).forEach(([a, p]) => {
            cache[a] = { data: p, ts: Date.now() };
          });
          setPrices(prev => ({ ...prev, ...d.prices }));
        }
      })
      .catch(() => {}) // Silently fail — static prices remain
      .finally(() => setLoading(false));
  }, [asins?.join(',')]);

  return { prices, loading };
}

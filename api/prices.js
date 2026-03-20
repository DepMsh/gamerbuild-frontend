import { paapiRequest, formatItem, corsHeaders } from './_lib/paapi.js';

export default async function handler(req, res) {
  // CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders());
    return res.end();
  }

  const headers = corsHeaders();
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  try {
    const { asins } = req.body;
    if (!asins?.length) {
      return res.status(400).json({ error: 'asins[] required', usage: 'POST { asins: ["B0DVZSG8D5"] }' });
    }

    const results = {};

    // Amazon limit: 10 ASINs per request
    for (let i = 0; i < asins.length; i += 10) {
      const chunk = asins.slice(i, i + 10);

      try {
        const data = await paapiRequest('getItems', {
          itemIds: chunk,
          itemIdType: 'ASIN',
          resources: [
            'itemInfo.title',
            'offersV2.listings.price',
            'offersV2.listings.availability',
            'images.primary.large',
          ],
        });

        const itemsResult = data.itemsResult || data.ItemsResult || {};
        const rawItems = itemsResult.items || itemsResult.Items || [];
        const items = rawItems.map(formatItem);

        for (const item of items) {
          results[item.asin] = {
            ...item,
            live: true,
            fetchedAt: new Date().toISOString(),
          };
        }

        // Handle per-ASIN errors
        const errors = itemsResult.errors || itemsResult.Errors || [];
        for (const err of errors) {
          const asin = err.asin || err.ASIN || err.ItemId;
          if (asin) results[asin] = { asin, error: err.message || err.Message, live: false };
        }
      } catch (err) {
        // If entire batch fails, mark all as failed
        console.error('Batch failed:', err.message);
        for (const asin of chunk) {
          if (!results[asin]) results[asin] = { asin, error: err.message, live: false };
        }
      }
    }

    // Cache for 1 hour (Amazon ToS requirement)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=1800');
    return res.status(200).json({
      ok: true,
      count: Object.keys(results).length,
      timestamp: new Date().toISOString(),
      prices: results,
    });
  } catch (error) {
    console.error('Price API error:', error);
    return res.status(500).json({ error: error.message, ok: false });
  }
}

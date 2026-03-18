import { paapiRequest, formatItem, corsHeaders } from './_lib/paapi.js';

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders());
    return res.end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const headers = corsHeaders();
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  const { asin } = req.query;

  if (!asin) {
    return res.status(400).json({
      error: 'Missing "asin" parameter',
      usage: '/api/amazon-product?asin=B0BTZB7F88',
    });
  }

  // Support multiple ASINs (comma-separated, max 10)
  const asins = asin.split(',').map(a => a.trim()).filter(Boolean).slice(0, 10);

  try {
    // Creators API uses camelCase field names
    const payload = {
      itemIds: asins,
      itemIdType: 'ASIN',
      resources: [
        'images.primary.large',
        'images.primary.medium',
        'images.variants.large',
        'itemInfo.title',
        'itemInfo.byLineInfo',
        'itemInfo.features',
        'itemInfo.productInfo',
        'itemInfo.technicalInfo',
        'offersV2.listings.price',
        'offersV2.listings.availability',
      ],
    };

    const data = await paapiRequest('getItems', payload);

    // Handle both camelCase and PascalCase responses
    const itemsResult = data.itemsResult || data.ItemsResult || {};
    const rawItems = itemsResult.items || itemsResult.Items || [];
    const items = rawItems.map(formatItem);
    const errors = itemsResult.errors || itemsResult.Errors || [];

    return res.status(200).json({
      count: items.length,
      items,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    console.error('Amazon Product API error:', err.message);
    return res.status(err.message.includes('429') || err.message.includes('TooManyRequests') ? 429 : 500).json({
      error: err.message,
    });
  }
}

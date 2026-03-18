import { paapiRequest, formatItem, CATEGORY_KEYWORDS, corsHeaders } from './_lib/paapi.js';

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

  const { category, q, page } = req.query;

  if (!category && !q) {
    return res.status(400).json({
      error: 'Missing "category" or "q" parameter',
      usage: '/api/amazon?category=gpu  or  /api/amazon?q=RTX+5070',
      categories: Object.keys(CATEGORY_KEYWORDS),
    });
  }

  try {
    // Build search keywords
    let keywords;
    if (q) {
      keywords = q;
    } else {
      const categoryKeywords = CATEGORY_KEYWORDS[category];
      if (!categoryKeywords) {
        return res.status(400).json({
          error: `Unknown category: ${category}`,
          valid: Object.keys(CATEGORY_KEYWORDS),
        });
      }
      keywords = categoryKeywords[0];
    }

    // Creators API uses camelCase field names
    const payload = {
      keywords,
      searchIndex: 'Computers',
      itemCount: 10,
      resources: [
        'images.primary.large',
        'images.primary.medium',
        'itemInfo.title',
        'itemInfo.byLineInfo',
        'itemInfo.features',
        'itemInfo.productInfo',
        'offersV2.listings.price',
        'browseNodeInfo.browseNodes',
      ],
    };

    if (page && parseInt(page) > 1) {
      payload.itemPage = parseInt(page);
    }

    const data = await paapiRequest('searchItems', payload);

    // Handle both camelCase (Creators API) and PascalCase (legacy) responses
    const searchResult = data.searchResult || data.SearchResult || {};
    const rawItems = searchResult.items || searchResult.Items || [];
    const items = rawItems.map(formatItem);

    return res.status(200).json({
      category: category || null,
      query: keywords,
      count: items.length,
      total: searchResult.totalResultCount || searchResult.TotalResultCount || 0,
      items,
    });
  } catch (err) {
    console.error('Amazon API error:', err.message);
    return res.status(err.message.includes('429') || err.message.includes('TooManyRequests') ? 429 : 500).json({
      error: err.message,
    });
  }
}

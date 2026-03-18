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
      // Use the first keyword set; caller can specify q for more specific searches
      keywords = categoryKeywords[0];
    }

    const payload = {
      Keywords: keywords,
      SearchIndex: 'Computers',
      ItemCount: 10,
      Resources: [
        'Images.Primary.Large',
        'Images.Primary.Medium',
        'ItemInfo.Title',
        'ItemInfo.ByLineInfo',
        'ItemInfo.Features',
        'ItemInfo.ProductInfo',
        'Offers.Listings.Price',
        'BrowseNodeInfo',
      ],
    };

    // Support pagination
    if (page && parseInt(page) > 1) {
      payload.ItemPage = parseInt(page);
    }

    const data = await paapiRequest('SearchItems', payload);

    const items = (data.SearchResult?.Items || []).map(formatItem);

    return res.status(200).json({
      category: category || null,
      query: keywords,
      count: items.length,
      total: data.SearchResult?.TotalResultCount || 0,
      items,
    });
  } catch (err) {
    console.error('Amazon API error:', err.message);
    return res.status(err.message.includes('429') ? 429 : 500).json({
      error: err.message,
      hint: err.message.includes('InvalidParameterValue')
        ? 'Check that your PA-API credentials are correct (not OAuth2 credentials)'
        : undefined,
    });
  }
}

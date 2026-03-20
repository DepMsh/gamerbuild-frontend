/**
 * Amazon Creators API v3.2 (Login with Amazon / OAuth 2.0)
 *
 * Auth flow:
 * - Token: POST https://api.amazon.co.uk/auth/o2/token
 *          grant_type=client_credentials, scope=creatorsapi::default
 *          Uses AMAZON_CREDENTIAL_ID + AMAZON_CREDENTIAL_SECRET
 * - API:   POST https://creatorsapi.amazon/catalog/v1/{operation}
 *          Authorization: Bearer <token>
 *          x-marketplace: www.amazon.sa
 *          Body: lowerCamelCase params
 */

// --- Token Cache (in-memory, survives across requests in same Lambda instance) ---
let cachedToken = null;
let tokenExpiresAt = 0;

// v3.2 = EU region — covers amazon.sa
const TOKEN_URL = process.env.AMAZON_TOKEN_ENDPOINT || 'https://api.amazon.co.uk/auth/o2/token';
const API_BASE = 'https://creatorsapi.amazon/catalog/v1';

/**
 * Get an OAuth 2.0 access token using client credentials.
 * Caches for ~59 minutes (token is valid for 60 min).
 */
async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  // Support both old (CLIENT_ID/SECRET) and new (CREDENTIAL_ID/SECRET) env var names
  const credId = process.env.AMAZON_CREDENTIAL_ID || process.env.AMAZON_CLIENT_ID;
  const credSecret = process.env.AMAZON_CREDENTIAL_SECRET || process.env.AMAZON_CLIENT_SECRET;

  if (!credId || !credSecret) {
    throw new Error('Missing AMAZON_CREDENTIAL_ID/SECRET environment variables');
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: credId,
    client_secret: credSecret,
    scope: 'creatorsapi::default',
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    const errMsg = data.error_description || data.error || JSON.stringify(data);
    throw new Error(`OAuth token request failed (${res.status}): ${errMsg}`);
  }

  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in ? (data.expires_in - 30) * 1000 : 3570000);

  return cachedToken;
}

/**
 * Sends a Creators API request.
 * @param {string} operation - 'searchItems', 'getItems', 'getVariations', 'getBrowseNodes'
 * @param {object} payload - request body (camelCase fields)
 * @returns {Promise<object>} parsed JSON response
 */
export async function paapiRequest(operation, payload) {
  const partnerTag = process.env.AMAZON_PARTNER_TAG || 'meshal039-21';

  // Add required fields (Creators API uses camelCase)
  payload.partnerTag = partnerTag;
  payload.partnerType = 'Associates';
  payload.marketplace = 'www.amazon.sa';

  const token = await getAccessToken();
  const url = `${API_BASE}/${operation}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`,
      'x-marketplace': 'www.amazon.sa',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    // If token expired, clear cache and retry once
    if (response.status === 401) {
      cachedToken = null;
      tokenExpiresAt = 0;
      const retryToken = await getAccessToken();
      const retryRes = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${retryToken}`,
          'x-marketplace': 'www.amazon.sa',
        },
        body: JSON.stringify(payload),
      });
      const retryData = await retryRes.json();
      if (!retryRes.ok) {
        const errMsg = retryData?.errors?.[0]?.message || retryData?.__type || JSON.stringify(retryData);
        throw new Error(`Creators API ${operation} failed (${retryRes.status}): ${errMsg}`);
      }
      return retryData;
    }

    const errMsg = data?.errors?.[0]?.message || data?.Errors?.[0]?.Message || data?.__type || JSON.stringify(data);
    throw new Error(`Creators API ${operation} failed (${response.status}): ${errMsg}`);
  }

  return data;
}

/**
 * Formats a Creators API item into a simplified product object.
 * Handles both Creators API (camelCase) and PA-API (PascalCase) response formats.
 */
export function formatItem(item) {
  // Creators API uses camelCase; PA-API uses PascalCase
  const info = item.itemInfo || item.ItemInfo || {};
  const title = info.title?.displayValue || info.Title?.DisplayValue || '';
  const brand = info.byLineInfo?.brand?.displayValue || info.ByLineInfo?.Brand?.DisplayValue || '';
  const features = info.features?.displayValues || info.Features?.DisplayValues || [];

  // Creators API uses offersV2; legacy uses Offers
  const offers = item.offersV2 || item.offers || item.Offers || {};
  const listing = offers.listings?.[0] || offers.Listings?.[0] || {};
  const price = listing.price || listing.Price;

  const images = item.images || item.Images || {};
  const primaryImg = images.primary || images.Primary || {};
  const image = primaryImg.large || primaryImg.Large || primaryImg.medium || primaryImg.Medium;

  const asin = item.asin || item.ASIN;
  const detailUrl = item.detailPageURL || item.DetailPageURL;

  return {
    asin,
    name: title,
    brand,
    price: price ? parseFloat(price.amount || price.Amount) : null,
    currency: price?.currency || price?.Currency || 'SAR',
    price_display: price?.displayAmount || price?.DisplayAmount || null,
    image_url: image?.url || image?.URL || null,
    url: detailUrl,
    features,
  };
}

// Default search keywords per category
export const CATEGORY_KEYWORDS = {
  cpu: ['AMD Ryzen processor', 'Intel Core processor'],
  gpu: ['NVIDIA RTX graphics card', 'AMD Radeon graphics card'],
  motherboard: ['AM5 motherboard', 'LGA1700 motherboard', 'LGA1851 motherboard'],
  ram: ['DDR5 RAM desktop', 'DDR4 RAM desktop'],
  ssd: ['NVMe SSD', 'M.2 SSD'],
  psu: ['ATX power supply modular'],
  cooler: ['AIO liquid cooler', 'CPU air cooler'],
  case: ['ATX mid tower case'],
};

// CORS headers for local development
export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

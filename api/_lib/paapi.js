import crypto from 'crypto';

const HOST = 'webservices.amazon.sa';
const REGION = 'eu-west-1';
const SERVICE = 'ProductAdvertisingAPI';

function hmac(key, data) {
  return crypto.createHmac('sha256', key).update(data).digest();
}

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function getSigningKey(secretKey, dateStamp) {
  const kDate = hmac('AWS4' + secretKey, dateStamp);
  const kRegion = hmac(kDate, REGION);
  const kService = hmac(kRegion, SERVICE);
  return hmac(kService, 'aws4_request');
}

/**
 * Signs and sends a PA-API v5 request.
 * @param {string} operation - e.g. 'SearchItems' or 'GetItems'
 * @param {object} payload - request body (without PartnerTag/PartnerType/Marketplace)
 * @returns {Promise<object>} parsed JSON response
 */
export async function paapiRequest(operation, payload) {
  const accessKey = process.env.AMAZON_ACCESS_KEY;
  const secretKey = process.env.AMAZON_SECRET_KEY;
  const partnerTag = process.env.AMAZON_PARTNER_TAG || 'meshal039-21';

  if (!accessKey || !secretKey) {
    throw new Error('Missing AMAZON_ACCESS_KEY or AMAZON_SECRET_KEY environment variables');
  }

  // Add required fields
  payload.PartnerTag = partnerTag;
  payload.PartnerType = 'Associates';
  payload.Marketplace = 'www.amazon.sa';

  const path = `/paapi5/${operation.toLowerCase()}`;
  const target = `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${operation}`;

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.substring(0, 8);

  const body = JSON.stringify(payload);
  const bodyHash = sha256(body);

  // Headers must be lowercase and sorted
  const headers = {
    'content-encoding': 'amz-1.0',
    'content-type': 'application/json; charset=utf-8',
    'host': HOST,
    'x-amz-date': amzDate,
    'x-amz-target': target,
  };

  const signedHeaderKeys = Object.keys(headers).sort();
  const signedHeaders = signedHeaderKeys.join(';');
  const canonicalHeaders = signedHeaderKeys.map(k => `${k}:${headers[k]}\n`).join('');

  // Canonical request
  const canonicalRequest = [
    'POST',
    path,
    '', // no query string
    canonicalHeaders,
    signedHeaders,
    bodyHash,
  ].join('\n');

  // String to sign
  const credentialScope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256(canonicalRequest),
  ].join('\n');

  // Signature
  const signingKey = getSigningKey(secretKey, dateStamp);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  // Authorization header
  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const response = await fetch(`https://${HOST}${path}`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: authorization,
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    const errMsg = data?.Errors?.[0]?.Message || data?.__type || JSON.stringify(data);
    throw new Error(`PA-API ${operation} failed (${response.status}): ${errMsg}`);
  }

  return data;
}

/**
 * Formats a PA-API item into a simplified product object.
 */
export function formatItem(item) {
  const info = item.ItemInfo || {};
  const title = info.Title?.DisplayValue || '';
  const brand = info.ByLineInfo?.Brand?.DisplayValue || '';
  const features = info.Features?.DisplayValues || [];
  const price = item.Offers?.Listings?.[0]?.Price;
  const image = item.Images?.Primary?.Large || item.Images?.Primary?.Medium;

  return {
    asin: item.ASIN,
    name: title,
    brand,
    price: price ? parseFloat(price.Amount) : null,
    currency: price?.Currency || 'SAR',
    price_display: price?.DisplayAmount || null,
    image_url: image?.URL || null,
    url: item.DetailPageURL,
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

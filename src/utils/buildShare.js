/**
 * PCBux Build Sharing — Short URL System
 *
 * Encodes 8 component IDs into a compact base62 string (~14 chars)
 * Format: pcbux.com/b/AjepDq8gn4jqDG
 *
 * Each component ID is a number (0-2047), packed into 11 bits each.
 * 8 components × 11 bits = 88 bits → encoded to base62 ≈ 14 characters
 *
 * Supports backwards compatibility with old Base64 format.
 */

const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = BigInt(CHARS.length); // 62
const BITS_PER_SLOT = 11n;
const SLOT_MASK = (1n << BITS_PER_SLOT) - 1n; // 0x7FF = 2047

const CATEGORY_ORDER = ['cpu', 'gpu', 'motherboard', 'ram', 'ssd', 'psu', 'cooler', 'case'];
const ID_PREFIXES = {
  cpu: 'cpu-', gpu: 'gpu-', motherboard: 'mb-', ram: 'ram-',
  ssd: 'ssd-', psu: 'psu-', cooler: 'cool-', case: 'case-'
};

/**
 * Extract the numeric part from a component ID
 * "cpu-48" → 48, "gpu-129" → 129, "cool-352" → 352
 */
function idToNum(id) {
  if (!id) return 0;
  const num = parseInt(id.replace(/\D+/g, ''), 10);
  return isNaN(num) ? 0 : num;
}

/**
 * Encode a build into a short base62 string
 */
export function encodeBuild(build) {
  const nums = CATEGORY_ORDER.map(cat => idToNum(build[cat]?.id));
  if (nums.every(n => n === 0)) return null;

  // Pack into a single BigInt: slot0 in highest bits, slot7 in lowest
  let packed = 0n;
  for (let i = 0; i < 8; i++) {
    packed = (packed << BITS_PER_SLOT) | BigInt(nums[i] & 0x7FF);
  }

  // Encode to base62
  if (packed === 0n) return '0';
  let result = '';
  let temp = packed;
  while (temp > 0n) {
    result = CHARS[Number(temp % BASE)] + result;
    temp = temp / BASE;
  }

  return result;
}

/**
 * Decode a base62 string (or old Base64) back into component IDs
 * Returns: { cpu: 'cpu-48', gpu: 'gpu-129', ... } or null
 */
export function decodeBuild(encoded) {
  if (!encoded) return null;

  try {
    // Detect OLD Base64 format (starts with eyJ or contains non-base62 chars)
    if (encoded.includes('eyJ') || encoded.includes('=') || encoded.includes('+') || encoded.includes('/')) {
      try {
        const decoded = JSON.parse(atob(encoded));
        return typeof decoded === 'object' ? decoded : null;
      } catch {
        return null;
      }
    }

    // NEW base62 format
    let packed = 0n;
    for (const ch of encoded) {
      const idx = CHARS.indexOf(ch);
      if (idx === -1) return null;
      packed = packed * BASE + BigInt(idx);
    }

    // Unpack: 8 slots of 11 bits each, slot0 is highest
    const ids = {};
    for (let i = 7; i >= 0; i--) {
      const num = Number(packed & SLOT_MASK);
      packed = packed >> BITS_PER_SLOT;
      const cat = CATEGORY_ORDER[i];
      if (num > 0) {
        ids[cat] = ID_PREFIXES[cat] + num;
      }
    }

    return Object.keys(ids).length > 0 ? ids : null;
  } catch {
    return null;
  }
}

/**
 * Generate a human-readable build code for display
 * e.g., "PBX-7800X3D-5080"
 */
export function generateBuildCode(build) {
  const cpuShort = build.cpu?.name?.match(/\d{4}X3D|\d{4}X|\d{4}K?F?/)?.[0] || 'CPU';
  const gpuShort = build.gpu?.name?.match(/RTX \d{4}\w*|RX \d{4}\w*/)?.[0]?.replace('RTX ', '').replace('RX ', 'RX') || 'GPU';
  return `PBX-${cpuShort}-${gpuShort}`;
}

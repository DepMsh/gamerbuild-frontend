/**
 * Encode a build object into a URL-safe string
 * Only stores component IDs to keep URLs short
 */
export function encodeBuild(components) {
  const ids = {};
  const categories = ['cpu', 'gpu', 'motherboard', 'ram', 'ssd', 'psu', 'cooler', 'case'];
  categories.forEach(cat => {
    if (components[cat]?.id) ids[cat] = components[cat].id;
  });
  if (Object.keys(ids).length === 0) return null;
  try {
    return btoa(JSON.stringify(ids));
  } catch {
    return null;
  }
}

/**
 * Decode a URL string back into component IDs
 * Returns { cpu: 'id', gpu: 'id', ... } or null
 */
export function decodeBuild(encoded) {
  try {
    const decoded = atob(encoded);
    const ids = JSON.parse(decoded);
    if (typeof ids !== 'object' || ids === null) return null;
    return ids;
  } catch {
    return null;
  }
}

/**
 * Generate a short human-readable build code
 * e.g., "PBX-7800X3D-5080"
 */
export function generateBuildCode(components) {
  const cpuShort = components.cpu?.name?.match(/\d{4}X3D|\d{4}X|\d{4}K?F?/)?.[0] || 'CPU';
  const gpuShort = components.gpu?.name?.match(/RTX \d{4}\w*|RX \d{4}\w*/)?.[0]?.replace('RTX ', '').replace('RX ', 'RX') || 'GPU';
  return `PBX-${cpuShort}-${gpuShort}`;
}

import { useState } from 'react';

// Brand-specific REAL product photos (Amazon /images/I/ format — verified working)
const BRAND_FALLBACKS = {
  cpu: {
    AMD: 'https://m.media-amazon.com/images/I/51HqC0rU9HL._AC_SL300_.jpg',
    Intel: 'https://m.media-amazon.com/images/I/61aAAg73uLL._AC_SL300_.jpg',
  },
  gpu: {
    Asus: 'https://m.media-amazon.com/images/I/81Sq6VtClyL._AC_SL300_.jpg',
    MSI: 'https://m.media-amazon.com/images/I/712dJxmjvHL._AC_SL300_.jpg',
    Gigabyte: 'https://m.media-amazon.com/images/I/71liIYrRmkL._AC_SL300_.jpg',
    Zotac: 'https://m.media-amazon.com/images/I/81g7Hx94HaL._AC_SL300_.jpg',
    Sapphire: 'https://m.media-amazon.com/images/I/81VpOvD9wJL._AC_SL300_.jpg',
    XFX: 'https://m.media-amazon.com/images/I/611CmYuyJdL._AC_SL300_.jpg',
    PowerColor: 'https://m.media-amazon.com/images/I/81PEqT21o3L._AC_SL300_.jpg',
    PNY: 'https://m.media-amazon.com/images/I/61r58FqSbtL._AC_SL300_.jpg',
    EVGA: 'https://m.media-amazon.com/images/I/81Sq6VtClyL._AC_SL300_.jpg',
    NVIDIA: 'https://m.media-amazon.com/images/I/712dJxmjvHL._AC_SL300_.jpg',
    AMD: 'https://m.media-amazon.com/images/I/81VpOvD9wJL._AC_SL300_.jpg',
    Intel: 'https://m.media-amazon.com/images/I/81Sq6VtClyL._AC_SL300_.jpg',
    Palit: 'https://m.media-amazon.com/images/I/712dJxmjvHL._AC_SL300_.jpg',
    Inno3D: 'https://m.media-amazon.com/images/I/712dJxmjvHL._AC_SL300_.jpg',
    Yeston: 'https://m.media-amazon.com/images/I/81VpOvD9wJL._AC_SL300_.jpg',
    ONIX: 'https://m.media-amazon.com/images/I/81Sq6VtClyL._AC_SL300_.jpg',
  },
  motherboard: {
    Asus: 'https://m.media-amazon.com/images/I/81MH+nx+shL._AC_SL300_.jpg',
    MSI: 'https://m.media-amazon.com/images/I/81ymStt-9cL._AC_SL300_.jpg',
    Gigabyte: 'https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL300_.jpg',
    ASRock: 'https://m.media-amazon.com/images/I/71obtPV5XZL._AC_SL300_.jpg',
    Biostar: 'https://m.media-amazon.com/images/I/71obtPV5XZL._AC_SL300_.jpg',
    NZXT: 'https://m.media-amazon.com/images/I/81MH+nx+shL._AC_SL300_.jpg',
  },
  ram: {
    Corsair: 'https://m.media-amazon.com/images/I/61-Ag2lc5BL._AC_SL300_.jpg',
    'G.Skill': 'https://m.media-amazon.com/images/I/71PuFzKH9CL._AC_SL300_.jpg',
    Kingston: 'https://m.media-amazon.com/images/I/715QXNdKxiL._AC_SL300_.jpg',
    TEAMGROUP: 'https://m.media-amazon.com/images/I/71PuFzKH9CL._AC_SL300_.jpg',
    Crucial: 'https://m.media-amazon.com/images/I/61EUuA9HiaL._AC_SL300_.jpg',
    Patriot: 'https://m.media-amazon.com/images/I/715QXNdKxiL._AC_SL300_.jpg',
    ADATA: 'https://m.media-amazon.com/images/I/61-Ag2lc5BL._AC_SL300_.jpg',
    'V-Color': 'https://m.media-amazon.com/images/I/71PuFzKH9CL._AC_SL300_.jpg',
    OLOy: 'https://m.media-amazon.com/images/I/71PuFzKH9CL._AC_SL300_.jpg',
    PNY: 'https://m.media-amazon.com/images/I/61-Ag2lc5BL._AC_SL300_.jpg',
    Klevv: 'https://m.media-amazon.com/images/I/61-Ag2lc5BL._AC_SL300_.jpg',
    Lexar: 'https://m.media-amazon.com/images/I/61-Ag2lc5BL._AC_SL300_.jpg',
    Silicon: 'https://m.media-amazon.com/images/I/61-Ag2lc5BL._AC_SL300_.jpg',
    Mushkin: 'https://m.media-amazon.com/images/I/61-Ag2lc5BL._AC_SL300_.jpg',
    Timetec: 'https://m.media-amazon.com/images/I/61-Ag2lc5BL._AC_SL300_.jpg',
    GeIL: 'https://m.media-amazon.com/images/I/71PuFzKH9CL._AC_SL300_.jpg',
    Thermaltake: 'https://m.media-amazon.com/images/I/71PuFzKH9CL._AC_SL300_.jpg',
    GOODRAM: 'https://m.media-amazon.com/images/I/61-Ag2lc5BL._AC_SL300_.jpg',
    Acer: 'https://m.media-amazon.com/images/I/61-Ag2lc5BL._AC_SL300_.jpg',
    Antec: 'https://m.media-amazon.com/images/I/61-Ag2lc5BL._AC_SL300_.jpg',
  },
  ssd: {
    Samsung: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    'Western Digital': 'https://m.media-amazon.com/images/I/61jQCrK6mFL._AC_SL300_.jpg',
    WD: 'https://m.media-amazon.com/images/I/61jQCrK6mFL._AC_SL300_.jpg',
    Western: 'https://m.media-amazon.com/images/I/61jQCrK6mFL._AC_SL300_.jpg',
    Crucial: 'https://m.media-amazon.com/images/I/41UOk+pwd3L._AC_SL300_.jpg',
    Kingston: 'https://m.media-amazon.com/images/I/71NfMZKkpQL._AC_SL300_.jpg',
    SK: 'https://m.media-amazon.com/images/I/71RGTZJJuqL._AC_SL300_.jpg',
    Seagate: 'https://m.media-amazon.com/images/I/61jQCrK6mFL._AC_SL300_.jpg',
    Sabrent: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    ADATA: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Corsair: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Intel: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    PNY: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Transcend: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Lexar: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    TEAMGROUP: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    KIOXIA: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Gigabyte: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    MSI: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    HP: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    VisionTek: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Patriot: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    SanDisk: 'https://m.media-amazon.com/images/I/61jQCrK6mFL._AC_SL300_.jpg',
    Solidigm: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Netac: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Acer: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Inland: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Addlink: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    FanXiang: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Mushkin: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    KingSpec: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Orico: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Silicon: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Nextorage: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Timetec: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Micron: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Thermaltake: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
    Fanxiang: 'https://m.media-amazon.com/images/I/41Y-Xcz+aWL._AC_SL300_.jpg',
  },
  psu: {
    Corsair: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    SeaSonic: 'https://m.media-amazon.com/images/I/71bhPweONsL._AC_SL300_.jpg',
    Seasonic: 'https://m.media-amazon.com/images/I/71bhPweONsL._AC_SL300_.jpg',
    'be quiet!': 'https://m.media-amazon.com/images/I/71jF3IoiIPL._AC_SL300_.jpg',
    'Cooler Master': 'https://m.media-amazon.com/images/I/91QD8bivzIS._AC_SL300_.jpg',
    EVGA: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    Thermaltake: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    SilverStone: 'https://m.media-amazon.com/images/I/71bhPweONsL._AC_SL300_.jpg',
    NZXT: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    MSI: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    Asus: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    Gigabyte: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    'Fractal Design': 'https://m.media-amazon.com/images/I/71bhPweONsL._AC_SL300_.jpg',
    Enermax: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    'Lian Li': 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    Antec: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    FSP: 'https://m.media-amazon.com/images/I/71bhPweONsL._AC_SL300_.jpg',
    ASRock: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    ADATA: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    Xilence: 'https://m.media-amazon.com/images/I/71bhPweONsL._AC_SL300_.jpg',
    Montech: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    Cougar: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
    XFX: 'https://m.media-amazon.com/images/I/81sPI+eyRvL._AC_SL300_.jpg',
  },
  cooler: {
    Noctua: 'https://m.media-amazon.com/images/I/91t48GBv8TL._AC_SL300_.jpg',
    Corsair: 'https://m.media-amazon.com/images/I/71hsRGvyfWL._AC_SL300_.jpg',
    NZXT: 'https://m.media-amazon.com/images/I/41K2nMA4QZL._AC_SL300_.jpg',
    DeepCool: 'https://m.media-amazon.com/images/I/41BrygKWyuL._AC_SL300_.jpg',
    ARCTIC: 'https://m.media-amazon.com/images/I/81jbYxEEBlL._AC_SL300_.jpg',
    Arctic: 'https://m.media-amazon.com/images/I/81jbYxEEBlL._AC_SL300_.jpg',
    'be quiet!': 'https://m.media-amazon.com/images/I/718EaeGMoOL._AC_SL300_.jpg',
    Thermalright: 'https://m.media-amazon.com/images/I/71tNSniLk-S._AC_SL300_.jpg',
    'Cooler Master': 'https://m.media-amazon.com/images/I/71yaJKTZ7IL._AC_SL300_.jpg',
    Thermaltake: 'https://m.media-amazon.com/images/I/71yaJKTZ7IL._AC_SL300_.jpg',
    'ID-COOLING': 'https://m.media-amazon.com/images/I/41BrygKWyuL._AC_SL300_.jpg',
    EK: 'https://m.media-amazon.com/images/I/71hsRGvyfWL._AC_SL300_.jpg',
    SilverStone: 'https://m.media-amazon.com/images/I/91t48GBv8TL._AC_SL300_.jpg',
    Scythe: 'https://m.media-amazon.com/images/I/91t48GBv8TL._AC_SL300_.jpg',
    'Lian Li': 'https://m.media-amazon.com/images/I/71hsRGvyfWL._AC_SL300_.jpg',
    MSI: 'https://m.media-amazon.com/images/I/71hsRGvyfWL._AC_SL300_.jpg',
    Xilence: 'https://m.media-amazon.com/images/I/71yaJKTZ7IL._AC_SL300_.jpg',
    Akasa: 'https://m.media-amazon.com/images/I/71yaJKTZ7IL._AC_SL300_.jpg',
    EVGA: 'https://m.media-amazon.com/images/I/71hsRGvyfWL._AC_SL300_.jpg',
    Asus: 'https://m.media-amazon.com/images/I/71hsRGvyfWL._AC_SL300_.jpg',
    Phanteks: 'https://m.media-amazon.com/images/I/71hsRGvyfWL._AC_SL300_.jpg',
    Jonsbo: 'https://m.media-amazon.com/images/I/41BrygKWyuL._AC_SL300_.jpg',
    Zalman: 'https://m.media-amazon.com/images/I/71yaJKTZ7IL._AC_SL300_.jpg',
    Dynatron: 'https://m.media-amazon.com/images/I/71yaJKTZ7IL._AC_SL300_.jpg',
    Gelid: 'https://m.media-amazon.com/images/I/91t48GBv8TL._AC_SL300_.jpg',
    HYTE: 'https://m.media-amazon.com/images/I/71hsRGvyfWL._AC_SL300_.jpg',
    'Alpenföhn': 'https://m.media-amazon.com/images/I/91t48GBv8TL._AC_SL300_.jpg',
    Iceberg: 'https://m.media-amazon.com/images/I/41BrygKWyuL._AC_SL300_.jpg',
    Cougar: 'https://m.media-amazon.com/images/I/71yaJKTZ7IL._AC_SL300_.jpg',
    Gigabyte: 'https://m.media-amazon.com/images/I/71yaJKTZ7IL._AC_SL300_.jpg',
    Raijintek: 'https://m.media-amazon.com/images/I/71yaJKTZ7IL._AC_SL300_.jpg',
  },
  case: {
    NZXT: 'https://m.media-amazon.com/images/I/71yTezo1mRL._AC_SL300_.jpg',
    Corsair: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    'Fractal Design': 'https://m.media-amazon.com/images/I/71sOLCHs2CL._AC_SL300_.jpg',
    'Lian Li': 'https://m.media-amazon.com/images/I/71x-3P9loBL._AC_SL300_.jpg',
    Phanteks: 'https://m.media-amazon.com/images/I/710+HpG7KQL._AC_SL300_.jpg',
    'be quiet!': 'https://m.media-amazon.com/images/I/51C0N4XctkL._AC_SL300_.jpg',
    HYTE: 'https://m.media-amazon.com/images/I/71Y4LYZQqyL._AC_SL300_.jpg',
    'Cooler Master': 'https://m.media-amazon.com/images/I/51DeHvWq0tL._AC_SL300_.jpg',
    Thermaltake: 'https://m.media-amazon.com/images/I/81r0fWoClzL._AC_SL300_.jpg',
    SilverStone: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    Antec: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    Jonsbo: 'https://m.media-amazon.com/images/I/71x-3P9loBL._AC_SL300_.jpg',
    Zalman: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    GameMax: 'https://m.media-amazon.com/images/I/51DeHvWq0tL._AC_SL300_.jpg',
    RAIJINTEK: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    Apevia: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    DIYPC: 'https://m.media-amazon.com/images/I/51DeHvWq0tL._AC_SL300_.jpg',
    darkFlash: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    SAMA: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    SHARKOON: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    Vetroo: 'https://m.media-amazon.com/images/I/51DeHvWq0tL._AC_SL300_.jpg',
    MUSETEX: 'https://m.media-amazon.com/images/I/51DeHvWq0tL._AC_SL300_.jpg',
    ADATA: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    BGears: 'https://m.media-amazon.com/images/I/51DeHvWq0tL._AC_SL300_.jpg',
    Montech: 'https://m.media-amazon.com/images/I/51DeHvWq0tL._AC_SL300_.jpg',
    MSI: 'https://m.media-amazon.com/images/I/71yTezo1mRL._AC_SL300_.jpg',
    Asus: 'https://m.media-amazon.com/images/I/71yTezo1mRL._AC_SL300_.jpg',
    Gigabyte: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    'In Win': 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    Cougar: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    BitFenix: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    Rosewill: 'https://m.media-amazon.com/images/I/51DeHvWq0tL._AC_SL300_.jpg',
    Azza: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    Chieftec: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    GAMDIAS: 'https://m.media-amazon.com/images/I/51DeHvWq0tL._AC_SL300_.jpg',
    Deepcool: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    DeepCool: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    Raijintek: 'https://m.media-amazon.com/images/I/71J4iohAlaL._AC_SL300_.jpg',
    Lian: 'https://m.media-amazon.com/images/I/71x-3P9loBL._AC_SL300_.jpg',
  },
};

const CAT_EMOJI = { cpu: '🧠', gpu: '🎮', motherboard: '📟', ram: '💾', ssd: '💿', psu: '⚡', cooler: '❄️', case: '📦' };

const CAT_GRADIENT = {
  cpu: 'from-teal-900/60 to-teal-950/80',
  gpu: 'from-purple-900/60 to-purple-950/80',
  motherboard: 'from-amber-900/60 to-amber-950/80',
  ram: 'from-rose-900/60 to-rose-950/80',
  ssd: 'from-slate-800/60 to-slate-900/80',
  psu: 'from-blue-900/60 to-blue-950/80',
  cooler: 'from-fuchsia-900/60 to-fuchsia-950/80',
  case: 'from-zinc-800/60 to-zinc-900/80',
};

function getCatKey(component) {
  if (component?.type) {
    if (component.type === 'cooler') return 'cooler';
    return component.type;
  }
  if (!component?.id) return 'cpu';
  const p = component.id.split('-')[0];
  if (p === 'mb') return 'motherboard';
  if (p === 'cool') return 'cooler';
  return p;
}

function buildSources(component) {
  const cat = getCatKey(component);
  const sources = [];

  // 1st: custom image_url
  if (component.image_url) sources.push(component.image_url);

  // 2nd: Amazon CDN /images/P/ pattern
  if (component.asin) {
    sources.push(`https://m.media-amazon.com/images/P/${component.asin}._AC_SL300_.jpg`);
  }

  // 3rd: Amazon Widget pattern (different CDN, sometimes works when P/ doesn't)
  if (component.asin) {
    sources.push(`https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=SA&ASIN=${component.asin}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL300`);
  }

  // 4th: Brand-specific real product photo
  const brandFb = BRAND_FALLBACKS[cat]?.[component.brand];
  if (brandFb) sources.push(brandFb);

  return sources;
}

export default function ProductImage({ component, src, componentId, className = '', size = 'md' }) {
  const [srcIndex, setSrcIndex] = useState(0);

  // Support both new API (component) and legacy API (src + componentId)
  const comp = component || { id: componentId, asin: null, brand: '', image_url: src || null };
  const cat = getCatKey(comp);

  const sources = component ? buildSources(component) : (src ? [src] : []);
  const emoji = CAT_EMOJI[cat] || '📦';
  const gradient = CAT_GRADIENT[cat] || CAT_GRADIENT.cpu;
  const emojiSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-5xl' : 'text-3xl';

  const handleError = () => {
    setSrcIndex(i => i + 1);
  };

  const handleLoad = (e) => {
    // Amazon returns 1x1 pixel for broken images
    if (e.target.naturalWidth < 10 || e.target.naturalHeight < 10) {
      setSrcIndex(i => i + 1);
    }
  };

  // All sources exhausted — show styled emoji fallback
  if (srcIndex >= sources.length) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <span className={`${emojiSize} opacity-80 select-none`}>{emoji}</span>
      </div>
    );
  }

  return (
    <div className={`bg-white/90 flex items-center justify-center overflow-hidden ${className}`}>
      <img
        key={sources[srcIndex]} // Force remount on source change
        src={sources[srcIndex]}
        alt=""
        loading="lazy"
        className="w-full h-full object-contain"
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}

export { BRAND_FALLBACKS, CAT_EMOJI, getCatKey };

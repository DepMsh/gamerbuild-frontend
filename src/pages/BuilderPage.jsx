import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ExternalLink, X, ShieldCheck, ShieldAlert, AlertTriangle, Zap, ShoppingCart, Check, BarChart2, Search, SlidersHorizontal, Truck, RefreshCw, Plus, AlertCircle, Cpu, MonitorSpeaker, CircuitBoard, MemoryStick, HardDrive, Fan, Box, ChevronDown, Trash2 } from 'lucide-react';
import { CATEGORIES, getCompatible, estimateWattage, getRecommendedPSU, getAmazonLink, fullCompatCheck, getDisplayName } from '../utils/db';
import { analyzeBottleneck } from '../utils/engine';
import { useBuild } from '../hooks/BuildContext';
import { motion, AnimatePresence } from 'framer-motion';
import PriceChart from '../components/PriceChart';
import ProductImage from '../components/ProductImage';
import { track } from '../utils/analytics';
import usePageTitle from '../hooks/usePageTitle';
import { useLivePrices } from '../hooks/useLivePrices';

const tierLabels = { budget: 'اقتصادي', 'mid-range': 'متوسط', 'high-end': 'عالي', enthusiast: 'خرافي' };

const catIcons = {
  cpu: '🧠', gpu: '🎨', motherboard: '📟', ram: '💾',
  ssd: '💿', psu: '⚡', cooler: '❄️', case: '📦',
};

const catColors = {
  cpu:         { border: 'border-l-blue-500',    glow: 'hover:shadow-blue-500/10' },
  gpu:         { border: 'border-l-emerald-500', glow: 'hover:shadow-emerald-500/10' },
  motherboard: { border: 'border-l-purple-500',  glow: 'hover:shadow-purple-500/10' },
  ram:         { border: 'border-l-cyan-500',    glow: 'hover:shadow-cyan-500/10' },
  ssd:         { border: 'border-l-orange-500',  glow: 'hover:shadow-orange-500/10' },
  psu:         { border: 'border-l-yellow-500',  glow: 'hover:shadow-yellow-500/10' },
  cooler:      { border: 'border-l-sky-500',     glow: 'hover:shadow-sky-500/10' },
  case:        { border: 'border-l-slate-400',   glow: 'hover:shadow-slate-400/10' },
};

// Category grid config — unique gradients & Lucide icons
const catGridConfig = {
  cpu:         { gradient: 'from-teal-900/80 to-teal-950/90',    glow: 'shadow-teal-500/20',    Icon: Cpu,            color: '#2dd4bf' },
  gpu:         { gradient: 'from-purple-900/80 to-purple-950/90', glow: 'shadow-purple-500/20',  Icon: MonitorSpeaker, color: '#a78bfa' },
  motherboard: { gradient: 'from-amber-900/80 to-amber-950/90',  glow: 'shadow-amber-500/20',   Icon: CircuitBoard,   color: '#fbbf24' },
  ram:         { gradient: 'from-rose-900/80 to-rose-950/90',    glow: 'shadow-rose-500/20',    Icon: MemoryStick,    color: '#fb7185' },
  ssd:         { gradient: 'from-slate-800/80 to-slate-900/90',  glow: 'shadow-slate-500/20',   Icon: HardDrive,      color: '#94a3b8' },
  psu:         { gradient: 'from-blue-900/80 to-blue-950/90',    glow: 'shadow-blue-500/20',    Icon: Zap,            color: '#60a5fa' },
  cooler:      { gradient: 'from-fuchsia-900/80 to-fuchsia-950/90', glow: 'shadow-fuchsia-500/20', Icon: Fan,         color: '#e879f9' },
  case:        { gradient: 'from-zinc-800/80 to-zinc-900/90',    glow: 'shadow-zinc-500/20',    Icon: Box,            color: '#a1a1aa' },
};

const PAGE_SIZE = 30;

function getGroupKey(item) {
  return item.brand || item.name?.split(' ')[0] || 'أخرى';
}

export default function BuilderPage() {
  usePageTitle('جمّع جهازك');
  const { components, setComponent, removeComponent, clearBuild, loadPreset, loadFromEncoded, getShareUrl, saveBuild, totalPrice, selectedCount } = useBuild();
  const [searchParams] = useSearchParams();
  const [openPicker, setOpenPicker] = useState(null);
  const [isSharedBuild, setIsSharedBuild] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [sortBy, setSortBy] = useState('smart');
  const [showOnlyCompat, setShowOnlyCompat] = useState(true);
  const [priceHistoryOpen, setPriceHistoryOpen] = useState(null);
  const [customMode, setCustomMode] = useState(false);
  const [customInputs, setCustomInputs] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterTier, setFilterTier] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [stickyDropdown, setStickyDropdown] = useState(false);
  const [buyAllBlocked, setBuyAllBlocked] = useState(false);

  // Live prices from Amazon Creators API
  const selectedAsins = useMemo(() =>
    Object.values(components).filter(c => c?.asin).map(c => c.asin),
    [components]
  );
  const { prices: livePrices } = useLivePrices(selectedAsins);

  // Helper: get display price for a component (live or static)
  const getPrice = (comp) => {
    if (!comp) return { value: 0, isLive: false };
    const live = livePrices[comp.asin];
    if (live?.live && live?.price) return { value: live.price, isLive: true };
    return { value: comp.price || 0, isLive: false };
  };

  // Live-aware total price
  const liveTotalPrice = useMemo(() =>
    Object.values(components).filter(Boolean).reduce((sum, c) => sum + getPrice(c).value, 0),
    [components, livePrices]
  );

  useEffect(() => {
    const encoded = searchParams.get('b');
    const preset = searchParams.get('preset');
    if (encoded) {
      loadFromEncoded(encoded).then(loaded => {
        if (loaded) setIsSharedBuild(true);
      });
    } else if (preset) {
      loadPreset(preset);
    }
  }, []);

  useEffect(() => {
    if (openPicker) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [openPicker]);

  const pickerItems = useMemo(() => {
    if (!openPicker) return [];
    let items = getCompatible(openPicker, components);
    if (showOnlyCompat) items = items.filter(c => c.compatible);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(c => c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q));
    }
    if (filterBrand !== 'all') items = items.filter(c => c.brand === filterBrand);
    if (filterTier !== 'all') items = items.filter(c => c.tier === filterTier);
    // Incompatible at end, ASIN items prioritized in smart sort
    items.sort((a, b) => {
      if (!a.compatible && b.compatible) return 1;
      if (a.compatible && !b.compatible) return -1;
      if (sortBy === 'smart') {
        // Prioritize items with ASIN (working Amazon links/images)
        if (a.asin && !b.asin) return -1;
        if (!a.asin && b.asin) return 1;
        return 0;
      }
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'score': return (b.score || 0) - (a.score || 0);
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
    return items;
  }, [openPicker, components, sortBy, showOnlyCompat, searchQuery, filterBrand, filterTier]);

  const groupedView = useMemo(() => {
    const visible = pickerItems.slice(0, visibleCount);
    const groupMap = new Map();
    visible.forEach(item => {
      const key = getGroupKey(item);
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key).push(item);
    });
    // Sort brands by product count (most first)
    const sorted = [...groupMap.entries()].sort((a, b) => b[1].length - a[1].length);
    const result = [];
    sorted.forEach(([key, items]) => {
      result.push({ _header: key, _count: items.length });
      items.forEach(item => result.push(item));
    });
    return result;
  }, [pickerItems, visibleCount, openPicker]);

  const availableBrands = useMemo(() => {
    if (!openPicker) return [];
    return [...new Set(getCompatible(openPicker, components).map(c => c.brand))].sort();
  }, [openPicker, components]);

  const compatCount = useMemo(() => {
    if (!openPicker) return 0;
    return getCompatible(openPicker, components).filter(c => c.compatible).length;
  }, [openPicker, components]);

  const totalCatCount = useMemo(() => {
    if (!openPicker) return 0;
    return getCompatible(openPicker, components).length;
  }, [openPicker, components]);

  const openPickerModal = (cat) => {
    setOpenPicker(cat);
    setSearchQuery('');
    setFilterBrand('all');
    setFilterTier('all');
    setCustomMode(false);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSelect = (cat, item) => {
    setComponent(cat, item);
    setOpenPicker(null);
  };

  const handleCustomAdd = (cat) => {
    const input = customInputs[cat] || {};
    if (!input.name?.trim()) return;
    setComponent(cat, {
      id: `custom-${cat}-${Date.now()}`,
      name: input.name.trim(),
      brand: 'مخصص',
      type: cat,
      price: input.price ? parseInt(input.price) : 0,
      isCustom: true,
      url: input.url?.trim() || '',
    });
    setOpenPicker(null);
    setCustomMode(false);
    setCustomInputs(m => ({ ...m, [cat]: {} }));
  };

  const updateCustomInput = (cat, field, value) => {
    setCustomInputs(m => ({ ...m, [cat]: { ...(m[cat] || {}), [field]: value } }));
  };

  const specLine = (cat, item) => {
    if (!item) return '';
    switch (cat) {
      case 'cpu': return `${item.cores}C/${item.threads}T • ${item.boostClock}GHz • ${item.socket}`;
      case 'gpu': return `${item.vram}GB • ${item.tdp}W`;
      case 'motherboard': return `${item.socket} • ${item.chipset} • ${item.ramType}`;
      case 'ram': return `${item.size}GB ${item.type} • ${item.speed}MHz`;
      case 'ssd': return `${item.capacity} • ${item.interface}`;
      case 'psu': return `${item.watt}W • ${item.rating}`;
      case 'cooler': return `${item.type} • ${item.tdpMax}W`;
      case 'case': return `${item.formFactor} • GPU ${item.maxGPU}mm`;
      default: return '';
    }
  };

  const currentCat = CATEGORIES.find(c => c.key === openPicker);

  const compat = fullCompatCheck(components);
  const wattage = estimateWattage(components);
  const recPSU = getRecommendedPSU(components);
  const hasIssues = compat.errors.length > 0;
  const psuCapacity = components.psu?.watt || recPSU;
  const psuRatio = psuCapacity > 0 ? wattage / psuCapacity : 0;

  const hasCorePartsSelected = !!(components.cpu && components.gpu && components.motherboard && components.ram);
  const bn = hasCorePartsSelected ? analyzeBottleneck(components.cpu, components.gpu) : null;
  const bottleneckPct = bn?.percent || 0;
  const selectedParts = Object.values(components).filter(Boolean);

  useEffect(() => {
    if (hasCorePartsSelected) track.completeBuild(totalPrice);
  }, [hasCorePartsSelected]);

  const handleShareUrl = () => {
    const url = getShareUrl();
    if (url) {
      navigator.clipboard.writeText(url);
      track.shareBuild();
      alert('تم نسخ رابط التجميعة! 📋');
    }
  };

  const handleSave = () => {
    saveBuild();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleBuyAll = () => {
    const allParts = Object.values(components).filter(Boolean);
    if (allParts.length === 0) return;
    track.clickAmazon('buy_all', totalPrice);
    allParts.forEach((part, index) => {
      setTimeout(() => {
        const url = part.asin
          ? `https://www.amazon.sa/dp/${part.asin}?tag=meshal039-21`
          : `https://www.amazon.sa/s?k=${encodeURIComponent(part.name)}&tag=meshal039-21`;
        const win = window.open(url, '_blank');
        if (!win && index === 0) {
          setBuyAllBlocked(true);
          setTimeout(() => setBuyAllBlocked(false), 5000);
        }
      }, index * 300);
    });
  };

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, filterBrand, filterTier, sortBy, showOnlyCompat]);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-36 md:pb-10 px-3 sm:px-4">
      <div className="max-w-4xl lg:max-w-6xl mx-auto">
        {/* Header — sticky on mobile */}
        <div className="sticky top-14 sm:top-16 z-30 -mx-3 sm:-mx-4 px-3 sm:px-4 py-3 sm:py-0 sm:static sm:z-auto bg-gb-bg/95 backdrop-blur-xl sm:backdrop-blur-none sm:bg-transparent mb-5 sm:mb-6">
          <div>
            <h1 className="font-display text-lg sm:text-2xl font-bold text-gb-text">جمّع جهازك</h1>
            <p className="text-gb-muted text-xs mt-0.5 hidden sm:block">اختر القطع — بيظهر لك بس المتوافقة</p>
          </div>
        </div>

        {/* Progress bar — 8 circles + gradient bar */}
        <div className="mb-5 px-2">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gb-border -translate-y-1/2 z-0" />
            {CATEGORIES.map(({ key, label }) => {
              const comp = components[key];
              const filled = !!comp;
              const isCustom = comp?.isCustom;
              return (
                <button key={key} onClick={() => {
                  const el = document.getElementById(`row-${key}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  else openPickerModal(key);
                }} className="relative z-10 flex flex-col items-center gap-1 group">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                    filled && isCustom ? 'bg-yellow-500 text-gb-bg shadow-[0_0_14px_rgba(234,179,8,0.5)]'
                    : filled ? 'bg-gb-primary text-gb-bg shadow-[0_0_14px_rgba(0,229,255,0.5)]'
                    : 'bg-gb-card border border-gb-border text-gb-muted group-hover:border-gb-primary/30 group-hover:shadow-[0_0_10px_rgba(0,229,255,0.15)]'
                  }`}>
                    {filled && isCustom ? <AlertCircle size={14} strokeWidth={3} /> : filled ? <Check size={14} strokeWidth={3} /> : <span className="text-xs">{catIcons[key]}</span>}
                  </div>
                  <span className={`text-[9px] sm:text-[10px] whitespace-nowrap transition-colors ${filled && isCustom ? 'text-yellow-400 font-bold' : filled ? 'text-gb-primary font-bold' : 'text-gb-muted group-hover:text-gb-text'}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Thin gradient progress bar */}
          <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-3">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#00e5ff] via-[#7c4dff] to-[#00e676]"
              initial={{ width: 0 }}
              animate={{ width: `${(selectedCount / 8) * 100}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-gb-muted font-mono">{selectedCount}/8 قطع</span>
            {selectedCount === 8 && <span className="text-[10px] text-[#00e676] font-bold">تجميعة كاملة!</span>}
          </div>
        </div>

        {/* ========== TWO-COLUMN DESKTOP LAYOUT ========== */}
        <div className="lg:grid lg:grid-cols-5 lg:gap-6">
        <div className="lg:col-span-3">

        {/* 2×2 Category Grid — shown for unfilled categories */}
        {selectedCount < 8 && (
          <div className="mb-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {CATEGORIES.filter(({ key }) => !components[key]).map(({ key, label }) => {
              const cfg = catGridConfig[key];
              if (!cfg) return null;
              const CatIcon = cfg.Icon;
              return (
                <button
                  key={key}
                  onClick={() => openPickerModal(key)}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${cfg.gradient} border border-white/5 p-5 sm:p-6 flex flex-col items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.96] shadow-lg ${cfg.glow} min-h-[120px]`}
                >
                  <div className="rounded-full p-3 bg-black/20 backdrop-blur-sm" style={{ boxShadow: `0 0 24px ${cfg.color}33` }}>
                    <CatIcon size={36} className="sm:hidden" style={{ color: cfg.color }} strokeWidth={1.5} />
                    <CatIcon size={48} className="hidden sm:block" style={{ color: cfg.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-white/90">{label}</span>
                  <span className="text-[10px] text-white/40 font-medium">+ اختر</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Compatibility status */}
        {selectedCount >= 2 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${
              hasIssues ? 'bg-red-500/5 border-red-500/20' : compat.warnings.length > 0 ? 'bg-yellow-500/5 border-yellow-500/20' : compat.ok.length > 0 ? 'bg-green-500/5 border-green-500/20' : 'bg-yellow-500/5 border-yellow-500/20'
            }`}>
            {hasIssues ? <ShieldAlert size={16} className="text-red-400 shrink-0 mt-0.5" />
              : compat.warnings.length > 0 ? <AlertTriangle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
              : compat.ok.length > 0 ? <ShieldCheck size={16} className="text-green-400 shrink-0 mt-0.5" />
              : <AlertTriangle size={16} className="text-yellow-400 shrink-0 mt-0.5" />}
            <div>
              {compat.errors.map((e, i) => <p key={i} className="text-red-400">{e}</p>)}
              {compat.warnings.map((w, i) => <p key={i} className="text-yellow-400">{w}</p>)}
              {compat.ok.map((o, i) => <p key={i} className="text-green-400">{o}</p>)}
              {!hasIssues && compat.warnings.length === 0 && compat.ok.length === 0 && <p className="text-yellow-400">لا يمكن التحقق الكامل من التوافق</p>}
            </div>
          </motion.div>
        )}

        {/* Shared build banner */}
        {isSharedBuild && (
          <div className="bg-[#7c4dff]/10 border border-[#7c4dff]/20 rounded-xl p-3 mb-4 text-center">
            <p className="text-sm text-white/70">📤 هذي تجميعة مشاركة — تقدر تعدّل عليها</p>
            <button onClick={() => { saveBuild('تجميعة معدّلة'); setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 2000); }}
              className="text-[#00e5ff] text-xs font-bold mt-1">
              {saveSuccess ? '✅ تم الحفظ!' : '💾 احفظ نسختك'}
            </button>
          </div>
        )}

        {/* ========== COMPLETION SECTION (mobile only) ========== */}
        {hasCorePartsSelected && (
          <div className="lg:hidden bg-gradient-to-b from-[#00e5ff]/5 to-transparent border border-[#00e5ff]/20 rounded-2xl p-5 mb-6">
            <h3 className="text-lg font-bold text-center mb-4 text-white">🎉 تهانينا! تجميعتك جاهزة</h3>

            {/* Quick stats */}
            <div className="flex justify-around text-center mb-4">
              <div>
                <div className="text-[#00e676] font-bold font-mono text-xl">~{liveTotalPrice.toLocaleString()}</div>
                <div className="text-[10px] text-white/40">ر.س تقريبي</div>
              </div>
              <div>
                <div className={`font-bold font-mono text-xl ${bottleneckPct <= 5 ? 'text-[#00e676]' : bottleneckPct <= 15 ? 'text-[#ffc107]' : 'text-[#ff9800]'}`}>
                  {bottleneckPct <= 5 ? '✅' : bottleneckPct <= 15 ? '🟡' : '⚠️'}
                </div>
                <div className="text-[10px] text-white/40">التوازن</div>
              </div>
            </div>

            {/* Per-part Amazon links with prices */}
            <div className="space-y-2 mb-4">
              {selectedParts.map(part => {
                const pp = getPrice(part);
                return (
                <div key={part.id} className="flex items-center gap-2 bg-[#0f1019] rounded-xl px-3 py-2.5 border border-[#1a1a2e]">
                  <span className="text-xs text-white/70 truncate flex-1">{part.name}</span>
                  {pp.value > 0 && (
                    <div className="flex items-center gap-1 shrink-0">
                      <span className={`text-[11px] font-mono font-bold ${pp.isLive ? 'text-[#00e676]' : 'text-[#00e5ff]'}`}>{pp.isLive ? '' : '~'}{pp.value.toLocaleString()}</span>
                      <span className="text-[9px] text-white/30">ر.س</span>
                    </div>
                  )}
                  {!part.isCustom ? (
                    <a href={getAmazonLink(part)} target="_blank" rel="noopener noreferrer"
                       onClick={() => track.clickAmazon(part.name, part.price)}
                       className="shrink-0 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#ff9900] to-[#e8890a] text-[#0a0a14] text-[10px] font-bold hover:scale-105 hover:brightness-110 transition-all whitespace-nowrap flex items-center gap-1">
                      🛒 أمازون
                    </a>
                  ) : (
                    <span className="shrink-0 text-[10px] text-white/20">مخصص</span>
                  )}
                </div>
              ); })}
            </div>

            {/* Buy All CTA */}
            <button
              onClick={handleBuyAll}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-base mb-3 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] active:scale-[0.98] transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                <span>اشتر كل القطع من أمازون</span>
              </div>
              <div className="text-[10px] text-black/50 mt-0.5">
                يفتح {selectedParts.filter(p => !p.isCustom).length} صفحات — كل قطعة بصفحتها على أمازون السعودية
              </div>
            </button>

            {buyAllBlocked && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-3 text-center">
                <p className="text-xs text-yellow-400">المتصفح منع فتح النوافذ — اضغط على كل قطعة لفتحها</p>
              </div>
            )}

            {/* Action buttons — share, save, analyze */}
            <div className="flex gap-2 mb-2">
              <button onClick={handleShareUrl} className="flex-1 text-center bg-[#00e5ff]/15 text-[#00e5ff] rounded-xl py-2.5 text-sm font-bold active:scale-95 transition-transform">
                🔗 شارك الرابط
              </button>
              <button onClick={handleSave} className="flex-1 text-center bg-[#7c4dff]/15 text-[#7c4dff] rounded-xl py-2.5 text-sm font-bold active:scale-95 transition-transform">
                {saveSuccess ? '✅ تم!' : '💾 احفظ'}
              </button>
            </div>
            <Link to="/analysis" className="block text-center bg-white/5 text-white/50 rounded-xl py-2.5 text-sm font-bold">
              📊 تحليل مفصّل
            </Link>

            <p className="text-[10px] text-white/20 text-center mt-3">💡 الأسعار تقريبية — اضغط على كل قطعة للسعر الفعلي من أمازون</p>

            <button
              onClick={() => { if (window.confirm('متأكد تبي تحذف التجميعة وتبدأ من جديد؟')) clearBuild(); }}
              className="w-full text-center text-xs text-white/30 hover:text-red-400 py-2 mt-3 transition-colors"
            >
              ابدأ من جديد
            </button>
          </div>
        )}

        {/* Component Rows */}
        <div className="rounded-xl sm:rounded-2xl border border-gb-border overflow-hidden bg-gb-card">
          {CATEGORIES.map(({ key, label, labelEn, icon, required }) => {
            const selected = components[key];
            const cc = catColors[key] || {};
            return (
              <div key={key} id={`row-${key}`} className={`border-b border-gb-border last:border-0 border-l-2 ${cc.border || ''}`}>
                <div
                  className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-4 sm:py-4 cursor-pointer transition-all duration-300 active:bg-gb-surface/30 hover:-translate-y-px hover:shadow-lg ${cc.glow || ''} ${
                    selected ? 'hover:bg-gb-surface/20' : 'hover:bg-gb-surface/30 border-dashed'
                  }`}
                  onClick={() => openPickerModal(key)}
                >
                  {/* Thumbnail */}
                  {selected ? (
                    <ProductImage component={selected} size="sm" className="w-12 h-12 rounded-xl shrink-0 p-1" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl border-2 border-dashed border-gb-border flex items-center justify-center shrink-0">
                      <Plus size={18} className="text-gb-muted" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-gb-text">{label}</span>
                      <span className="text-[10px] text-gb-muted font-mono hidden sm:inline">{labelEn}</span>
                      {required && !selected && <span className="text-[8px] text-gb-accent font-bold">مطلوب</span>}
                    </div>
                    {selected ? (
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs sm:text-sm text-gb-text truncate font-bold">{(() => { const dn = getDisplayName(selected, key); return dn.startsWith(selected.brand) ? dn : `${selected.brand} ${dn}`; })()}</p>
                          {selected.isCustom && <span className="text-[8px] px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-400 font-bold shrink-0">مخصص</span>}
                        </div>
                        <p className="text-[10px] sm:text-xs text-gb-muted truncate">{specLine(key, selected)}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-gb-muted">اضغط لاختيار {label}</p>
                    )}
                  </div>

                  {selected ? (
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      {(() => { const p = getPrice(selected); return (
                      <div className="text-left">
                        <span className="text-sm sm:text-base font-display font-bold whitespace-nowrap block" style={{ color: p.isLive ? '#00e676' : '#ffd740' }}>
                          {p.isLive ? '' : '~'}{p.value?.toLocaleString()}
                        </span>
                        <span className="text-[9px] text-gb-muted">ر.س {p.isLive
                          ? <span className="bg-green-500/20 text-green-400 px-1 py-px rounded-full font-bold">أمازون</span>
                          : <span className="bg-amber-500/20 text-amber-400 px-1 py-px rounded-full font-bold">تقريبي</span>
                        }</span>
                      </div>
                      ); })()}
                      {!selected.isCustom && (
                        <button onClick={e => { e.stopPropagation(); setPriceHistoryOpen(priceHistoryOpen === key ? null : key); }}
                          className={`p-1.5 rounded-lg transition-colors ${priceHistoryOpen === key ? 'text-gb-primary bg-gb-primary/10' : 'text-gb-muted hover:text-gb-primary'}`}>
                          <BarChart2 size={14} />
                        </button>
                      )}
                      {!selected.isCustom && selected.asin && (
                        <a href={getAmazonLink(selected)} target="_blank" rel="noreferrer" onClick={e => { e.stopPropagation(); track.clickAmazon(selected.name, selected.price); }} className="p-1.5 rounded-lg text-[#ff9900] hover:text-[#ffb340] transition-colors"><ExternalLink size={13} /></a>
                      )}
                      <button onClick={e => { e.stopPropagation(); openPickerModal(key); }} className="p-1.5 rounded-lg text-gb-muted hover:text-gb-primary transition-colors text-[10px] font-bold">تغيير</button>
                      <button onClick={e => { e.stopPropagation(); removeComponent(key); }} className="p-1.5 text-gb-muted hover:text-gb-accent transition-colors"><X size={14} /></button>
                    </div>
                  ) : (
                    <span className="text-xs font-display font-bold shrink-0" style={{ color: '#00e676' }}>+ اختر</span>
                  )}
                </div>

                {selected && !selected.isCustom && priceHistoryOpen === key && (
                  <div className="px-3 sm:px-5 py-3 bg-gb-bg/30 border-t border-gb-border/50">
                    <PriceChart componentId={selected.id} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Footer: Wattage + Total */}
          <div className="bg-gb-surface/50 px-3 sm:px-5 py-4 border-t border-gb-border">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-1.5 text-xs text-gb-muted"><Zap size={13} className="text-yellow-400" /> واط تقديري</span>
                <span className="text-xs font-display text-gb-text">
                  {wattage}W / {psuCapacity}W
                  {selectedCount >= 2 && !components.psu && <span className="text-yellow-400 mr-1 text-[10px]"> (يفضل {recPSU}W+)</span>}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-gb-bg overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(psuRatio * 100, 100)}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${psuRatio > 0.95 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : psuRatio > 0.8 ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.3)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]'}`} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gb-muted">{selectedCount}/8 قطع</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-display font-black" style={{ color: '#00e676' }}>~{liveTotalPrice.toLocaleString()} <span className="text-xs text-gb-muted">ر.س</span></span>
                <span className="bg-amber-500/20 text-amber-400 text-[9px] px-1.5 py-0.5 rounded-full font-bold">تقريبي</span>
              </div>
            </div>
            {selectedCount >= 1 && (
              <p className="text-[9px] text-gb-muted/60 text-left mt-1.5">💡 الأسعار تقريبية — اضغط "شيك السعر" لكل قطعة للسعر الفعلي من أمازون</p>
            )}
            {selectedCount >= 2 && (
              <div className="mt-3 space-y-2">
                {/* Per-part Amazon links */}
                <div className="space-y-1.5">
                  {Object.entries(components).filter(([, v]) => v).map(([cat, comp]) => {
                    const fp = getPrice(comp);
                    return (
                    <div key={cat} className="flex items-center gap-2 px-3 py-2 bg-gb-bg/40 rounded-lg">
                      <span className="text-xs shrink-0">{catIcons[cat]}</span>
                      <span className="text-[11px] text-gb-text truncate flex-1">{comp.name}</span>
                      <span className="text-[11px] font-display font-bold shrink-0" style={{ color: fp.isLive ? '#00e676' : '#ffd740' }}>{fp.isLive ? '' : '~'}{fp.value?.toLocaleString()}</span>
                      {!comp.isCustom && (
                        <a href={getAmazonLink(comp)} target="_blank" rel="noopener noreferrer"
                          onClick={() => track.clickAmazon(comp.name, comp.price)}
                          className="shrink-0 px-2.5 py-1 rounded-lg bg-[#ff9900]/90 text-[#0a0a14] text-[10px] font-bold hover:bg-[#ff9900] hover:scale-105 transition-all whitespace-nowrap flex items-center gap-0.5">
                          🛒 أمازون
                        </a>
                      )}
                    </div>
                  ); })}
                </div>

              </div>
            )}
          </div>
        </div>

        </div>{/* end lg:col-span-3 */}

        {/* ========== DESKTOP SIDEBAR ========== */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="sticky top-20 space-y-4">
            {/* Summary card */}
            <div className="bg-gb-card border border-gb-border rounded-2xl p-5">
              <h3 className="font-display font-bold text-base text-gb-text mb-4">ملخص التجميعة</h3>

              {/* Selected parts list */}
              {selectedCount > 0 ? (
                <div className="space-y-2 mb-4">
                  {Object.entries(components).filter(([, v]) => v).map(([cat, comp]) => {
                    const sp = getPrice(comp);
                    return (
                    <div key={cat} className="flex items-center gap-2 px-3 py-2 bg-gb-bg/40 rounded-lg">
                      <span className="text-xs shrink-0">{catIcons[cat]}</span>
                      <span className="text-[11px] text-gb-text truncate flex-1">{comp.name}</span>
                      {sp.value > 0 && (
                        <span className={`text-[11px] font-mono font-bold shrink-0 ${sp.isLive ? 'text-[#00e676]' : 'text-[#ffd740]'}`}>{sp.isLive ? '' : '~'}{sp.value?.toLocaleString()}</span>
                      )}
                      {!comp.isCustom && comp.asin && (
                        <a href={getAmazonLink(comp)} target="_blank" rel="noopener noreferrer"
                          onClick={() => track.clickAmazon(comp.name, comp.price)}
                          className="shrink-0 px-2 py-1 rounded-lg bg-[#ff9900]/90 text-[#0a0a14] text-[10px] font-bold hover:bg-[#ff9900] hover:scale-105 transition-all">
                          🛒
                        </a>
                      )}
                    </div>
                  ); })}
                </div>
              ) : (
                <p className="text-xs text-gb-muted mb-4">ما اخترت قطع بعد — ابدأ من الشمال</p>
              )}

              {/* Wattage bar */}
              {selectedCount >= 2 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1.5 text-xs text-gb-muted"><Zap size={13} className="text-yellow-400" /> واط</span>
                    <span className="text-xs font-display text-gb-text">{wattage}W / {psuCapacity}W</span>
                  </div>
                  <div className="h-2 rounded-full bg-gb-bg overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(psuRatio * 100, 100)}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${psuRatio > 0.95 ? 'bg-red-500' : psuRatio > 0.8 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                  </div>
                </div>
              )}

              {/* Total price */}
              <div className="flex items-center justify-between py-3 border-t border-gb-border">
                <span className="text-xs text-gb-muted">{selectedCount}/8 قطع</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-display font-black text-[#00e676]">~{liveTotalPrice.toLocaleString()}</span>
                  <span className="text-xs text-gb-muted">ر.س</span>
                </div>
              </div>

              {/* Buy All CTA */}
              {selectedCount >= 2 && (
                <div className="mt-3 space-y-2">
                  <button onClick={handleBuyAll}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-[#0a0a14] font-bold text-sm hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] active:scale-[0.97] transition-all">
                    <ShoppingCart size={16} /> اشتر كل القطع من أمازون
                  </button>
                  {buyAllBlocked && (
                    <p className="text-xs text-yellow-400 text-center">المتصفح منع فتح النوافذ — اضغط على كل قطعة</p>
                  )}
                </div>
              )}
            </div>

            {/* Action buttons */}
            {hasCorePartsSelected && (
              <div className="bg-gb-card border border-gb-border rounded-2xl p-4 space-y-2">
                <div className="flex gap-2">
                  <button onClick={handleShareUrl} className="flex-1 text-center bg-[#00e5ff]/15 text-[#00e5ff] rounded-xl py-2.5 text-sm font-bold active:scale-95 transition-transform">
                    🔗 شارك
                  </button>
                  <button onClick={handleSave} className="flex-1 text-center bg-[#7c4dff]/15 text-[#7c4dff] rounded-xl py-2.5 text-sm font-bold active:scale-95 transition-transform">
                    {saveSuccess ? '✅ تم!' : '💾 احفظ'}
                  </button>
                </div>
                <Link to="/analysis" className="block text-center bg-white/5 text-white/50 rounded-xl py-2.5 text-sm font-bold">
                  📊 تحليل مفصّل
                </Link>
                <button
                  onClick={() => { if (window.confirm('متأكد تبي تحذف التجميعة وتبدأ من جديد؟')) clearBuild(); }}
                  className="w-full text-center text-xs text-white/30 hover:text-red-400 py-2 transition-colors"
                >
                  ابدأ من جديد
                </button>
              </div>
            )}
          </div>
        </div>

        </div>{/* end lg:grid */}

      </div>

      {/* ========== STICKY MOBILE BOTTOM BAR ========== */}
      {selectedCount >= 1 && (
        <div className="fixed bottom-14 left-0 right-0 z-40 md:hidden">
          {/* Expandable dropdown */}
          <AnimatePresence>
            {stickyDropdown && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[-1]"
                  onClick={() => setStickyDropdown(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="mx-3 mb-2 bg-[#0a0a12]/95 backdrop-blur-xl border border-[#00e5ff]/20 rounded-xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto"
                >
                  <div className="p-3 space-y-1.5">
                    {Object.entries(components).filter(([, v]) => v).map(([cat, comp]) => (
                      <div key={cat} className="flex items-center gap-2 px-2 py-1.5">
                        <ProductImage component={comp} size="sm" className="w-8 h-8 rounded-lg shrink-0 p-0.5" />
                        <span className="text-[11px] text-white/70 truncate flex-1">{comp.name}</span>
                        <span className="text-[10px] font-mono font-bold text-[#00e676] shrink-0">~{comp.price?.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#1a1a2e] p-3">
                    <button onClick={() => { handleBuyAll(); setStickyDropdown(false); }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-all">
                      <ShoppingCart size={16} /> اشتر الكل من أمازون
                    </button>
                    <div className="flex items-center justify-between mt-2 px-1">
                      <span className="text-[10px] text-white/30">{selectedCount} قطع</span>
                      <span className="text-sm font-display font-bold text-[#00e676]">~{liveTotalPrice.toLocaleString()} ر.س</span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          {/* Bar */}
          <div
            onClick={() => setStickyDropdown(!stickyDropdown)}
            className="bg-[#0f1019]/95 backdrop-blur border-t border-[#1a1a2e] px-4 py-2 flex items-center justify-between text-sm cursor-pointer active:bg-[#1a1a2e]/50 transition-colors"
          >
            <span className="text-[#00e676] font-bold font-mono">~{liveTotalPrice.toLocaleString()} ر.س</span>
            <div className="flex items-center gap-1">
              {CATEGORIES.map(({ key }) => (
                <div key={key} className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  components[key] ? 'bg-[#00e5ff] shadow-[0_0_6px_rgba(0,229,255,0.5)]' : 'bg-white/10'
                }`} />
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white/40">⚡ {wattage}W</span>
              <ChevronDown size={14} className={`text-white/30 transition-transform ${stickyDropdown ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </div>
      )}

      {/* ========== FULL-SCREEN PICKER ========== */}
      <AnimatePresence>
        {openPicker && currentCat && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80" onClick={() => setOpenPicker(null)} />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{ paddingTop: 'env(safe-area-inset-top, 44px)' }}
              className="fixed inset-0 z-50 bg-[#0a0a14] flex flex-col sm:inset-2 sm:rounded-2xl sm:border sm:border-[#1e1e2e] overflow-hidden"
            >
              {/* ── Header ── */}
              <div className="shrink-0 sticky top-0 z-10 bg-[#0a0a14]">
                <div className="flex items-center justify-between px-4 min-h-[56px]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{currentCat.icon}</span>
                    <h2 className="font-display font-bold text-base text-white">{currentCat.label}</h2>
                    <span className="text-[11px] text-[#555] font-medium">{compatCount} متوافق من {totalCatCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCustomMode(!customMode)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${customMode ? 'bg-cyan-500 text-[#0a0a14]' : 'text-[#666] hover:text-white'}`}>
                      + يدوي
                    </button>
                    <button onClick={() => setOpenPicker(null)} className="w-10 h-10 rounded-xl bg-[#1a1a2e] flex items-center justify-center text-[#888] hover:text-red-400 transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                </div>
                <div className="border-b border-[#1e1e2e]" />

                {/* Search */}
                {!customMode && (
                  <div className="px-4 pt-3 pb-3">
                    <div className="relative">
                      <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555]" />
                      <input type="text" placeholder={`ابحث في ${currentCat.label}...`}
                        value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl pr-10 pl-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-cyan-500/40 transition-all"
                        autoFocus />
                    </div>
                  </div>
                )}

                {/* Filters */}
                {!customMode && (
                  <div className="px-4 pb-3 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                      <button onClick={() => setFilterBrand('all')}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${filterBrand === 'all' ? 'bg-cyan-500 text-[#0a0a14]' : 'bg-[#1a1a2e] text-[#888] hover:text-white'}`}>
                        الكل
                      </button>
                      {availableBrands.slice(0, 20).map(b => (
                        <button key={b} onClick={() => setFilterBrand(filterBrand === b ? 'all' : b)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${filterBrand === b ? 'bg-cyan-500 text-[#0a0a14]' : 'bg-[#1a1a2e] text-[#888] hover:text-white'}`}>
                          {b}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                      {['all', 'budget', 'mid-range', 'high-end', 'enthusiast'].map(t => (
                        <button key={t} onClick={() => setFilterTier(filterTier === t ? 'all' : t)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-all ${filterTier === t ? 'bg-purple-500 text-white' : 'text-[#666] hover:text-white'}`}>
                          {t === 'all' ? 'كل الفئات' : tierLabels[t]}
                        </button>
                      ))}
                      <div className="mr-auto" />
                      <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                        className="text-[11px] bg-[#1a1a2e] border border-[#2a2a3e] rounded-full px-3 py-1 text-[#888] focus:outline-none cursor-pointer">
                        <option value="smart">الترتيب الافتراضي</option>
                        <option value="price-asc">السعر ↑</option>
                        <option value="price-desc">السعر ↓</option>
                        <option value="score">الأداء</option>
                        <option value="name">الاسم</option>
                      </select>
                      <label className="flex items-center gap-1.5 text-[11px] text-[#666] cursor-pointer whitespace-nowrap">
                        <input type="checkbox" checked={showOnlyCompat} onChange={e => setShowOnlyCompat(e.target.checked)} className="accent-cyan-500 w-3.5 h-3.5 rounded" />
                        متوافق
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Body ── */}
              {customMode ? (
                <div className="p-5 space-y-3 max-w-lg mx-auto w-full">
                  <p className="text-sm text-[#888] mb-2">أضف قطعة غير موجودة في القائمة</p>
                  <input type="text" placeholder="اسم القطعة *" value={customInputs[openPicker]?.name || ''}
                    onChange={e => updateCustomInput(openPicker, 'name', e.target.value)}
                    className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-cyan-500/40" />
                  <input type="number" placeholder="السعر (ر.س)" value={customInputs[openPicker]?.price || ''}
                    onChange={e => updateCustomInput(openPicker, 'price', e.target.value)}
                    className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-cyan-500/40" />
                  <input type="url" placeholder="رابط المتجر (اختياري)" value={customInputs[openPicker]?.url || ''}
                    onChange={e => updateCustomInput(openPicker, 'url', e.target.value)}
                    className="w-full bg-[#12121c] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-cyan-500/40" dir="ltr" />
                  <button onClick={() => handleCustomAdd(openPicker)}
                    disabled={!customInputs[openPicker]?.name?.trim()}
                    className="w-full py-3.5 rounded-xl bg-cyan-500 text-[#0a0a14] font-bold text-sm hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                    أضف للتجميعة
                  </button>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  {pickerItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-[#555]">
                      <SlidersHorizontal size={40} className="opacity-20 mb-4" />
                      <p className="text-sm font-medium">لا يوجد نتائج</p>
                      <p className="text-xs mt-1 opacity-60">جرب تغيير الفلتر أو البحث</p>
                    </div>
                  ) : (
                    <div className="p-3 space-y-2">
                      {groupedView.map((entry, gi) => {
                        if (entry._header) {
                          return (
                            <div key={`hdr-${gi}`} className="sticky top-0 z-10 -mx-3 px-4 py-2 mt-2 first:mt-0 bg-[#0a0a14]/95 backdrop-blur-sm border-b border-[#1a1a2e]">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#00e5ff]/80 tracking-wider">{entry._header}</span>
                                <span className="text-[10px] text-white/20">{entry._count} قطعة</span>
                              </div>
                            </div>
                          );
                        }
                        const item = entry;
                        const isSelected = components[openPicker]?.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => item.compatible && handleSelect(openPicker, item)}
                            className={`flex items-stretch gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl border transition-all active:scale-[0.98] ${
                              !item.compatible ? 'opacity-30 cursor-not-allowed border-[#1e1e2e] bg-[#12121c]' :
                              isSelected ? 'border-[#00e676]/40 bg-[#00e676]/5 cursor-pointer' :
                              'border-[#1e1e2e] bg-[#12121c] cursor-pointer hover:border-[#2a2a3e] active:bg-[#16161f]'
                            }`}
                          >
                            {/* Image — left */}
                            <ProductImage component={item} className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] shrink-0 rounded-xl p-1.5 sm:p-2" />

                            {/* Info — center */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                              <div>
                                {!item.name.startsWith(item.brand) && <p className="text-[10px] sm:text-[11px] text-[#888] font-medium">{item.brand}</p>}
                                <p className="text-[12px] sm:text-[14px] font-bold text-white leading-snug line-clamp-2">{getDisplayName(item, openPicker)}</p>
                                <p className="text-[10px] sm:text-[11px] text-[#555] mt-0.5 truncate">{specLine(openPicker, item)}</p>
                              </div>

                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[16px] sm:text-[18px] font-black" style={{ color: '#00e676' }}>~{item.price?.toLocaleString()}</span>
                                <span className="text-[10px] text-[#666]">ر.س</span>
                                <span className="bg-amber-500/20 text-amber-400 text-[8px] px-1 py-0.5 rounded-full font-bold">تقريبي</span>
                                {item.score ? (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold">{item.score}</span>
                                ) : null}
                              </div>

                              {!item.compatible && item.reason && (
                                <p className="text-[10px] text-red-400 flex items-center gap-1 mt-0.5"><AlertCircle size={10} /> {item.reason}</p>
                              )}
                            </div>

                            {/* Button — right */}
                            <div className="flex flex-col items-center justify-center gap-1.5 shrink-0">
                              <button
                                onClick={e => { e.stopPropagation(); item.compatible && handleSelect(openPicker, item); }}
                                className={`min-w-[70px] sm:min-w-[80px] py-2.5 sm:py-2.5 rounded-xl text-[11px] sm:text-[12px] font-bold transition-all active:scale-95 border ${
                                  isSelected
                                    ? 'bg-[#00e676] text-[#12121c] border-[#00e676]'
                                    : 'bg-[#1a1a2e] text-white border-[#2a2a3e] hover:border-[#00e676]/40 hover:text-[#00e676]'
                                }`}
                              >
                                {isSelected ? '✓ تم' : '+ أضف'}
                              </button>
                              <a href={getAmazonLink(item)} target="_blank" rel="noreferrer"
                                className="text-[9px] sm:text-[10px] text-gb-primary hover:underline flex items-center gap-0.5 font-bold"
                                onClick={e => { e.stopPropagation(); track.clickAmazon(item.name, item.price); }}>
                                🛒 شيك السعر <ExternalLink size={8} />
                              </a>
                            </div>
                          </div>
                        );
                      })}

                      {/* Load More */}
                      {visibleCount < pickerItems.length && (
                        <button
                          onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
                          className="w-full py-3 rounded-xl bg-[#1a1a2e] border border-[#2a2a3e] text-[#888] text-sm font-medium hover:text-white hover:border-[#3a3a4e] transition-all flex items-center justify-center gap-2"
                        >
                          <ChevronDown size={16} />
                          عرض المزيد ({pickerItems.length - visibleCount} متبقي)
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              {!customMode && pickerItems.length > 0 && (
                <div className="shrink-0 px-4 py-2 border-t border-[#1e1e2e] bg-[#0e0e18] text-center">
                  <p className="text-[11px] text-[#555]">عرض {Math.min(visibleCount, pickerItems.length)} من {pickerItems.length} قطعة</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========== CLEAR CONFIRMATION DIALOG ========== */}
      <AnimatePresence>
        {showClearConfirm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/70" onClick={() => setShowClearConfirm(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              className="fixed z-[60] top-1/2 inset-x-0 mx-auto -translate-y-1/2 w-[min(320px,calc(100vw-2rem))] bg-gb-card border border-gb-border rounded-2xl p-6 text-center shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={22} className="text-red-400" />
              </div>
              <h3 className="text-base font-bold text-gb-text mb-2">متأكد تبي تمسح كل القطع؟</h3>
              <p className="text-xs text-gb-muted mb-5">بيتم حذف {selectedCount} قطع من تجميعتك</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gb-surface border border-gb-border text-gb-text text-sm font-medium hover:bg-gb-surface/80 transition-all"
                >
                  لا
                </button>
                <button
                  onClick={() => { clearBuild(); setShowClearConfirm(false); }}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/25 transition-all"
                >
                  أيه امسح
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

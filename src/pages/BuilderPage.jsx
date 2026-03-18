import { useState, useMemo, useEffect, useRef } from 'react';
import { ExternalLink, X, ShieldCheck, ShieldAlert, AlertTriangle, Zap, ShoppingCart, Check, BarChart2, Search, SlidersHorizontal, Truck, RefreshCw, Plus, AlertCircle } from 'lucide-react';
import { CATEGORIES, getCompatible, estimateWattage, getRecommendedPSU, getAmazonLink, fullCompatCheck } from '../utils/db';
import { fetchLivePrices } from '../utils/amazonAPI';
import { useBuild } from '../hooks/BuildContext';
import { motion, AnimatePresence } from 'framer-motion';
import PriceChart from '../components/PriceChart';

const tierLabels = { budget: 'اقتصادي', 'mid-range': 'متوسط', 'high-end': 'عالي', enthusiast: 'خرافي' };

const catIcons = {
  cpu: '🧠', gpu: '🎨', motherboard: '📟', ram: '💾',
  ssd: '💿', psu: '⚡', cooler: '❄️', case: '📦',
};

export default function BuilderPage() {
  const { components, setComponent, removeComponent, clearBuild, totalPrice, selectedCount } = useBuild();
  const [openPicker, setOpenPicker] = useState(null);
  const [sortBy, setSortBy] = useState('price-asc');
  const [showOnlyCompat, setShowOnlyCompat] = useState(true);
  const [priceHistoryOpen, setPriceHistoryOpen] = useState(null);
  const [customMode, setCustomMode] = useState(false);
  const [customInputs, setCustomInputs] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterTier, setFilterTier] = useState('all');
  const [livePrices, setLivePrices] = useState(new Map());
  const [livePriceStatus, setLivePriceStatus] = useState('idle');
  const livePriceFetchedRef = useRef(new Set());

  // Fetch live Amazon prices for selected components
  useEffect(() => {
    const selected = Object.values(components).filter(c => c && c.asin);
    const newAsins = selected.filter(c => !livePriceFetchedRef.current.has(c.asin));
    if (newAsins.length === 0) return;

    setLivePriceStatus('loading');
    fetchLivePrices(newAsins)
      .then(priceMap => {
        if (priceMap.size > 0) {
          setLivePrices(prev => {
            const merged = new Map(prev);
            priceMap.forEach((v, k) => merged.set(k, v));
            return merged;
          });
          newAsins.forEach(c => livePriceFetchedRef.current.add(c.asin));
        }
        setLivePriceStatus('loaded');
      })
      .catch(() => setLivePriceStatus('error'));
  }, [components]);

  const getLivePrice = (item) => {
    if (!item?.asin) return item?.price;
    const live = livePrices.get(item.asin);
    return live?.price ?? item?.price;
  };

  const compat = fullCompatCheck(components);
  const wattage = estimateWattage(components);
  const recPSU = getRecommendedPSU(components);
  const hasIssues = compat.errors.length > 0;
  const psuCapacity = components.psu?.watt || recPSU;
  const psuRatio = psuCapacity > 0 ? wattage / psuCapacity : 0;

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
    items.sort((a, b) => {
      if (!a.compatible && b.compatible) return 1;
      if (a.compatible && !b.compatible) return -1;
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

  const availableBrands = useMemo(() => {
    if (!openPicker) return [];
    return [...new Set(getCompatible(openPicker, components).map(c => c.brand))];
  }, [openPicker, components]);

  const compatCount = useMemo(() => {
    if (!openPicker) return 0;
    return getCompatible(openPicker, components).filter(c => c.compatible).length;
  }, [openPicker, components]);

  const openPickerModal = (cat) => {
    setOpenPicker(cat);
    setSearchQuery('');
    setFilterBrand('all');
    setFilterTier('all');
    setCustomMode(false);
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
      case 'ssd': return `${item.capacity >= 1000 ? item.capacity/1000+'TB' : item.capacity+'GB'} • ${item.interface}`;
      case 'psu': return `${item.watt}W • ${item.rating}`;
      case 'cooler': return `${item.type} • ${item.tdpMax}W`;
      case 'case': return `${item.formFactor} • GPU ${item.maxGPU}mm`;
      default: return '';
    }
  };

  const currentCat = CATEGORIES.find(c => c.key === openPicker);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-36 md:pb-10 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <div>
            <h1 className="font-display text-lg sm:text-2xl font-bold text-gb-text">جمّع جهازك</h1>
            <p className="text-gb-muted text-xs mt-0.5">اختر القطع — بيظهر لك بس المتوافقة</p>
          </div>
          {selectedCount > 0 && (
            <button onClick={clearBuild} className="text-xs text-gb-muted hover:text-gb-accent px-3 py-1.5 rounded-lg border border-gb-border hover:border-gb-accent/30 transition-all">
              مسح الكل
            </button>
          )}
        </div>

        {/* Progress bar — 8 circles */}
        <div className="mb-5 px-2">
          <div className="flex items-center justify-between relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gb-border -translate-y-1/2 z-0" />
            {CATEGORIES.map(({ key, label }) => {
              const comp = components[key];
              const filled = !!comp;
              const isCustom = comp?.isCustom;
              return (
                <button
                  key={key}
                  onClick={() => filled ? null : openPickerModal(key)}
                  className="relative z-10 flex flex-col items-center gap-1"
                >
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm transition-all ${
                    filled && isCustom
                      ? 'bg-yellow-500 text-gb-bg shadow-[0_0_12px_rgba(234,179,8,0.4)]'
                      : filled
                      ? 'bg-gb-primary text-gb-bg shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                      : 'bg-gb-card border border-gb-border text-gb-muted'
                  }`}>
                    {filled && isCustom ? <AlertCircle size={14} strokeWidth={3} /> : filled ? <Check size={14} strokeWidth={3} /> : <span className="text-xs">{catIcons[key]}</span>}
                  </div>
                  <span className={`text-[9px] sm:text-[10px] whitespace-nowrap ${filled && isCustom ? 'text-yellow-400 font-bold' : filled ? 'text-gb-primary font-bold' : 'text-gb-muted'}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Compatibility status */}
        {selectedCount >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${
              hasIssues ? 'bg-red-500/5 border-red-500/20'
              : compat.warnings.length > 0 ? 'bg-yellow-500/5 border-yellow-500/20'
              : compat.hasCustom ? 'bg-yellow-500/5 border-yellow-500/20'
              : 'bg-green-500/5 border-green-500/20'
            }`}
          >
            {hasIssues ? <ShieldAlert size={16} className="text-red-400 shrink-0 mt-0.5" />
              : compat.warnings.length > 0 ? <AlertTriangle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
              : compat.hasCustom ? <AlertTriangle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
              : <ShieldCheck size={16} className="text-green-400 shrink-0 mt-0.5" />}
            <div>
              {compat.errors.map((e, i) => <p key={i} className="text-red-400">{e}</p>)}
              {compat.warnings.map((w, i) => <p key={i} className="text-yellow-400">{w}</p>)}
              {!hasIssues && compat.warnings.length === 0 && !compat.hasCustom && <p className="text-green-400">كل القطع متوافقة</p>}
              {!hasIssues && compat.warnings.length === 0 && compat.hasCustom && <p className="text-yellow-400">بعض القطع مخصصة — تحقق من التوافق يدوياً</p>}
            </div>
          </motion.div>
        )}

        {/* Component Rows */}
        <div className="rounded-xl sm:rounded-2xl border border-gb-border overflow-hidden bg-gb-card">
          {CATEGORIES.map(({ key, label, labelEn, icon, required }) => {
            const selected = components[key];
            return (
              <div key={key} className="border-b border-gb-border last:border-0">
                {/* Category Row */}
                <div
                  className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3.5 sm:py-4 cursor-pointer transition-colors ${
                    selected ? 'hover:bg-gb-surface/20' : 'hover:bg-gb-surface/30 border-dashed'
                  }`}
                  onClick={() => selected ? null : openPickerModal(key)}
                >
                  {/* 48x48 icon / thumbnail */}
                  {selected?.image_url ? (
                    <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <img src={selected.image_url} alt="" loading="lazy" className="w-full h-full object-contain"
                        onError={e => { e.target.parentElement.style.display = 'none'; }} />
                    </div>
                  ) : selected ? (
                    <div className="w-12 h-12 rounded-xl bg-gb-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xl">{icon}</span>
                    </div>
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
                          <p className="text-xs sm:text-sm text-gb-text truncate font-bold">{selected.brand} {selected.name}</p>
                          {selected.isCustom && (
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-400 font-bold shrink-0">مخصص</span>
                          )}
                        </div>
                        <p className="text-[10px] sm:text-xs text-gb-muted truncate">{specLine(key, selected)}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-gb-muted">اضغط لاختيار {label}</p>
                    )}
                  </div>

                  {selected ? (
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <div className="text-left">
                        <span className="text-sm sm:text-base font-display font-bold text-gb-primary whitespace-nowrap block">
                          {getLivePrice(selected)?.toLocaleString()}
                        </span>
                        <span className="text-[9px] text-gb-muted">ر.س</span>
                        {selected.asin && livePrices.has(selected.asin) && livePrices.get(selected.asin).price !== selected.price && (
                          <span className="text-[8px] text-green-400 mr-1 block">live</span>
                        )}
                      </div>
                      {!selected.isCustom && (
                        <button
                          onClick={e => { e.stopPropagation(); setPriceHistoryOpen(priceHistoryOpen === key ? null : key); }}
                          className={`p-1.5 rounded-lg transition-colors ${priceHistoryOpen === key ? 'text-gb-primary bg-gb-primary/10' : 'text-gb-muted hover:text-gb-primary'}`}
                        >
                          <BarChart2 size={14} />
                        </button>
                      )}
                      {!selected.isCustom && selected.asin && (
                        <span className="text-[9px] text-green-400/70 hidden sm:flex items-center gap-0.5"><Truck size={9} /> 1-3 أيام</span>
                      )}
                      {selected.isCustom && selected.url ? (
                        <a href={selected.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="p-1.5 rounded-lg text-gb-secondary hover:text-gb-primary transition-colors">
                          <ExternalLink size={13} />
                        </a>
                      ) : !selected.isCustom ? (
                        <a href={getAmazonLink(selected)} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="p-1.5 rounded-lg text-[#ff9900] hover:text-[#ffb340] transition-colors">
                          <ExternalLink size={13} />
                        </a>
                      ) : null}
                      <button onClick={e => { e.stopPropagation(); openPickerModal(key); }}
                        className="p-1.5 rounded-lg text-gb-muted hover:text-gb-primary transition-colors text-[10px] font-bold">
                        تغيير
                      </button>
                      <button onClick={e => { e.stopPropagation(); removeComponent(key); }}
                        className="p-1.5 text-gb-muted hover:text-gb-accent transition-colors"><X size={14} /></button>
                    </div>
                  ) : (
                    <span className="text-xs text-gb-primary font-display font-bold shrink-0">+ اختر</span>
                  )}
                </div>

                {/* Price history expandable */}
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
            {/* Wattage bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-1.5 text-xs text-gb-muted">
                  <Zap size={13} className="text-yellow-400" /> واط تقديري
                </span>
                <span className="text-xs font-display text-gb-text">
                  {wattage}W / {psuCapacity}W
                  {selectedCount >= 2 && !components.psu && <span className="text-yellow-400 mr-1 text-[10px]"> (يفضل {recPSU}W+)</span>}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-gb-bg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(psuRatio * 100, 100)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    psuRatio > 0.95 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                    : psuRatio > 0.8 ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.3)]'
                    : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gb-muted">{selectedCount}/8 قطع</span>
                {livePriceStatus === 'loading' && (
                  <span className="flex items-center gap-1 text-[9px] text-gb-muted animate-pulse">
                    <RefreshCw size={9} className="animate-spin" /> جاري تحديث الأسعار...
                  </span>
                )}
                {livePriceStatus === 'loaded' && livePrices.size > 0 && (
                  <span className="flex items-center gap-1 text-[9px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">
                    <Check size={8} /> أسعار محدثة من أمازون
                  </span>
                )}
              </div>
              <span className="text-xl sm:text-2xl font-display font-black text-gb-primary">{totalPrice.toLocaleString()} <span className="text-xs text-gb-muted">ر.س</span></span>
            </div>
            {selectedCount >= 2 && (
              <div className="mt-3 flex gap-2">
                <a href={`https://www.amazon.sa/s?k=${encodeURIComponent(Object.values(components).filter(Boolean).map(c=>c.name).join(' '))}&tag=meshal039-21`}
                  target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#ff9900] text-gb-bg font-bold text-sm hover:bg-[#e8890a] transition-all">
                  <ShoppingCart size={16} /> اشتري من أمازون <ExternalLink size={12} />
                </a>
                <button onClick={() => {
                  const t = `تجميعتي:\n${Object.values(components).filter(Boolean).map(c=>`${c.name} — ${c.price?.toLocaleString()} ر.س`).join('\n')}\n${totalPrice.toLocaleString()} ر.س`;
                  navigator.share ? navigator.share({title:'GamerBuild',text:t}) : (navigator.clipboard.writeText(t), alert('تم النسخ!'));
                }} className="px-4 py-3 rounded-xl bg-gb-card border border-gb-border text-gb-text text-sm hover:border-gb-primary/30 transition-all">
                  <ExternalLink size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========== STICKY MOBILE BOTTOM BAR ========== */}
      {selectedCount >= 1 && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-gb-bg/90 backdrop-blur-xl border-t border-gb-border px-4 py-3"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] text-gb-muted">{selectedCount}/8 قطع</p>
              <p className="text-lg font-display font-black text-gb-primary">{totalPrice.toLocaleString()} <span className="text-xs text-gb-muted">ر.س</span></p>
            </div>
            <a
              href={`https://www.amazon.sa/s?k=${encodeURIComponent(Object.values(components).filter(Boolean).map(c=>c.name).join(' '))}&tag=meshal039-21`}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff9900] text-gb-bg font-bold text-sm hover:bg-[#e8890a] transition-all"
            >
              <ShoppingCart size={15} /> اشتري من أمازون
            </a>
          </div>
        </div>
      )}

      {/* ========== FULL-SCREEN MODAL PICKER ========== */}
      <AnimatePresence>
        {openPicker && currentCat && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpenPicker(null)}
            />

            <motion.div
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 sm:inset-4 sm:bottom-4 sm:top-4 sm:left-auto sm:right-auto sm:mx-auto sm:max-w-4xl z-50
                         bg-gb-bg rounded-t-2xl sm:rounded-2xl border-t sm:border border-gb-border
                         max-h-[92vh] sm:max-h-full flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gb-border shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{currentCat.icon}</span>
                  <div>
                    <h2 className="font-bold text-sm text-gb-text">{currentCat.label}</h2>
                    <p className="text-[10px] text-gb-muted">{compatCount} متوافق</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCustomMode(!customMode)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${customMode ? 'bg-gb-primary/15 text-gb-primary' : 'text-gb-muted hover:text-gb-text'}`}
                  >
                    يدوي
                  </button>
                  <button onClick={() => setOpenPicker(null)} className="p-2 rounded-lg text-gb-muted hover:text-gb-accent hover:bg-gb-surface transition-all">
                    <X size={18} />
                  </button>
                </div>
              </div>

              {customMode ? (
                <div className="p-4 space-y-3">
                  <p className="text-xs text-gb-muted">أضف قطعة غير موجودة في القائمة</p>
                  <input type="text" placeholder="اسم القطعة *" value={customInputs[openPicker]?.name || ''}
                    onChange={e => updateCustomInput(openPicker, 'name', e.target.value)}
                    className="w-full bg-gb-surface border border-gb-border rounded-xl px-4 py-3 text-sm text-gb-text placeholder-gb-muted focus:outline-none focus:border-gb-primary/40" />
                  <input type="number" placeholder="السعر (ر.س)" value={customInputs[openPicker]?.price || ''}
                    onChange={e => updateCustomInput(openPicker, 'price', e.target.value)}
                    className="w-full bg-gb-surface border border-gb-border rounded-xl px-4 py-3 text-sm text-gb-text placeholder-gb-muted focus:outline-none focus:border-gb-primary/40" />
                  <input type="url" placeholder="رابط المتجر (اختياري)" value={customInputs[openPicker]?.url || ''}
                    onChange={e => updateCustomInput(openPicker, 'url', e.target.value)}
                    className="w-full bg-gb-surface border border-gb-border rounded-xl px-4 py-3 text-sm text-gb-text placeholder-gb-muted focus:outline-none focus:border-gb-primary/40" dir="ltr" />
                  <button onClick={() => handleCustomAdd(openPicker)}
                    disabled={!customInputs[openPicker]?.name?.trim()}
                    className="w-full py-3 rounded-xl bg-gb-primary/15 text-gb-primary font-bold text-sm hover:bg-gb-primary/25 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                    أضف
                  </button>
                </div>
              ) : (
                <>
                  {/* Search */}
                  <div className="px-4 pt-3 shrink-0">
                    <div className="relative">
                      <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gb-muted" />
                      <input
                        type="text"
                        placeholder="ابحث عن قطعة..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-gb-card border border-gb-border rounded-xl pr-9 pl-3 py-2.5 text-sm text-gb-text placeholder-gb-muted focus:outline-none focus:border-gb-primary/40 transition-colors"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Filters Row */}
                  <div className="px-4 py-2.5 shrink-0 space-y-2">
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                      <button onClick={() => setFilterBrand('all')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all ${filterBrand === 'all' ? 'bg-gb-primary/15 text-gb-primary' : 'bg-gb-card text-gb-muted border border-gb-border'}`}>
                        الكل
                      </button>
                      {availableBrands.map(b => (
                        <button key={b} onClick={() => setFilterBrand(filterBrand === b ? 'all' : b)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all ${filterBrand === b ? 'bg-gb-primary/15 text-gb-primary' : 'bg-gb-card text-gb-muted border border-gb-border'}`}>
                          {b}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        {['all', 'budget', 'mid-range', 'high-end', 'enthusiast'].map(t => (
                          <button key={t} onClick={() => setFilterTier(filterTier === t ? 'all' : t)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all ${filterTier === t ? 'bg-gb-secondary/15 text-gb-secondary' : 'text-gb-muted'}`}>
                            {t === 'all' ? 'كل الفئات' : tierLabels[t]}
                          </button>
                        ))}
                      </div>
                      <div className="mr-auto flex items-center gap-2">
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                          className="text-[10px] bg-gb-card border border-gb-border rounded-lg px-2 py-1 text-gb-muted focus:outline-none">
                          <option value="price-asc">السعر ↑</option>
                          <option value="price-desc">السعر ↓</option>
                          <option value="score">الأداء</option>
                          <option value="name">الاسم</option>
                        </select>
                        <label className="flex items-center gap-1 text-[10px] text-gb-muted cursor-pointer whitespace-nowrap">
                          <input type="checkbox" checked={showOnlyCompat} onChange={e => setShowOnlyCompat(e.target.checked)} className="accent-gb-primary w-3 h-3" />
                          متوافق فقط
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Grid */}
                  <div className="flex-1 overflow-y-auto px-3 pb-4">
                    {pickerItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-gb-muted">
                        <SlidersHorizontal size={32} className="opacity-30 mb-3" />
                        <p className="text-sm">لا يوجد نتائج</p>
                        <p className="text-[10px] mt-1">جرب تغيير الفلتر أو البحث</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                        {pickerItems.map(item => {
                          const isSelected = components[openPicker]?.id === item.id;
                          return (
                            <div
                              key={item.id}
                              onClick={() => item.compatible && handleSelect(openPicker, item)}
                              className={`rounded-xl border overflow-hidden transition-all ${
                                !item.compatible ? 'opacity-40 border-red-500/30 cursor-not-allowed' :
                                isSelected ? 'border-gb-primary/50 bg-gb-primary/5 ring-1 ring-gb-primary/20 cursor-pointer' :
                                'border-gb-border bg-gb-card cursor-pointer card-hover'
                              }`}
                            >
                              <div className="h-20 sm:h-28 bg-white/5 flex items-center justify-center p-2 sm:p-3">
                                {item.image_url ? (
                                  <img src={item.image_url} alt="" loading="lazy" className="max-w-full max-h-full object-contain"
                                    onError={e => { e.target.style.display = 'none'; e.target.nextElementSibling && (e.target.nextElementSibling.style.display = ''); }} />
                                ) : null}
                                <span className={`text-2xl opacity-20 ${item.image_url ? 'hidden' : ''}`}>{currentCat.icon}</span>
                              </div>

                              <div className="p-2 sm:p-2.5">
                                <p className="text-[9px] text-gb-muted">{item.brand}</p>
                                <p className="text-[11px] sm:text-xs font-medium text-gb-text line-clamp-2 leading-snug min-h-[2em]">{item.name}</p>
                                <p className="text-[9px] text-gb-muted mt-0.5 truncate">{specLine(openPicker, item)}</p>

                                <div className="flex items-center justify-between mt-1.5">
                                  {item.score ? (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-gb-primary/10 text-gb-primary font-bold">{item.score}</span>
                                  ) : <span />}
                                  <span className="text-xs sm:text-sm font-display font-bold text-gb-primary">{item.price?.toLocaleString()}</span>
                                </div>

                                {!item.compatible && item.reason && (
                                  <p className="text-[9px] text-red-400 mt-1 truncate">{item.reason}</p>
                                )}

                                <div className="flex items-center gap-1 mt-2">
                                  <button className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                                    isSelected ? 'bg-gb-primary text-gb-bg' : 'bg-gb-primary/10 text-gb-primary hover:bg-gb-primary/20'
                                  }`}>
                                    {isSelected ? 'تم' : 'اختر'}
                                  </button>
                                  <a href={getAmazonLink(item)} target="_blank" rel="noreferrer"
                                    className="p-1.5 rounded-lg bg-[#ff9900]/10 text-[#ff9900] hover:bg-[#ff9900]/20 transition-all"
                                    onClick={e => e.stopPropagation()}>
                                    <ExternalLink size={10} />
                                  </a>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

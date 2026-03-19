import { useState, useMemo, useEffect } from 'react';
import { ExternalLink, X, ShieldCheck, ShieldAlert, AlertTriangle, Zap, ShoppingCart, Check, BarChart2, Search, SlidersHorizontal, Truck, RefreshCw, Plus, AlertCircle, Cpu, MonitorSpeaker, CircuitBoard, MemoryStick, HardDrive, Fan, Box, ChevronDown, Trash2 } from 'lucide-react';
import { CATEGORIES, getCompatible, estimateWattage, getRecommendedPSU, getAmazonLink, fullCompatCheck } from '../utils/db';
import { useBuild } from '../hooks/BuildContext';
import { motion, AnimatePresence } from 'framer-motion';
import PriceChart from '../components/PriceChart';
import ProductImage from '../components/ProductImage';

const tierLabels = { budget: 'اقتصادي', 'mid-range': 'متوسط', 'high-end': 'عالي', enthusiast: 'خرافي' };

const catIcons = {
  cpu: '🧠', gpu: '🎨', motherboard: '📟', ram: '💾',
  ssd: '💿', psu: '⚡', cooler: '❄️', case: '📦',
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

const PAGE_SIZE = 50;

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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

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
    return [...new Set(getCompatible(openPicker, components).map(c => c.brand))].sort();
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

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, filterBrand, filterTier, sortBy, showOnlyCompat]);

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
            <button onClick={() => setShowClearConfirm(true)} className="flex items-center gap-1.5 text-xs text-red-400/70 hover:text-red-400 px-3 py-1.5 rounded-lg border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/5 transition-all">
              <Trash2 size={12} />
              مسح الكل
            </button>
          )}
        </div>

        {/* Progress bar — 8 circles */}
        <div className="mb-5 px-2">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gb-border -translate-y-1/2 z-0" />
            {CATEGORIES.map(({ key, label }) => {
              const comp = components[key];
              const filled = !!comp;
              const isCustom = comp?.isCustom;
              return (
                <button key={key} onClick={() => filled ? openPickerModal(key) : openPickerModal(key)} className="relative z-10 flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm transition-all ${
                    filled && isCustom ? 'bg-yellow-500 text-gb-bg shadow-[0_0_12px_rgba(234,179,8,0.4)]'
                    : filled ? 'bg-gb-primary text-gb-bg shadow-[0_0_12px_rgba(0,229,255,0.4)]'
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

        {/* 2×2 Category Grid — shown for unfilled categories */}
        {selectedCount < 8 && (
          <div className="mb-5 grid grid-cols-2 gap-3">
            {CATEGORIES.filter(({ key }) => !components[key]).map(({ key, label }) => {
              const cfg = catGridConfig[key];
              if (!cfg) return null;
              const CatIcon = cfg.Icon;
              return (
                <button
                  key={key}
                  onClick={() => openPickerModal(key)}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${cfg.gradient} border border-white/5 p-5 sm:p-6 flex flex-col items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg ${cfg.glow}`}
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
              hasIssues ? 'bg-red-500/5 border-red-500/20' : compat.warnings.length > 0 ? 'bg-yellow-500/5 border-yellow-500/20' : compat.hasCustom ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-green-500/5 border-green-500/20'
            }`}>
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
                <div
                  className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3.5 sm:py-4 cursor-pointer transition-colors ${
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
                          <p className="text-xs sm:text-sm text-gb-text truncate font-bold">{selected.brand} {selected.name}</p>
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
                      <div className="text-left">
                        <span className="text-sm sm:text-base font-display font-bold whitespace-nowrap block" style={{ color: '#00e676' }}>
                          {selected.price?.toLocaleString()}
                        </span>
                        <span className="text-[9px] text-gb-muted">ر.س</span>
                      </div>
                      {!selected.isCustom && (
                        <button onClick={e => { e.stopPropagation(); setPriceHistoryOpen(priceHistoryOpen === key ? null : key); }}
                          className={`p-1.5 rounded-lg transition-colors ${priceHistoryOpen === key ? 'text-gb-primary bg-gb-primary/10' : 'text-gb-muted hover:text-gb-primary'}`}>
                          <BarChart2 size={14} />
                        </button>
                      )}
                      {!selected.isCustom && selected.asin && (
                        <a href={getAmazonLink(selected)} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg text-[#ff9900] hover:text-[#ffb340] transition-colors"><ExternalLink size={13} /></a>
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
              <span className="text-xl sm:text-2xl font-display font-black" style={{ color: '#00e676' }}>{totalPrice.toLocaleString()} <span className="text-xs text-gb-muted">ر.س</span></span>
            </div>
            {selectedCount >= 2 && (
              <div className="mt-3 flex gap-2">
                <a href={`https://www.amazon.sa/s?k=${encodeURIComponent(Object.values(components).filter(Boolean).map(c=>c.name).join(' '))}&tag=meshal039-21`}
                  target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#ff9900] text-gb-bg font-bold text-sm hover:bg-[#e8890a] transition-all">
                  <ShoppingCart size={16} /> اشتري من أمازون <ExternalLink size={12} />
                </a>
                <button onClick={() => {
                  const t = `تجميعتي:\n${Object.values(components).filter(Boolean).map(c=>`${c.name} — ${c.price?.toLocaleString()} ر.س`).join('\n')}\nالمجموع: ${totalPrice.toLocaleString()} ر.س`;
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
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setShowClearConfirm(true)} className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all" title="مسح الكل">
                <Trash2 size={16} />
              </button>
              <div>
                <p className="text-[10px] text-gb-muted">{selectedCount}/8 قطع</p>
                <p className="text-lg font-display font-black" style={{ color: '#00e676' }}>{totalPrice.toLocaleString()} <span className="text-xs text-gb-muted">ر.س</span></p>
              </div>
            </div>
            <a href={`https://www.amazon.sa/s?k=${encodeURIComponent(Object.values(components).filter(Boolean).map(c=>c.name).join(' '))}&tag=meshal039-21`}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff9900] text-gb-bg font-bold text-sm hover:bg-[#e8890a] transition-all">
              <ShoppingCart size={15} /> اشتري من أمازون
            </a>
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
              className="fixed inset-0 z-50 bg-[#0a0a14] flex flex-col sm:inset-2 sm:rounded-2xl sm:border sm:border-[#1e1e2e] overflow-hidden"
            >
              {/* ── Header ── */}
              <div className="shrink-0 bg-[#0e0e18] border-b border-[#1e1e2e]">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currentCat.icon}</span>
                    <div>
                      <h2 className="font-display font-bold text-base text-white">{currentCat.label}</h2>
                      <p className="text-[11px] text-[#666]">{compatCount} متوافق من {getCompatible(openPicker, components).length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCustomMode(!customMode)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${customMode ? 'bg-cyan-500 text-[#0a0a14]' : 'bg-[#1a1a2e] text-[#888] border border-[#2a2a3e] hover:text-white'}`}>
                      + يدوي
                    </button>
                    <button onClick={() => setOpenPicker(null)} className="w-9 h-9 rounded-xl bg-[#1a1a2e] flex items-center justify-center text-[#666] hover:text-red-400 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Search */}
                {!customMode && (
                  <div className="px-4 pb-3">
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
                      {pickerItems.slice(0, visibleCount).map(item => {
                        const isSelected = components[openPicker]?.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => item.compatible && handleSelect(openPicker, item)}
                            className={`flex items-stretch gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border transition-all ${
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
                                <p className="text-[10px] sm:text-[11px] text-[#888] font-medium">{item.brand}</p>
                                <p className="text-[12px] sm:text-[14px] font-bold text-white leading-snug line-clamp-2">{item.name}</p>
                                <p className="text-[10px] sm:text-[11px] text-[#555] mt-0.5 truncate">{specLine(openPicker, item)}</p>
                              </div>

                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[16px] sm:text-[18px] font-black" style={{ color: '#00e676' }}>{item.price?.toLocaleString()}</span>
                                <span className="text-[10px] text-[#666]">ر.س</span>
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
                                className={`min-w-[70px] sm:min-w-[80px] py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-[12px] font-bold transition-all border ${
                                  isSelected
                                    ? 'bg-[#00e676] text-[#12121c] border-[#00e676]'
                                    : 'bg-[#1a1a2e] text-white border-[#2a2a3e] hover:border-[#00e676]/40 hover:text-[#00e676]'
                                }`}
                              >
                                {isSelected ? '✓ تم' : '+ أضف'}
                              </button>
                              <a href={getAmazonLink(item)} target="_blank" rel="noreferrer"
                                className="text-[9px] sm:text-[10px] text-[#ff9900] hover:underline flex items-center gap-0.5"
                                onClick={e => e.stopPropagation()}>
                                أمازون <ExternalLink size={8} />
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
              className="fixed z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(320px,90vw)] bg-gb-card border border-gb-border rounded-2xl p-6 text-center shadow-2xl"
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

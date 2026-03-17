import { useState, useMemo } from 'react';
import { ExternalLink, X, ChevronDown, ShieldCheck, ShieldAlert, AlertTriangle, Zap, ShoppingCart, Check, BarChart2 } from 'lucide-react';
import { CATEGORIES, getCompatible, estimateWattage, getRecommendedPSU, getAmazonLink, fullCompatCheck } from '../utils/db';
import { useBuild } from '../hooks/BuildContext';
import PriceChart from '../components/PriceChart';

export default function BuilderPage() {
  const { components, setComponent, removeComponent, clearBuild, totalPrice, selectedCount } = useBuild();
  const [openPicker, setOpenPicker] = useState(null);
  const [sortBy, setSortBy] = useState('price-asc');
  const [showOnlyCompat, setShowOnlyCompat] = useState(true);
  const [priceHistoryOpen, setPriceHistoryOpen] = useState(null);
  const [customMode, setCustomMode] = useState({});
  const [customInputs, setCustomInputs] = useState({});

  const compat = fullCompatCheck(components);
  const wattage = estimateWattage(components);
  const recPSU = getRecommendedPSU(components);
  const hasIssues = compat.errors.length > 0;

  const pickerItems = useMemo(() => {
    if (!openPicker) return [];
    let items = getCompatible(openPicker, components);
    if (showOnlyCompat) items = items.filter(c => c.compatible);
    items.sort((a, b) => {
      if (!a.compatible && b.compatible) return 1;
      if (a.compatible && !b.compatible) return -1;
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'score': return (b.score || 0) - (a.score || 0);
        default: return 0;
      }
    });
    return items;
  }, [openPicker, components, sortBy, showOnlyCompat]);

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
    setCustomMode(m => ({ ...m, [cat]: false }));
    setCustomInputs(m => ({ ...m, [cat]: {} }));
  };

  const updateCustomInput = (cat, field, value) => {
    setCustomInputs(m => ({ ...m, [cat]: { ...(m[cat] || {}), [field]: value } }));
  };

  const specLine = (cat, item) => {
    if (!item) return '';
    switch (cat) {
      case 'cpu': return `${item.cores}C/${item.threads}T • ${item.boostClock}GHz • ${item.tdp}W • ${item.socket}`;
      case 'gpu': return `${item.vram}GB • ${item.tdp}W`;
      case 'motherboard': return `${item.socket} • ${item.chipset} • ${item.ramType} • ${item.formFactor}`;
      case 'ram': return `${item.size}GB ${item.type} • ${item.speed}MHz • ${item.latency}`;
      case 'ssd': return `${item.capacity >= 1000 ? item.capacity/1000+'TB' : item.capacity+'GB'} • ${item.interface} • ${item.read}MB/s`;
      case 'psu': return `${item.watt}W • ${item.rating} • ${item.modular}`;
      case 'cooler': return `${item.type} • Max ${item.tdpMax}W`;
      case 'case': return `${item.formFactor} • GPU ${item.maxGPU}mm`;
      default: return '';
    }
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
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

        {selectedCount >= 2 && (
          <div className={`mb-4 p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${
            hasIssues ? 'bg-red-500/5 border-red-500/20' : compat.warnings.length > 0 ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-green-500/5 border-green-500/20'
          }`}>
            {hasIssues ? <ShieldAlert size={16} className="text-red-400 shrink-0 mt-0.5" />
              : compat.warnings.length > 0 ? <AlertTriangle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
              : <ShieldCheck size={16} className="text-green-400 shrink-0 mt-0.5" />}
            <div>
              {compat.errors.map((e, i) => <p key={i} className="text-red-400">{e}</p>)}
              {compat.warnings.map((w, i) => <p key={i} className="text-yellow-400">{w}</p>)}
              {!hasIssues && compat.warnings.length === 0 && <p className="text-green-400">كل القطع متوافقة ✓</p>}
            </div>
          </div>
        )}

        <div className="rounded-xl sm:rounded-2xl border border-gb-border overflow-hidden bg-gb-card">
          {CATEGORIES.map(({ key, label, labelEn, icon, required }) => {
            const selected = components[key];
            const isOpen = openPicker === key;

            return (
              <div key={key} className={`border-b border-gb-border last:border-0 ${isOpen ? 'bg-gb-surface/20' : ''}`}>
                <div
                  className="flex items-center gap-3 px-3 sm:px-4 py-3 cursor-pointer hover:bg-gb-surface/30 transition-colors"
                  onClick={() => setOpenPicker(isOpen ? null : key)}
                >
                  <span className="text-lg sm:text-xl">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-gb-text">{label}</span>
                      <span className="text-[10px] text-gb-muted font-mono hidden sm:inline">{labelEn}</span>
                      {required && !selected && <span className="text-[8px] text-gb-accent">مطلوب</span>}
                    </div>
                    {selected ? (
                      <p className="text-[11px] text-gb-muted truncate">{selected.brand} {selected.name} — <span className="text-gb-primary font-bold">{selected.price?.toLocaleString()} ر.س</span></p>
                    ) : (
                      <p className="text-[11px] text-gb-muted">اضغط لاختيار</p>
                    )}
                  </div>

                  {selected ? (
                    <div className="flex items-center gap-2 shrink-0">
                      {!selected.isCustom && (
                        <button
                          onClick={e => { e.stopPropagation(); setPriceHistoryOpen(priceHistoryOpen === key ? null : key); }}
                          className={`p-1 rounded transition-colors ${priceHistoryOpen === key ? 'text-gb-primary bg-gb-primary/10' : 'text-gb-muted hover:text-gb-primary'}`}
                          title="سجل الأسعار"
                        >
                          <BarChart2 size={13} />
                        </button>
                      )}
                      {selected.isCustom && selected.url ? (
                        <a href={selected.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="text-[10px] font-bold text-gb-secondary hover:text-gb-primary flex items-center gap-0.5">
                          🔗 المتجر <ExternalLink size={9} />
                        </a>
                      ) : !selected.isCustom ? (
                        <a href={getAmazonLink(selected)} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="text-[10px] font-bold text-[#ff9900] hover:text-[#ffb340] flex items-center gap-0.5">
                          أمازون <ExternalLink size={9} />
                        </a>
                      ) : null}
                      <button onClick={e => { e.stopPropagation(); removeComponent(key); }}
                        className="p-1 text-gb-muted hover:text-gb-accent"><X size={14} /></button>
                    </div>
                  ) : (
                    <ChevronDown size={16} className={`text-gb-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  )}
                </div>

                {/* Price history expandable */}
                {selected && !selected.isCustom && priceHistoryOpen === key && (
                  <div className="px-3 sm:px-4 py-3 bg-gb-bg/30 border-t border-gb-border/50">
                    <PriceChart componentId={selected.id} />
                  </div>
                )}

                {isOpen && (
                  <div className="border-t border-gb-border bg-gb-bg/50">
                    {/* Toggle: list vs custom */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-gb-border/50">
                      <button onClick={() => setCustomMode(m => ({ ...m, [key]: false }))}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${!customMode[key] ? 'bg-gb-primary/15 text-gb-primary' : 'text-gb-muted hover:text-gb-text'}`}>
                        📋 من القائمة
                      </button>
                      <button onClick={() => setCustomMode(m => ({ ...m, [key]: true }))}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${customMode[key] ? 'bg-gb-primary/15 text-gb-primary' : 'text-gb-muted hover:text-gb-text'}`}>
                        ✏️ إضافة يدوية
                      </button>
                    </div>

                    {customMode[key] ? (
                      <div className="p-3 space-y-2">
                        <input
                          type="text"
                          placeholder="اسم القطعة *"
                          value={customInputs[key]?.name || ''}
                          onChange={e => updateCustomInput(key, 'name', e.target.value)}
                          className="w-full bg-gb-surface border border-gb-border rounded-lg px-3 py-2 text-sm text-gb-text placeholder-gb-muted focus:outline-none focus:border-gb-primary/40"
                        />
                        <input
                          type="number"
                          placeholder="السعر (ر.س)"
                          value={customInputs[key]?.price || ''}
                          onChange={e => updateCustomInput(key, 'price', e.target.value)}
                          className="w-full bg-gb-surface border border-gb-border rounded-lg px-3 py-2 text-sm text-gb-text placeholder-gb-muted focus:outline-none focus:border-gb-primary/40"
                        />
                        <input
                          type="url"
                          placeholder="رابط المتجر (اختياري)"
                          value={customInputs[key]?.url || ''}
                          onChange={e => updateCustomInput(key, 'url', e.target.value)}
                          className="w-full bg-gb-surface border border-gb-border rounded-lg px-3 py-2 text-sm text-gb-text placeholder-gb-muted focus:outline-none focus:border-gb-primary/40"
                          dir="ltr"
                        />
                        <button
                          onClick={() => handleCustomAdd(key)}
                          disabled={!customInputs[key]?.name?.trim()}
                          className="w-full py-2.5 rounded-lg bg-gb-primary/15 text-gb-primary font-bold text-sm hover:bg-gb-primary/25 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          أضف ✓
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-gb-border/50">
                          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                            className="text-[11px] bg-gb-surface border border-gb-border rounded-lg px-2 py-1.5 text-gb-muted focus:outline-none">
                            <option value="price-asc">السعر: الأقل</option>
                            <option value="price-desc">السعر: الأعلى</option>
                            <option value="score">الأداء</option>
                          </select>
                          <label className="flex items-center gap-1.5 text-[11px] text-gb-muted cursor-pointer">
                            <input type="checkbox" checked={showOnlyCompat} onChange={e => setShowOnlyCompat(e.target.checked)} className="accent-gb-primary w-3.5 h-3.5" />
                            متوافق فقط
                          </label>
                        </div>
                        <div className="max-h-[350px] overflow-y-auto">
                          {pickerItems.length === 0 ? (
                            <div className="p-6 text-center text-xs text-gb-muted">لا يوجد قطع متوافقة — ألغِ الفلتر</div>
                          ) : pickerItems.map(item => (
                            <div key={item.id}
                              onClick={() => item.compatible && handleSelect(key, item)}
                              className={`flex items-center gap-3 px-3 py-2.5 border-b border-gb-border/20 transition-colors
                                ${item.compatible ? 'cursor-pointer hover:bg-gb-primary/5' : 'opacity-35 cursor-not-allowed'}
                                ${selected?.id === item.id ? 'bg-gb-primary/10' : ''}`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  {selected?.id === item.id && <Check size={12} className="text-gb-primary shrink-0" />}
                                  <span className="text-xs sm:text-sm font-medium text-gb-text truncate">{item.brand} {item.name}</span>
                                  {item.score && <span className="text-[9px] px-1.5 py-0.5 rounded bg-gb-primary/10 text-gb-primary font-bold shrink-0">{item.score}</span>}
                                </div>
                                <p className="text-[10px] text-gb-muted truncate mt-0.5">{specLine(key, item)}</p>
                                {!item.compatible && item.reason && <p className="text-[10px] text-red-400 mt-0.5">⚠️ {item.reason}</p>}
                              </div>
                              <span className="text-sm font-display font-bold text-gb-primary whitespace-nowrap">{item.price?.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <div className="bg-gb-surface/50 px-3 sm:px-4 py-3 border-t border-gb-border">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1 text-xs text-gb-muted">
                <Zap size={12} className="text-yellow-400" /> واط تقديري: <strong className="text-gb-text">{wattage}W</strong>
                {selectedCount >= 2 && !components.psu && <span className="text-yellow-400 mr-2">(يفضل {recPSU}W+)</span>}
              </span>
              <span className="text-xs text-gb-muted">{selectedCount}/8 قطع</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gb-text">المجموع</span>
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
                  const t = `🎮 تجميعتي:\n${Object.values(components).filter(Boolean).map(c=>`${c.name} — ${c.price?.toLocaleString()} ر.س`).join('\n')}\n💰 ${totalPrice.toLocaleString()} ر.س`;
                  navigator.share ? navigator.share({title:'GamerBuild',text:t}) : (navigator.clipboard.writeText(t), alert('تم النسخ! 📋'));
                }} className="px-4 py-3 rounded-xl bg-gb-card border border-gb-border text-gb-text text-xs hover:border-gb-primary/30 transition-all">📤</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

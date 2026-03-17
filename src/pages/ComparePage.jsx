import { useState, useMemo } from 'react';
import { ArrowLeftRight, Search, TrendingUp, Trophy } from 'lucide-react';
import { COMPONENTS } from '../utils/db';
import { compareWorthIt } from '../utils/engine';

const catOptions = [
  { key: 'cpu', label: 'معالج', icon: '🧠' },
  { key: 'gpu', label: 'كرت شاشة', icon: '🎮' },
  { key: 'motherboard', label: 'لوحة أم', icon: '🔌' },
  { key: 'ram', label: 'رام', icon: '💾' },
  { key: 'ssd', label: 'تخزين', icon: '💿' },
  { key: 'psu', label: 'باور', icon: '⚡' },
  { key: 'cooler', label: 'تبريد', icon: '❄️' },
  { key: 'case', label: 'كيس', icon: '🖥️' },
];

const specFields = {
  cpu: [
    { key: 'socket', label: 'السوكت' },
    { key: 'cores', label: 'الأنوية' },
    { key: 'threads', label: 'الخيوط' },
    { key: 'baseClock', label: 'التردد الأساسي', suffix: ' GHz' },
    { key: 'boostClock', label: 'تردد البوست', suffix: ' GHz' },
    { key: 'tdp', label: 'استهلاك الطاقة', suffix: 'W' },
  ],
  gpu: [
    { key: 'vram', label: 'ذاكرة الفيديو', suffix: ' GB' },
    { key: 'tdp', label: 'استهلاك الطاقة', suffix: 'W' },
  ],
  motherboard: [
    { key: 'socket', label: 'السوكت' },
    { key: 'chipset', label: 'الشيبست' },
    { key: 'formFactor', label: 'الحجم' },
    { key: 'ramType', label: 'نوع الرام' },
  ],
  ram: [
    { key: 'type', label: 'النوع' },
    { key: 'size', label: 'السعة', suffix: ' GB' },
    { key: 'speed', label: 'السرعة', suffix: ' MHz' },
    { key: 'latency', label: 'التأخير' },
    { key: 'modules', label: 'التوزيع' },
  ],
  ssd: [
    { key: 'interface', label: 'الواجهة' },
    { key: 'capacity', label: 'السعة', format: v => v >= 1000 ? `${v / 1000} TB` : `${v} GB` },
    { key: 'read', label: 'سرعة القراءة', suffix: ' MB/s' },
    { key: 'write', label: 'سرعة الكتابة', suffix: ' MB/s' },
  ],
  psu: [
    { key: 'watt', label: 'الواط', suffix: 'W' },
    { key: 'rating', label: 'الكفاءة' },
    { key: 'modular', label: 'مودولار' },
  ],
  cooler: [
    { key: 'type', label: 'النوع' },
    { key: 'tdpMax', label: 'أقصى واط', suffix: 'W' },
  ],
  case: [
    { key: 'formFactor', label: 'الحجم' },
    { key: 'maxGPU', label: 'أقصى طول كرت', suffix: ' mm' },
  ],
};

export default function ComparePage() {
  const [category, setCategory] = useState(null);
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [itemA, setItemA] = useState(null);
  const [itemB, setItemB] = useState(null);
  const [focusA, setFocusA] = useState(false);
  const [focusB, setFocusB] = useState(false);

  const items = useMemo(() => category ? (COMPONENTS[category] || []) : [], [category]);

  const filterItems = (query) => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.brand.toLowerCase().includes(q) ||
      `${c.brand} ${c.name}`.toLowerCase().includes(q)
    );
  };

  const filteredA = filterItems(searchA);
  const filteredB = filterItems(searchB);

  const selectA = (comp) => { setItemA(comp); setSearchA(`${comp.brand} ${comp.name}`); setFocusA(false); };
  const selectB = (comp) => { setItemB(comp); setSearchB(`${comp.brand} ${comp.name}`); setFocusB(false); };

  const addCustomA = () => {
    if (!searchA.trim()) return;
    setItemA({ id: `custom-a-${Date.now()}`, name: searchA.trim(), brand: 'مخصص', isCustom: true, type: category });
    setFocusA(false);
  };
  const addCustomB = () => {
    if (!searchB.trim()) return;
    setItemB({ id: `custom-b-${Date.now()}`, name: searchB.trim(), brand: 'مخصص', isCustom: true, type: category });
    setFocusB(false);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setItemA(null); setItemB(null);
    setSearchA(''); setSearchB('');
  };

  const fields = category ? (specFields[category] || []) : [];

  const getSpecValue = (item, field) => {
    if (!item || item.isCustom) return '—';
    const val = item[field.key];
    if (val === undefined || val === null) return '—';
    if (field.format) return field.format(val);
    return `${val}${field.suffix || ''}`;
  };

  const worthIt = itemA && itemB && itemA.score && itemB.score
    ? (() => {
        const sorted = [itemA, itemB].sort((a, b) => (a.price || 0) - (b.price || 0));
        return compareWorthIt(sorted[0], sorted[1]);
      })()
    : null;

  // Category selector screen
  if (!category) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-gb-text">قارن القطع</h1>
            <p className="text-gb-muted text-xs mt-1">اختر نوع القطعة عشان تبدأ المقارنة</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {catOptions.map(cat => (
              <button key={cat.key} onClick={() => handleCategoryChange(cat.key)}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-gb-card border border-gb-border hover:border-gb-primary/30 hover:bg-gb-primary/5 transition-all">
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-bold text-gb-text">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-gb-text">قارن القطع</h1>
            <p className="text-gb-muted text-xs mt-0.5">اختر قطعتين من نفس الفئة</p>
          </div>
          <button onClick={() => { setCategory(null); setItemA(null); setItemB(null); setSearchA(''); setSearchB(''); }}
            className="text-xs text-gb-muted hover:text-gb-primary px-3 py-1.5 rounded-lg border border-gb-border transition-all">
            غير الفئة
          </button>
        </div>

        {/* Category chips */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {catOptions.map(cat => (
            <button key={cat.key} onClick={() => handleCategoryChange(cat.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                category === cat.key ? 'bg-gb-primary/15 text-gb-primary border border-gb-primary/25' : 'bg-gb-card text-gb-muted border border-gb-border'
              }`}>
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Two search boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Search A */}
          <SearchBox
            placeholder="ابحث عن القطعة الأولى..."
            value={searchA}
            onChange={v => { setSearchA(v); setItemA(null); setFocusA(true); }}
            onFocus={() => setFocusA(true)}
            onBlur={() => setTimeout(() => setFocusA(false), 200)}
            showDropdown={focusA && !itemA}
            filtered={filteredA}
            onSelect={selectA}
            onAddCustom={addCustomA}
            query={searchA}
            selected={itemA}
          />
          {/* Search B */}
          <SearchBox
            placeholder="ابحث عن القطعة الثانية..."
            value={searchB}
            onChange={v => { setSearchB(v); setItemB(null); setFocusB(true); }}
            onFocus={() => setFocusB(true)}
            onBlur={() => setTimeout(() => setFocusB(false), 200)}
            showDropdown={focusB && !itemB}
            filtered={filteredB}
            onSelect={selectB}
            onAddCustom={addCustomB}
            query={searchB}
            selected={itemB}
          />
        </div>

        {/* Comparison table */}
        {itemA && itemB && (
          <div className="rounded-xl sm:rounded-2xl border border-gb-border overflow-hidden mb-4 animate-slide-up">
            <div className="bg-gb-card px-4 py-3 border-b border-gb-border">
              <h3 className="font-bold text-gb-text text-sm flex items-center gap-2">
                <ArrowLeftRight size={16} className="text-gb-primary" />
                مقارنة المواصفات
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gb-border">
                    <th className="text-right text-xs text-gb-muted font-medium p-3 w-[100px] sm:w-[120px]">المواصفة</th>
                    <th className="text-center text-[11px] sm:text-xs text-gb-text font-bold p-3">{itemA.name}</th>
                    <th className="text-center text-[11px] sm:text-xs text-gb-text font-bold p-3">{itemB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Price */}
                  <tr className="border-b border-gb-border/50 bg-gb-surface/30">
                    <td className="p-3 text-xs text-gb-muted font-medium">السعر</td>
                    <td className="p-3 text-center">
                      <span className={`text-sm font-display font-bold ${itemA.price && itemB.price && itemA.price <= itemB.price ? 'text-green-400' : 'text-gb-text'}`}>
                        {itemA.price ? `${itemA.price.toLocaleString()} ر.س` : '—'}
                        {itemA.price && itemB.price && itemA.price < itemB.price && <Trophy size={12} className="inline mr-1 text-green-400" />}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`text-sm font-display font-bold ${itemA.price && itemB.price && itemB.price <= itemA.price ? 'text-green-400' : 'text-gb-text'}`}>
                        {itemB.price ? `${itemB.price.toLocaleString()} ر.س` : '—'}
                        {itemA.price && itemB.price && itemB.price < itemA.price && <Trophy size={12} className="inline mr-1 text-green-400" />}
                      </span>
                    </td>
                  </tr>
                  {/* Score */}
                  {(itemA.score || itemB.score) && (
                    <tr className="border-b border-gb-border/50">
                      <td className="p-3 text-xs text-gb-muted font-medium">تقييم الأداء</td>
                      <td className="p-3 text-center">
                        <span className={`text-sm font-display font-bold ${(itemA.score || 0) >= (itemB.score || 0) ? 'text-gb-primary' : 'text-gb-muted'}`}>
                          {itemA.score || '—'}
                          {itemA.score && itemB.score && itemA.score > itemB.score && <Trophy size={12} className="inline mr-1 text-gb-primary" />}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`text-sm font-display font-bold ${(itemB.score || 0) >= (itemA.score || 0) ? 'text-gb-primary' : 'text-gb-muted'}`}>
                          {itemB.score || '—'}
                          {itemA.score && itemB.score && itemB.score > itemA.score && <Trophy size={12} className="inline mr-1 text-gb-primary" />}
                        </span>
                      </td>
                    </tr>
                  )}
                  {/* Spec rows */}
                  {fields.map(field => (
                    <tr key={field.key} className="border-b border-gb-border/50 hover:bg-gb-surface/20 transition-colors">
                      <td className="p-3 text-xs text-gb-muted font-medium">{field.label}</td>
                      <td className="p-3 text-center text-sm text-gb-text">{getSpecValue(itemA, field)}</td>
                      <td className="p-3 text-center text-sm text-gb-text">{getSpecValue(itemB, field)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Worth it analysis */}
        {worthIt && (() => {
          const colorMap = { green: { bg: 'bg-green-500/5', border: 'border-green-500/20', text: 'text-green-400' }, yellow: { bg: 'bg-yellow-500/5', border: 'border-yellow-500/20', text: 'text-yellow-400' }, red: { bg: 'bg-red-500/5', border: 'border-red-500/20', text: 'text-red-400' } };
          const c = colorMap[worthIt.color] || colorMap.yellow;
          return (
            <div className={`rounded-2xl ${c.bg} border ${c.border} p-4 sm:p-5 animate-slide-up`}>
              <h3 className="font-bold text-sm text-gb-text mb-3 flex items-center gap-2">
                <TrendingUp size={18} className="text-gb-primary" />
                هل تستحق فرق السعر؟
              </h3>
              <div className={`text-center p-4 rounded-xl ${c.bg} border ${c.border} mb-3`}>
                <p className={`font-bold text-sm ${c.text}`}>{worthIt.verdict}</p>
                <p className="text-xs text-gb-muted mt-1">أداء +{worthIt.perfDiff}% | سعر +{worthIt.priceDiff}%</p>
              </div>
              <div className="text-xs text-gb-muted space-y-1">
                <p className="font-bold mb-1">💡 متى تستحق الأغلى؟</p>
                {worthIt.perfDiff > 20 ? <p>• لو هدفك 1440p أو 4K — نعم تستحق</p> : <p>• لو تلعب 1080p فقط — وفّر فلوسك</p>}
                {worthIt.priceDiff > 30 && <p>• فرق السعر كبير — فكر مرتين</p>}
              </div>
            </div>
          );
        })()}

        {/* Empty state */}
        {(!itemA || !itemB) && (
          <div className="text-center py-12">
            <ArrowLeftRight size={40} className="text-gb-muted/30 mx-auto mb-3" />
            <p className="text-gb-muted text-sm">اختر قطعتين عشان تقارن بينهم</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchBox({ placeholder, value, onChange, onFocus, onBlur, showDropdown, filtered, onSelect, onAddCustom, query, selected }) {
  return (
    <div className="relative">
      <div className="relative">
        <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gb-muted" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`w-full bg-gb-card border rounded-xl pr-9 pl-3 py-3 text-sm text-gb-text placeholder-gb-muted focus:outline-none transition-colors ${
            selected ? 'border-gb-primary/40' : 'border-gb-border focus:border-gb-primary/40'
          }`}
        />
      </div>
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-gb-card border border-gb-border rounded-xl shadow-xl max-h-[250px] overflow-y-auto">
          {filtered.length > 0 ? filtered.map(c => (
            <div key={c.id} onMouseDown={() => onSelect(c)}
              className="flex items-center justify-between px-3 py-2.5 hover:bg-gb-primary/5 cursor-pointer border-b border-gb-border/20 last:border-0">
              <div className="min-w-0">
                <p className="text-xs font-medium text-gb-text truncate">{c.brand} {c.name}</p>
                {c.score && <span className="text-[9px] text-gb-primary font-bold">{c.score} نقطة</span>}
              </div>
              <span className="text-xs font-bold text-gb-primary whitespace-nowrap mr-2">{c.price?.toLocaleString()}</span>
            </div>
          )) : query.trim() ? (
            <div onMouseDown={onAddCustom} className="px-3 py-3 text-center hover:bg-gb-primary/5 cursor-pointer">
              <p className="text-xs text-gb-muted">أضف "<span className="text-gb-text font-bold">{query}</span>" كقطعة مخصصة</p>
            </div>
          ) : null}
        </div>
      )}
      {selected && (
        <div className="mt-1 text-[10px] text-gb-primary font-bold truncate">
          ✓ {selected.brand} {selected.name} {selected.price ? `— ${selected.price.toLocaleString()} ر.س` : ''}
        </div>
      )}
    </div>
  );
}

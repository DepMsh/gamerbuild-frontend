import { useState, useMemo } from 'react';
import { ArrowLeftRight, Search, Cpu, MonitorSpeaker, CircuitBoard, MemoryStick, HardDrive, Zap, Snowflake, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';
import { COMPONENTS } from '../utils/db';

const catOptions = [
  { key: 'cpu', label: 'معالج', icon: Cpu },
  { key: 'gpu', label: 'كرت شاشة', icon: MonitorSpeaker },
  { key: 'motherboard', label: 'لوحة أم', icon: CircuitBoard },
  { key: 'ram', label: 'رام', icon: MemoryStick },
  { key: 'ssd', label: 'تخزين', icon: HardDrive },
  { key: 'psu', label: 'باور', icon: Zap },
  { key: 'cooler', label: 'تبريد', icon: Snowflake },
  { key: 'case', label: 'كيس', icon: Box },
];

const POPULAR_COMPARISONS = {
  gpu: [
    ['RTX 5080', 'RX 9070 XT'],
    ['RTX 5070 Ti', 'RTX 4080 Super'],
    ['RTX 5070', 'RX 7800 XT'],
    ['RTX 5090', 'RTX 4090'],
    ['RX 9070 XT', 'RTX 4070 Ti Super'],
  ],
  cpu: [
    ['9800X3D', 'Ultra 9 285K'],
    ['9950X3D', '9950X'],
    ['9800X3D', '7800X3D'],
    ['9600X', 'i5-14600K'],
    ['9900X3D', '9800X3D'],
  ],
  motherboard: [
    ['X870E', 'X870'],
    ['B850', 'B650'],
    ['Z890', 'Z790'],
  ],
  ram: [
    ['6000', '5600'],
    ['32 GB', '16 GB'],
  ],
  ssd: [
    ['Gen5', 'Gen4'],
    ['990 PRO', 'SN850X'],
  ],
  psu: [],
  cooler: [
    ['360', '240'],
  ],
  case: [],
};

// ── Visual bar for numeric specs ──
function CompareBar({ valueA, valueB, label, unit = '', lowerIsBetter = false }) {
  const numA = typeof valueA === 'number' ? valueA : parseFloat(valueA) || 0;
  const numB = typeof valueB === 'number' ? valueB : parseFloat(valueB) || 0;
  if (numA === 0 && numB === 0) return null;

  const max = Math.max(numA, numB) || 1;
  const pctA = (numA / max) * 100;
  const pctB = (numB / max) * 100;
  const aWins = lowerIsBetter ? numA < numB : numA > numB;
  const bWins = lowerIsBetter ? numB < numA : numB > numA;
  const tie = numA === numB;

  return (
    <div className="py-3 border-b border-[#1a1a2e]/50 last:border-0">
      <div className="text-xs text-gray-500 text-center mb-2">{label}</div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="w-16 sm:w-20 text-left">
          <span className={`text-xs font-mono ${aWins ? 'text-[#00e5ff] font-bold' : tie ? 'text-gray-400' : 'text-gray-500'}`}>
            {numA}{unit}
          </span>
        </div>
        <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden rotate-180">
          <div className={`h-full rounded-full transition-all duration-700 ease-out ${aWins ? 'bg-[#00e5ff]' : tie ? 'bg-white/20' : 'bg-white/10'}`}
               style={{ width: `${pctA}%` }} />
        </div>
        <div className="w-px h-4 bg-[#1a1a2e]" />
        <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ease-out ${bWins ? 'bg-[#00e676]' : tie ? 'bg-white/20' : 'bg-white/10'}`}
               style={{ width: `${pctB}%` }} />
        </div>
        <div className="w-16 sm:w-20 text-right">
          <span className={`text-xs font-mono ${bWins ? 'text-[#00e676] font-bold' : tie ? 'text-gray-400' : 'text-gray-500'}`}>
            {numB}{unit}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Text row for non-numeric specs ──
function SpecRow({ label, valueA, valueB }) {
  if (!valueA && !valueB) return null;
  const same = valueA === valueB;
  return (
    <div className="py-3 border-b border-[#1a1a2e]/50 last:border-0">
      <div className="text-xs text-gray-500 text-center mb-2">{label}</div>
      <div className="flex items-center justify-between px-2">
        <span className={`text-xs font-medium ${same ? 'text-gray-400' : 'text-[#00e5ff]'}`}>{valueA || '—'}</span>
        <span className={`text-xs font-medium ${same ? 'text-gray-400' : 'text-[#00e676]'}`}>{valueB || '—'}</span>
      </div>
    </div>
  );
}

// ── Verdict generator ──
function getVerdict(a, b, category) {
  if (!a || !b) return '';
  const nameA = a.name?.replace(a.brand, '').trim().split(' ').slice(0, 4).join(' ') || 'القطعة الأولى';
  const nameB = b.name?.replace(b.brand, '').trim().split(' ').slice(0, 4).join(' ') || 'القطعة الثانية';

  if (category === 'gpu') {
    const wins = [];
    if ((a.score || 0) > (b.score || 0)) wins.push(`${nameA} أعلى أداء (${a.score} نقطة)`);
    else if ((b.score || 0) > (a.score || 0)) wins.push(`${nameB} أعلى أداء (${b.score} نقطة)`);
    if ((a.vram || 0) > (b.vram || 0)) wins.push(`${nameA} عنده VRAM أكثر (${a.vram}GB)`);
    else if ((b.vram || 0) > (a.vram || 0)) wins.push(`${nameB} عنده VRAM أكثر (${b.vram}GB)`);
    if ((a.tdp || 0) < (b.tdp || 0) && a.tdp) wins.push(`${nameA} أوفر بالطاقة (${a.tdp}W)`);
    else if ((b.tdp || 0) < (a.tdp || 0) && b.tdp) wins.push(`${nameB} أوفر بالطاقة (${b.tdp}W)`);
    return wins.length > 0 ? wins.join(' — ') : 'متقاربين بالمواصفات — شيك البنشماركات لقرار أدق';
  }

  if (category === 'cpu') {
    const wins = [];
    if ((a.score || 0) > (b.score || 0)) wins.push(`${nameA} أعلى أداء (${a.score} نقطة)`);
    else if ((b.score || 0) > (a.score || 0)) wins.push(`${nameB} أعلى أداء (${b.score} نقطة)`);
    if ((a.cores || 0) > (b.cores || 0)) wins.push(`${nameA} عنده أنوية أكثر (${a.cores})`);
    else if ((b.cores || 0) > (a.cores || 0)) wins.push(`${nameB} عنده أنوية أكثر (${b.cores})`);
    if ((a.tdp || 0) < (b.tdp || 0) && a.tdp) wins.push(`${nameA} أوفر بالطاقة (${a.tdp}W)`);
    else if ((b.tdp || 0) < (a.tdp || 0) && b.tdp) wins.push(`${nameB} أوفر بالطاقة (${b.tdp}W)`);
    return wins.length > 0 ? wins.join(' — ') : 'متقاربين بالأداء — شيك البنشماركات لقرار أدق';
  }

  if (category === 'ram') {
    const sizeA = a.size || 0, sizeB = b.size || 0;
    const speedA = a.speed || 0, speedB = b.speed || 0;
    if (sizeA > sizeB) return `${nameA} أكبر حجم (${sizeA}GB) — أفضل للمالتي تاسك`;
    if (sizeB > sizeA) return `${nameB} أكبر حجم (${sizeB}GB) — أفضل للمالتي تاسك`;
    if (speedA > speedB) return `${nameA} أسرع (${speedA}MHz)`;
    if (speedB > speedA) return `${nameB} أسرع (${speedB}MHz)`;
    return 'متقاربين بالمواصفات';
  }

  if (category === 'psu') {
    const wA = a.watt || 0, wB = b.watt || 0;
    if (wA > wB) return `${nameA} قدرة أعلى (${wA}W) — يتحمل ترقيات مستقبلية`;
    if (wB > wA) return `${nameB} قدرة أعلى (${wB}W) — يتحمل ترقيات مستقبلية`;
    return 'نفس القدرة — شيك الكفاءة والضمان';
  }

  if (category === 'ssd') {
    const rA = a.read || 0, rB = b.read || 0;
    if (rA > rB) return `${nameA} أسرع قراءة (${rA} MB/s)`;
    if (rB > rA) return `${nameB} أسرع قراءة (${rB} MB/s)`;
    return 'قارن المواصفات فوق وقرر اللي يناسب احتياجك';
  }

  if (category === 'cooler') {
    const tA = a.tdpMax || 0, tB = b.tdpMax || 0;
    if (tA > tB) return `${nameA} يبرّد أقوى (${tA}W)`;
    if (tB > tA) return `${nameB} يبرّد أقوى (${tB}W)`;
    return 'متقاربين — شيك حجم الكيس والتوافق';
  }

  return 'قارن المواصفات فوق وقرر اللي يناسب احتياجك';
}

export default function ComparePage() {
  usePageTitle('قارن القطع');
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

  const loadPopular = (nameA, nameB) => {
    const list = COMPONENTS[category] || [];
    const a = list.find(c => c.name.includes(nameA));
    const b = list.find(c => c.name.includes(nameB));
    if (a) { setItemA(a); setSearchA(`${a.brand} ${a.name}`); }
    if (b) { setItemB(b); setSearchB(`${b.brand} ${b.name}`); }
  };

  // Category selector screen
  if (!category) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
        <div className="max-w-2xl lg:max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-gb-text">قارن القطع</h1>
            <p className="text-gb-muted text-xs mt-1">اختر نوع القطعة عشان تبدأ المقارنة</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {catOptions.map(cat => (
              <button key={cat.key} onClick={() => handleCategoryChange(cat.key)}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-gb-card border border-gb-border hover:border-gb-primary/30 hover:bg-gb-primary/5 transition-all">
                <cat.icon className="w-8 h-8 text-gb-primary" strokeWidth={1.5} />
                <span className="text-sm font-bold text-gb-text">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const popularList = POPULAR_COMPARISONS[category] || [];

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-3xl lg:max-w-5xl mx-auto">
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
              <cat.icon size={14} strokeWidth={1.5} /> {cat.label}
            </button>
          ))}
        </div>

        {/* Two search boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
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
            color="text-[#00e5ff]"
          />
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
            color="text-[#00e676]"
          />
        </div>

        {/* Popular comparisons — shown when no parts picked */}
        {!itemA && !itemB && popularList.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-400 mb-3">مقارنات شائعة</h3>
            <div className="flex flex-wrap gap-2">
              {popularList.map(([nA, nB], i) => (
                <button key={i} onClick={() => loadPopular(nA, nB)}
                  className="text-xs bg-[#0f1019] border border-[#1a1a2e] hover:border-[#00e5ff]/30 px-3 py-2 rounded-lg text-gray-400 hover:text-white transition-all">
                  {nA} <span className="text-[#00e5ff] mx-1">vs</span> {nB}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comparison results */}
        {itemA && itemB && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-[#0f1019] border border-[#1a1a2e] rounded-2xl p-4 sm:p-6 mb-4">
              {/* Header: names */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-bold text-[#00e5ff] text-center flex-1 truncate px-1">{itemA.brand} {itemA.name?.replace(itemA.brand, '').trim().split(' ').slice(0, 4).join(' ')}</div>
                <div className="text-xs text-gray-500 mx-2 shrink-0 font-bold">VS</div>
                <div className="text-sm font-bold text-[#00e676] text-center flex-1 truncate px-1">{itemB.brand} {itemB.name?.replace(itemB.brand, '').trim().split(' ').slice(0, 4).join(' ')}</div>
              </div>

              {/* Score bar (GPU/CPU) */}
              {(itemA.score || itemB.score) && (
                <CompareBar label="تقييم الأداء" valueA={itemA.score} valueB={itemB.score} unit=" نقطة" />
              )}

              {/* Category-specific specs */}
              {category === 'gpu' && (
                <>
                  <CompareBar label="ذاكرة الفيديو (VRAM)" valueA={itemA.vram} valueB={itemB.vram} unit=" GB" />
                  <CompareBar label="استهلاك الطاقة (TDP)" valueA={itemA.tdp} valueB={itemB.tdp} unit="W" lowerIsBetter />
                </>
              )}

              {category === 'cpu' && (
                <>
                  <CompareBar label="عدد الأنوية" valueA={itemA.cores} valueB={itemB.cores} unit="" />
                  <CompareBar label="عدد الخيوط" valueA={itemA.threads} valueB={itemB.threads} unit="" />
                  <CompareBar label="سرعة التعزيز" valueA={itemA.boostClock} valueB={itemB.boostClock} unit=" GHz" />
                  <CompareBar label="السرعة الأساسية" valueA={itemA.baseClock} valueB={itemB.baseClock} unit=" GHz" />
                  <CompareBar label="استهلاك الطاقة (TDP)" valueA={itemA.tdp} valueB={itemB.tdp} unit="W" lowerIsBetter />
                  <SpecRow label="السوكت" valueA={itemA.socket} valueB={itemB.socket} />
                </>
              )}

              {category === 'motherboard' && (
                <>
                  <SpecRow label="الشيبست" valueA={itemA.chipset} valueB={itemB.chipset} />
                  <SpecRow label="السوكت" valueA={itemA.socket} valueB={itemB.socket} />
                  <SpecRow label="الحجم" valueA={itemA.formFactor} valueB={itemB.formFactor} />
                  <SpecRow label="نوع الرام" valueA={itemA.ramType} valueB={itemB.ramType} />
                  <CompareBar label="منافذ رام" valueA={itemA.ramSlots} valueB={itemB.ramSlots} unit="" />
                  <CompareBar label="أقصى رام" valueA={itemA.maxRam} valueB={itemB.maxRam} unit=" GB" />
                  <CompareBar label="منافذ M.2" valueA={itemA.m2Slots} valueB={itemB.m2Slots} unit="" />
                  <SpecRow label="واي فاي" valueA={itemA.wifi ? 'نعم' : 'لا'} valueB={itemB.wifi ? 'نعم' : 'لا'} />
                </>
              )}

              {category === 'ram' && (
                <>
                  <CompareBar label="السعة" valueA={itemA.size} valueB={itemB.size} unit=" GB" />
                  <CompareBar label="السرعة" valueA={itemA.speed} valueB={itemB.speed} unit=" MHz" />
                  <SpecRow label="النوع" valueA={itemA.type} valueB={itemB.type} />
                  <SpecRow label="التأخير" valueA={itemA.latency} valueB={itemB.latency} />
                  <SpecRow label="التوزيع" valueA={itemA.modules} valueB={itemB.modules} />
                </>
              )}

              {category === 'ssd' && (
                <>
                  <SpecRow label="السعة" valueA={itemA.capacity} valueB={itemB.capacity} />
                  <SpecRow label="الواجهة" valueA={itemA.interface} valueB={itemB.interface} />
                  <CompareBar label="سرعة القراءة" valueA={itemA.read} valueB={itemB.read} unit=" MB/s" />
                  <CompareBar label="سرعة الكتابة" valueA={itemA.write} valueB={itemB.write} unit=" MB/s" />
                </>
              )}

              {category === 'psu' && (
                <>
                  <CompareBar label="القدرة" valueA={itemA.watt} valueB={itemB.watt} unit="W" />
                  <SpecRow label="الكفاءة" valueA={itemA.rating} valueB={itemB.rating} />
                  <SpecRow label="مودولار" valueA={itemA.modular} valueB={itemB.modular} />
                </>
              )}

              {category === 'cooler' && (
                <>
                  <CompareBar label="قدرة التبريد" valueA={itemA.tdpMax} valueB={itemB.tdpMax} unit="W" />
                  <SpecRow label="النوع" valueA={itemA.type} valueB={itemB.type} />
                  <SpecRow label="الحجم" valueA={itemA.size} valueB={itemB.size} />
                </>
              )}

              {category === 'case' && (
                <>
                  <SpecRow label="الحجم" valueA={itemA.formFactor} valueB={itemB.formFactor} />
                  <CompareBar label="أقصى طول كرت" valueA={itemA.maxGPU} valueB={itemB.maxGPU} unit=" mm" />
                </>
              )}

              {/* Verdict */}
              <div className="bg-[#060610] border border-[#1a1a2e] rounded-xl p-4 mt-4 text-center">
                <div className="text-xs text-gray-500 mb-1.5">الحكم</div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {getVerdict(itemA, itemB, category)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

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

function SearchBox({ placeholder, value, onChange, onFocus, onBlur, showDropdown, filtered, onSelect, onAddCustom, query, selected, color }) {
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
                {c.score && <span className="text-xs text-gb-primary font-bold">{c.score} نقطة</span>}
              </div>
            </div>
          )) : query.trim() ? (
            <div onMouseDown={onAddCustom} className="px-3 py-3 text-center hover:bg-gb-primary/5 cursor-pointer">
              <p className="text-xs text-gb-muted">أضف "<span className="text-gb-text font-bold">{query}</span>" كقطعة مخصصة</p>
            </div>
          ) : null}
        </div>
      )}
      {selected && (
        <div className={`mt-1 text-xs ${color || 'text-gb-primary'} font-bold truncate`}>
          ✓ {selected.brand} {selected.name}
        </div>
      )}
    </div>
  );
}

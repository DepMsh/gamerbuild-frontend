import { useState, useMemo } from 'react';
import { ArrowLeftRight, Plus, X, Trophy, Cpu, MonitorSpeaker, TrendingUp } from 'lucide-react';
import { getAllComponents, COMPONENTS } from '../utils/db';
import { typeLabels } from '../components/ComponentCard';
import { compareWorthIt } from '../utils/engine';

export default function ComparePage() {
  const [compareList, setCompareList] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerType, setPickerType] = useState('cpu');

  const addToCompare = (comp) => {
    if (compareList.length >= 4) return;
    if (compareList.find(c => c.id === comp.id)) return;
    setCompareList([...compareList, comp]);
    setPickerOpen(false);
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter(c => c.id !== id));
  };

  const availableComponents = useMemo(() => COMPONENTS[pickerType] || [], [pickerType]);

  const allSpecs = useMemo(() => {
    if (compareList.length === 0) return [];
    const specsSet = new Set();
    compareList.forEach(c => {
      if (c.specs) Object.keys(c.specs).forEach(k => specsSet.add(k));
    });
    return [...specsSet];
  }, [compareList]);

  const specLabels = {
    cores: 'الأنوية', threads: 'الخيوط', base_clock: 'التردد الأساسي', boost_clock: 'تردد البوست',
    tdp: 'استهلاك الطاقة', socket: 'السوكت', vram: 'ذاكرة الفيديو', ray_tracing: 'ري تريسنق',
    dlss: 'DLSS', fsr: 'FSR', chipset: 'الشيبست', form_factor: 'الحجم', ram_slots: 'منافذ رام',
    max_ram: 'أقصى رام', m2_slots: 'منافذ M.2', wifi: 'واي فاي', capacity: 'السعة',
    speed: 'السرعة', latency: 'التأخير', rgb: 'إضاءة RGB', wattage: 'الواط', efficiency: 'الكفاءة',
    modular: 'مودولار', type: 'النوع', radiator: 'الراديتور', fans: 'المراوح', noise: 'الضوضاء',
    motherboard: 'اللوحات', gpu_length: 'طول الكرت', fans_included: 'مراوح مضمنة', tempered_glass: 'زجاج مقوّى',
    fan_size: 'حجم المروحة',
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-24 md:pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gb-text">قارن القطع</h1>
          <p className="text-gb-muted text-xs sm:text-sm mt-1">قارن حتى 4 قطع جنب بعض</p>
        </div>

        {/* Compare slots */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {[0, 1, 2, 3].map(i => {
            const comp = compareList[i];
            return (
              <div key={i} className={`relative rounded-xl sm:rounded-2xl border p-3 sm:p-4 min-h-[140px] sm:min-h-[180px] flex flex-col items-center justify-center transition-all ${
                comp ? 'bg-gb-card border-gb-primary/20' : 'bg-gb-surface border-gb-border border-dashed'
              }`}>
                {comp ? (
                  <>
                    <button
                      onClick={() => removeFromCompare(comp.id)}
                      className="absolute top-2 left-2 p-1.5 rounded-lg bg-gb-surface hover:bg-gb-accent/10 text-gb-muted hover:text-gb-accent transition-all"
                    >
                      <X size={14} />
                    </button>
                    {comp.score && (
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gb-primary/10 border border-gb-primary/20 flex items-center justify-center mb-2 sm:mb-3">
                        <span className="font-display font-bold text-gb-primary text-sm sm:text-lg">{comp.score}</span>
                      </div>
                    )}
                    <p className="text-[10px] sm:text-xs text-gb-muted mb-0.5 sm:mb-1">{comp.brand}</p>
                    <p className="text-[11px] sm:text-sm font-bold text-gb-text text-center leading-snug line-clamp-2">{comp.name}</p>
                    <p className="text-xs sm:text-sm font-display font-bold text-gb-primary mt-1 sm:mt-2">{comp.price?.toLocaleString()} ر.س</p>
                  </>
                ) : (
                  <button
                    onClick={() => setPickerOpen(true)}
                    className="flex flex-col items-center gap-2 text-gb-muted hover:text-gb-primary transition-colors"
                  >
                    <Plus size={24} />
                    <span className="text-xs">أضف قطعة</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Specs comparison table */}
        {compareList.length >= 2 && (
          <div className="rounded-2xl border border-gb-border overflow-hidden">
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
                    <th className="text-right text-xs text-gb-muted font-medium p-3 min-w-[120px]">المواصفة</th>
                    {compareList.map(c => (
                      <th key={c.id} className="text-center text-xs text-gb-text font-bold p-3 min-w-[140px]">{c.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price row */}
                  <tr className="border-b border-gb-border/50 bg-gb-surface/30">
                    <td className="p-3 text-xs text-gb-muted font-medium">السعر</td>
                    {compareList.map(c => {
                      const isLowest = c.price === Math.min(...compareList.map(x => x.price || Infinity));
                      return (
                        <td key={c.id} className="p-3 text-center">
                          <span className={`text-sm font-display font-bold ${isLowest ? 'text-gb-success' : 'text-gb-text'}`}>
                            {c.price?.toLocaleString()} ر.س
                            {isLowest && compareList.length > 1 && <Trophy size={12} className="inline mr-1 text-gb-success" />}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Benchmark row */}
                  {compareList.some(c => c.score) && (
                    <tr className="border-b border-gb-border/50">
                      <td className="p-3 text-xs text-gb-muted font-medium">تقييم الأداء</td>
                      {compareList.map(c => {
                        const isHighest = c.score === Math.max(...compareList.map(x => x.score || 0));
                        return (
                          <td key={c.id} className="p-3 text-center">
                            <span className={`text-sm font-display font-bold ${isHighest ? 'text-gb-primary' : 'text-gb-muted'}`}>
                              {c.score || '—'}
                              {isHighest && compareList.length > 1 && <Trophy size={12} className="inline mr-1 text-gb-primary" />}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  )}
                  {/* Specs rows */}
                  {allSpecs.map(specKey => (
                    <tr key={specKey} className="border-b border-gb-border/50 hover:bg-gb-surface/20 transition-colors">
                      <td className="p-3 text-xs text-gb-muted font-medium">{specLabels[specKey] || specKey}</td>
                      {compareList.map(c => (
                        <td key={c.id} className="p-3 text-center text-sm text-gb-text">
                          {c.specs?.[specKey] !== undefined
                            ? typeof c.specs[specKey] === 'boolean'
                              ? c.specs[specKey] ? '✓' : '✗'
                              : String(c.specs[specKey])
                            : '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Worth It Analysis */}
        {compareList.length === 2 && compareList[0].score && compareList[1].score && (() => {
          const sorted = [...compareList].sort((a, b) => a.price - b.price);
          const worthIt = compareWorthIt(sorted[0], sorted[1]);
          if (!worthIt) return null;
          const colorMap = { green: { bg: 'bg-green-500/5', border: 'border-green-500/20', text: 'text-green-400' }, yellow: { bg: 'bg-yellow-500/5', border: 'border-yellow-500/20', text: 'text-yellow-400' }, red: { bg: 'bg-red-500/5', border: 'border-red-500/20', text: 'text-red-400' } };
          const c = colorMap[worthIt.color] || colorMap.yellow;
          return (
            <div className={`mt-4 rounded-2xl ${c.bg} border ${c.border} p-4 sm:p-5`}>
              <h3 className="font-bold text-sm sm:text-base text-gb-text mb-3 flex items-center gap-2">
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

        {compareList.length < 2 && (
          <div className="text-center py-20">
            <ArrowLeftRight size={48} className="text-gb-muted/30 mx-auto mb-4" />
            <p className="text-gb-muted">أضف قطعتين على الأقل عشان تقارن</p>
          </div>
        )}

        {/* Picker modal */}
        {pickerOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-4">
            <div className="bg-gb-card rounded-t-2xl sm:rounded-2xl border border-gb-border w-full sm:max-w-lg max-h-[85vh] sm:max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gb-border">
                <h3 className="font-bold text-gb-text">اختر قطعة للمقارنة</h3>
                <button onClick={() => setPickerOpen(false)} className="p-2 text-gb-muted hover:text-gb-accent">
                  <X size={18} />
                </button>
              </div>
              {/* Type tabs */}
              <div className="flex gap-2 p-4 overflow-x-auto">
                {['cpu', 'gpu', 'motherboard', 'ram', 'psu', 'cooler', 'case'].map(t => (
                  <button
                    key={t}
                    onClick={() => setPickerType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      pickerType === t ? 'bg-gb-primary/15 text-gb-primary' : 'bg-gb-surface text-gb-muted'
                    }`}
                  >
                    {typeLabels[t]}
                  </button>
                ))}
              </div>
              <div className="p-4 pt-0 space-y-2 overflow-y-auto max-h-[50vh]">
                {availableComponents.map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => addToCompare(comp)}
                    disabled={compareList.find(c => c.id === comp.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-gb-surface border border-gb-border hover:border-gb-primary/20 transition-all disabled:opacity-30 text-right"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gb-text truncate">{comp.name}</p>
                      <p className="text-xs text-gb-muted">{comp.brand}</p>
                    </div>
                    <span className="text-sm font-bold text-gb-primary whitespace-nowrap">{comp.price?.toLocaleString()} ر.س</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

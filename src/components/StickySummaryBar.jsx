import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ChevronUp, BarChart2, Zap } from 'lucide-react';
import { CATEGORIES, getAmazonLink } from '../utils/db';
import ProductImage from './ProductImage';

export default function StickySummaryBar({ components, liveTotalPrice, selectedCount, wattage, handleBuyAll, buyAllBlocked, getPrice }) {
  const [expanded, setExpanded] = useState(false);

  if (selectedCount === 0) return null;

  const hasCpuAndGpu = !!(components.cpu && components.gpu);

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 md:hidden animate-[slideUp_0.3s_ease-out]">
      {/* Expandable dropdown */}
      {expanded && (
        <>
          <div className="fixed inset-0 z-[-1]" onClick={() => setExpanded(false)} />
          <div className="mx-3 mb-2 bg-[#0a0a12]/95 backdrop-blur-xl border border-[#00e5ff]/20 rounded-xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto animate-[slideUp_0.2s_ease-out]">
            <div className="p-3 space-y-1.5">
              {Object.entries(components).filter(([, v]) => v).map(([cat, comp]) => {
                const fp = getPrice(comp);
                return (
                  <div key={cat} className="flex items-center gap-2 px-2 py-1.5">
                    <ProductImage component={comp} size="sm" className="w-8 h-8 rounded-lg shrink-0 p-0.5" />
                    <span className="text-xs text-white/70 truncate flex-1">{comp.name}</span>
                    {fp.isLive ? (
                      <span className="text-xs font-mono font-bold shrink-0 text-[#00e676]">{fp.value?.toLocaleString()} ر.س</span>
                    ) : (
                      <a href={getAmazonLink(comp)} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                        className="text-xs font-bold text-[#ff9900] shrink-0 px-2 py-0.5 bg-[#ff9900]/10 rounded-full">
                        شيك السعر
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="border-t border-[#1a1a2e] p-3">
              <button onClick={() => { handleBuyAll(); setExpanded(false); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-all">
                <ShoppingCart size={16} /> اشتر الكل من أمازون
              </button>
              {buyAllBlocked && (
                <p className="text-xs text-yellow-400 text-center mt-2">المتصفح منع فتح النوافذ — اضغط على كل قطعة</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Main bar */}
      <div className="bg-[#0a0a1a]/90 backdrop-blur-xl border-t border-white/10"
        style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}>
        <div className="px-4 py-2.5">
          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mb-2">
            {CATEGORIES.map(({ key }) => (
              <div key={key} className={`w-2 h-2 rounded-full transition-all duration-500 ${
                components[key] ? 'bg-[#00e5ff] shadow-[0_0_6px_rgba(0,229,255,0.5)]' : 'bg-white/10'
              }`} />
            ))}
          </div>

          {/* Price + Actions row */}
          <div className="flex items-center justify-between gap-3">
            {/* Left: Parts count + Price */}
            <div className="flex-1 cursor-pointer" onClick={() => setExpanded(!expanded)}>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{selectedCount}/8 قطع</span>
                <span className="text-gray-500">•</span>
                <span className="text-xs text-gray-400">
                  <Zap size={10} className="inline -mt-px" /> {wattage}W
                </span>
                <ChevronUp size={12} className={`text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-[#ff9900]">شيك الأسعار</span>
              </div>
            </div>

            {/* Right: Action buttons */}
            <div className="flex gap-2">
              {hasCpuAndGpu && (
                <Link to="/analysis"
                  className="bg-white/[0.06] border border-white/10 text-white text-sm font-bold w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-all">
                  <BarChart2 size={16} />
                </Link>
              )}
              {selectedCount >= 2 && (
                <button onClick={handleBuyAll}
                  className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                  <ShoppingCart size={14} /> اشتر من أمازون
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

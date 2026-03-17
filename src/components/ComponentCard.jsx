import { Cpu, MonitorSpeaker, CircuitBoard, MemoryStick, Zap, Fan, Box, Plus, Check, ArrowLeftRight, ExternalLink, HardDrive } from 'lucide-react';
import { getAmazonLink } from '../utils/db';
import { getPriceStats } from '../utils/priceHistory';

const typeIcons = {
  cpu: Cpu,
  gpu: MonitorSpeaker,
  motherboard: CircuitBoard,
  ram: MemoryStick,
  ssd: HardDrive,
  psu: Zap,
  cooler: Fan,
  case: Box,
};

const typeLabels = {
  cpu: 'معالج',
  gpu: 'كرت شاشة',
  motherboard: 'لوحة أم',
  ram: 'رام',
  ssd: 'تخزين',
  psu: 'باور سبلاي',
  cooler: 'تبريد',
  case: 'كيس',
};

const tierColors = {
  budget: 'text-green-400 bg-green-400/10 border-green-400/20',
  'mid-range': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'high-end': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  enthusiast: 'text-gb-accent bg-gb-accent/10 border-gb-accent/20',
};

const tierLabels = {
  budget: 'اقتصادي',
  'mid-range': 'متوسط',
  'high-end': 'عالي',
  enthusiast: 'خرافي',
};

export default function ComponentCard({
  component,
  onSelect,
  onCompare,
  selected = false,
  compact = false,
  compareMode = false,
}) {
  const Icon = typeIcons[component.type] || Cpu;
  const tierClass = tierColors[component.tier] || tierColors['mid-range'];

  if (compact) {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer
        ${selected ? 'bg-gb-primary/10 border-gb-primary/30' : 'bg-gb-card border-gb-border hover:border-gb-primary/20'}`}
        onClick={() => onSelect?.(component)}
      >
        <div className="w-10 h-10 rounded-lg bg-gb-surface flex items-center justify-center shrink-0 overflow-hidden">
          {component.image_url ? (
            <img src={component.image_url} alt="" loading="lazy" className="w-full h-full object-contain p-0.5" />
          ) : (
            <Icon size={18} className="text-gb-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gb-text truncate">{component.name}</p>
          <p className="text-xs text-gb-muted">{typeLabels[component.type]}</p>
        </div>
        <span className="text-sm font-bold text-gb-primary whitespace-nowrap">{component.price?.toLocaleString()} ر.س</span>
      </div>
    );
  }

  return (
    <div className={`group relative bg-gb-card rounded-xl sm:rounded-2xl border overflow-hidden card-hover
      ${selected ? 'border-gb-primary/40 ring-1 ring-gb-primary/20' : 'border-gb-border'}`}>
      
      {/* Tier badge */}
      {component.tier && (
        <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold border z-10 ${tierClass}`}>
          {tierLabels[component.tier]}
        </div>
      )}

      {/* Image / Icon placeholder */}
      <div className="relative h-24 sm:h-40 bg-gradient-to-br from-gb-surface to-gb-card flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        {component.image_url ? (
          <img
            src={component.image_url}
            alt={component.name}
            loading="lazy"
            className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-300 group-hover:scale-105"
            onError={e => { e.target.style.display = 'none'; if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex'; }}
          />
        ) : null}
        <div className={`${component.image_url ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
          <Icon size={36} className="sm:hidden text-gb-primary/30 group-hover:text-gb-primary/50 transition-colors" strokeWidth={1} />
          <Icon size={56} className="hidden sm:block text-gb-primary/30 group-hover:text-gb-primary/50 transition-colors" strokeWidth={1} />
        </div>
        {component.score && (
          <div className="absolute bottom-1.5 right-1.5 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gb-bg/80 backdrop-blur border border-gb-border flex items-center justify-center">
            <span className="text-[10px] sm:text-sm font-display font-bold text-gb-primary">{component.score}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-4">
        <p className="text-[10px] sm:text-xs text-gb-muted mb-0.5 sm:mb-1 font-medium truncate">{component.brand} · {typeLabels[component.type]}</p>
        <h3 className="text-[11px] sm:text-sm font-bold text-gb-text leading-snug mb-1.5 sm:mb-3 line-clamp-2">{component.name}</h3>

        {/* Key specs */}
        {(() => {
          const specs = [];
          const c = component;
          if (c.cores) specs.push(`${c.cores}C/${c.threads}T`);
          if (c.boostClock) specs.push(`${c.boostClock}GHz`);
          if (c.vram) specs.push(`${c.vram}GB`);
          if (c.socket) specs.push(c.socket);
          if (c.chipset) specs.push(c.chipset);
          if (c.size && c.type) specs.push(`${c.size}GB ${c.type}`);
          if (c.speed && !c.boostClock) specs.push(`${c.speed}MHz`);
          if (c.capacity) specs.push(c.capacity >= 1000 ? `${c.capacity/1000}TB` : `${c.capacity}GB`);
          if (c.watt) specs.push(`${c.watt}W`);
          if (c.rating) specs.push(c.rating);
          if (c.tdp && !c.cores) specs.push(`${c.tdp}W`);
          if (c.formFactor) specs.push(c.formFactor);
          return specs.length > 0 ? (
            <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
              {specs.slice(0, 3).map((s, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gb-surface text-gb-muted border border-gb-border">{s}</span>
              ))}
            </div>
          ) : null;
        })()}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm sm:text-lg font-display font-bold text-gb-primary">{component.price?.toLocaleString()}<span className="text-[9px] sm:text-xs text-gb-muted mr-0.5 sm:mr-1">ر.س</span></span>
            <PriceTrend componentId={component.id} />
          </div>
          
          <div className="flex items-center gap-1">
            {compareMode && (
              <button
                onClick={(e) => { e.stopPropagation(); onCompare?.(component); }}
                className="p-1.5 sm:p-2 rounded-lg bg-gb-surface hover:bg-gb-secondary/20 text-gb-muted hover:text-gb-secondary transition-all"
                title="أضف للمقارنة"
              >
                <ArrowLeftRight size={12} className="sm:hidden" />
                <ArrowLeftRight size={14} className="hidden sm:block" />
              </button>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onSelect?.(component); }}
              className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                selected
                  ? 'bg-gb-primary text-gb-bg'
                  : 'bg-gb-surface hover:bg-gb-primary/20 text-gb-muted hover:text-gb-primary'
              }`}
              title={selected ? 'تم الإضافة' : 'أضف للتجميعة'}
            >
              {selected ? <Check size={12} /> : <Plus size={12} />}
            </button>
          </div>
        </div>

        {/* Amazon Buy Button */}
        <a
          href={getAmazonLink(component)}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => { e.stopPropagation(); }}
          className="mt-2 flex items-center justify-center gap-1 w-full py-1.5 sm:py-2 rounded-lg bg-[#ff9900]/10 border border-[#ff9900]/20 text-[#ff9900] text-[10px] sm:text-xs font-bold hover:bg-[#ff9900]/20 transition-all"
        >
          اشتري من أمازون
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

function PriceTrend({ componentId }) {
  const stats = getPriceStats(componentId);
  if (!stats) return null;
  if (stats.isNearLowest) return <span className="text-[10px] text-green-400 font-bold whitespace-nowrap">↓ أقل سعر</span>;
  if (stats.isNearHighest) return <span className="text-[10px] text-red-400 font-bold whitespace-nowrap">↑ سعر مرتفع</span>;
  return <span className="text-[10px] text-gb-muted whitespace-nowrap">→ مستقر</span>;
}

export { typeIcons, typeLabels, tierColors, tierLabels };

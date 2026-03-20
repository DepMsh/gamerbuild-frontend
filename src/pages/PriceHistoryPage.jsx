import { useState, useMemo } from 'react';
import { Search, ExternalLink, TrendingDown, TrendingUp, Minus, SlidersHorizontal } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import { getAllComponents, getAmazonLink } from '../utils/db';
import { track } from '../utils/analytics';
import { getPriceStats } from '../utils/priceHistory';
import PriceChart from '../components/PriceChart';

const sortOptions = [
  { key: 'biggest-drop', label: 'أكبر انخفاض' },
  { key: 'biggest-rise', label: 'أكبر ارتفاع' },
  { key: 'lowest', label: 'أقل سعر' },
  { key: 'name', label: 'الاسم' },
];

export default function PriceHistoryPage() {
  usePageTitle('مقارنة الأسعار');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('biggest-drop');
  const [expandedId, setExpandedId] = useState(null);

  const components = useMemo(() => {
    let items = getAllComponents().map(c => ({
      ...c,
      stats: getPriceStats(c.id),
    }));

    // Filter by search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(c => c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q));
    }

    // Sort
    items.sort((a, b) => {
      switch (sortBy) {
        case 'biggest-drop': {
          const dropA = a.stats ? (a.stats.highest - a.stats.current) / a.stats.highest : 0;
          const dropB = b.stats ? (b.stats.highest - b.stats.current) / b.stats.highest : 0;
          return dropB - dropA;
        }
        case 'biggest-rise': {
          const riseA = a.stats ? (a.stats.current - a.stats.lowest) / a.stats.lowest : 0;
          const riseB = b.stats ? (b.stats.current - b.stats.lowest) / b.stats.lowest : 0;
          return riseB - riseA;
        }
        case 'lowest':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return items;
  }, [search, sortBy]);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="font-display text-lg sm:text-2xl font-bold text-gb-text">سجل الأسعار</h1>
          <p className="text-gb-muted text-xs mt-0.5">تتبع أسعار القطع خلال آخر 90 يوم</p>
        </div>

        {/* Search & sort */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gb-muted" />
            <input
              type="text"
              placeholder="ابحث عن قطعة..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gb-card border border-gb-border rounded-xl pr-9 pl-3 py-2.5 text-sm text-gb-text placeholder-gb-muted focus:outline-none focus:border-gb-primary/40 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-gb-muted shrink-0" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-gb-card border border-gb-border rounded-xl px-3 py-2.5 text-sm text-gb-muted focus:outline-none"
            >
              {sortOptions.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-gb-muted mb-3">{components.length} قطعة</p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {components.map(comp => (
            <PriceCard
              key={comp.id}
              component={comp}
              stats={comp.stats}
              expanded={expandedId === comp.id}
              onToggle={() => setExpandedId(expandedId === comp.id ? null : comp.id)}
            />
          ))}
        </div>

        {components.length === 0 && (
          <div className="text-center py-16 text-gb-muted text-sm">لا توجد نتائج</div>
        )}
      </div>
    </div>
  );
}

function PriceCard({ component, stats, expanded, onToggle }) {
  if (!stats) return null;

  const TrendIcon = stats.trend === 'down' ? TrendingDown : stats.trend === 'up' ? TrendingUp : Minus;
  const trendColor = stats.trend === 'down' ? 'text-green-400' : stats.trend === 'up' ? 'text-red-400' : 'text-gb-muted';
  const savings = stats.highest - stats.current;
  const savingsPercent = ((savings / stats.highest) * 100).toFixed(0);

  return (
    <div className="bg-gb-card border border-gb-border rounded-xl sm:rounded-2xl overflow-hidden hover:border-gb-primary/20 transition-colors">
      <div className="p-3 sm:p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <p className="text-[10px] text-gb-muted mb-0.5">{component.brand}</p>
            <h3 className="text-xs sm:text-sm font-bold text-gb-text leading-snug truncate">{component.name}</h3>
          </div>
          <TrendIcon size={16} className={`shrink-0 ${trendColor}`} />
        </div>

        {/* Mini chart */}
        <div className="mb-3 cursor-pointer" onClick={onToggle}>
          <PriceChart componentId={component.id} compact />
        </div>

        {/* Price stats row */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-sm sm:text-base font-display font-bold text-gb-primary">{stats.current.toLocaleString()}</span>
            <span className="text-[10px] text-gb-muted mr-1">ر.س</span>
          </div>
          <div className="text-left">
            <span className="text-[10px] text-gb-muted">أقل: </span>
            <span className="text-[10px] font-bold text-green-400">{stats.lowest.toLocaleString()}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1.5 mb-3">
          {stats.isNearLowest && (
            <span className="px-1.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-bold">أقل سعر!</span>
          )}
          {stats.isNearHighest && (
            <span className="px-1.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-bold">سعر مرتفع</span>
          )}
          {savings > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-gb-surface text-gb-muted text-[9px]">
              وفّر {savingsPercent}% من الأعلى
            </span>
          )}
        </div>

        {/* Amazon button */}
        <a
          href={getAmazonLink(component)}
          target="_blank"
          rel="noreferrer"
          onClick={() => track.clickAmazon(component.name, component.price)}
          className="flex items-center justify-center gap-1 w-full py-2 rounded-lg bg-[#ff9900]/10 border border-[#ff9900]/20 text-[#ff9900] text-[10px] sm:text-xs font-bold hover:bg-[#ff9900]/20 transition-all"
        >
          اشتري من أمازون <ExternalLink size={10} />
        </a>
      </div>

      {/* Expanded full chart */}
      {expanded && (
        <div className="border-t border-gb-border p-3 sm:p-4 bg-gb-bg/30">
          <PriceChart componentId={component.id} />
        </div>
      )}
    </div>
  );
}

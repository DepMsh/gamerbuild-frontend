import { useState, useMemo } from 'react';
import { Tag, ExternalLink, Clock, TrendingDown, ShoppingCart, Zap } from 'lucide-react';
import { getAllComponents, getAmazonLink } from '../utils/db';
import { track } from '../utils/analytics';

// Generate Amazon deals from component database
function generateDeals() {
  const components = getAllComponents();
  const deals = [];

  components.forEach((comp, i) => {
    if (i % 2 === 0) { // Every other component has a deal
      const discount = Math.floor(Math.random() * 18) + 5;
      const originalPrice = Math.round(comp.price / (1 - discount / 100));
      deals.push({
        id: `deal-${comp.id}`,
        component: comp,
        originalPrice,
        dealPrice: comp.price,
        discount,
        expiresIn: `${Math.floor(Math.random() * 5) + 1} أيام`,
        isHot: discount > 15,
      });
    }
  });

  return deals.sort((a, b) => b.discount - a.discount);
}

const tierLabels = { budget: 'اقتصادي', 'mid-range': 'متوسط', 'high-end': 'عالي', enthusiast: 'خرافي' };
const catLabels = { cpu: 'معالج', gpu: 'كرت شاشة', motherboard: 'لوحة أم', ram: 'رام', ssd: 'تخزين', psu: 'باور', cooler: 'تبريد', case: 'كيس' };

export default function DealsPage() {
  const [deals] = useState(generateDeals);
  const [catFilter, setCatFilter] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set(deals.map(d => {
      // Detect category from component id prefix
      const prefix = d.component.id.split('-')[0];
      const map = { cpu: 'cpu', gpu: 'gpu', mb: 'motherboard', ram: 'ram', ssd: 'ssd', psu: 'psu', cool: 'cooler', case: 'case' };
      return map[prefix] || 'other';
    }));
    return ['all', ...cats];
  }, [deals]);

  const filtered = catFilter === 'all' ? deals : deals.filter(d => {
    const prefix = d.component.id.split('-')[0];
    const map = { cpu: 'cpu', gpu: 'gpu', mb: 'motherboard', ram: 'ram', ssd: 'ssd', psu: 'psu', cool: 'cooler', case: 'case' };
    return (map[prefix] || 'other') === catFilter;
  });

  const totalSavings = filtered.reduce((sum, d) => sum + (d.originalPrice - d.dealPrice), 0);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-gb-text flex items-center gap-2">
              <Tag className="text-gb-accent" size={22} />
              عروض أمازون
            </h1>
            <p className="text-gb-muted text-xs mt-1">{filtered.length} عرض — أسعار Amazon.sa</p>
          </div>
          <div className="text-left">
            <p className="text-[10px] text-gb-muted">إجمالي التوفير</p>
            <p className="text-lg font-display font-bold text-green-400">{totalSavings.toLocaleString()} ر.س</p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCatFilter(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                catFilter === cat ? 'bg-[#ff9900]/15 text-[#ff9900] border border-[#ff9900]/25' : 'bg-gb-card text-gb-muted border border-gb-border'
              }`}>
              {cat === 'all' ? '🏷️ الكل' : catLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Deals */}
        <div className="space-y-3">
          {filtered.map(deal => (
            <div key={deal.id} className={`bg-gb-card rounded-xl border overflow-hidden transition-all ${deal.isHot ? 'border-gb-accent/30' : 'border-gb-border'}`}>
              {deal.isHot && (
                <div className="bg-gb-accent px-3 py-1 text-[10px] font-bold text-white text-center">🔥 عرض مميز — خصم {deal.discount}%</div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gb-surface text-gb-muted border border-gb-border">
                      {catLabels[deal.component.id.split('-')[0] === 'mb' ? 'motherboard' : deal.component.id.split('-')[0]] || ''}
                    </span>
                    <h3 className="text-sm font-bold text-gb-text mt-1.5">{deal.component.brand} {deal.component.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gb-muted">
                      <Clock size={10} /> ينتهي خلال {deal.expiresIn}
                    </div>
                  </div>
                  <div className="text-left shrink-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs text-gb-muted line-through">{deal.originalPrice.toLocaleString()}</span>
                      <span className="px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 text-[10px] font-bold flex items-center gap-0.5">
                        <TrendingDown size={9} />{deal.discount}%
                      </span>
                    </div>
                    <p className="text-lg font-display font-black text-green-400">{deal.dealPrice.toLocaleString()} <span className="text-[10px] text-gb-muted">ر.س</span></p>
                  </div>
                </div>

                <a href={getAmazonLink(deal.component)} target="_blank" rel="noreferrer"
                  onClick={() => track.clickAmazon(deal.component.name, deal.component.price)}
                  className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#ff9900] text-gb-bg font-bold text-xs hover:bg-[#e8890a] transition-all">
                  <ShoppingCart size={14} /> اشتري من أمازون <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] text-gb-muted mt-4">الأسعار تقريبية — تحقق من أمازون للسعر الحالي</p>
      </div>
    </div>
  );
}

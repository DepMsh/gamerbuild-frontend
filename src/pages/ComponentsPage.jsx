import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Cpu, MonitorSpeaker, CircuitBoard, MemoryStick, Zap, Fan, Box } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import { getAllComponents, getSortedComponents } from '../utils/db';
import { useBuild } from '../hooks/BuildContext';
import ComponentCard from '../components/ComponentCard';

const typeFilters = [
  { key: 'all', label: 'الكل', icon: SlidersHorizontal },
  { key: 'cpu', label: 'معالج', icon: Cpu },
  { key: 'gpu', label: 'كرت شاشة', icon: MonitorSpeaker },
  { key: 'motherboard', label: 'لوحة أم', icon: CircuitBoard },
  { key: 'ram', label: 'رام', icon: MemoryStick },
  { key: 'psu', label: 'باور', icon: Zap },
  { key: 'cooler', label: 'تبريد', icon: Fan },
  { key: 'case', label: 'كيس', icon: Box },
];

const sortOptions = [
  { key: 'smart', label: 'الترتيب الافتراضي' },
  { key: 'price-asc', label: 'السعر: الأقل' },
  { key: 'price-desc', label: 'السعر: الأعلى' },
  { key: 'score-desc', label: 'الأداء: الأعلى' },
  { key: 'name', label: 'الاسم' },
];

export default function ComponentsPage() {
  usePageTitle('تصفح القطع');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('smart');
  const [brandFilter, setBrandFilter] = useState('all');
  const { components: buildComponents, setComponent } = useBuild();

  const allComponents = useMemo(() => {
    let list = typeFilter === 'all' ? getAllComponents() : getSortedComponents(typeFilter);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q));
    }

    if (brandFilter !== 'all') {
      list = list.filter(c => c.brand === brandFilter);
    }

    if (sortBy !== 'smart') {
      list = [...list].sort((a, b) => {
        switch (sortBy) {
          case 'price-asc': return (a.price || 0) - (b.price || 0);
          case 'price-desc': return (b.price || 0) - (a.price || 0);
          case 'score-desc': return (b.score || 0) - (a.score || 0);
          case 'name': return a.name.localeCompare(b.name);
          default: return 0;
        }
      });
    }

    return list;
  }, [typeFilter, searchQuery, sortBy, brandFilter]);

  const brands = useMemo(() => {
    const source = typeFilter === 'all' ? getAllComponents() : getSortedComponents(typeFilter);
    return [...new Set(source.map(c => c.brand))];
  }, [typeFilter]);

  const handleSelect = (component) => {
    setComponent(component.type, component);
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gb-text">تصفح القطع</h1>
          <p className="text-gb-muted text-sm mt-1">{allComponents.length} قطعة متاحة</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gb-muted" />
          <input
            type="text"
            placeholder="ابحث عن قطعة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-gb-card border border-gb-border text-gb-text placeholder-gb-muted focus:outline-none focus:border-gb-primary/40 transition-colors"
          />
        </div>

        {/* Type filters */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {typeFilters.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setTypeFilter(key); setBrandFilter('all'); }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                typeFilter === key
                  ? 'bg-gb-primary/15 text-gb-primary border border-gb-primary/25'
                  : 'bg-gb-card text-gb-muted border border-gb-border hover:border-gb-primary/15'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Brand + Sort row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {brands.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs text-gb-muted whitespace-nowrap">العلامة:</span>
              <button
                onClick={() => setBrandFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  brandFilter === 'all' ? 'bg-gb-secondary/15 text-gb-secondary' : 'bg-gb-card text-gb-muted'
                }`}
              >
                الكل
              </button>
              {brands.map(b => (
                <button
                  key={b}
                  onClick={() => setBrandFilter(b)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap ${
                    brandFilter === b ? 'bg-gb-secondary/15 text-gb-secondary' : 'bg-gb-card text-gb-muted'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          )}
          <div className="mr-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs bg-gb-card text-gb-muted border border-gb-border focus:outline-none"
            >
              {sortOptions.map(o => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {allComponents.length === 0 ? (
          <div className="text-center py-20">
            <Search size={48} className="text-gb-muted/30 mx-auto mb-4" />
            <p className="text-gb-muted">ما لقينا نتائج — جرب بحث ثاني</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {allComponents.map(comp => (
              <ComponentCard
                key={comp.id}
                component={comp}
                selected={buildComponents[comp.type]?.id === comp.id}
                onSelect={handleSelect}
                compareMode
              />
            ))}
          </div>
        )}

        {/* Price disclaimer */}
        <div className="text-center text-[10px] text-white/20 mt-8 px-4 pb-4 leading-relaxed">
          💡 الأسعار تقريبية وقد تختلف عن السعر الفعلي في أمازون.
          اضغط "شيك السعر" للسعر الحالي المحدّث.
          <br />
          آخر تحديث للأسعار: مارس 2025
        </div>
      </div>
    </div>
  );
}

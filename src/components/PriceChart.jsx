import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot,
} from 'recharts';
import { TrendingDown, TrendingUp, Minus, ArrowDown, ArrowUp } from 'lucide-react';
import { getPriceHistory, getPriceStats } from '../utils/priceHistory';

const arabicMonths = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getDate()} ${arabicMonths[d.getMonth()]}`;
}

function formatShortMonth(dateStr) {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { date, price } = payload[0].payload;
  return (
    <div className="bg-gb-card border border-gb-border rounded-lg px-3 py-2 shadow-xl text-xs" dir="rtl">
      <p className="text-gb-muted">{formatDate(date)}</p>
      <p className="text-gb-primary font-display font-bold text-sm">{price.toLocaleString()} ر.س</p>
    </div>
  );
}

export default function PriceChart({ componentId, compact = false }) {
  const history = useMemo(() => getPriceHistory(componentId), [componentId]);
  const stats = useMemo(() => getPriceStats(componentId), [componentId]);

  if (!history.length || !stats) return null;

  const lowestPoint = history.find(h => h.price === stats.lowest);
  const highestPoint = history.find(h => h.price === stats.highest);

  const TrendIcon = stats.trend === 'down' ? TrendingDown : stats.trend === 'up' ? TrendingUp : Minus;
  const trendColor = stats.trend === 'down' ? 'text-green-400' : stats.trend === 'up' ? 'text-red-400' : 'text-gb-muted';
  const trendLabel = stats.trend === 'down' ? 'ينخفض' : stats.trend === 'up' ? 'يرتفع' : 'مستقر';

  if (compact) {
    return (
      <div className="w-full h-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`g-${componentId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="price" stroke="#00f0ff" strokeWidth={1.5} fill={`url(#g-${componentId})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full" dir="rtl">
      {/* Badges */}
      <div className="flex items-center gap-2 mb-3">
        {stats.isNearLowest && (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">
            <ArrowDown size={10} /> أقل سعر!
          </span>
        )}
        {stats.isNearHighest && (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
            <ArrowUp size={10} /> سعر مرتفع
          </span>
        )}
        <span className={`flex items-center gap-1 px-2 py-1 rounded-full bg-gb-surface text-xs font-bold ${trendColor}`}>
          <TrendIcon size={10} /> {trendLabel}
        </span>
      </div>

      {/* Chart */}
      <div className="w-full h-48 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${componentId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickFormatter={formatShortMonth}
              tick={{ fill: '#6b6b8a', fontSize: 10 }}
              axisLine={{ stroke: '#1a1a2e' }}
              tickLine={false}
              interval={14}
            />
            <YAxis
              tick={{ fill: '#6b6b8a', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => v.toLocaleString()}
              width={50}
              domain={['dataMin - 50', 'dataMax + 50']}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#00f0ff"
              strokeWidth={2}
              fill={`url(#grad-${componentId})`}
              dot={false}
              activeDot={{ r: 4, fill: '#00f0ff', stroke: '#0a0a0f', strokeWidth: 2 }}
            />
            {/* Lowest price dot */}
            {lowestPoint && (
              <ReferenceDot
                x={lowestPoint.date}
                y={lowestPoint.price}
                r={4}
                fill="#10b981"
                stroke="#0a0a0f"
                strokeWidth={2}
              />
            )}
            {/* Highest price dot */}
            {highestPoint && (
              <ReferenceDot
                x={highestPoint.date}
                y={highestPoint.price}
                r={4}
                fill="#ef4444"
                stroke="#0a0a0f"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
        <StatBox label="السعر الحالي" value={`${stats.current.toLocaleString()} ر.س`} color="text-gb-primary" />
        <StatBox label="أقل سعر" value={`${stats.lowest.toLocaleString()} ر.س`} sub={formatDate(stats.lowestDate)} color="text-green-400" />
        <StatBox label="أعلى سعر" value={`${stats.highest.toLocaleString()} ر.س`} sub={formatDate(stats.highestDate)} color="text-red-400" />
        <StatBox label="المتوسط" value={`${stats.average.toLocaleString()} ر.س`} color="text-gb-muted" />
      </div>
    </div>
  );
}

function StatBox({ label, value, sub, color = 'text-gb-text' }) {
  return (
    <div className="bg-gb-surface/50 rounded-lg p-2 text-center">
      <p className="text-xs text-gb-muted mb-0.5">{label}</p>
      <p className={`text-xs font-display font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gb-muted mt-0.5">{sub}</p>}
    </div>
  );
}

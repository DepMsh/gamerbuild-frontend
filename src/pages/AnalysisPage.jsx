import { useBuild } from '../hooks/BuildContext';
import { analyzeBottleneck, calcBuildScore, getRecommendations, getUpgradeRoadmap } from '../utils/engine';
import { getAllComponents } from '../utils/db';
import { Shield, ShieldCheck, ShieldAlert, TrendingUp, ArrowUp, Zap } from 'lucide-react';

function checkCompat(components) {
  const issues = [], warnings = [];
  if (components.cpu && components.motherboard && components.cpu.socket !== components.motherboard.socket)
    issues.push(`سوكت المعالج (${components.cpu.socket}) مو متوافق مع اللوحة (${components.motherboard.socket})`);
  if (components.gpu && components.psu) {
    const need = parseInt(components.gpu.tdp || 0) + parseInt(components.cpu?.tdp || 0) + 100;
    if (parseInt(components.psu.watt || 0) < need)
      issues.push(`الباور (${components.psu.watt}W) ممكن ما يكفي — تحتاج ~${need}W`);
  }
  if (components.cpu && !components.motherboard) warnings.push('اختر لوحة أم متوافقة');
  return { issues, warnings };
}

export default function AnalysisPage() {
  const { components, selectedCount } = useBuild();
  const bn = analyzeBottleneck(components.cpu, components.gpu);
  const compatResult = checkCompat(components);
  const score = calcBuildScore(components, compatResult, bn);
  const recs = getRecommendations(components);
  const allComps = getAllComponents();
  const roadmap = getUpgradeRoadmap(components, allComps);

  const scoreColor = score >= 80 ? '#00e676' : score >= 50 ? '#ffd740' : '#ff5252';

  if (selectedCount < 2) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 pb-24 md:pb-10 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="text-6xl opacity-30 mb-4">📊</div>
          <h2 className="font-display text-xl font-bold text-gb-text mb-2">التحليل الذكي</h2>
          <p className="text-gb-muted text-sm">اختر معالج وكرت شاشة على الأقل في صفحة التجميعة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-24 md:pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-xl sm:text-2xl font-bold text-gb-text mb-6 sm:mb-8">📊 التحليل الذكي</h1>

        {/* Score Circle */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke={scoreColor} strokeWidth="8"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 - (score / 100) * 2 * Math.PI * 52}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl font-display font-black" style={{ color: scoreColor }}>{score}</span>
              <span className="text-xs text-gb-muted">نقاط التجميعة</span>
            </div>
          </div>
          <p className="text-sm text-gb-muted mt-3">
            {score >= 80 ? 'تجميعة ممتازة! 🔥' : score >= 60 ? 'تجميعة جيدة — فيها تحسينات ممكنة' : score >= 40 ? 'تحتاج تعديلات عشان تكون أفضل' : 'في مشاكل تحتاج تنحل'}
          </p>
        </div>

        {/* Smart Recommendations */}
        {recs.length > 0 && (
          <div className="bg-gb-card rounded-2xl border border-gb-border p-4 sm:p-5 mb-4">
            <h3 className="font-bold text-gb-text text-sm sm:text-base mb-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gb-primary/10 flex items-center justify-center">💡</div>
              التوصيات
            </h3>
            <div className="space-y-2">
              {recs.map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gb-surface rounded-xl text-sm">
                  <span className="text-lg">{r.icon}</span>
                  <span className="text-gb-text">{r.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottleneck */}
        {bn && (
          <div className={`rounded-2xl p-4 sm:p-5 mb-4 border ${
            bn.severity === 'good'
              ? 'bg-green-500/5 border-green-500/20'
              : bn.severity === 'warn'
              ? 'bg-yellow-500/5 border-yellow-500/20'
              : 'bg-red-500/5 border-red-500/20'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{bn.severity === 'good' ? '✅' : '⚠️'}</span>
              <span className="font-bold text-sm" style={{ color: bn.severity === 'good' ? '#00e676' : bn.severity === 'warn' ? '#ffd740' : '#ff5252' }}>
                {bn.label}
              </span>
            </div>
            <p className="text-xs text-gb-muted mb-3">{bn.msg}</p>
            <div className="h-2 rounded-full bg-gb-surface overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min(bn.pct * 2.5, 100)}%`,
                  backgroundColor: bn.severity === 'good' ? '#00e676' : bn.severity === 'warn' ? '#ffd740' : '#ff5252'
                }}
              />
            </div>
          </div>
        )}

        {/* Compatibility */}
        <div className="bg-gb-card rounded-2xl border border-gb-border p-4 sm:p-5 mb-4">
          <h3 className="font-bold text-gb-text text-sm sm:text-base mb-3">🔗 التوافق</h3>
          <div className="space-y-2">
            {compatResult.issues.map((e, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-red-500/5 rounded-xl text-xs sm:text-sm text-red-400">
                <ShieldAlert size={16} className="shrink-0 mt-0.5" /> {e}
              </div>
            ))}
            {compatResult.warnings.map((w, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-yellow-500/5 rounded-xl text-xs sm:text-sm text-yellow-400">
                <Shield size={16} className="shrink-0 mt-0.5" /> {w}
              </div>
            ))}
            {compatResult.issues.length === 0 && compatResult.warnings.length === 0 && (
              <div className="flex items-center gap-2 p-3 bg-green-500/5 rounded-xl text-xs sm:text-sm text-green-400">
                <ShieldCheck size={16} /> كل القطع متوافقة ✓
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Roadmap */}
        {roadmap.length > 0 && (
          <div className="bg-gb-card rounded-2xl border border-gb-border p-4 sm:p-5">
            <h3 className="font-bold text-gb-text text-sm sm:text-base mb-1 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">🔧</div>
              وش أرقّي أول؟
            </h3>
            <p className="text-xs text-gb-muted mb-4">تحليل ذكي مرتب حسب الأولوية</p>

            <div className="space-y-4">
              {roadmap.map((item, idx) => (
                <div key={idx} className={`rounded-xl border p-4 ${idx === 0 ? 'border-gb-primary/30 bg-gb-primary/5' : 'border-gb-border bg-gb-surface'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <p className="font-bold text-sm text-gb-text">{item.label}</p>
                        <p className="text-[11px] text-gb-muted">الحالي: {item.current.name} ({item.current.score || '?'}/100)</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${idx === 0 ? 'bg-gb-primary/15 text-gb-primary' : 'bg-gb-secondary/15 text-gb-secondary'}`}>
                      أولوية {item.priority}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {item.options.map((opt, oi) => (
                      <div key={oi} className="bg-gb-bg/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gb-secondary/15 text-gb-secondary font-bold">{opt.tag}</span>
                          <span className="text-xs font-display font-bold text-green-400">+{opt.gain} أداء</span>
                        </div>
                        <p className="text-sm font-bold text-gb-text mt-1">{opt.part.name}</p>
                        <p className="text-xs text-gb-primary font-bold mt-1">{opt.part.price?.toLocaleString()} ر.س</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

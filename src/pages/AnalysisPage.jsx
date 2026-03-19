import { useBuild } from '../hooks/BuildContext';
import { analyzeBottleneck, calcBuildScore, getRecommendations, getUpgradeRoadmap } from '../utils/engine';
import { getAllComponents } from '../utils/db';
import { Shield, ShieldCheck, ShieldAlert, Cpu, MonitorPlay, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

function checkCompat(components) {
  const issues = [], warnings = [];
  const customs = Object.entries(components).filter(([, v]) => v?.isCustom);
  if (customs.length > 0) {
    warnings.push('بعض القطع مخصصة — تحقق من التوافق يدوياً');
  }
  if (components.cpu && components.motherboard && !components.cpu.isCustom && !components.motherboard.isCustom) {
    if (components.cpu.socket !== components.motherboard.socket)
      issues.push(`سوكت المعالج (${components.cpu.socket}) مو متوافق مع اللوحة (${components.motherboard.socket})`);
  }
  if (components.gpu && components.psu && !components.gpu.isCustom && !components.psu.isCustom) {
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
  const scoreLabel = score >= 80 ? 'ممتازة' : score >= 60 ? 'جيدة' : score >= 40 ? 'تحتاج تعديل' : 'ضعيفة';

  if (!components.cpu || !components.gpu) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-24 h-24 mx-auto rounded-full bg-gb-card border border-gb-border flex items-center justify-center mb-4">
              <TrendingUp size={36} className="text-gb-muted" />
            </div>
            <h2 className="font-display text-xl font-bold text-gb-text mb-2">التحليل الذكي</h2>
            <p className="text-gb-muted text-sm">اختر المعالج وكرت الشاشة لتحليل الأداء</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const cpuScore = components.cpu?.score || 0;
  const gpuScore = components.gpu?.score || 0;
  const maxScore = Math.max(cpuScore, gpuScore, 1);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-lg sm:text-2xl font-bold text-gb-text mb-6">التحليل الذكي</h1>

        {/* Score Circle — 200px with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 score-glow" style={{ '--glow-color': scoreColor + '60' }}>
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#1a1a2e" strokeWidth="6" />
              <motion.circle
                cx="60" cy="60" r="52" fill="none" stroke={scoreColor} strokeWidth="6"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 - (score / 100) * 2 * Math.PI * 52 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl sm:text-6xl font-display font-black" style={{ color: scoreColor }}>{score}</span>
              <span className="text-xs text-gb-muted mt-1">{scoreLabel}</span>
            </div>
          </div>
        </motion.div>

        {/* 3 Stat Boxes */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gb-card rounded-xl border border-gb-border p-3 sm:p-4 text-center"
          >
            <Cpu size={20} className="text-gb-primary mx-auto mb-2" />
            <p className="text-lg sm:text-xl font-display font-bold text-gb-text">{cpuScore}</p>
            <p className="text-[10px] text-gb-muted">Gaming</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gb-card rounded-xl border border-gb-border p-3 sm:p-4 text-center"
          >
            <MonitorPlay size={20} className="text-gb-secondary mx-auto mb-2" />
            <p className="text-lg sm:text-xl font-display font-bold text-gb-text">{gpuScore}</p>
            <p className="text-[10px] text-gb-muted">Productivity</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gb-card rounded-xl border border-gb-border p-3 sm:p-4 text-center"
          >
            <Zap size={20} className="text-yellow-400 mx-auto mb-2" />
            <p className="text-lg sm:text-xl font-display font-bold text-gb-text">
              {(components.cpu?.tdp || 0) + (components.gpu?.tdp || 0)}W
            </p>
            <p className="text-[10px] text-gb-muted">Power</p>
          </motion.div>
        </div>

        {/* CPU vs GPU Balance Bars */}
        {components.cpu && components.gpu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gb-card rounded-xl border border-gb-border p-4 sm:p-5 mb-4"
          >
            <h3 className="font-bold text-gb-text text-sm mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-gb-primary" />
              توازن القطع
            </h3>
            {/* CPU bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gb-text font-medium">CPU — {components.cpu.name}</span>
                <span className="text-xs font-display text-gb-primary font-bold">{cpuScore}/100</span>
              </div>
              <div className="h-3 rounded-full bg-gb-bg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cpuScore}%` }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-gb-primary to-gb-primary/60"
                />
              </div>
            </div>
            {/* GPU bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gb-text font-medium">GPU — {components.gpu.name}</span>
                <span className="text-xs font-display text-gb-secondary font-bold">{gpuScore}/100</span>
              </div>
              <div className="h-3 rounded-full bg-gb-bg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${gpuScore}%` }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="h-full rounded-full bg-gradient-to-r from-gb-secondary to-gb-secondary/60"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottleneck */}
        {bn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`rounded-xl p-4 sm:p-5 mb-4 border ${
              bn.severity === 'good'
                ? 'bg-green-500/5 border-green-500/20'
                : bn.severity === 'warn'
                ? 'bg-yellow-500/5 border-yellow-500/20'
                : 'bg-red-500/5 border-red-500/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                style={{ backgroundColor: (bn.severity === 'good' ? '#00e676' : bn.severity === 'warn' ? '#ffd740' : '#ff5252') + '15' }}>
                {bn.severity === 'good' ? '✅' : '⚠️'}
              </span>
              <span className="font-bold text-sm" style={{ color: bn.severity === 'good' ? '#00e676' : bn.severity === 'warn' ? '#ffd740' : '#ff5252' }}>
                {bn.label}
              </span>
            </div>
            <p className="text-xs text-gb-muted mb-3">{bn.msg}</p>
            <div className="h-2.5 rounded-full bg-gb-surface overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(bn.pct * 2.5, 100)}%` }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="h-full rounded-full"
                style={{ backgroundColor: bn.severity === 'good' ? '#00e676' : bn.severity === 'warn' ? '#ffd740' : '#ff5252' }}
              />
            </div>
          </motion.div>
        )}

        {/* Recommendations — colored left border */}
        {recs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gb-card rounded-xl border border-gb-border p-4 sm:p-5 mb-4"
          >
            <h3 className="font-bold text-gb-text text-sm mb-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gb-primary/10 flex items-center justify-center">
                <TrendingUp size={16} className="text-gb-primary" />
              </div>
              التوصيات
            </h3>
            <div className="space-y-2">
              {recs.map((r, i) => {
                const borderColor = r.type === 'warning' ? 'border-l-yellow-500' : r.type === 'error' ? 'border-l-red-500' : 'border-l-gb-primary';
                return (
                  <div key={i} className={`flex items-center gap-3 p-3 bg-gb-surface rounded-xl text-sm border-l-[3px] ${borderColor}`}>
                    <span className="text-lg shrink-0">{r.icon}</span>
                    <span className="text-gb-text text-xs sm:text-sm">{r.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gb-card rounded-xl border border-gb-border p-4 sm:p-5 mb-4"
        >
          <h3 className="font-bold text-gb-text text-sm mb-3 flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-400" />
            التوافق
          </h3>
          <div className="space-y-2">
            {compatResult.issues.map((e, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-red-500/5 rounded-xl text-xs sm:text-sm text-red-400 border-l-[3px] border-l-red-500">
                <ShieldAlert size={16} className="shrink-0 mt-0.5" /> {e}
              </div>
            ))}
            {compatResult.warnings.map((w, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-yellow-500/5 rounded-xl text-xs sm:text-sm text-yellow-400 border-l-[3px] border-l-yellow-500">
                <Shield size={16} className="shrink-0 mt-0.5" /> {w}
              </div>
            ))}
            {compatResult.issues.length === 0 && compatResult.warnings.length === 0 && (
              <div className="flex items-center gap-2 p-3 bg-green-500/5 rounded-xl text-xs sm:text-sm text-green-400">
                <ShieldCheck size={16} /> كل القطع متوافقة
              </div>
            )}
          </div>
        </motion.div>

        {/* Upgrade Roadmap */}
        {roadmap.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gb-card rounded-xl border border-gb-border p-4 sm:p-5"
          >
            <h3 className="font-bold text-gb-text text-sm mb-1 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <TrendingUp size={16} className="text-orange-400" />
              </div>
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
          </motion.div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useBuild } from '../hooks/BuildContext';
import { analyzeBottleneck, calcBuildScore, getRecommendations, getUpgradeRoadmap, getGamingCpuScore, severityColor, getSmartDowngrades, calcFutureProof } from '../utils/engine';
import { calcThermalHarmony } from '../utils/thermal';
import { getAllComponents } from '../utils/db';
import { Shield, ShieldCheck, ShieldAlert, Cpu, MonitorPlay, Zap, TrendingUp, Monitor, Thermometer, ArrowDownCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import GaugeMeter from '../components/GaugeMeter';

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

const resolutions = [
  { key: '1080p', label: '1080p', desc: 'Full HD' },
  { key: '1440p', label: '1440p', desc: 'QHD' },
  { key: '4K', label: '4K', desc: 'Ultra HD' },
];

export default function AnalysisPage() {
  const { components, selectedCount } = useBuild();
  const [resolution, setResolution] = useState('1080p');

  const bn = analyzeBottleneck(components.cpu, components.gpu, resolution);
  const compatResult = checkCompat(components);
  const score = calcBuildScore(components, compatResult, bn);
  const recs = getRecommendations(components);
  const allComps = getAllComponents();
  const roadmap = getUpgradeRoadmap(components, allComps);
  const thermal = calcThermalHarmony(components);
  const downgradesSugg = getSmartDowngrades(components, allComps);
  const futureProof = calcFutureProof(components);

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

  const gamingCpu = getGamingCpuScore(components.cpu);
  const gpuScore = components.gpu?.score || 0;
  const bnColor = severityColor(bn?.severity);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-lg sm:text-2xl font-bold text-gb-text mb-4">التحليل الذكي</h1>

        {/* Resolution Selector */}
        <div className="flex items-center justify-center gap-1 p-1 bg-gb-card rounded-xl border border-gb-border mb-6">
          {resolutions.map(r => (
            <button
              key={r.key}
              onClick={() => setResolution(r.key)}
              className={`flex-1 flex flex-col items-center py-2.5 rounded-lg text-center transition-all active:scale-95 ${
                resolution === r.key
                  ? 'bg-gb-primary/15 border border-gb-primary/30 text-gb-primary'
                  : 'text-gb-muted hover:text-gb-text'
              }`}
            >
              <span className="text-sm font-bold">{r.label}</span>
              <span className="text-[9px] opacity-60">{r.desc}</span>
            </button>
          ))}
        </div>

        {/* ── GaugeMeter Score ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <GaugeMeter value={score} label={scoreLabel} color={scoreColor} size={200} />
        </motion.div>

        {/* 3 Stat Boxes */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gb-card rounded-xl border border-gb-border p-3 text-center"
          >
            <Cpu size={18} className="text-gb-primary mx-auto mb-1.5" />
            <p className="text-lg font-display font-bold text-gb-text">{gamingCpu}</p>
            <p className="text-[10px] text-gb-muted">CPU Gaming</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gb-card rounded-xl border border-gb-border p-3 text-center"
          >
            <MonitorPlay size={18} className="text-gb-secondary mx-auto mb-1.5" />
            <p className="text-lg font-display font-bold text-gb-text">{gpuScore}</p>
            <p className="text-[10px] text-gb-muted">GPU</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gb-card rounded-xl border border-gb-border p-3 text-center"
          >
            <Zap size={18} className="text-yellow-400 mx-auto mb-1.5" />
            <p className="text-lg font-display font-bold text-gb-text">
              {(components.cpu?.tdp || 0) + (components.gpu?.tdp || 0)}W
            </p>
            <p className="text-[10px] text-gb-muted">Power</p>
          </motion.div>
        </div>

        {/* CPU vs GPU Balance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gb-card rounded-xl border border-gb-border p-4 mb-4"
        >
          <h3 className="font-bold text-gb-text text-sm mb-3 flex items-center gap-2">
            <TrendingUp size={15} className="text-gb-primary" />
            توازن القطع
          </h3>
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-gb-text font-medium truncate max-w-[70%]">CPU — {components.cpu.name}</span>
              <span className="text-[11px] font-display text-gb-primary font-bold">{gamingCpu}/100</span>
            </div>
            <div className="h-2.5 rounded-full bg-gb-bg overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${gamingCpu}%` }} transition={{ duration: 0.8, delay: 0.6 }}
                className="h-full rounded-full bg-gradient-to-r from-gb-primary to-gb-primary/60" />
            </div>
          </div>
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-gb-text font-medium truncate max-w-[70%]">GPU — {components.gpu.name}</span>
              <span className="text-[11px] font-display text-gb-secondary font-bold">{gpuScore}/100</span>
            </div>
            <div className="h-2.5 rounded-full bg-gb-bg overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${gpuScore}%` }} transition={{ duration: 0.8, delay: 0.7 }}
                className="h-full rounded-full bg-gradient-to-r from-gb-secondary to-gb-secondary/60" />
            </div>
          </div>
          <p className="text-[10px] text-gb-muted/60 flex items-center gap-1 mt-1">
            <Monitor size={10} />
            في {resolution} {resolution === '4K' ? 'الكرت يشتغل أكثر' : resolution === '1080p' ? 'المعالج يشتغل أكثر' : 'التوزيع متوازن بينهم'}
          </p>
        </motion.div>

        {/* Bottleneck */}
        {bn && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`rounded-xl p-4 mb-4 border ${
              bn.severity === 'none' ? 'bg-green-500/5 border-green-500/20'
              : bn.severity === 'minor' ? 'bg-yellow-500/5 border-yellow-500/20'
              : bn.severity === 'moderate' ? 'bg-orange-500/5 border-orange-500/20'
              : 'bg-red-500/5 border-red-500/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: bnColor + '15' }}>
                {bn.severity === 'none' ? '✅' : bn.severity === 'minor' ? '🟡' : '⚠️'}
              </span>
              <span className="font-bold text-sm" style={{ color: bnColor }}>
                {bn.severity === 'none' ? 'متوازنة ✓' : bn.severity === 'minor' ? 'بوتلنك بسيط' : bn.severity === 'moderate' ? `بوتلنك: ${bn.limitingComponent}` : `بوتلنك شديد: ${bn.limitingComponent}`}
              </span>
              {bn.percent > 0 && (
                <span className="text-[10px] font-display font-bold mr-auto" style={{ color: bnColor }}>{bn.percent}%</span>
              )}
            </div>
            <p className="text-xs text-gb-muted mb-2">{bn.description}</p>
            {bn.percent > 0 && (
              <div className="h-2 rounded-full bg-gb-surface overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(bn.percent * 1.5, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.7 }} className="h-full rounded-full" style={{ backgroundColor: bnColor }} />
              </div>
            )}
          </motion.div>
        )}

        {/* ── INNOVATION CARDS ── */}

        {/* Thermal Harmony */}
        {thermal && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="bg-gb-card rounded-xl border border-gb-border p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gb-text text-sm flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Thermometer size={14} className="text-orange-400" />
                </div>
                الحرارة والصوت
              </h3>
              <span className="text-xs font-display font-bold" style={{ color: thermal.color }}>
                {thermal.score}/100
              </span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <div className="h-2 rounded-full bg-gb-bg overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${thermal.score}%` }}
                    transition={{ duration: 0.8 }} className="h-full rounded-full" style={{ backgroundColor: thermal.color }} />
                </div>
              </div>
              <span className="text-[11px] font-bold" style={{ color: thermal.color }}>{thermal.label}</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] text-gb-muted">🔥 {thermal.totalHeat}W حرارة</span>
              <span className="text-[10px] text-gb-muted">🔊 {thermal.noiseLabel}</span>
            </div>
            {thermal.issues.length > 0 && (
              <div className="space-y-1 mt-2">
                {thermal.issues.map((issue, i) => (
                  <p key={i} className="text-[11px] text-red-400 flex items-center gap-1">⚠️ {issue}</p>
                ))}
              </div>
            )}
            {thermal.tips.length > 0 && thermal.issues.length === 0 && (
              <p className="text-[10px] text-gb-muted mt-1">💡 {thermal.tips[0]}</p>
            )}
          </motion.div>
        )}

        {/* Future-Proof Score */}
        {futureProof && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gb-card rounded-xl border border-gb-border p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gb-text text-sm flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Clock size={14} className="text-purple-400" />
                </div>
                جاهزية المستقبل
              </h3>
              <span className="text-xs font-display font-bold" style={{ color: futureProof.score >= 70 ? '#00e676' : futureProof.score >= 45 ? '#ffd740' : '#ff5252' }}>
                {futureProof.score}/100
              </span>
            </div>
            <div className="h-2 rounded-full bg-gb-bg overflow-hidden mb-2">
              <motion.div initial={{ width: 0 }} animate={{ width: `${futureProof.score}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full"
                style={{ backgroundColor: futureProof.score >= 70 ? '#00e676' : futureProof.score >= 45 ? '#ffd740' : '#ff5252' }} />
            </div>
            <p className="text-[11px] text-gb-muted">{futureProof.description}</p>
          </motion.div>
        )}

        {/* Smart Downgrade Suggestions */}
        {downgradesSugg.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="bg-gb-card rounded-xl border border-gb-border p-4 mb-4"
          >
            <h3 className="font-bold text-gb-text text-sm mb-3 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center">
                <ArrowDownCircle size={14} className="text-green-400" />
              </div>
              وفّر فلوسك
            </h3>
            <div className="space-y-3">
              {downgradesSugg.map((s, i) => (
                <div key={i} className="bg-gb-surface rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-gb-muted">{s.type === 'gpu' ? 'كرت الشاشة' : s.type === 'cpu' ? 'المعالج' : 'الباور'}</span>
                    <span className="text-xs font-display font-bold text-green-400">وفّر {s.saving.toLocaleString()} ر.س</span>
                  </div>
                  <p className="text-[11px] text-gb-text font-bold mb-0.5">{s.current.name} → {s.suggested.name}</p>
                  <p className="text-[10px] text-gb-muted">{s.reason}</p>
                  {s.perfLoss > 0 && (
                    <p className="text-[10px] text-yellow-400 mt-1">-{s.perfLoss}% أداء</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recommendations */}
        {recs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gb-card rounded-xl border border-gb-border p-4 mb-4"
          >
            <h3 className="font-bold text-gb-text text-sm mb-3 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gb-primary/10 flex items-center justify-center">
                <TrendingUp size={14} className="text-gb-primary" />
              </div>
              التوصيات
            </h3>
            <div className="space-y-2">
              {recs.map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-gb-surface rounded-xl text-sm border-l-[3px] border-l-gb-primary">
                  <span className="text-base shrink-0">{r.icon}</span>
                  <span className="text-gb-text text-xs">{r.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="bg-gb-card rounded-xl border border-gb-border p-4 mb-4"
        >
          <h3 className="font-bold text-gb-text text-sm mb-3 flex items-center gap-2">
            <ShieldCheck size={15} className="text-green-400" />
            التوافق
          </h3>
          <div className="space-y-2">
            {compatResult.issues.map((e, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 bg-red-500/5 rounded-xl text-xs text-red-400 border-l-[3px] border-l-red-500">
                <ShieldAlert size={14} className="shrink-0 mt-0.5" /> {e}
              </div>
            ))}
            {compatResult.warnings.map((w, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 bg-yellow-500/5 rounded-xl text-xs text-yellow-400 border-l-[3px] border-l-yellow-500">
                <Shield size={14} className="shrink-0 mt-0.5" /> {w}
              </div>
            ))}
            {compatResult.issues.length === 0 && compatResult.warnings.length === 0 && (
              <div className="flex items-center gap-2 p-2.5 bg-green-500/5 rounded-xl text-xs text-green-400">
                <ShieldCheck size={14} /> كل القطع متوافقة
              </div>
            )}
          </div>
        </motion.div>

        {/* Upgrade Roadmap */}
        {roadmap.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gb-card rounded-xl border border-gb-border p-4"
          >
            <h3 className="font-bold text-gb-text text-sm mb-1 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <TrendingUp size={14} className="text-orange-400" />
              </div>
              وش أرقّي أول؟
            </h3>
            <p className="text-[10px] text-gb-muted mb-3">تحليل ذكي مرتب حسب الأولوية</p>

            <div className="space-y-3">
              {roadmap.map((item, idx) => (
                <div key={idx} className={`rounded-xl border p-3.5 ${idx === 0 ? 'border-gb-primary/30 bg-gb-primary/5' : 'border-gb-border bg-gb-surface'}`}>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <div>
                        <p className="font-bold text-xs text-gb-text">{item.label}</p>
                        <p className="text-[10px] text-gb-muted">الحالي: {item.current.name}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${idx === 0 ? 'bg-gb-primary/15 text-gb-primary' : 'bg-gb-secondary/15 text-gb-secondary'}`}>
                      أولوية {item.priority}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {item.options.map((opt, oi) => (
                      <div key={oi} className="bg-gb-bg/50 rounded-lg p-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-gb-secondary/15 text-gb-secondary font-bold">{opt.tag}</span>
                          <span className="text-[11px] font-display font-bold text-green-400">+{opt.gain} أداء</span>
                        </div>
                        <p className="text-xs font-bold text-gb-text mt-1">{opt.part.name}</p>
                        <p className="text-[11px] text-gb-primary font-bold mt-0.5">{opt.part.price?.toLocaleString()} ر.س</p>
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

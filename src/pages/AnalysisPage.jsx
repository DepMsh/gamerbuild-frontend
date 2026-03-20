import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBuild } from '../hooks/BuildContext';
import { track } from '../utils/analytics';
import usePageTitle from '../hooks/usePageTitle';
import { analyzeBottleneck, calcBuildScore, getRecommendations, getUpgradeRoadmap, getGamingCpuScore, severityColor, getSmartDowngrades, calcFutureProof, GAMES, predictFPS } from '../utils/engine';
import { calcThermalHarmony } from '../utils/thermal';
import { getAllComponents, estimateWattage } from '../utils/db';
import { Shield, ShieldCheck, ShieldAlert, Cpu, MonitorPlay, Zap, TrendingUp, Monitor, Thermometer, ArrowDownCircle, Clock, ChevronDown, Wrench, Gamepad2, MemoryStick, HardDrive, Fan, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GaugeMeter from '../components/GaugeMeter';

function getBottleneckColor(v) {
  if (v <= 5) return '#00e676';
  if (v <= 15) return '#ffc107';
  if (v <= 25) return '#ff9800';
  return '#f44336';
}

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

// Gulf popularity order: competitive first, then AAA heavy
const GAME_ORDER = [
  'Valorant', 'Fortnite', 'CS2', 'Apex Legends',
  'League of Legends', 'COD MW3', 'FC 25', 'Rainbow Six Siege',
  'GTA VI', 'Cyberpunk 2077', 'Black Myth Wukong', 'Marvel Rivals',
  'Elden Ring', 'Red Dead 2', 'Hogwarts Legacy', 'Wuthering Waves', 'Minecraft Shaders',
];

const orderedGames = GAME_ORDER
  .map(name => GAMES.find(g => g.name === name))
  .filter(Boolean)
  .concat(GAMES.filter(g => !GAME_ORDER.includes(g.name)));

function fpsInfo(fps) {
  if (fps >= 144) return { color: '#00e676', label: 'سلس جداً' };
  if (fps >= 60)  return { color: '#ffc107', label: 'ممتاز' };
  if (fps >= 30)  return { color: '#ff9800', label: 'مقبول' };
  return { color: '#f44336', label: 'ضعيف' };
}

const tierLabels = { budget: 'اقتصادي', 'mid-range': 'متوسط', 'high-end': 'عالي', enthusiast: 'خرافي' };

export default function AnalysisPage() {
  usePageTitle('تحليل التجميعة');
  const { components, selectedCount } = useBuild();
  const [resolution, setResolution] = useState('1080p');
  useEffect(() => {
    if (components.cpu && components.gpu) {
      track.viewAnalysis();
      track.viewFPS();
    }
  }, []);
  const [openCards, setOpenCards] = useState({ thermal: true, future: true, downgrade: true });
  const toggleCard = (key) => setOpenCards(prev => ({ ...prev, [key]: !prev[key] }));

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
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center py-14">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <GaugeMeter value={12} label="مثال" sublabel="اختر قطعك أولاً" size={160} />
            <h2 className="font-display text-xl font-bold text-gb-text mb-2 mt-4">🔬 شوف قوة تجميعتك</h2>
            <p className="text-gb-muted text-sm mb-6">اختر المعالج وكرت الشاشة عشان نحلل الأداء والتوافق وتوقع FPS لـ 17 لعبة</p>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-l from-gb-primary to-gb-secondary text-gb-bg font-bold text-sm shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.35)] transition-all active:scale-95"
            >
              <Wrench size={16} />
              روح للتجميع
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const gamingCpu = getGamingCpuScore(components.cpu);
  const gpuScore = components.gpu?.score || 0;
  const bnColor = severityColor(bn?.severity);
  const fpsRes = resolution === '4K' ? '4k' : resolution;
  const estimatedWatts = estimateWattage(components);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-2xl lg:max-w-4xl mx-auto">
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

        {/* ── Bottleneck GaugeMeter ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-6"
        >
          <GaugeMeter
            value={bn?.percent || 0}
            size={220}
            sublabel={
              (bn?.percent || 0) <= 5 ? 'توازن مثالي ⚡'
              : (bn?.percent || 0) <= 15 ? 'اختناق بسيط ⚠️'
              : (bn?.percent || 0) <= 25 ? 'اختناق ملحوظ 🔶'
              : 'اختناق حاد ❌'
            }
          />
          {/* CPU vs GPU bar */}
          {(() => {
            const total = gamingCpu + gpuScore;
            const cpuPct = total > 0 ? Math.round((gamingCpu / total) * 100) : 50;
            const gpuPct = 100 - cpuPct;
            return (
              <div className="w-full max-w-sm mx-auto mt-4">
                <div className="flex justify-between text-xs text-white/50 mb-1">
                  <span>CPU {cpuPct}%</span>
                  <span>GPU {gpuPct}%</span>
                </div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 transition-all duration-700" style={{ width: `${cpuPct}%` }} />
                  <div className="bg-cyan-400 transition-all duration-700" style={{ width: `${gpuPct}%` }} />
                </div>
              </div>
            );
          })()}
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

        {/* CPU vs GPU Unified Balance Bar */}
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
          {/* Unified CPU/GPU bar */}
          {(() => {
            const total = gamingCpu + gpuScore;
            const cpuPct = total > 0 ? Math.round((gamingCpu / total) * 100) : 50;
            const gpuPct = 100 - cpuPct;
            return (
              <>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-purple-400 font-bold flex items-center gap-1"><Cpu size={11} /> CPU {gamingCpu}</span>
                  <span className="text-[11px] text-cyan-400 font-bold flex items-center gap-1">GPU {gpuScore} <MonitorPlay size={11} /></span>
                </div>
                <div className="h-3.5 rounded-full bg-gb-bg overflow-hidden flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cpuPct}%` }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                    style={{ borderRadius: '9999px 0 0 9999px' }}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${gpuPct}%` }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500"
                    style={{ borderRadius: '0 9999px 9999px 0' }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-gb-muted truncate max-w-[45%]">{components.cpu.name}</span>
                  <span className="text-[10px] text-gb-muted truncate max-w-[45%] text-left">{components.gpu.name}</span>
                </div>
              </>
            );
          })()}
          <p className="text-[10px] text-gb-muted/60 flex items-center gap-1 mt-2">
            <Monitor size={10} />
            في {resolution} {resolution === '4K' ? 'الكرت يشتغل أكثر' : resolution === '1080p' ? 'المعالج يشتغل أكثر' : 'التوزيع متوازن بينهم'}
          </p>
        </motion.div>

        {/* Bottleneck */}
        {bn && (() => {
          const bnDynamicColor = getBottleneckColor(bn.percent);
          return (
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
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: bnDynamicColor + '15' }}>
                  {bn.severity === 'none' ? '✅' : bn.severity === 'minor' ? '🟡' : '⚠️'}
                </span>
                <span className="font-bold text-sm" style={{ color: bnDynamicColor }}>
                  {bn.severity === 'none' ? 'متوازنة ✓' : bn.severity === 'minor' ? 'بوتلنك بسيط' : bn.severity === 'moderate' ? `بوتلنك: ${bn.limitingComponent}` : `بوتلنك شديد: ${bn.limitingComponent}`}
                </span>
                {bn.percent > 0 && (
                  <span className="text-[10px] font-display font-bold mr-auto" style={{ color: bnDynamicColor }}>{bn.percent}%</span>
                )}
              </div>
              <p className="text-xs text-gb-muted mb-2">{bn.description}</p>
              {bn.percent > 0 && (
                <div className="h-2 rounded-full bg-gb-surface overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(bn.percent * 1.5, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.7 }} className="h-full rounded-full" style={{ backgroundColor: bnDynamicColor }} />
                </div>
              )}
              {bn.percent > 15 && bn.limitingComponent && (
                <div className="mt-3 p-2.5 rounded-lg bg-gb-bg/50 border border-gb-border/50">
                  <p className="text-[11px] font-bold" style={{ color: bnDynamicColor }}>
                    💡 {bn.limitingComponent === 'CPU' ? 'ترقية المعالج بتعطيك فرق كبير — الكرت أقوى من اللازم' : 'ترقية كرت الشاشة بتعطيك فرق كبير — المعالج أقوى من اللازم'}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })()}

        {/* ══════════ NEW SECTIONS ══════════ */}

        {/* ── FPS Per Game ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-gb-card rounded-xl border border-gb-border p-4 mb-4"
        >
          <h3 className="font-bold text-gb-text text-sm mb-1 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Gamepad2 size={14} className="text-emerald-400" />
            </div>
            🎮 أداء الألعاب
          </h3>
          <p className="text-[10px] text-gb-muted mb-4">
            توقع FPS بناءً على {components.cpu.name.split(' ').slice(0, 3).join(' ')} + {components.gpu.name.split(' ').slice(0, 4).join(' ')} — {resolution}
          </p>

          <div className="lg:grid lg:grid-cols-2 lg:gap-3">
            {orderedGames.map((game, gi) => {
              const results = predictFPS(components, game);
              if (!results) return null;
              const data = results[fpsRes];
              if (!data) return null;
              const fps = data.fps;
              const info = fpsInfo(fps);
              const barWidth = Math.min(100, (fps / 240) * 100);

              return (
                <motion.div
                  key={game.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + gi * 0.03 }}
                  className="bg-gb-bg/50 border border-gb-border/50 rounded-xl p-3.5 mb-2.5 lg:mb-0"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-white/90">{game.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: info.color + '20', color: info.color }}>
                      {info.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${barWidth}%`, background: info.color }}
                      />
                    </div>
                    <span className="text-lg font-bold font-mono min-w-[60px] text-left" style={{ color: info.color }}>
                      {fps} <span className="text-[10px] text-white/30">FPS</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* All Resolutions Summary Table */}
          <div className="mt-4">
            <h4 className="text-xs font-bold text-gb-muted mb-2">ملخص كل الدقات</h4>
            <div className="bg-gb-bg/50 rounded-xl border border-gb-border/50 overflow-hidden">
              <div className="grid grid-cols-4 text-[10px] text-gb-muted font-bold px-3 py-2 border-b border-gb-border/50 bg-gb-surface/30">
                <span>اللعبة</span>
                <span className="text-center">1080p</span>
                <span className="text-center">1440p</span>
                <span className="text-center">4K</span>
              </div>
              {orderedGames.map((game) => {
                const results = predictFPS(components, game);
                if (!results) return null;
                return (
                  <div key={game.name} className="grid grid-cols-4 text-[11px] px-3 py-2 border-b border-gb-border/30 last:border-0">
                    <span className="text-gb-text font-medium truncate pr-2">{game.name}</span>
                    {['1080p', '1440p', '4k'].map(res => {
                      const d = results[res];
                      if (!d) return <span key={res} className="text-center text-gb-muted">—</span>;
                      const c = fpsInfo(d.fps);
                      return (
                        <span key={res} className="text-center font-display font-bold" style={{ color: c.color }}>
                          {d.fps >= 120 ? '120+' : d.fps}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-center text-[10px] text-gb-muted/60 mt-3">
            * التوقعات مبنية على بنشماركات حقيقية (Ultra settings) — الأداء الفعلي يختلف حسب الإعدادات
          </p>
        </motion.div>

        {/* ── CPU Specs Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.70 }}
          className="bg-gb-card rounded-xl border border-gb-border p-4 mb-4"
        >
          <h3 className="font-bold text-gb-text text-sm mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Cpu size={14} className="text-purple-400" />
            </div>
            📊 مواصفات المعالج
          </h3>
          <div className="space-y-0">
            {[
              { label: 'المعالج', value: components.cpu.name },
              { label: 'السوكت', value: components.cpu.socket },
              { label: 'الأنوية / الخيوط', value: `${components.cpu.cores} / ${components.cpu.threads}` },
              { label: 'التردد', value: `${components.cpu.baseClock} — ${components.cpu.boostClock} GHz` },
              { label: 'TDP', value: `${components.cpu.tdp}W` },
              { label: 'تصنيف القيمنق', value: `${gamingCpu}/100`, color: gamingCpu >= 75 ? '#00e676' : gamingCpu >= 50 ? '#ffd740' : '#ff5252' },
              { label: 'الفئة', value: tierLabels[components.cpu.tier] || components.cpu.tier },
            ].map((row, i) => (
              <div key={i} className={`flex items-center justify-between py-2.5 px-1 ${i > 0 ? 'border-t border-gb-border/30' : ''}`}>
                <span className="text-[11px] text-gb-muted">{row.label}</span>
                <span className="text-[11px] font-bold text-left" style={row.color ? { color: row.color } : undefined}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── GPU Specs Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72 }}
          className="bg-gb-card rounded-xl border border-gb-border p-4 mb-4"
        >
          <h3 className="font-bold text-gb-text text-sm mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <MonitorPlay size={14} className="text-cyan-400" />
            </div>
            📊 مواصفات كرت الشاشة
          </h3>
          <div className="space-y-0">
            {[
              { label: 'كرت الشاشة', value: components.gpu.name },
              { label: 'الذاكرة', value: `${components.gpu.vram} GB` },
              { label: 'TDP', value: `${components.gpu.tdp}W` },
              { label: 'تصنيف الأداء', value: `${gpuScore}/100`, color: gpuScore >= 75 ? '#00e676' : gpuScore >= 50 ? '#ffd740' : '#ff5252' },
              { label: 'الفئة', value: tierLabels[components.gpu.tier] || components.gpu.tier },
            ].map((row, i) => (
              <div key={i} className={`flex items-center justify-between py-2.5 px-1 ${i > 0 ? 'border-t border-gb-border/30' : ''}`}>
                <span className="text-[11px] text-gb-muted">{row.label}</span>
                <span className="text-[11px] font-bold text-left" style={row.color ? { color: row.color } : undefined}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Power Breakdown ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.74 }}
          className="bg-gb-card rounded-xl border border-gb-border p-4 mb-4"
        >
          <h3 className="font-bold text-gb-text text-sm mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Zap size={14} className="text-yellow-400" />
            </div>
            ⚡ استهلاك الطاقة
          </h3>
          {(() => {
            const powerParts = [
              { label: 'المعالج', watts: components.cpu?.tdp || 125, icon: '🧠', color: '#a855f7' },
              { label: 'كرت الشاشة', watts: components.gpu?.tdp || 200, icon: '🎨', color: '#06b6d4' },
              { label: 'الرام', watts: components.ram ? 10 : 0, icon: '💾', color: '#3b82f6' },
              { label: 'التخزين', watts: components.ssd ? 10 : 0, icon: '💿', color: '#f97316' },
              { label: 'التبريد', watts: components.cooler ? 15 : 0, icon: '❄️', color: '#6366f1' },
              { label: 'القاعدة', watts: 50, icon: '🔌', color: '#6b7280' },
            ].filter(r => r.watts > 0);
            const rawTotal = powerParts.reduce((s, p) => s + p.watts, 0);

            return (
              <>
                {/* Stacked bar */}
                <div className="flex rounded-lg overflow-hidden h-5 mb-3">
                  {powerParts.map(p => (
                    <div
                      key={p.label}
                      className="transition-all duration-700 flex items-center justify-center"
                      style={{ width: `${(p.watts / rawTotal) * 100}%`, backgroundColor: p.color }}
                      title={`${p.label}: ${p.watts}W`}
                    >
                      {(p.watts / rawTotal) > 0.12 && (
                        <span className="text-[8px] text-white/80 font-bold">{p.watts}W</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Per-component breakdown */}
                <div className="space-y-2">
                  {powerParts.map(p => {
                    const pct = Math.round((p.watts / estimatedWatts) * 100);
                    return (
                      <div key={p.label}>
                        <div className="flex justify-between text-[10px] text-gb-muted mb-0.5">
                          <span>{p.icon} {p.label}</span>
                          <span className="font-bold text-gb-text">{p.watts}W</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gb-bg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: p.color + '99' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 pt-3 border-t border-gb-border/50 flex items-center justify-between">
                  <span className="text-[11px] text-gb-muted">الاستهلاك المقدّر (+20% هامش)</span>
                  <span className="text-sm font-display font-bold text-yellow-400">{estimatedWatts}W</span>
                </div>
                {components.psu && (
                  <p className={`text-[10px] mt-1.5 font-bold ${
                    components.psu.watt >= estimatedWatts ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {components.psu.watt >= estimatedWatts
                      ? `✓ الباور (${components.psu.watt}W) كافي`
                      : `⚠️ الباور (${components.psu.watt}W) أقل من المطلوب`
                    }
                  </p>
                )}
              </>
            );
          })()}
        </motion.div>

        {/* ══════════ EXISTING INNOVATION CARDS ══════════ */}

        {/* Thermal Harmony — collapsible */}
        {thermal && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78 }}
            className="bg-gb-card rounded-xl border border-gb-border mb-4 overflow-hidden"
          >
            <button onClick={() => toggleCard('thermal')} className="w-full flex items-center justify-between p-4">
              <h3 className="font-bold text-gb-text text-sm flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Thermometer size={14} className="text-orange-400" />
                </div>
                {thermal.emoji} الحرارة والصوت
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-display font-bold" style={{ color: thermal.color }}>
                  {thermal.score}/100
                </span>
                <ChevronDown size={16} className={`text-gb-muted transition-transform ${openCards.thermal ? 'rotate-180' : ''}`} />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {openCards.thermal && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
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
                      <span className="text-[10px] text-gb-muted">{thermal.noiseLabel}</span>
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Future-Proof Score — collapsible */}
        {futureProof && (() => {
          const fpColor = futureProof.score >= 70 ? '#00e676' : futureProof.score >= 45 ? '#ffd740' : '#ff5252';
          return (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.80 }}
              className="bg-gb-card rounded-xl border border-gb-border mb-4 overflow-hidden"
            >
              <button onClick={() => toggleCard('future')} className="w-full flex items-center justify-between p-4">
                <h3 className="font-bold text-gb-text text-sm flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Clock size={14} className="text-purple-400" />
                  </div>
                  🔮 جاهزية المستقبل
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-display font-bold" style={{ color: fpColor }}>
                    {futureProof.score}/100
                  </span>
                  <ChevronDown size={16} className={`text-gb-muted transition-transform ${openCards.future ? 'rotate-180' : ''}`} />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openCards.future && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <div className="h-2 rounded-full bg-gb-bg overflow-hidden mb-2">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${futureProof.score}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: fpColor }} />
                      </div>
                      <p className="text-[11px] text-gb-muted">{futureProof.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })()}

        {/* Smart Downgrade Suggestions — collapsible */}
        {downgradesSugg.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82 }}
            className="bg-gb-card rounded-xl border border-gb-border mb-4 overflow-hidden"
          >
            <button onClick={() => toggleCard('downgrade')} className="w-full flex items-center justify-between p-4">
              <h3 className="font-bold text-gb-text text-sm flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <ArrowDownCircle size={14} className="text-green-400" />
                </div>
                💰 وفّر فلوسك
              </h3>
              <ChevronDown size={16} className={`text-gb-muted transition-transform ${openCards.downgrade ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {openCards.downgrade && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3">
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
            </AnimatePresence>
          </motion.div>
        )}

        {/* Recommendations */}
        {recs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.84 }}
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

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBuild } from '../hooks/BuildContext';
import { track } from '../utils/analytics';
import usePageTitle from '../hooks/usePageTitle';
import { analyzeBottleneck, getRecommendations, getUpgradeRoadmap, getGamingCpuScore, getSmartDowngrades, calcFutureProof, GAMES, predictFPS } from '../utils/engine';
import { getAllComponents, estimateWattage, getById } from '../utils/db';
import { findCPUBenchmark } from '../data/cpuBenchmarks';
import { findGPUBenchmark } from '../data/gpuBenchmarks';
import { Shield, ShieldCheck, ShieldAlert, Cpu, MonitorPlay, Zap, TrendingUp, Monitor, ArrowDownCircle, Clock, ChevronDown, Wrench, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function getBalanceStatus(cpuScore, gpuPercent, resolution, isFlagshipCPU, isFlagshipGPU) {
  if (isFlagshipCPU && isFlagshipGPU) {
    return {
      color: 'green', icon: '✅',
      title: 'متوازنة',
      subtitle: 'أقوى قطع متوفرة — أداء بلا حدود',
      tip: null,
    };
  }

  if (resolution === '4K') {
    if (gpuPercent >= 70) return { color: 'green', icon: '✅', title: 'ممتازة لـ 4K', subtitle: 'كرت الشاشة قوي كفاية لدقة 4K', tip: 'في 4K الاعتماد الأكبر على كرت الشاشة — المعالج تأثيره محدود' };
    if (gpuPercent >= 45) return { color: 'yellow', icon: '🟡', title: 'مقبولة لـ 4K', subtitle: 'بعض الألعاب الثقيلة ممكن تحتاج تنزل الإعدادات', tip: 'ترقية كرت الشاشة بتعطي أكبر فرق على 4K' };
    return { color: 'red', icon: '🔴', title: 'كرت الشاشة ضعيف لـ 4K', subtitle: 'ننصح بدقة 1440p لتجربة أفضل', tip: 'هالكرت مصمم لـ 1080p/1440p — مو لـ 4K' };
  }

  if (resolution === '1440p') {
    if (gpuPercent >= 55 && cpuScore >= 60) return { color: 'green', icon: '✅', title: 'ممتازة لـ 1440p', subtitle: 'القطع متوازنة — أفضل تجربة قيمنق', tip: null };
    if (gpuPercent < 45) return { color: 'yellow', icon: '🟡', title: 'الكرت محدود على 1440p', subtitle: 'ممكن تحتاج تنزل بعض الإعدادات في الألعاب الثقيلة', tip: 'ترقية كرت الشاشة بتعطي فرق واضح' };
    if (cpuScore < 55) return { color: 'yellow', icon: '🟡', title: 'المعالج يحد من الأداء قليلاً', subtitle: 'الكرت أقوى من المعالج — ما بتستفيد من كامل قوته', tip: 'ترقية المعالج بتفتح كامل إمكانيات الكرت' };
    return { color: 'green', icon: '✅', title: 'جيدة لـ 1440p', subtitle: 'تجربة لعب سلسة في معظم الألعاب', tip: null };
  }

  // 1080p
  if (cpuScore >= 70 && gpuPercent >= 50) return { color: 'green', icon: '✅', title: 'ممتازة لـ 1080p', subtitle: 'FPS عالي ومستقر في كل الألعاب', tip: 'على 1080p المعالج يأثر أكثر من الكرت' };
  if (cpuScore < 55 && gpuPercent >= 60) return { color: 'yellow', icon: '🟡', title: 'المعالج يحد من الأداء', subtitle: 'كرت الشاشة أقوى بكثير من المعالج', tip: 'على 1080p المعالج مهم جداً — فكّر بترقيته أو ارفع الدقة لـ 1440p' };
  if (gpuPercent < 40) return { color: 'yellow', icon: '🟡', title: 'كرت الشاشة ضعيف', subtitle: 'ما بتوصل لـ FPS عالي حتى على 1080p', tip: 'ترقية كرت الشاشة أولوية' };
  return { color: 'green', icon: '✅', title: 'جيدة لـ 1080p', subtitle: 'أداء جيد في معظم الألعاب', tip: null };
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

const FEATURED_PRESETS = [
  { id: 'budget', name: 'اقتصادية', subtitle: '1080p سلس', cpuId: 'cpu-43', gpuId: 'gpu-116', priceRange: '٣-٥ آلاف', res: '1080p' },
  { id: 'mid', name: 'متوسطة', subtitle: '1440p Ultra', cpuId: 'cpu-21', gpuId: 'gpu-343', priceRange: '٦-٨ آلاف', res: '1440p' },
  { id: 'beast', name: 'خرافية', subtitle: '4K Ultra', cpuId: 'cpu-3', gpuId: 'gpu-230', priceRange: '١٢ ألف+', res: '1080p' },
];
const PREVIEW_GAME_NAMES = ['Valorant', 'Fortnite', 'Cyberpunk 2077'];

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
  const [openCards, setOpenCards] = useState({ future: true, downgrade: true });
  const toggleCard = (key) => setOpenCards(prev => ({ ...prev, [key]: !prev[key] }));
  const [showUpgrades, setShowUpgrades] = useState(false);

  // Preview data for empty state — computed once
  const previewData = useMemo(() => {
    const previewGames = PREVIEW_GAME_NAMES.map(n => GAMES.find(g => g.name === n)).filter(Boolean);
    return FEATURED_PRESETS.map(preset => {
      const cpu = getById(preset.cpuId);
      const gpu = getById(preset.gpuId);
      if (!cpu || !gpu) return { ...preset, cpu: null, gpu: null, fps: {} };
      const fps = {};
      const resKey = preset.res === '4K' ? '4k' : preset.res;
      previewGames.forEach(game => {
        const result = predictFPS({ cpu, gpu }, game);
        fps[game.name] = Math.round(result?.[resKey]?.fps || 0);
      });
      return { ...preset, cpu, gpu, fps };
    });
  }, []);

  const bn = analyzeBottleneck(components.cpu, components.gpu, resolution);
  const compatResult = checkCompat(components);
  const recs = getRecommendations(components);
  const allComps = getAllComponents();
  const roadmap = getUpgradeRoadmap(components, allComps);
  const downgradesSugg = getSmartDowngrades(components, allComps);
  const futureProof = calcFutureProof(components);

  if (!components.cpu || !components.gpu) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center py-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gb-text mb-2">🔬 تحليل التجميعة</h1>
            <p className="text-gb-muted text-sm">اختر تجميعة جاهزة وشوف تحليلها الكامل — أو ابنِ تجميعتك</p>
          </div>

          {/* Featured builds grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            {previewData.map(build => (
              <Link
                key={build.id}
                to={`/builder?preset=${build.id}`}
                className="bg-gb-card/60 border border-white/[0.06] hover:border-gb-primary/30 rounded-2xl p-5 text-right transition-all hover:bg-gb-primary/5 hover:scale-[1.02] hover:-translate-y-0.5 group"
              >
                {/* Build name + subtitle */}
                <div className="mb-4">
                  <h3 className="text-lg font-display font-bold text-gb-text group-hover:text-gb-primary transition-colors">{build.name}</h3>
                  <p className="text-xs text-gb-muted">{build.subtitle}</p>
                </div>

                {/* CPU + GPU */}
                {build.cpu && build.gpu && (
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2">
                      <Cpu size={12} className="text-purple-400 shrink-0" />
                      <span className="text-xs text-white/60 truncate">{build.cpu.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MonitorPlay size={12} className="text-cyan-400 shrink-0" />
                      <span className="text-xs text-white/60 truncate">{build.gpu.name}</span>
                    </div>
                  </div>
                )}

                {/* Mini FPS preview */}
                <div className="space-y-1.5 mb-4">
                  {Object.entries(build.fps).map(([game, fps]) => {
                    const info = fpsInfo(fps);
                    return (
                      <div key={game} className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs w-24 text-left truncate">{game}</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${Math.min(fps / 300 * 100, 100)}%`, backgroundColor: info.color }}
                          />
                        </div>
                        <span className="text-xs font-mono font-bold w-8 text-left" style={{ color: info.color }}>{fps}</span>
                      </div>
                    );
                  })}
                  <p className="text-xs text-gray-500 text-left">FPS @ {build.res} Ultra</p>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                  <span className="text-[#ff9900] font-bold text-sm">{build.priceRange} <span className="text-xs text-gray-500">ر.س</span></span>
                  <span className="text-gb-primary text-xs font-bold group-hover:-translate-x-1 transition-transform">شوف التحليل ←</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Or build your own */}
          <div className="text-center mt-10 pb-10">
            <p className="text-gb-muted text-sm mb-3">أو ابنِ تجميعتك الخاصة</p>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-gb-text font-bold text-sm hover:bg-white/[0.08] hover:border-gb-primary/20 transition-all active:scale-95"
            >
              <Wrench size={16} />
              روح للتجميع
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const gamingCpu = getGamingCpuScore(components.cpu);
  const gpuScore = bn?.gpuScore || components.gpu?.score || 0;
  const fpsRes = resolution === '4K' ? '4k' : resolution;
  const cpuBenchMatch = findCPUBenchmark(components.cpu?.name);
  const gpuBenchMatch = findGPUBenchmark(components.gpu?.name);
  const estimatedWatts = estimateWattage(components);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-2xl lg:max-w-4xl mx-auto">
        <h1 className="text-lg sm:text-2xl font-bold text-gb-text mb-4">التحليل الذكي</h1>

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
              <span className="text-xs opacity-60">{r.desc}</span>
            </button>
          ))}
        </div>

        {/* ── Build Balance Card ── */}
        {(() => {
          const cpuBench = findCPUBenchmark(components.cpu.name);
          const gpuBench = findGPUBenchmark(components.gpu.name);
          const cpuScoreVal = cpuBench?.gamingScore || gamingCpu;
          const isFlagshipCPU = cpuBench?.tier === 'flagship' || cpuScoreVal >= 95;
          const isFlagshipGPU = (gpuBench?.p1080 || 0) >= 85;
          const gpuPercent = resolution === '4K' ? gpuBench?.p4k
                           : resolution === '1440p' ? gpuBench?.p1440
                           : gpuBench?.p1080;
          const balance = getBalanceStatus(cpuScoreVal, gpuPercent || gpuScore, resolution, isFlagshipCPU, isFlagshipGPU);

          const colorMap = {
            green:  { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', bar: '#22c55e' },
            yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', bar: '#eab308' },
            red:    { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', bar: '#ef4444' },
          };
          const c = colorMap[balance.color];

          // Resolution-weighted CPU/GPU workload share
          const cpuWeight = { '1080p': 0.40, '1440p': 0.25, '4K': 0.10 };
          const gpuWeight = { '1080p': 0.60, '1440p': 0.75, '4K': 0.90 };
          const cpuContribution = cpuScoreVal * cpuWeight[resolution];
          const gpuContribution = (gpuPercent || gpuScore || 50) * gpuWeight[resolution];
          const total = cpuContribution + gpuContribution;
          const cpuShare = total > 0 ? Math.round((cpuContribution / total) * 100) : 50;
          const gpuShare = 100 - cpuShare;

          return (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-5"
            >
              {/* Balance Status Card */}
              <div className={`${c.bg} border ${c.border} rounded-2xl p-6 text-center mb-4`}>
                <div className="text-3xl mb-2">{balance.icon}</div>
                <h3 className={`text-xl font-bold font-display ${c.text} mb-1`}>{balance.title}</h3>
                <p className="text-gray-300 text-sm">{balance.subtitle}</p>
                {balance.tip && (
                  <p className="text-gray-500 text-xs mt-3 flex items-center justify-center gap-1">
                    <span>💡</span> {balance.tip}
                  </p>
                )}
              </div>

              {/* 3 Stat Boxes */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gb-card rounded-xl border border-gb-border p-3 text-center">
                  <Cpu size={18} className="text-gb-primary mx-auto mb-1.5" />
                  <p className="text-lg font-display font-bold text-gb-text">{gamingCpu}</p>
                  <p className="text-xs text-gb-muted">CPU Gaming</p>
                </div>
                <div className="bg-gb-card rounded-xl border border-gb-border p-3 text-center">
                  <MonitorPlay size={18} className="text-gb-secondary mx-auto mb-1.5" />
                  <p className="text-lg font-display font-bold text-gb-text">{gpuScore}</p>
                  <p className="text-xs text-gb-muted">GPU</p>
                </div>
                <div className="bg-gb-card rounded-xl border border-gb-border p-3 text-center">
                  <Zap size={18} className="text-yellow-400 mx-auto mb-1.5" />
                  <p className="text-lg font-display font-bold text-gb-text">
                    {(components.cpu?.tdp || 0) + (components.gpu?.tdp || 0)}W
                  </p>
                  <p className="text-xs text-gb-muted">Power</p>
                </div>
              </div>

              {/* CPU/GPU Workload Bar */}
              <div className="bg-gb-card rounded-xl border border-gb-border p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-cyan-400 flex items-center gap-1"><MonitorPlay size={12} /> {components.gpu.name.split(' ').slice(0, 3).join(' ')}</span>
                  <span className="text-purple-400 flex items-center gap-1">{components.cpu.name.split(' ').slice(0, 3).join(' ')} <Cpu size={12} /></span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${gpuShare}%` }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cpuShare}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-500"
                  />
                </div>
                <p className="text-gray-500 text-xs text-center mt-2">
                  {resolution === '4K' && '🖥️ في 4K الكرت يشتغل أكثر وهذا طبيعي'}
                  {resolution === '1440p' && '🖥️ في 1440p القطع تتشارك الشغل بالتساوي'}
                  {resolution === '1080p' && '🖥️ في 1080p المعالج يشتغل أكثر'}
                </p>
              </div>
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
          <p className="text-xs text-gb-muted mb-4">
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
                      {fps} <span className="text-xs text-gray-500">FPS</span>
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
              <div className="grid grid-cols-4 text-xs text-gb-muted font-bold px-3 py-2 border-b border-gb-border/50 bg-gb-surface/30">
                <span>اللعبة</span>
                <span className="text-center">1080p</span>
                <span className="text-center">1440p</span>
                <span className="text-center">4K</span>
              </div>
              {orderedGames.map((game) => {
                const results = predictFPS(components, game);
                if (!results) return null;
                return (
                  <div key={game.name} className="grid grid-cols-4 text-xs px-3 py-2 border-b border-gb-border/30 last:border-0">
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

          <div className="mt-3 pt-3 border-t border-gb-border/30 space-y-1">
            <p className="text-center text-xs text-gb-muted/60">
              📊 المصدر: Tom's Hardware GPU Benchmark Hierarchy (مارس 2026) + بيانات مراجعات المعالجات
            </p>
            <p className="text-center text-xs text-gb-muted/60">
              * التوقعات تقريبية (±15%) — Ultra settings بدون RT/DLSS — الأداء الفعلي يختلف حسب الإعدادات والتعريفات
            </p>
            {(!cpuBenchMatch || !gpuBenchMatch) && (
              <p className="text-center text-xs text-yellow-400/60">
                ⚠️ {!cpuBenchMatch && !gpuBenchMatch ? 'المعالج والكرت غير موجودين' : !cpuBenchMatch ? 'المعالج غير موجود' : 'الكرت غير موجود'} في قاعدة البنشمارك — النتائج تقديرية
              </p>
            )}
          </div>
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
            {cpuBenchMatch
              ? <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-normal">بيانات مقاسة</span>
              : <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-normal">بيانات تقريبية</span>
            }
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
                <span className="text-xs text-gb-muted">{row.label}</span>
                <span className="text-xs font-bold text-left" style={row.color ? { color: row.color } : undefined}>
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
            {gpuBenchMatch
              ? <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-normal">بيانات مقاسة</span>
              : <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-normal">بيانات تقريبية</span>
            }
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
                <span className="text-xs text-gb-muted">{row.label}</span>
                <span className="text-xs font-bold text-left" style={row.color ? { color: row.color } : undefined}>
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
                        <span className="text-xs text-white/80 font-bold">{p.watts}W</span>
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
                        <div className="flex justify-between text-xs text-gb-muted mb-0.5">
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
                  <span className="text-xs text-gb-muted">الاستهلاك المقدّر (+20% هامش)</span>
                  <span className="text-sm font-display font-bold text-yellow-400">{estimatedWatts}W</span>
                </div>
                {components.psu && (
                  <p className={`text-xs mt-1.5 font-bold ${
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
                      <p className="text-xs text-gb-muted">{futureProof.description}</p>
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
                          <span className="text-xs text-gb-muted">{s.type === 'gpu' ? 'كرت الشاشة' : s.type === 'cpu' ? 'المعالج' : 'الباور'}</span>
                          <span className="text-xs font-display font-bold text-green-400">بديل أوفر</span>
                        </div>
                        <p className="text-xs text-gb-text font-bold mb-0.5">{s.current.name} → {s.suggested.name}</p>
                        <p className="text-xs text-gb-muted">{s.reason}</p>
                        {s.perfLoss > 0 && (
                          <p className="text-xs text-yellow-400 mt-1">-{s.perfLoss}% أداء</p>
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

        {/* Upgrade Roadmap — hidden for flagship builds, collapsible for others */}
        {roadmap.length > 0 && !(
          (cpuBenchMatch?.tier === 'flagship' || cpuBenchMatch?.gamingScore >= 95) &&
          (gpuBenchMatch?.p1080 >= 85)
        ) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gb-card rounded-xl border border-gb-border mb-4 overflow-hidden"
          >
            <button
              onClick={() => setShowUpgrades(!showUpgrades)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
            >
              <h3 className="font-bold text-gb-text text-sm flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <TrendingUp size={14} className="text-orange-400" />
                </div>
                📈 وش أرقّي أول؟
              </h3>
              <ChevronDown size={16} className={`text-gb-muted transition-transform ${showUpgrades ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {showUpgrades && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <p className="text-xs text-gb-muted mb-3">تحليل ذكي مرتب حسب الأولوية</p>
                    <div className="space-y-3">
                      {roadmap.map((item, idx) => (
                        <div key={idx} className={`rounded-xl border p-3.5 ${idx === 0 ? 'border-gb-primary/30 bg-gb-primary/5' : 'border-gb-border bg-gb-surface'}`}>
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{item.icon}</span>
                              <div>
                                <p className="font-bold text-xs text-gb-text">{item.label}</p>
                                <p className="text-xs text-gb-muted">الحالي: {item.current.name}</p>
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${idx === 0 ? 'bg-gb-primary/15 text-gb-primary' : 'bg-gb-secondary/15 text-gb-secondary'}`}>
                              أولوية {item.priority}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {item.options.map((opt, oi) => (
                              <div key={oi} className="bg-gb-bg/50 rounded-lg p-2.5">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-gb-secondary/15 text-gb-secondary font-bold">{opt.tag}</span>
                                  <span className="text-xs font-display font-bold text-green-400">+{opt.gain} أداء</span>
                                </div>
                                <p className="text-xs font-bold text-gb-text mt-1">{opt.part.name}</p>
                                <a href={`https://www.amazon.sa/dp/${opt.part.asin}?tag=meshal039-21`} target="_blank" rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-bold text-[#ff9900] mt-0.5 hover:underline">شيك السعر</a>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

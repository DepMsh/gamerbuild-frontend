import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBuild } from '../hooks/BuildContext';
import { track } from '../utils/analytics';
import { GAMES, predictFPS } from '../utils/engine';
import { Crosshair, Monitor, MonitorSpeaker, Tv, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const RES_OPTIONS = [
  { key: '1080p', label: '1080p', icon: Monitor },
  { key: '1440p', label: '1440p', icon: MonitorSpeaker },
  { key: '4k', label: '4K', icon: Tv },
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

export default function GamesPage() {
  const { components } = useBuild();
  const hasBoth = components.cpu && components.gpu;
  const [selectedRes, setSelectedRes] = useState('1080p');
  useEffect(() => { if (hasBoth) track.viewFPS(); }, []);

  if (!hasBoth) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
        <div className="max-w-2xl mx-auto text-center py-14">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-24 h-24 mx-auto rounded-full bg-gb-card border border-gb-border flex items-center justify-center mb-4">
              <Crosshair size={36} className="text-gb-muted" />
            </div>
            <h2 className="font-display text-xl font-bold text-gb-text mb-2">توقع الأداء</h2>
            <p className="text-gb-muted text-sm mb-6">اختر معالج وكرت شاشة عشان نتوقع FPS لـ 17 لعبة</p>
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

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <h1 className="font-display text-lg sm:text-2xl font-bold text-gb-text">توقع الأداء</h1>
          <p className="text-gb-muted text-[11px] sm:text-sm mt-0.5">
            {components.cpu.name} + {components.gpu.name}
          </p>
        </div>

        {/* Resolution Selector — cyan pills */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {RES_OPTIONS.map(r => (
            <button
              key={r.key}
              onClick={() => setSelectedRes(r.key)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all active:scale-95 ${
                selectedRes === r.key
                  ? 'bg-cyan-500 text-[#0a0a14]'
                  : 'bg-[#1a1a2e] text-white/50 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Games List */}
        <div>
          {orderedGames.map((game, gi) => {
            const results = predictFPS(components, game);
            if (!results) return null;
            const data = results[selectedRes];
            if (!data) return null;
            const fps = data.fps;
            const info = fpsInfo(fps);
            const barWidth = Math.min(100, (fps / 240) * 100);

            return (
              <motion.div
                key={game.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.04 }}
                className="bg-[#0f1019] border border-[#1a1a2e] rounded-xl p-4 mb-3"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white/90">{game.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: info.color + '20', color: info.color }}>
                    {info.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
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

        {/* All Resolutions Summary — compact */}
        <div className="mt-6 mb-4">
          <h3 className="text-xs font-bold text-gb-muted mb-3">ملخص كل الدقات</h3>
          <div className="bg-gb-card rounded-xl border border-gb-border overflow-hidden">
            <div className="grid grid-cols-4 text-[10px] text-gb-muted font-bold px-3 py-2 border-b border-gb-border bg-gb-surface/30">
              <span>اللعبة</span>
              <span className="text-center">1080p</span>
              <span className="text-center">1440p</span>
              <span className="text-center">4K</span>
            </div>
            {orderedGames.map((game) => {
              const results = predictFPS(components, game);
              if (!results) return null;
              return (
                <div key={game.name} className="grid grid-cols-4 text-[11px] px-3 py-2 border-b border-gb-border/50 last:border-0">
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

        <p className="text-center text-[10px] text-gb-muted mt-4 pb-4">
          * التوقعات مبنية على بنشماركات حقيقية (Ultra settings) — الأداء الفعلي يختلف حسب الإعدادات
        </p>
      </div>
    </div>
  );
}

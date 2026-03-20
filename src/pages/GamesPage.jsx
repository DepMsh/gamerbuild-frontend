import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBuild } from '../hooks/BuildContext';
import { GAMES, predictFPS } from '../utils/engine';
import { Crosshair, Monitor, MonitorSpeaker, Tv, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const RES_OPTIONS = [
  { key: '1080p', label: '1080p', icon: Monitor },
  { key: '1440p', label: '1440p', icon: MonitorSpeaker },
  { key: '4k', label: '4K', icon: Tv },
];

// Reorder games by popularity (most popular first)
const GAME_ORDER = [
  'Valorant', 'Fortnite', 'CS2', 'League of Legends', 'Apex Legends',
  'COD MW3', 'GTA VI', 'Cyberpunk 2077', 'FC 25', 'Elden Ring',
  'Marvel Rivals', 'Rainbow Six Siege', 'Black Myth Wukong', 'Red Dead 2',
  'Hogwarts Legacy', 'Wuthering Waves', 'Minecraft Shaders',
];

const orderedGames = GAME_ORDER
  .map(name => GAMES.find(g => g.name === name))
  .filter(Boolean)
  .concat(GAMES.filter(g => !GAME_ORDER.includes(g.name)));

const gameGradients = [
  'from-orange-500/10 to-red-500/5',
  'from-cyan-500/10 to-blue-500/5',
  'from-purple-500/10 to-pink-500/5',
  'from-green-500/10 to-emerald-500/5',
  'from-yellow-500/10 to-orange-500/5',
  'from-pink-500/10 to-rose-500/5',
  'from-blue-500/10 to-indigo-500/5',
  'from-teal-500/10 to-cyan-500/5',
  'from-amber-500/10 to-yellow-500/5',
  'from-indigo-500/10 to-violet-500/5',
  'from-emerald-500/10 to-green-500/5',
  'from-rose-500/10 to-pink-500/5',
  'from-violet-500/10 to-purple-500/5',
  'from-sky-500/10 to-blue-500/5',
  'from-red-500/10 to-orange-500/5',
  'from-lime-500/10 to-green-500/5',
  'from-fuchsia-500/10 to-purple-500/5',
];

function fpsInfo(fps) {
  if (fps >= 120) return { color: '#00e676', bg: 'bg-green-500/15', label: 'ممتاز', pct: 100 };
  if (fps >= 90)  return { color: '#66ffb2', bg: 'bg-green-500/10', label: 'سلس', pct: 85 };
  if (fps >= 60)  return { color: '#00e5ff', bg: 'bg-cyan-500/15', label: 'مقبول', pct: 70 };
  if (fps >= 30)  return { color: '#ffd740', bg: 'bg-yellow-500/15', label: 'ضعيف', pct: 45 };
  return { color: '#ff5252', bg: 'bg-red-500/15', label: 'صعب', pct: 20 };
}

export default function GamesPage() {
  const { components } = useBuild();
  const hasBoth = components.cpu && components.gpu;
  const [selectedRes, setSelectedRes] = useState('1080p');

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

        {/* Resolution Selector */}
        <div className="flex items-center justify-center gap-1 p-1 bg-gb-card rounded-xl border border-gb-border mb-5">
          {RES_OPTIONS.map(r => {
            const ResIcon = r.icon;
            return (
              <button
                key={r.key}
                onClick={() => setSelectedRes(r.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-center transition-all active:scale-95 ${
                  selectedRes === r.key
                    ? 'bg-gb-primary/15 border border-gb-primary/30 text-gb-primary'
                    : 'text-gb-muted hover:text-gb-text'
                }`}
              >
                <ResIcon size={14} />
                <span className="text-sm font-bold">{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Games List */}
        <div className="space-y-2.5">
          {orderedGames.map((game, gi) => {
            const results = predictFPS(components, game);
            if (!results) return null;
            const data = results[selectedRes];
            if (!data) return null;
            const info = fpsInfo(data.fps);
            const gradient = gameGradients[gi % gameGradients.length];
            const displayFPS = data.fps >= 120 ? '120+' : data.fps;
            const barWidth = Math.min((data.fps / 120) * 100, 100);

            return (
              <motion.div
                key={game.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.04 }}
                className={`bg-gradient-to-br ${gradient} rounded-xl border border-gb-border p-3.5 sm:p-4`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-sm text-gb-text">{game.name}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-black text-lg sm:text-xl" style={{ color: info.color }}>
                      {displayFPS}
                    </span>
                    <span className="text-[10px] font-bold" style={{ color: info.color, opacity: 0.7 }}>FPS</span>
                  </div>
                </div>

                {/* FPS Bar */}
                <div className="relative h-3 rounded-full bg-gb-bg/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ duration: 0.6, delay: gi * 0.04 + 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: info.color, boxShadow: `0 0 8px ${info.color}40` }}
                  />
                  {/* 60 FPS marker */}
                  <div className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: '50%' }} />
                </div>

                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[9px] text-gb-muted">0</span>
                  <span className="text-[9px] text-gb-muted/40">60</span>
                  <span className="text-[9px] text-gb-muted">120+</span>
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

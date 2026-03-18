import { useBuild } from '../hooks/BuildContext';
import { GAMES, predictFPS, fpsColor } from '../utils/engine';
import { Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';

const gameGradients = [
  'from-orange-500/10 to-red-500/5',
  'from-cyan-500/10 to-blue-500/5',
  'from-purple-500/10 to-pink-500/5',
  'from-green-500/10 to-emerald-500/5',
  'from-yellow-500/10 to-orange-500/5',
  'from-pink-500/10 to-rose-500/5',
  'from-blue-500/10 to-indigo-500/5',
  'from-teal-500/10 to-cyan-500/5',
];

function fpsColorPill(fps) {
  if (fps >= 120) return { bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/20' };
  if (fps >= 60) return { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/20' };
  if (fps >= 30) return { bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/20' };
  return { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/20' };
}

export default function GamesPage() {
  const { components } = useBuild();
  const hasBoth = components.cpu && components.gpu;

  if (!hasBoth) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-24 h-24 mx-auto rounded-full bg-gb-card border border-gb-border flex items-center justify-center mb-4">
              <Crosshair size={36} className="text-gb-muted" />
            </div>
            <h2 className="font-display text-xl font-bold text-gb-text mb-2">توقع الأداء</h2>
            <p className="text-gb-muted text-sm">اختر معالج وكرت شاشة في صفحة التجميعة عشان نتوقع FPS لكل لعبة</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display text-lg sm:text-2xl font-bold text-gb-text">توقع الأداء</h1>
          <p className="text-gb-muted text-xs sm:text-sm mt-1">
            {components.cpu.name} + {components.gpu.name}
          </p>
        </div>

        <div className="space-y-3">
          {GAMES.map((game, gi) => {
            const results = predictFPS(components, game);
            if (!results) return null;
            const gradient = gameGradients[gi % gameGradients.length];

            return (
              <motion.div
                key={game.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.08 }}
                className={`bg-gradient-to-br ${gradient} rounded-xl border border-gb-border p-4 sm:p-5`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl sm:text-3xl">{game.icon}</span>
                  <span className="font-display font-bold text-sm sm:text-base text-gb-text">{game.name}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Object.entries(results).map(([setting, data]) => {
                    const pill = fpsColorPill(data.fps);
                    return (
                      <div
                        key={setting}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${pill.bg} ${pill.border}`}
                      >
                        <span className="text-[10px] sm:text-xs text-gb-muted">{setting}</span>
                        <span className={`text-sm sm:text-base font-display font-bold ${pill.text}`}>
                          {data.fps}
                        </span>
                        <span className={`text-[9px] sm:text-[10px] font-bold ${pill.text}`}>FPS</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-gb-muted mt-6 pb-4">
          * التوقعات تقريبية بناءً على بنشماركات القطع — الأداء الفعلي يختلف
        </p>
      </div>
    </div>
  );
}

import { useBuild } from '../hooks/BuildContext';
import { GAMES, predictFPS } from '../utils/engine';
import { Crosshair, Monitor, MonitorSpeaker, Tv } from 'lucide-react';
import { motion } from 'framer-motion';

const RES_ICONS = { '1080p': Monitor, '1440p': MonitorSpeaker, '4k': Tv };

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
];

function fpsPill(fps) {
  if (fps >= 120) return { bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/20', label: 'ممتاز' };
  if (fps >= 90)  return { bg: 'bg-green-500/10', text: 'text-green-300', border: 'border-green-500/15', label: 'سلس' };
  if (fps >= 60)  return { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/20', label: 'مقبول' };
  if (fps >= 30)  return { bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/20', label: 'ضعيف' };
  return { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/20', label: 'صعب' };
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
                transition={{ delay: gi * 0.06 }}
                className={`bg-gradient-to-br ${gradient} rounded-xl border border-gb-border p-4 sm:p-5`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-bold text-sm sm:text-base text-gb-text">{game.name}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Object.entries(results).map(([res, data]) => {
                    const pill = fpsPill(data.fps);
                    const ResIcon = RES_ICONS[res] || Monitor;
                    return (
                      <div
                        key={res}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${pill.bg} ${pill.border}`}
                      >
                        <ResIcon size={12} className="text-gb-muted opacity-60" />
                        <span className="text-[10px] sm:text-xs text-gb-muted">{res}</span>
                        <span className={`text-sm sm:text-base font-display font-bold ${pill.text}`}>
                          {data.fps >= 120 ? '120+' : data.fps}
                        </span>
                        <span className={`text-[9px] sm:text-[10px] ${pill.text} opacity-70`}>FPS</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-gb-muted mt-6 pb-4">
          * التوقعات مبنية على بنشماركات حقيقية (Ultra settings) — الأداء الفعلي يختلف حسب الإعدادات
        </p>
      </div>
    </div>
  );
}

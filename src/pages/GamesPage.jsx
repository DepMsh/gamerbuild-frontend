import { useBuild } from '../hooks/BuildContext';
import { GAMES, predictFPS, fpsColor } from '../utils/engine';

export default function GamesPage() {
  const { components } = useBuild();
  const hasBoth = components.cpu && components.gpu;

  if (!hasBoth) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 pb-24 md:pb-10 px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="text-6xl opacity-30 mb-4">🎮</div>
          <h2 className="font-display text-xl font-bold text-gb-text mb-2">توقع الأداء</h2>
          <p className="text-gb-muted text-sm">اختر معالج وكرت شاشة في صفحة التجميعة عشان نتوقع FPS لكل لعبة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-24 md:pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display text-xl sm:text-2xl font-bold text-gb-text">🎮 توقع الأداء</h1>
          <p className="text-gb-muted text-xs sm:text-sm mt-1">
            {components.cpu.name} + {components.gpu.name}
          </p>
        </div>

        <div className="space-y-3">
          {GAMES.map(game => {
            const results = predictFPS(components, game);
            if (!results) return null;

            return (
              <div key={game.name} className="bg-gb-card rounded-2xl border border-gb-border p-4 animate-slide-up">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{game.icon}</span>
                  <span className="font-bold text-sm sm:text-base text-gb-text">{game.name}</span>
                </div>

                <div className="space-y-1.5">
                  {Object.entries(results).map(([setting, data]) => {
                    const colors = fpsColor(data.level);
                    return (
                      <div key={setting} className="flex items-center justify-between px-3 py-2.5 bg-gb-surface rounded-xl">
                        <span className="text-xs sm:text-sm text-gb-muted">{setting}</span>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span
                            className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold"
                            style={{ backgroundColor: colors.bg, color: colors.text }}
                          >
                            {data.label}
                          </span>
                          <span
                            className="text-xs sm:text-sm font-display font-bold min-w-[50px] sm:min-w-[60px] text-left"
                            style={{ color: colors.text }}
                          >
                            {data.fps}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-gb-muted mt-4 pb-4">
          * التوقعات تقريبية بناءً على بنشماركات القطع — الأداء الفعلي يختلف
        </p>
      </div>
    </div>
  );
}

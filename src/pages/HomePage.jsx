import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Cpu, Shield, Crosshair, BarChart3, Tag, Gamepad2, Sparkles, Plus, TrendingUp, Zap } from 'lucide-react';
import { PRESETS, CATEGORIES, loadPreset, calcTotal, COMPONENTS } from '../utils/db';
import { useBuild } from '../hooks/BuildContext';
import { motion } from 'framer-motion';

const tierChips = [
  { key: 'budget', label: 'اقتصادية', color: 'from-green-400 to-emerald-500' },
  { key: 'midRange', label: 'متوسطة', color: 'from-blue-400 to-cyan-500' },
  { key: 'highEnd', label: 'عالية', color: 'from-purple-400 to-violet-500' },
  { key: 'enthusiast', label: 'خرافية', color: 'from-pink-400 to-red-500' },
];

const featureCards = [
  { icon: Shield, title: 'فحص توافق', desc: 'تأكد تلقائي من توافق كل القطع', gradient: 'from-green-500/20 to-emerald-500/10', iconColor: 'text-green-400', borderColor: 'border-green-500/20' },
  { icon: Crosshair, title: 'توقع FPS', desc: 'تقدير أداء تجميعتك في الألعاب', gradient: 'from-cyan-500/20 to-blue-500/10', iconColor: 'text-cyan-400', borderColor: 'border-cyan-500/20' },
  { icon: BarChart3, title: 'تحليل أداء', desc: 'كشف البوتلنك وتوصيات الترقية', gradient: 'from-purple-500/20 to-violet-500/10', iconColor: 'text-purple-400', borderColor: 'border-purple-500/20' },
  { icon: Tag, title: 'أسعار أمازون', desc: 'أسعار محدّثة ورابط شراء مباشر', gradient: 'from-amber-500/20 to-orange-500/10', iconColor: 'text-amber-400', borderColor: 'border-amber-500/20' },
];

// Pick top 6 popular parts (mix of CPU & GPU)
const popularParts = [
  ...COMPONENTS.cpu.filter(c => c.score >= 85).slice(0, 3),
  ...COMPONENTS.gpu.filter(c => c.score >= 85).slice(0, 3),
].slice(0, 6);

export default function HomePage() {
  const { loadBuild } = useBuild();
  const navigate = useNavigate();
  const presetsRef = useRef(null);

  const handleLoadBuild = (tierKey) => {
    const buildComponents = loadPreset(tierKey);
    if (Object.keys(buildComponents).length > 0) {
      loadBuild(buildComponents);
      navigate('/builder');
    }
  };

  return (
    <div className="min-h-screen">
      {/* ========== HERO ========== */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gb-bg">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-gb-primary/[0.04] rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-gb-secondary/[0.04] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur border border-white/[0.06] mb-8"
          >
            <Sparkles size={12} className="text-gb-primary" />
            <span className="text-[11px] text-gb-muted">أول منصة سعودية لتجميع كمبيوترات القيمنق</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
          >
            <span className="text-gb-text">جمّع جهازك</span>
            <br />
            <span className="bg-gradient-to-l from-gb-primary via-gb-secondary to-gb-accent bg-clip-text text-transparent">
              بأفضل سعر
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gb-muted max-w-xl mx-auto mb-10 leading-relaxed"
          >
            اختر القطع، تأكد من التوافق، واحصل على أفضل سعر من أمازون السعودية
          </motion.p>

          {/* Big glowing CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Link
              to="/builder"
              className="group inline-flex items-center gap-3 px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-l from-gb-primary via-cyan-400 to-gb-secondary text-gb-bg font-bold text-lg sm:text-xl shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:shadow-[0_0_60px_rgba(0,229,255,0.5)] transition-all duration-300 hover:scale-[1.02]"
            >
              <Wrench size={22} />
              ابدأ التجميع
            </Link>
          </motion.div>

          {/* Quick tier chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {tierChips.map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => handleLoadBuild(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white/90 bg-gradient-to-l ${color} bg-opacity-20 border border-white/10 hover:border-white/20 hover:scale-105 transition-all`}
                style={{ background: 'transparent' }}
              >
                <span className={`bg-gradient-to-l ${color} bg-clip-text text-transparent`}>{label}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="py-5 px-4 border-y border-white/[0.04]">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-6 sm:gap-10">
          {[
            { value: '156', label: 'قطعة' },
            { value: '8', label: 'فئات' },
            { value: 'Amazon', label: 'أسعار' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-center">
              <span className="text-lg sm:text-xl font-display font-black text-gb-primary">{s.value}</span>
              <span className="text-xs text-gb-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========== PRESETS — horizontal swipeable cards ========== */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg sm:text-2xl font-bold text-gb-text">تجميعات جاهزة</h2>
            <Link to="/builder" className="text-xs text-gb-muted hover:text-gb-primary transition-colors">تصفح الكل</Link>
          </div>

          {/* Horizontal scroll */}
          <div ref={presetsRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
            {PRESETS.map((preset) => {
              const buildComponents = loadPreset(preset.key);
              const total = calcTotal(buildComponents);
              const tierStyle = tierChips.find(t => t.key === preset.key);
              return (
                <motion.div
                  key={preset.key}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLoadBuild(preset.key)}
                  className="shrink-0 w-[280px] sm:w-[320px] snap-start cursor-pointer rounded-2xl bg-gb-card border border-gb-border p-5 sm:p-6 relative overflow-hidden group"
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl border border-gb-primary/30" />
                  </div>

                  {/* Images row */}
                  <div className="flex items-center gap-2 mb-4">
                    {buildComponents.cpu?.image_url && (
                      <div className="w-12 h-12 rounded-xl bg-white/[0.03] overflow-hidden flex items-center justify-center p-1.5">
                        <img src={buildComponents.cpu.image_url} alt="" loading="lazy" className="w-full h-full object-contain" />
                      </div>
                    )}
                    {buildComponents.gpu?.image_url && (
                      <div className="w-12 h-12 rounded-xl bg-white/[0.03] overflow-hidden flex items-center justify-center p-1.5">
                        <img src={buildComponents.gpu.image_url} alt="" loading="lazy" className="w-full h-full object-contain" />
                      </div>
                    )}
                    <span className="text-2xl mr-auto">{preset.icon}</span>
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold mb-1 bg-gradient-to-l ${tierStyle?.color || 'from-cyan-400 to-blue-500'} bg-clip-text text-transparent`}>
                    {preset.name}
                  </h3>
                  <p className="text-[11px] text-gb-muted truncate">{buildComponents.cpu?.name}</p>
                  <p className="text-[11px] text-gb-muted truncate mb-4">{buildComponents.gpu?.name}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                    <span className="text-xs text-gb-muted">{preset.budget}</span>
                    <span className="text-base font-display font-black text-gb-primary">{total.toLocaleString()} <span className="text-[10px] text-gb-muted font-body">ر.س</span></span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== POPULAR PARTS ========== */}
      <section className="py-12 sm:py-16 px-4 bg-gb-surface/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg sm:text-2xl font-bold text-gb-text">القطع الأشهر</h2>
            <Link to="/components" className="text-xs text-gb-muted hover:text-gb-primary transition-colors">عرض الكل</Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 stagger-children">
            {popularParts.map((part) => (
              <div key={part.id} className="rounded-2xl bg-gb-card border border-gb-border overflow-hidden group card-hover">
                {/* Image */}
                <div className="h-24 sm:h-32 bg-white/[0.02] flex items-center justify-center p-3 relative">
                  {part.image_url ? (
                    <img src={part.image_url} alt="" loading="lazy" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <Cpu size={32} className="text-gb-muted/30" />
                  )}
                  {/* Score badge */}
                  {part.score && (
                    <span className="absolute top-2 left-2 w-8 h-8 rounded-full bg-gb-primary/15 text-gb-primary text-[11px] font-display font-bold flex items-center justify-center">
                      {part.score}
                    </span>
                  )}
                </div>

                <div className="p-3 sm:p-4">
                  <p className="text-[10px] text-gb-muted mb-0.5">{part.brand}</p>
                  <p className="text-[12px] sm:text-sm font-bold text-gb-text line-clamp-2 min-h-[2.4em] leading-snug">{part.name}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm sm:text-base font-display font-black text-gb-primary">{part.price?.toLocaleString()}</span>
                    <Link to="/builder" className="px-3 py-1.5 rounded-lg bg-gb-primary/10 text-gb-primary text-[10px] font-bold hover:bg-gb-primary/20 transition-all flex items-center gap-1">
                      <Plus size={10} /> أضف
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES 2x2 ========== */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-lg sm:text-2xl font-bold text-gb-text mb-6 text-center">ليش GamerBuild؟</h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 stagger-children">
            {featureCards.map((f, i) => (
              <div key={i} className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${f.gradient} border ${f.borderColor} card-hover`}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gb-bg/50 flex items-center justify-center mb-3 ${f.iconColor}`}>
                  <f.icon size={20} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gb-text mb-1">{f.title}</h3>
                <p className="text-[11px] sm:text-xs text-gb-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-12 sm:py-16 px-4 pb-28 md:pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-gb-primary/[0.06] via-gb-secondary/[0.04] to-gb-accent/[0.04] border border-gb-primary/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative z-10">
              <Gamepad2 size={40} className="text-gb-primary mx-auto mb-4 opacity-80" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-gb-text mb-3">جاهز تجمّع جهازك؟</h2>
              <p className="text-sm text-gb-muted mb-8">ابدأ الحين وجمّع أفضل كمبيوتر قيمنق بأحسن سعر</p>
              <Link
                to="/builder"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-l from-gb-primary via-cyan-400 to-gb-secondary text-gb-bg font-bold text-lg shadow-[0_0_30px_rgba(0,229,255,0.25)] hover:shadow-[0_0_50px_rgba(0,229,255,0.4)] transition-all"
              >
                <Wrench size={20} />
                ابدأ التجميع الحين
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

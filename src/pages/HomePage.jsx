import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Wrench, Shield, Crosshair, BarChart3, Tag, Gamepad2, Sparkles, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';

// ── Count-up hook ──
function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, ref];
}

const quickBuilds = [
  { key: 'budget', label: 'اقتصادية', desc: '1080p سلس', price: '4,200', color: 'from-emerald-500/20 to-emerald-500/5', icon: '⚡' },
  { key: 'amd_value', label: 'AMD قيمنق', desc: '1440p V-Cache', price: '5,800', color: 'from-red-500/20 to-red-500/5', icon: '🔴' },
  { key: 'mid', label: 'متوسطة', desc: '1440p Ultra', price: '7,000', color: 'from-cyan-500/20 to-cyan-500/5', icon: '🖥️' },
  { key: 'nvidia_premium', label: 'NVIDIA بريميوم', desc: 'RTX + DLSS 4', price: '10,000', color: 'from-green-500/20 to-green-500/5', icon: '💚' },
  { key: 'beast', label: 'خرافية', desc: '4K + ستريم', price: '14,000', color: 'from-purple-500/20 to-purple-500/5', icon: '👑' },
];

const featureCards = [
  { icon: Shield, title: 'فحص توافق ذكي', desc: 'كل قطعة تنفحص تلقائياً مع الباقي', gradient: 'from-green-500/15 to-emerald-500/5', iconColor: 'text-green-400', borderColor: 'border-green-500/15' },
  { icon: Crosshair, title: 'توقع FPS دقيق', desc: 'بنشماركات حقيقية لـ 17 لعبة', gradient: 'from-cyan-500/15 to-blue-500/5', iconColor: 'text-cyan-400', borderColor: 'border-cyan-500/15' },
  { icon: BarChart3, title: 'تحليل بوتلنك', desc: 'كشف عنق الزجاجة + خطة ترقية', gradient: 'from-purple-500/15 to-violet-500/5', iconColor: 'text-purple-400', borderColor: 'border-purple-500/15' },
  { icon: Tag, title: 'شراء من أمازون', desc: 'كل قطعة فيها رابط مباشر لأمازون السعودية', gradient: 'from-amber-500/15 to-orange-500/5', iconColor: 'text-amber-400', borderColor: 'border-amber-500/15' },
];

export default function HomePage() {
  usePageTitle(null);
  const [partsCount, partsRef] = useCountUp(5338);
  const [gamesCount, gamesRef] = useCountUp(17);

  return (
    <div className="min-h-screen">
      {/* ========== HERO ========== */}
      <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gb-bg">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(0,230,118,0.05) 0%, transparent 70%)' }}
            animate={{ scale: [1.1, 1, 1.1], x: [0, -20, 0], y: [0, 15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 text-center px-5 max-w-2xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] mb-6"
          >
            <Sparkles size={12} className="text-gb-primary" />
            <span className="text-[11px] text-gb-muted">أول منصة سعودية لتجميع PC القيمنق</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-[2.2rem] sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-5"
          >
            <span className="text-gb-text">جمّع جهازك</span>
            <br />
            <span className="bg-gradient-to-l from-gb-primary via-gb-secondary to-gb-accent bg-clip-text text-transparent">
              بأفضل سعر
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-gb-muted max-w-md mx-auto mb-8 leading-relaxed"
          >
            قارن وجمّع — ثم اشترِ من أمازون السعودية بضغطة زر
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/builder"
              className="group inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-l from-gb-primary via-cyan-400 to-gb-secondary text-gb-bg font-bold text-base sm:text-lg shadow-[0_0_40px_rgba(0,229,255,0.25)] hover:shadow-[0_0_60px_rgba(0,229,255,0.4)] transition-all duration-300 active:scale-95"
            >
              <Wrench size={20} />
              ابدأ التجميع
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== STATS BAR (count-up) ========== */}
      <section className="py-5 px-4 border-y border-white/[0.04]">
        <div className="max-w-md mx-auto flex items-center justify-center gap-8 sm:gap-12" ref={partsRef}>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-display font-black text-gb-primary">{partsCount.toLocaleString()}</span>
            <span className="text-[11px] text-gb-muted">قطعة</span>
          </div>
          <div className="w-px h-5 bg-gb-border" />
          <div className="flex items-center gap-2" ref={gamesRef}>
            <span className="text-xl sm:text-2xl font-display font-black text-gb-secondary">{gamesCount}</span>
            <span className="text-[11px] text-gb-muted">لعبة</span>
          </div>
          <div className="w-px h-5 bg-gb-border" />
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-display font-black text-[#ff9900]">Amazon</span>
            <span className="text-[11px] text-gb-muted">أسعار</span>
          </div>
        </div>
        <div className="flex items-center gap-6 justify-center mt-4 text-xs text-white/30">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#00e676] rounded-full animate-pulse" />
            <span>متاح الآن</span>
          </div>
          <div>صُنع في السعودية 🇸🇦</div>
        </div>
      </section>

      {/* ========== QUICK-START BUILDS ========== */}
      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-lg mx-auto">
          <h2 className="font-display text-lg sm:text-xl font-bold text-gb-text mb-2 text-center">ابدأ من هنا</h2>
          <p className="text-xs text-gb-muted text-center mb-6">اختر ميزانيتك وابدأ التجميع</p>

          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {quickBuilds.map((tier, i) => (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="min-w-[140px] snap-start flex-shrink-0"
              >
                <Link
                  to={`/builder?preset=${tier.key}`}
                  className={`block bg-gradient-to-b ${tier.color} border border-white/10 rounded-xl p-4 text-center hover:border-white/20 transition-colors active:scale-95`}
                >
                  <div className="text-2xl mb-2">{tier.icon}</div>
                  <div className="font-bold text-white text-sm">{tier.label}</div>
                  <div className="text-[10px] text-white/40 mt-0.5">{tier.desc}</div>
                  <div className="text-[#00e676] font-bold font-mono text-sm mt-2">{tier.price}+</div>
                  <div className="text-[10px] text-white/30">ر.س</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES — glassmorphism 2×2 ========== */}
      <section className="py-10 sm:py-14 px-4 bg-gb-surface/20">
        <div className="max-w-lg mx-auto">
          <h2 className="font-display text-lg sm:text-xl font-bold text-gb-text mb-6 text-center">ليش PCBux؟</h2>

          <div className="grid grid-cols-2 gap-3">
            {featureCards.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${f.gradient} border ${f.borderColor} backdrop-blur-sm`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gb-bg/60 flex items-center justify-center mb-2.5 ${f.iconColor}`}>
                  <f.icon size={18} />
                </div>
                <h3 className="text-[13px] sm:text-sm font-bold text-gb-text mb-1">{f.title}</h3>
                <p className="text-[10px] sm:text-xs text-gb-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-10 sm:py-14 px-4 pb-28 md:pb-14">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-gb-primary/[0.06] via-gb-secondary/[0.04] to-gb-accent/[0.04] border border-gb-primary/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative z-10">
              <Gamepad2 size={36} className="text-gb-primary mx-auto mb-3 opacity-80" />
              <h2 className="font-display text-lg sm:text-xl font-bold text-gb-text mb-2">جاهز تجمّع؟</h2>
              <p className="text-xs text-gb-muted mb-6">ابدأ الحين وجمّع أفضل PC قيمنق بأحسن سعر</p>
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-l from-gb-primary via-cyan-400 to-gb-secondary text-gb-bg font-bold text-base shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:shadow-[0_0_50px_rgba(0,229,255,0.35)] transition-all active:scale-95"
              >
                <Wrench size={18} />
                ابدأ التجميع
              </Link>
            </div>
          </motion.div>
          <p className="text-center text-[10px] text-white/20 mt-6 px-4 leading-relaxed">
            💡 الأسعار المعروضة تقريبية. اضغط "شيك السعر" للسعر الفعلي المحدّث من أمازون السعودية.
          </p>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Wrench, Shield, Crosshair, Tag, Sparkles, ChevronLeft, Zap, Flame, Monitor, Gem, Crown } from 'lucide-react';
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
  { key: 'budget', label: 'اقتصادية', desc: '1080p سلس', price: '4,200', icon: Zap },
  { key: 'amd_value', label: 'AMD قيمنق', desc: '1440p V-Cache', price: '5,800', icon: Flame },
  { key: 'mid', label: 'متوسطة', desc: '1440p Ultra', price: '7,000', icon: Monitor },
  { key: 'nvidia_premium', label: 'NVIDIA بريميوم', desc: 'RTX + DLSS 4', price: '10,000', icon: Gem },
  { key: 'beast', label: 'خرافية', desc: '4K + ستريم', price: '14,000', icon: Crown },
];

const featureCards = [
  { icon: Shield, title: 'فحص توافق ذكي', desc: 'كل قطعة تنفحص تلقائياً مع الباقي', gradient: 'from-green-500/15 to-emerald-500/5', iconColor: 'text-green-400', borderColor: 'border-green-500/15' },
  { icon: Crosshair, title: 'توقع FPS دقيق', desc: 'بنشماركات حقيقية لـ 17 لعبة', gradient: 'from-cyan-500/15 to-blue-500/5', iconColor: 'text-cyan-400', borderColor: 'border-cyan-500/15' },
  { icon: Tag, title: 'شراء من أمازون', desc: 'كل قطعة فيها رابط مباشر لأمازون السعودية', gradient: 'from-amber-500/15 to-orange-500/5', iconColor: 'text-amber-400', borderColor: 'border-amber-500/15' },
];

export default function HomePage() {
  usePageTitle(null);
  const [partsCount, partsRef] = useCountUp(5338);
  const [gamesCount, gamesRef] = useCountUp(17);

  return (
    <div className="min-h-screen noise-overlay">
      {/* ========== HERO ========== */}
      <section className="relative min-h-[55vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gb-bg">
          <div className="absolute inset-0 bg-grid opacity-20" />
          {/* Primary cyan orb */}
          <div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)', animation: 'orbFloat1 8s ease-in-out infinite' }}
          />
          {/* Secondary green orb */}
          <div
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[130px]"
            style={{ background: 'radial-gradient(circle, rgba(0,230,118,0.06) 0%, transparent 70%)', animation: 'orbFloat2 10s ease-in-out infinite' }}
          />
          {/* Radial glow behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.1)_0%,transparent_70%)] pointer-events-none" />
        </div>

        <div className="relative z-10 text-center px-5 max-w-2xl lg:max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] mb-6">
            <Sparkles size={12} className="text-gb-primary" />
            <span className="text-xs text-gb-muted">أول منصة سعودية لتجميع PC القيمنق</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-5">
            <span className="text-gb-text">جمّع جهازك</span>
            <br />
            <span className="bg-gradient-to-l from-cyan-300 to-cyan-400 bg-clip-text text-transparent">
              بأفضل سعر
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/50 max-w-md mx-auto mb-8 leading-relaxed">
            قارن وجمّع — ثم اشترِ من أمازون السعودية بضغطة زر
          </p>

          {/* CTA */}
          <div>
            <Link
              to="/builder"
              className="inline-flex items-center gap-3 px-10 py-4 sm:px-12 sm:py-5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-[#0a0a14] font-extrabold text-lg sm:text-xl shadow-[0_0_40px_rgba(0,229,255,0.25)] hover:shadow-[0_0_60px_rgba(0,229,255,0.45)] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
            >
              <Wrench size={22} />
              <span>ابدأ التجميع</span>
              <ChevronLeft size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR (count-up) ========== */}
      <section className="py-6 sm:py-8 px-4 border-y border-white/[0.06]">
        <div className="max-w-md lg:max-w-3xl mx-auto flex items-center justify-center gap-10 sm:gap-16" ref={partsRef}>
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-display font-black text-white block">{partsCount.toLocaleString()}</span>
            <span className="text-xs text-gray-400 mt-1">قطعة</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center" ref={gamesRef}>
            <span className="text-3xl sm:text-4xl font-display font-black text-white block">{gamesCount}</span>
            <span className="text-xs text-gray-400 mt-1">لعبة</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-display font-black text-[#ff9900] block">Amazon</span>
            <span className="text-xs text-gray-400 mt-1">أسعار حية</span>
          </div>
        </div>
      </section>

      {/* ========== QUICK-START BUILDS ========== */}
      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-lg lg:max-w-5xl mx-auto">
          <h2 className="font-display text-lg sm:text-xl font-bold text-gb-text mb-2 text-center">ابدأ من هنا</h2>
          <p className="text-xs text-gb-muted text-center mb-6">اختر ميزانيتك وابدأ التجميع</p>

          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-5 lg:overflow-visible stagger-children">
            {quickBuilds.map((tier) => (
              <div key={tier.key} className="min-w-[140px] snap-start flex-shrink-0">
                <Link
                  to={`/builder?preset=${tier.key}`}
                  className="block bg-gb-card/60 border border-white/[0.06] rounded-xl p-4 text-center hover:border-gb-primary/30 hover:bg-gb-primary/5 hover:scale-[1.04] hover:-translate-y-1 transition-all duration-300 active:scale-95"
                >
                  <tier.icon className="w-6 h-6 text-gb-primary mx-auto mb-2" strokeWidth={1.5} />
                  <div className="font-bold text-white text-sm">{tier.label}</div>
                  <div className="text-xs text-white/50 mt-0.5">{tier.desc}</div>
                  <div className="text-[#00e676] font-bold font-mono text-sm mt-2">{tier.price}+</div>
                  <div className="text-xs text-gray-400">ر.س</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES — glassmorphism 2×2 ========== */}
      <section className="py-10 sm:py-14 px-4 bg-gb-surface/20">
        <div className="max-w-lg lg:max-w-4xl mx-auto">
          <h2 className="font-display text-lg sm:text-xl font-bold text-gb-text mb-6 text-center">ليش PCBux؟</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 stagger-children">
            {featureCards.map((f, i) => (
              <div
                key={i}
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${f.gradient} border ${f.borderColor} backdrop-blur-sm hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gb-bg/60 flex items-center justify-center mb-2.5 ${f.iconColor}`}>
                  <f.icon size={18} />
                </div>
                <h3 className="text-sm sm:text-sm font-bold text-gb-text mb-1">{f.title}</h3>
                <p className="text-xs sm:text-xs text-gb-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

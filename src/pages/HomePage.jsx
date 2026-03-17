import { Link } from 'react-router-dom';
import { Wrench, Cpu, BarChart3, Tag, Zap, Shield, ArrowLeft, Gamepad2, Sparkles, ChevronDown } from 'lucide-react';
import { PRESETS, loadPreset, calcTotal } from '../utils/db';
import { useBuild } from '../hooks/BuildContext';

const features = [
  { icon: Wrench, title: 'تجميع ذكي', desc: 'حدد ميزانيتك وخلنا نختار لك أفضل القطع المتوافقة', color: 'from-cyan-500 to-blue-500' },
  { icon: Shield, title: 'فحص التوافق', desc: 'نتأكد إن كل قطعة متوافقة مع باقي التجميعة تلقائياً', color: 'from-purple-500 to-pink-500' },
  { icon: BarChart3, title: 'مقارنة أداء', desc: 'قارن بين القطع بناءً على البنشماركات الحقيقية', color: 'from-orange-500 to-red-500' },
  { icon: Tag, title: 'أسعار محدّثة', desc: 'أسعار من 5 متاجر سعودية — جرير، اكسترا، نون وأكثر', color: 'from-green-500 to-emerald-500' },
];

const buildTiers = [
  { key: 'budget', gradient: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', accent: 'text-green-400' },
  { key: 'midRange', gradient: 'from-blue-500/20 to-purple-500/20', border: 'border-blue-500/30', accent: 'text-blue-400' },
  { key: 'highEnd', gradient: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', accent: 'text-purple-400' },
  { key: 'enthusiast', gradient: 'from-gb-accent/20 to-orange-500/20', border: 'border-gb-accent/30', accent: 'text-gb-accent' },
];

export default function HomePage() {
  const { loadBuild } = useBuild();

  const handleLoadBuild = (tierKey) => {
    const buildComponents = loadPreset(tierKey);
    if (Object.keys(buildComponents).length > 0) {
      loadBuild(buildComponents);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gb-bg">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gb-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gb-secondary/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gb-card/80 backdrop-blur border border-gb-border mb-8 animate-slide-up">
            <Sparkles size={14} className="text-gb-primary" />
            <span className="text-xs text-gb-muted">أول منصة سعودية لتجميع كمبيوترات القيمنق</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-gb-text">جمّع جهازك</span>
            <br />
            <span className="bg-gradient-to-l from-gb-primary via-gb-secondary to-gb-accent bg-clip-text text-transparent">
              بأفضل سعر
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gb-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            قارن الأسعار من أفضل المتاجر السعودية، تأكد من التوافق، واحصل على أفضل أداء لميزانيتك
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up w-full sm:w-auto px-2 sm:px-0" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/builder"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-l from-gb-primary to-cyan-400 text-gb-bg font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-gb-primary/25 transition-all"
            >
              <Wrench size={20} />
              ابدأ التجميع
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/components"
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl bg-gb-card border border-gb-border text-gb-text font-bold text-base sm:text-lg hover:border-gb-primary/30 transition-all"
            >
              <Cpu size={22} />
              تصفح القطع
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown size={24} className="text-gb-muted" />
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gb-text mb-3">ليش GamerBuild؟</h2>
            <p className="text-gb-muted">كل اللي تحتاجه عشان تجمّع أفضل جهاز قيمنق</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-gb-card border border-gb-border card-hover"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon size={22} className="text-white" />
                </div>
                <h3 className="text-base font-bold text-gb-text mb-2">{f.title}</h3>
                <p className="text-sm text-gb-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Builds */}
      <section className="py-12 sm:py-20 px-4 bg-gb-surface/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gb-text mb-3">تجميعات جاهزة</h2>
            <p className="text-gb-muted">اختر الفئة اللي تناسبك وابدأ فوراً</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {buildTiers.map(({ key, gradient, border, accent }) => {
              const preset = PRESETS.find(p => p.key === key);
              if (!preset) return null;
              const buildComponents = loadPreset(key);
              const total = calcTotal(buildComponents);

              return (
                <div
                  key={key}
                  className={`relative p-4 sm:p-6 rounded-2xl bg-gradient-to-br ${gradient} border ${border} card-hover cursor-pointer`}
                  onClick={() => handleLoadBuild(key)}
                >
                  <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">{preset.icon}</span>
                  <h3 className={`text-sm sm:text-lg font-bold ${accent} mb-0.5 sm:mb-1`}>{preset.name}</h3>
                  <p className="text-xs sm:text-sm text-gb-muted mb-2 sm:mb-3 line-clamp-2">{preset.desc}</p>
                  <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/5">
                    <span className="text-[10px] sm:text-xs text-gb-muted hidden sm:block">{preset.budget} ريال</span>
                    <span className={`text-xs sm:text-sm font-display font-bold ${accent}`}>{total.toLocaleString()} ر.س</span>
                  </div>
                  <Link
                    to="/builder"
                    onClick={(e) => { e.stopPropagation(); handleLoadBuild(key); }}
                    className={`mt-4 block text-center py-2.5 rounded-xl text-sm font-bold transition-all border ${border} hover:bg-white/5`}
                  >
                    اختر هذي التجميعة
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stores */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gb-text mb-3">أسعار من أمازون السعودية</h2>
          <p className="text-gb-muted mb-6 sm:mb-10 text-sm">أسعار محدّثة + رابط مباشر لكل قطعة</p>
          <div className="flex items-center justify-center">
            <a href="https://www.amazon.sa/?tag=meshal039-21" target="_blank" rel="noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#ff9900]/10 border border-[#ff9900]/20 hover:bg-[#ff9900]/20 transition-all">
              <span className="text-2xl">🛒</span>
              <div>
                <p className="text-[#ff9900] font-bold text-base">Amazon.sa</p>
                <p className="text-gb-muted text-xs">توصيل سريع + ضمان + إرجاع</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 px-4 pb-24 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gb-primary/10 via-gb-secondary/10 to-gb-accent/10 border border-gb-primary/20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative z-10">
              <Gamepad2 size={48} className="text-gb-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gb-text mb-3">جاهز تجمّع جهازك؟</h2>
              <p className="text-gb-muted mb-8">ابدأ الحين وجمّع أفضل كمبيوتر قيمنق بأحسن سعر</p>
              <Link
                to="/builder"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-l from-gb-primary to-cyan-400 text-gb-bg font-bold text-lg hover:shadow-lg hover:shadow-gb-primary/25 transition-all"
              >
                <Wrench size={22} />
                ابدأ التجميع الحين
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

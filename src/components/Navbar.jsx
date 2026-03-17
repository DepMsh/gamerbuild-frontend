import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, Wrench, BarChart3, Tag, Gamepad2, Home, Activity, Crosshair, ArrowLeftRight, TrendingDown } from 'lucide-react';
import { useBuild } from '../hooks/BuildContext';

// Desktop shows all, mobile bottom nav shows top 5
const allLinks = [
  { path: '/', label: 'الرئيسية', mobileLabel: 'الرئيسية', icon: Home, mobile: true },
  { path: '/builder', label: 'جمّع جهازك', mobileLabel: 'جمّع', icon: Wrench, mobile: true },
  { path: '/components', label: 'القطع', mobileLabel: 'القطع', icon: Cpu, mobile: false },
  { path: '/analysis', label: 'التحليل', mobileLabel: 'تحليل', icon: Activity, mobile: true },
  { path: '/games', label: 'الألعاب', mobileLabel: 'ألعاب', icon: Crosshair, mobile: true },
  { path: '/prices', label: 'الأسعار', mobileLabel: 'أسعار', icon: TrendingDown, mobile: false },
  { path: '/compare', label: 'قارن', mobileLabel: 'قارن', icon: ArrowLeftRight, mobile: false },
  { path: '/deals', label: 'العروض', mobileLabel: 'عروض', icon: Tag, mobile: true },
];
const mobileLinks = allLinks.filter(l => l.mobile);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { selectedCount, totalPrice } = useBuild();

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gb-bg/80 backdrop-blur-xl border-b border-gb-border safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-gb-primary to-gb-secondary flex items-center justify-center group-hover:animate-glow transition-all">
                <Gamepad2 size={18} className="text-gb-bg" />
              </div>
              <span className="font-display text-base sm:text-lg font-bold tracking-wider">
                <span className="text-gb-primary">GAMER</span>
                <span className="text-gb-text">BUILD</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {allLinks.map(({ path, label, icon: Icon }) => {
                const active = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${active
                        ? 'bg-gb-primary/10 text-gb-primary border border-gb-primary/20'
                        : 'text-gb-muted hover:text-gb-text hover:bg-gb-card'
                      }`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Build summary pill — desktop */}
            <div className="hidden md:flex items-center gap-3">
              {selectedCount > 0 && (
                <Link
                  to="/builder"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gb-card border border-gb-border hover:border-gb-primary/30 transition-all"
                >
                  <div className="w-5 h-5 rounded-full bg-gb-primary/20 text-gb-primary text-xs font-bold flex items-center justify-center">
                    {selectedCount}
                  </div>
                  <span className="text-sm text-gb-muted">{totalPrice.toLocaleString()} ر.س</span>
                </Link>
              )}
            </div>

            {/* Mobile: build pill + menu button */}
            <div className="flex md:hidden items-center gap-2">
              {selectedCount > 0 && (
                <Link
                  to="/builder"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gb-card border border-gb-border text-xs"
                >
                  <span className="w-4 h-4 rounded-full bg-gb-primary/20 text-gb-primary text-[10px] font-bold flex items-center justify-center">
                    {selectedCount}
                  </span>
                  <span className="text-gb-primary font-bold">{totalPrice.toLocaleString()}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile bottom navigation bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gb-bg/90 backdrop-blur-xl border-t border-gb-border" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
        <div className="flex items-center justify-around h-16 px-2">
          {mobileLinks.map(({ path, mobileLabel, icon: Icon }) => {
            const active = location.pathname === path;
            const isBuilder = path === '/builder';
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 rounded-xl transition-all min-h-0
                  ${active ? 'text-gb-primary' : 'text-gb-muted'}`}
              >
                <div className={`relative ${isBuilder && selectedCount > 0 ? '' : ''}`}>
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                  {isBuilder && selectedCount > 0 && (
                    <span className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-gb-accent text-white text-[8px] font-bold flex items-center justify-center">
                      {selectedCount}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] leading-tight ${active ? 'font-bold' : 'font-medium'}`}>{mobileLabel}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

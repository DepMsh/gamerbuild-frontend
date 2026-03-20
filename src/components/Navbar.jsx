import { Link, useLocation } from 'react-router-dom';
import { Cpu, Wrench, Home, Activity, Crosshair, Save } from 'lucide-react';
import { useBuild } from '../hooks/BuildContext';

const navLinks = [
  { path: '/', label: 'الرئيسية', icon: Home },
  { path: '/builder', label: 'جمّع جهازك', icon: Wrench },
  { path: '/components', label: 'القطع', icon: Cpu },
  { path: '/analysis', label: 'التحليل', icon: Activity },
  { path: '/games', label: 'الألعاب', icon: Crosshair },
];

const mobileLinks = [
  { path: '/', label: 'الرئيسية', icon: Home },
  { path: '/builder', label: 'جمّع', icon: Wrench },
  { path: '/analysis', label: 'تحليل', icon: Activity },
  { path: '/games', label: 'ألعاب', icon: Crosshair },
  { path: '/my-builds', label: 'تجميعاتي', icon: Save },
];

export default function Navbar() {
  const location = useLocation();
  const { selectedCount, totalPrice } = useBuild();

  return (
    <>
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gb-bg/60 backdrop-blur-2xl border-b border-white/[0.04] safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/favicon.svg" alt="PCBux" className="w-8 h-8 rounded-lg transition-all group-hover:shadow-lg group-hover:shadow-gb-primary/20" />
              <span className="font-display text-sm sm:text-base font-bold tracking-wider">
                <span className="text-gb-primary">PC</span>
                <span className="text-gb-text">BUX</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-gb-accent/20 text-gb-accent border border-gb-accent/30 leading-none">BETA</span>
            </Link>

            {/* Desktop nav — 5 links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map(({ path, label, icon: Icon }) => {
                const active = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`relative flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium transition-all
                      ${active ? 'text-gb-primary' : 'text-gb-muted hover:text-gb-text'}`}
                  >
                    <Icon size={14} />
                    {label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gb-primary shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Build summary pill */}
            <div className="flex items-center">
              {selectedCount > 0 && (
                <Link
                  to="/builder"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gb-card/80 border border-gb-border/50 hover:border-gb-primary/30 transition-all"
                >
                  <div className="w-5 h-5 rounded-full bg-gb-primary/20 text-gb-primary text-[10px] font-bold flex items-center justify-center">
                    {selectedCount}
                  </div>
                  <span className="text-xs text-gb-primary font-display font-bold">{totalPrice.toLocaleString()}</span>
                  <span className="text-[10px] text-gb-muted">ر.س</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gb-bg/80 backdrop-blur-2xl border-t border-white/[0.04]" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
        <div className="flex items-center justify-around h-16 px-1">
          {mobileLinks.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            const isBuilder = path === '/builder';
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-all active:scale-90 min-h-[44px]
                  ${active ? 'text-gb-primary' : 'text-gb-muted'}`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
                  {isBuilder && selectedCount > 0 && (
                    <>
                      <span className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-gb-accent text-white text-[8px] font-bold flex items-center justify-center">
                        {selectedCount}
                      </span>
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-gb-primary animate-pulse shadow-[0_0_6px_rgba(0,229,255,0.6)]" />
                    </>
                  )}
                </div>
                <span className={`text-[10px] leading-tight ${active ? 'font-bold' : ''}`}>{label}</span>
                {active && (
                  <span className="absolute bottom-1 w-5 h-[3px] rounded-full bg-gb-primary shadow-[0_0_8px_2px_rgba(0,229,255,0.4)]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

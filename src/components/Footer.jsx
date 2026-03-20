import { Gamepad2, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gb-surface border-t border-gb-border mt-12 sm:mt-20 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gb-primary to-gb-secondary flex items-center justify-center">
                <Gamepad2 size={18} className="text-gb-bg" />
              </div>
              <span className="font-display text-base font-bold tracking-wider">
                <span className="text-gb-primary">PC</span><span className="text-gb-text">BUX</span>
              </span>
            </div>
            <p className="text-gb-muted text-sm leading-relaxed">
              أفضل أداة لتجميع كمبيوتر قيمنق في السعودية.
              <br />قارن الأسعار واختر القطع المتوافقة بسهولة.
            </p>
          </div>

          <div>
            <h4 className="text-gb-text font-bold mb-4">روابط سريعة</h4>
            <div className="space-y-2">
              {[
                { to: '/builder', label: 'جمّع جهازك' },
                { to: '/components', label: 'تصفح القطع' },
                { to: '/compare', label: 'قارن القطع' },
                { to: '/deals', label: 'العروض' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="block text-gb-muted hover:text-gb-primary text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gb-text font-bold mb-4">المتجر</h4>
            <a href="https://www.amazon.sa/?tag=meshal039-21" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#ff9900] text-sm font-bold hover:text-[#ffb340] transition-colors">
              🛒 Amazon.sa
            </a>
            <p className="text-gb-muted text-xs mt-2">توصيل سريع + ضمان + إرجاع</p>
            <p className="text-gb-muted/50 text-[10px] mt-3 leading-relaxed">الأسعار المعروضة تقريبية. الأسعار الفعلية والتوفر من أمازون السعودية.</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gb-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gb-muted text-xs">
            © 2026 PCBux — صنع بـ ❤️ في السعودية
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gb-muted hover:text-gb-primary transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

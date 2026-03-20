import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#060610] border-t border-[#1a1a2e] mt-12 sm:mt-20 pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Column 1: Brand + About */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <img src="/favicon.svg" alt="PCBux" className="w-8 h-8 rounded-lg" />
              <span className="font-display text-base font-bold tracking-wider">
                <span className="text-gb-primary">PC</span><span className="text-gb-text">BUX</span>
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              أول منصة سعودية متخصصة في تجميع كمبيوترات القيمنق. نساعدك تختار أفضل القطع المتوافقة بأحسن سعر من أمازون السعودية — مع فحص توافق ذكي، تحليل أداء، وتوقع FPS لألعابك المفضلة.
            </p>
            <p className="text-xs text-white/25">
              مشروع سعودي يهدف لتبسيط عالم تجميع الكمبيوتر للجميع.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="text-sm font-bold text-white/60 mb-3">روابط سريعة</h4>
            <div className="flex flex-col gap-2">
              <Link to="/builder" className="text-sm text-white/40 hover:text-[#00e5ff] transition-colors">جمّع جهازك</Link>
              <Link to="/components" className="text-sm text-white/40 hover:text-[#00e5ff] transition-colors">تصفح القطع</Link>
              <Link to="/compare" className="text-sm text-white/40 hover:text-[#00e5ff] transition-colors">قارن القطع</Link>
              <Link to="/my-builds" className="text-sm text-white/40 hover:text-[#00e5ff] transition-colors">تجميعاتي</Link>
            </div>
          </div>
        </div>

        {/* Bottom section: Social + Legal */}
        <div className="border-t border-[#1a1a2e] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a href="https://x.com/lldealz" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-white/40 hover:text-[#00e5ff] transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @lldealz
            </a>
            <a href="https://www.amazon.sa/?tag=meshal039-21" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-sm text-white/40 hover:text-[#00e676] transition-colors">
              🛒 Amazon.sa
            </a>
          </div>

          {/* Copyright + Disclaimer */}
          <div className="text-center sm:text-left">
            <div className="text-xs text-white/20">
              © 2026 PCBux — صنع بـ ❤️ في السعودية 🇸🇦
            </div>
            <div className="text-[10px] text-white/15 mt-1">
              الأسعار تقريبية. الأسعار الفعلية والتوفر من أمازون السعودية.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

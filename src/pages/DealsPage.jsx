import { Tag, ExternalLink } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

export default function DealsPage() {
  usePageTitle('العروض');

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-[#ff9900]/10 flex items-center justify-center mx-auto mb-5">
          <Tag size={28} className="text-[#ff9900]" />
        </div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-gb-text mb-2">العروض قريباً</h1>
        <p className="text-gb-muted text-sm mb-6 leading-relaxed">
          نشتغل على ربط العروض الحية من أمازون السعودية.<br />
          لين ذاك الوقت، شيك العروض مباشرة:
        </p>
        <a
          href="https://www.amazon.sa/deals?tag=meshal039-21"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff9900] text-gb-bg font-bold text-sm hover:bg-[#e8890a] transition-all active:scale-95"
        >
          شوف عروض أمازون <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

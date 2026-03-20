import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFoundPage() {
  usePageTitle('الصفحة مو موجودة');

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-black font-mono bg-gradient-to-r from-[#00e5ff] to-[#7c4dff] bg-clip-text text-transparent mb-4">
        404
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">
        الصفحة مو موجودة
      </h1>
      <p className="text-white/40 mb-8 max-w-md">
        يمكن الرابط غلط أو الصفحة انحذفت. لا تقلق — جمّع جهازك من هنا!
      </p>
      <div className="flex gap-3">
        <Link to="/builder"
          className="bg-[#00e5ff] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#00e5ff]/80 transition-colors">
          جمّع جهازك
        </Link>
        <Link to="/"
          className="border border-[#1a1a2e] text-white/60 px-6 py-3 rounded-xl hover:border-[#00e5ff]/30 transition-colors">
          الرئيسية
        </Link>
      </div>
    </div>
  );
}

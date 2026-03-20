import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBuild } from '../hooks/BuildContext';
import { Wrench } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

export default function MyBuildsPage() {
  usePageTitle('تجميعاتي');
  const { getSavedBuilds, deleteSavedBuild } = useBuild();
  const [builds, setBuilds] = useState(getSavedBuilds());
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    deleteSavedBuild(id);
    setBuilds(getSavedBuilds());
    setDeleteConfirm(null);
  };

  const handleCopyLink = (encoded) => {
    const url = `${window.location.origin}/b/${encoded}`;
    navigator.clipboard.writeText(url);
    alert('تم نسخ الرابط! 📋');
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-lg sm:text-2xl font-bold text-gb-text mb-1">💾 تجميعاتي</h1>
        <p className="text-xs text-gb-muted mb-6">التجميعات المحفوظة على جهازك</p>

        {builds.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🖥️</div>
            <p className="text-gb-muted mb-4">ما عندك تجميعات محفوظة بعد</p>
            <Link to="/builder" className="inline-flex items-center gap-2 bg-gradient-to-l from-gb-primary to-gb-secondary text-gb-bg font-bold rounded-xl px-6 py-3 text-sm">
              <Wrench size={16} /> ابدأ التجميع
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {builds.map(b => (
              <div key={b.id} className="bg-[#0f1019] border border-[#1a1a2e] rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-white text-sm">{b.name}</h3>
                    <p className="text-[10px] text-white/30 mt-0.5">{b.date}</p>
                  </div>
                  <span className="text-[#00e676] font-bold font-mono text-sm">
                    ~{b.totalPrice?.toLocaleString()} ر.س
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {b.parts?.slice(0, 4).map((p, i) => (
                    <span key={i} className="text-[10px] bg-white/5 text-white/50 px-2 py-0.5 rounded-full truncate max-w-[140px]">
                      {p.name}
                    </span>
                  ))}
                  {b.parts?.length > 4 && (
                    <span className="text-[10px] text-white/30">+{b.parts.length - 4}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link to={`/builder?b=${encodeURIComponent(b.encoded)}`}
                    className="flex-1 text-center bg-[#00e5ff]/10 text-[#00e5ff] rounded-lg py-2 text-xs font-bold">
                    🔧 فتح وتعديل
                  </Link>
                  <button onClick={() => handleCopyLink(b.encoded)}
                    className="flex-1 text-center bg-white/5 text-white/50 rounded-lg py-2 text-xs font-bold">
                    🔗 نسخ الرابط
                  </button>
                  <button onClick={() => deleteConfirm === b.id ? handleDelete(b.id) : setDeleteConfirm(b.id)}
                    className="px-3 text-center bg-red-500/10 text-red-400 rounded-lg py-2 text-xs font-bold">
                    {deleteConfirm === b.id ? '⚠️ تأكيد' : '🗑️'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

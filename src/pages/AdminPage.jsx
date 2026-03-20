import { useState, useEffect } from 'react';
import { getAnalytics, clearAnalytics } from '../utils/analytics';
import usePageTitle from '../hooks/usePageTitle';

export default function AdminPage() {
  usePageTitle('لوحة التحكم');
  const [data, setData] = useState({});
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);

  const ADMIN_PASS = 'Mm1126699880';

  useEffect(() => {
    if (authed) setData(getAnalytics());
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-[#0f1019] border border-[#1a1a2e] rounded-2xl p-8 max-w-sm w-full mx-4">
          <h1 className="text-xl font-bold text-white text-center mb-4">لوحة التحكم</h1>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && password === ADMIN_PASS) setAuthed(true); }}
            placeholder="كلمة المرور"
            className="w-full bg-[#060610] border border-[#1a1a2e] rounded-xl px-4 py-3 text-white text-center mb-3"
          />
          <button
            onClick={() => { if (password === ADMIN_PASS) setAuthed(true); }}
            className="w-full bg-[#00e5ff] text-black font-bold rounded-xl py-3"
          >
            دخول
          </button>
        </div>
      </div>
    );
  }

  const dates = Object.keys(data).sort().reverse();
  const today = dates[0] || '';
  const todayData = data[today] || {};

  const totals = {};
  dates.forEach(date => {
    Object.entries(data[date]).forEach(([event, count]) => {
      totals[event] = (totals[event] || 0) + count;
    });
  });

  const statCards = [
    { label: 'ضغطات أمازون', key: 'click_amazon', color: '#00e676', important: true },
    { label: 'تجميعات مكتملة', key: 'complete_build', color: '#00e5ff' },
    { label: 'قطع مختارة', key: 'select_part', color: '#7c4dff' },
    { label: 'تجميعات جاهزة', key: 'load_preset', color: '#ffc107' },
    { label: 'تجميعات محفوظة', key: 'save_build', color: '#ff9800' },
    { label: 'مشاركات', key: 'share_build', color: '#e91e63' },
    { label: 'شاف التحليل', key: 'view_analysis', color: '#9c27b0' },
    { label: 'شاف FPS', key: 'view_fps', color: '#4caf50' },
    { label: 'فتح رابط مشارك', key: 'open_shared_build', color: '#ff5722' },
  ];

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
          <button onClick={() => { clearAnalytics(); setData({}); }}
            className="text-xs text-red-400/50 hover:text-red-400">مسح البيانات</button>
        </div>

        {/* Today's highlight */}
        <div className="bg-gradient-to-b from-[#00e5ff]/10 to-transparent border border-[#00e5ff]/20 rounded-2xl p-5 mb-6">
          <div className="text-sm text-white/50 mb-2">اليوم {today}</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-[#00e676]">{todayData.click_amazon || 0}</div>
              <div className="text-[10px] text-white/40">ضغطات أمازون</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-[#00e5ff]">{todayData.complete_build || 0}</div>
              <div className="text-[10px] text-white/40">تجميعات مكتملة</div>
            </div>
          </div>
        </div>

        {/* All-time stats */}
        <h2 className="text-sm font-bold text-white/50 mb-3">اجمالي (آخر 30 يوم)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {statCards.map(stat => (
            <div key={stat.key} className={`bg-[#0f1019] border border-[#1a1a2e] rounded-xl p-4 ${stat.important ? 'col-span-2 sm:col-span-1' : ''}`}>
              <div className="text-2xl font-bold font-mono" style={{ color: stat.color }}>
                {totals[stat.key] || 0}
              </div>
              <div className="text-[11px] text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Daily breakdown */}
        <h2 className="text-sm font-bold text-white/50 mb-3">يوميا</h2>
        <div className="space-y-2">
          {dates.slice(0, 14).map(date => (
            <div key={date} className="bg-[#0f1019] border border-[#1a1a2e] rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50">{date}</span>
                <span className="text-xs text-[#00e676] font-mono font-bold">
                  {data[date].click_amazon || 0} clicks
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(data[date]).map(([event, count]) => (
                  <span key={event} className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full">
                    {event}: {count}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {dates.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <div className="text-3xl mb-3">---</div>
            <p>ما فيه بيانات بعد</p>
          </div>
        )}

        {/* Google Analytics link */}
        <div className="mt-8 text-center">
          <a href="https://analytics.google.com/" target="_blank" rel="noopener"
            className="text-xs text-[#00e5ff]/50 hover:text-[#00e5ff]">
            فتح Google Analytics الكامل
          </a>
        </div>
      </div>
    </div>
  );
}

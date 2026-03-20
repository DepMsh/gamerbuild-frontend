import { useState } from 'react';
import usePageTitle from '../hooks/usePageTitle';

export default function PricesPage() {
  usePageTitle('اختبار الأسعار');
  const [asins, setAsins] = useState('B0DVZSG8D5');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const test = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asins: asins.split(',').map(a => a.trim()).filter(Boolean) }),
      });
      setResult(await res.json());
    } catch (e) {
      setResult({ error: e.message, ok: false });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-24 md:pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-xl font-bold text-gb-text mb-2">اختبار أسعار أمازون الحية</h1>
        <p className="text-xs text-gb-muted mb-6">Creators API v3.2 — creatorsapi.amazon</p>

        <input
          value={asins}
          onChange={e => setAsins(e.target.value)}
          className="w-full bg-gb-card border border-gb-border rounded-xl px-4 py-3 text-gb-text placeholder-gb-muted mb-4 focus:outline-none focus:border-gb-primary/40"
          placeholder="B0DVZSG8D5, B0DWGWN8GY"
        />

        <button
          onClick={test}
          disabled={loading}
          className="w-full bg-gradient-to-r from-gb-primary to-gb-secondary text-gb-bg font-bold px-6 py-3 rounded-xl mb-6 disabled:opacity-50 active:scale-95 transition-transform"
        >
          {loading ? 'يسحب من أمازون...' : 'اسحب الأسعار الحية'}
        </button>

        {result && (
          <div className="bg-gb-card border border-gb-border rounded-xl p-4">
            {result.ok ? (
              <div>
                <p className="text-[#00e676] font-bold text-lg mb-4">
                  {result.count} قطعة — {new Date(result.timestamp).toLocaleTimeString('ar-SA')}
                </p>
                {Object.values(result.prices).map(p => (
                  <div key={p.asin} className="border-b border-gb-border py-3 last:border-0">
                    <div className="font-bold text-sm text-gb-text">{p.name || p.asin}</div>
                    {p.error ? (
                      <div className="text-red-400 text-sm">{p.error}</div>
                    ) : (
                      <>
                        <div className="text-2xl text-[#00e676] font-bold my-1">{p.price_display || `${p.price} ${p.currency}`}</div>
                        <div className="text-xs text-gb-muted flex gap-3">
                          <span>ASIN: {p.asin}</span>
                          <span>{p.live ? 'حي' : 'ثابت'}</span>
                          {p.brand && <span>{p.brand}</span>}
                        </div>
                        {p.image_url && <img src={p.image_url} className="w-16 h-16 object-contain mt-2" alt="" />}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <pre className="text-red-400 text-xs whitespace-pre-wrap overflow-auto max-h-80" dir="ltr">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

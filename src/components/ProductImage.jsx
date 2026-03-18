import { useState } from 'react';

const catEmoji = {
  cpu: '🧠', gpu: '🎮', motherboard: '📟', ram: '💾',
  ssd: '💿', psu: '⚡', cooler: '❄️', case: '📦',
};

const catGradient = {
  cpu: 'from-teal-900/60 to-teal-950/80',
  gpu: 'from-purple-900/60 to-purple-950/80',
  motherboard: 'from-amber-900/60 to-amber-950/80',
  ram: 'from-rose-900/60 to-rose-950/80',
  ssd: 'from-slate-800/60 to-slate-900/80',
  psu: 'from-blue-900/60 to-blue-950/80',
  cooler: 'from-fuchsia-900/60 to-fuchsia-950/80',
  case: 'from-zinc-800/60 to-zinc-900/80',
};

function getCatKey(id) {
  if (!id) return 'cpu';
  const p = id.split('-')[0];
  if (p === 'mb') return 'motherboard';
  if (p === 'cool') return 'cooler';
  return p;
}

export default function ProductImage({ src, componentId, className = '', size = 'md' }) {
  const [failed, setFailed] = useState(false);

  const cat = getCatKey(componentId);
  const emoji = catEmoji[cat] || '📦';
  const gradient = catGradient[cat] || catGradient.cpu;

  const emojiSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-5xl' : 'text-3xl';

  if (!src || failed) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <span className={`${emojiSize} opacity-80 select-none`}>{emoji}</span>
      </div>
    );
  }

  return (
    <div className={`bg-white/90 flex items-center justify-center overflow-hidden ${className}`}>
      <img
        src={src}
        alt=""
        loading="lazy"
        className="w-full h-full object-contain"
        onError={() => setFailed(true)}
        onLoad={(e) => {
          if (e.target.naturalWidth < 10 || e.target.naturalHeight < 10) {
            setFailed(true);
          }
        }}
      />
    </div>
  );
}

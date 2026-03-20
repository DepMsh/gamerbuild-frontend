import { useEffect, useState } from 'react';

export default function GaugeMeter({ value = 0, max = 100, size = 200, label = '', sublabel = '', className = '' }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const pct = Math.min(animatedValue / max, 1);
  const radius = (size - 20) / 2;
  const circumference = Math.PI * radius; // half circle
  const dashOffset = circumference * (1 - pct);

  // Color based on value percentage
  const getColor = (v) => {
    if (v <= 5) return '#00e676';
    if (v <= 15) return '#ffc107';
    if (v <= 25) return '#ff9800';
    return '#f44336';
  };

  const color = getColor(value);
  const cx = size / 2;
  const cy = size / 2 + 10;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Background arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          filter="url(#glow)"
          style={{ transition: 'stroke-dashoffset 1.2s ease-out, stroke 0.5s ease' }}
        />
        {/* Center number */}
        <text x={cx} y={cy - 20} textAnchor="middle" fill="white" fontSize={size * 0.22} fontWeight="800" fontFamily="Orbitron, monospace">
          {Math.round(value)}%
        </text>
        {/* Sublabel */}
        <text x={cx} y={cy - 2} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12" fontFamily="Tajawal, sans-serif">
          {sublabel}
        </text>
      </svg>
      {label && (
        <div className="text-xs text-white/50 font-semibold mt-1 tracking-wide">{label}</div>
      )}
    </div>
  );
}

import { motion } from 'framer-motion';

// Semi-circular gauge (270° arc) — used in Analysis page
// Props: value (0-100), label, color, size (default 180)
export default function GaugeMeter({ value = 0, label = '', sublabel = '', color = '#00e676', size = 180 }) {
  const strokeWidth = size * 0.055;
  const radius = (size / 2) - strokeWidth - 4;
  const center = size / 2;

  // 270° arc: starts at 135° (bottom-left), ends at 405° (bottom-right)
  const startAngle = 135;
  const endAngle = 405;
  const totalAngle = endAngle - startAngle; // 270°

  const toRad = (deg) => (deg * Math.PI) / 180;

  const arcPath = (startDeg, endDeg) => {
    const x1 = center + radius * Math.cos(toRad(startDeg));
    const y1 = center + radius * Math.sin(toRad(startDeg));
    const x2 = center + radius * Math.cos(toRad(endDeg));
    const y2 = center + radius * Math.sin(toRad(endDeg));
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const bgPath = arcPath(startAngle, endAngle);
  const valueAngle = startAngle + (value / 100) * totalAngle;

  // Circumference of the arc
  const arcLen = (totalAngle / 360) * 2 * Math.PI * radius;
  const valueLen = (value / 100) * arcLen;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size * 0.75 }}>
        <svg width={size} height={size * 0.75} viewBox={`0 0 ${size} ${size * 0.85}`} className="overflow-visible">
          {/* Glow filter */}
          <defs>
            <filter id={`glow-${label}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background arc */}
          <path
            d={bgPath}
            fill="none"
            stroke="#1a1a2e"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Value arc */}
          <motion.path
            d={bgPath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={arcLen}
            initial={{ strokeDashoffset: arcLen }}
            animate={{ strokeDashoffset: arcLen - valueLen }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            filter={`url(#glow-${label})`}
            style={{ opacity: 0.9 }}
          />

          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map(tick => {
            const angle = startAngle + (tick / 100) * totalAngle;
            const innerR = radius - strokeWidth;
            const outerR = radius + strokeWidth * 0.5;
            const x1 = center + innerR * Math.cos(toRad(angle));
            const y1 = center + innerR * Math.sin(toRad(angle));
            const x2 = center + outerR * Math.cos(toRad(angle));
            const y2 = center + outerR * Math.sin(toRad(angle));
            return (
              <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#2a2a3e" strokeWidth={1.5} />
            );
          })}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1" style={{ height: size * 0.75 }}>
          <motion.span
            className="font-display font-black leading-none"
            style={{ color, fontSize: size * 0.25 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {value}
          </motion.span>
          {sublabel && (
            <span className="text-gb-muted mt-1" style={{ fontSize: size * 0.065 }}>
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {label && (
        <span className="text-xs text-gb-muted font-medium -mt-1">{label}</span>
      )}
    </div>
  );
}

// Source: Tom's Hardware CPU Benchmark Hierarchy + review aggregation, March 2026
// Gaming: measured with RTX 5090 to isolate CPU performance. 9800X3D = 100.
// Multi: Cinebench R23 nT relative. 9950X = 100.

export const CPU_BENCHMARKS = {
  // AMD Ryzen 9000 Series
  'Ryzen 9 9950X3D':  { gamingScore: 100, multiScore: 98,  singleScore: 95, tier: 'flagship' },
  'Ryzen 9 9950X':    { gamingScore: 73,  multiScore: 100, singleScore: 90, tier: 'high' },
  'Ryzen 9 9900X3D':  { gamingScore: 98,  multiScore: 85,  singleScore: 93, tier: 'flagship' },
  'Ryzen 9 9900X':    { gamingScore: 72,  multiScore: 88,  singleScore: 88, tier: 'high' },
  'Ryzen 7 9800X3D':  { gamingScore: 100, multiScore: 68,  singleScore: 92, tier: 'flagship' },
  'Ryzen 7 9700X':    { gamingScore: 78,  multiScore: 62,  singleScore: 85, tier: 'mid' },
  'Ryzen 5 9600X':    { gamingScore: 74,  multiScore: 48,  singleScore: 83, tier: 'mid' },

  // AMD Ryzen 7000 Series
  'Ryzen 9 7950X3D':  { gamingScore: 93,  multiScore: 94,  singleScore: 88, tier: 'high' },
  'Ryzen 9 7950X':    { gamingScore: 70,  multiScore: 95,  singleScore: 85, tier: 'high' },
  'Ryzen 9 7900X':    { gamingScore: 68,  multiScore: 82,  singleScore: 83, tier: 'high' },
  'Ryzen 7 7800X3D':  { gamingScore: 95,  multiScore: 64,  singleScore: 86, tier: 'high' },
  'Ryzen 7 7700X':    { gamingScore: 72,  multiScore: 58,  singleScore: 80, tier: 'mid' },
  'Ryzen 7 7700':     { gamingScore: 70,  multiScore: 56,  singleScore: 78, tier: 'mid' },
  'Ryzen 5 7600X':    { gamingScore: 69,  multiScore: 45,  singleScore: 78, tier: 'mid' },
  'Ryzen 5 7600':     { gamingScore: 67,  multiScore: 43,  singleScore: 76, tier: 'budget' },
  'Ryzen 5 7500F':    { gamingScore: 66,  multiScore: 42,  singleScore: 75, tier: 'budget' },

  // AMD Ryzen 5000 Series
  'Ryzen 9 5950X':    { gamingScore: 62,  multiScore: 72,  singleScore: 70, tier: 'mid' },
  'Ryzen 9 5900X':    { gamingScore: 62,  multiScore: 68,  singleScore: 70, tier: 'mid' },
  'Ryzen 7 5800X3D':  { gamingScore: 82,  multiScore: 54,  singleScore: 72, tier: 'mid' },
  'Ryzen 7 5800X':    { gamingScore: 60,  multiScore: 52,  singleScore: 68, tier: 'mid' },
  'Ryzen 7 5700X':    { gamingScore: 60,  multiScore: 50,  singleScore: 65, tier: 'budget' },
  'Ryzen 5 5600X':    { gamingScore: 58,  multiScore: 38,  singleScore: 63, tier: 'budget' },
  'Ryzen 5 5600':     { gamingScore: 56,  multiScore: 36,  singleScore: 62, tier: 'budget' },
  'Ryzen 5 5500':     { gamingScore: 50,  multiScore: 34,  singleScore: 58, tier: 'entry' },

  // Intel Arrow Lake (15th Gen)
  'Core Ultra 9 285K':  { gamingScore: 62,  multiScore: 90,  singleScore: 92, tier: 'high' },
  'Core Ultra 7 265K':  { gamingScore: 60,  multiScore: 75,  singleScore: 88, tier: 'mid' },
  'Core Ultra 7 265KF': { gamingScore: 60,  multiScore: 75,  singleScore: 88, tier: 'mid' },
  'Core Ultra 5 245K':  { gamingScore: 55,  multiScore: 58,  singleScore: 82, tier: 'mid' },
  'Core Ultra 5 245KF': { gamingScore: 55,  multiScore: 58,  singleScore: 82, tier: 'mid' },

  // Intel 14th Gen Raptor Lake Refresh
  'Core i9-14900K':   { gamingScore: 73,  multiScore: 88,  singleScore: 82, tier: 'high' },
  'Core i9-14900KS':  { gamingScore: 75,  multiScore: 90,  singleScore: 84, tier: 'high' },
  'Core i9-14900KF':  { gamingScore: 73,  multiScore: 88,  singleScore: 82, tier: 'high' },
  'Core i9-14900F':   { gamingScore: 70,  multiScore: 85,  singleScore: 80, tier: 'high' },
  'Core i7-14700K':   { gamingScore: 68,  multiScore: 72,  singleScore: 78, tier: 'mid' },
  'Core i7-14700KF':  { gamingScore: 68,  multiScore: 72,  singleScore: 78, tier: 'mid' },
  'Core i7-14700F':   { gamingScore: 65,  multiScore: 68,  singleScore: 75, tier: 'mid' },
  'Core i5-14600K':   { gamingScore: 64,  multiScore: 55,  singleScore: 76, tier: 'mid' },
  'Core i5-14600KF':  { gamingScore: 64,  multiScore: 55,  singleScore: 76, tier: 'mid' },
  'Core i5-14400F':   { gamingScore: 55,  multiScore: 42,  singleScore: 68, tier: 'budget' },
  'Core i5-14400':    { gamingScore: 55,  multiScore: 42,  singleScore: 68, tier: 'budget' },

  // Intel 13th Gen Raptor Lake
  'Core i9-13900K':   { gamingScore: 70,  multiScore: 85,  singleScore: 80, tier: 'high' },
  'Core i9-13900KS':  { gamingScore: 72,  multiScore: 87,  singleScore: 82, tier: 'high' },
  'Core i9-13900KF':  { gamingScore: 70,  multiScore: 85,  singleScore: 80, tier: 'high' },
  'Core i9-13900F':   { gamingScore: 67,  multiScore: 82,  singleScore: 78, tier: 'high' },
  'Core i7-13700K':   { gamingScore: 65,  multiScore: 70,  singleScore: 76, tier: 'mid' },
  'Core i7-13700KF':  { gamingScore: 65,  multiScore: 70,  singleScore: 76, tier: 'mid' },
  'Core i7-13700F':   { gamingScore: 62,  multiScore: 66,  singleScore: 73, tier: 'mid' },
  'Core i5-13600K':   { gamingScore: 62,  multiScore: 53,  singleScore: 74, tier: 'mid' },
  'Core i5-13600KF':  { gamingScore: 62,  multiScore: 53,  singleScore: 74, tier: 'mid' },
  'Core i5-13400F':   { gamingScore: 52,  multiScore: 40,  singleScore: 66, tier: 'budget' },
  'Core i5-13400':    { gamingScore: 52,  multiScore: 40,  singleScore: 66, tier: 'budget' },

  // Intel 12th Gen Alder Lake
  'Core i9-12900K':   { gamingScore: 62,  multiScore: 68,  singleScore: 74, tier: 'mid' },
  'Core i9-12900KF':  { gamingScore: 62,  multiScore: 68,  singleScore: 74, tier: 'mid' },
  'Core i7-12700K':   { gamingScore: 58,  multiScore: 60,  singleScore: 72, tier: 'mid' },
  'Core i7-12700KF':  { gamingScore: 58,  multiScore: 60,  singleScore: 72, tier: 'mid' },
  'Core i7-12700F':   { gamingScore: 55,  multiScore: 56,  singleScore: 70, tier: 'budget' },
  'Core i5-12600K':   { gamingScore: 55,  multiScore: 48,  singleScore: 70, tier: 'budget' },
  'Core i5-12600KF':  { gamingScore: 55,  multiScore: 48,  singleScore: 70, tier: 'budget' },
  'Core i5-12400F':   { gamingScore: 48,  multiScore: 36,  singleScore: 62, tier: 'budget' },
  'Core i5-12400':    { gamingScore: 48,  multiScore: 36,  singleScore: 62, tier: 'budget' },

  // AMD Threadripper (workstation, not gaming)
  'Threadripper':     { gamingScore: 45,  multiScore: 100, singleScore: 60, tier: 'workstation' },
};

// Fuzzy match CPU name to benchmark entry
export function findCPUBenchmark(cpuName) {
  if (!cpuName) return null;
  const n = cpuName.toUpperCase();

  // Direct match (longest key first for specificity, e.g. "9800X3D" before "9800")
  const keys = Object.keys(CPU_BENCHMARKS).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (n.includes(key.toUpperCase())) {
      return { name: key, ...CPU_BENCHMARKS[key] };
    }
  }

  // Threadripper fallback
  if (n.includes('THREADRIPPER')) {
    return { name: 'Threadripper', ...CPU_BENCHMARKS['Threadripper'] };
  }

  return null;
}

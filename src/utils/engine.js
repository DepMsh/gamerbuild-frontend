// PCBux Smart Engine — Powered by real benchmark data
// GPU: Tom's Hardware GPU Benchmark Hierarchy (March 2026), RTX 5090 = 100%
// CPU: Gaming benchmark aggregation (review data), 9800X3D = 100

import { findGPUBenchmark } from '../data/gpuBenchmarks';
import { findCPUBenchmark } from '../data/cpuBenchmarks';

// Base FPS: RTX 5090 + Ryzen 7 9800X3D testbed, Ultra settings
// Source: Tom's Hardware, TechPowerUp, Digital Foundry (2025-2026)
const GAME_BASE_FPS = {
  'GTA VI':            { '1080p': 142, '1440p': 115, '4k': 74,  weight: 'gpu-heavy' },
  'Cyberpunk 2077':    { '1080p': 162, '1440p': 115, '4k': 68,  weight: 'gpu-heavy' },
  'Elden Ring':        { '1080p': 202, '1440p': 189, '4k': 135, weight: 'cpu-bound', cap: 60 },
  'Valorant':          { '1080p': 510, '1440p': 420, '4k': 340, weight: 'cpu-bound' },
  'Fortnite':          { '1080p': 245, '1440p': 189, '4k': 113, weight: 'balanced' },
  'COD MW3':           { '1080p': 203, '1440p': 157, '4k': 91,  weight: 'balanced' },
  'FC 25':             { '1080p': 202, '1440p': 168, '4k': 113, weight: 'cpu-bound' },
  'Hogwarts Legacy':   { '1080p': 122, '1440p': 90,  '4k': 51,  weight: 'gpu-heavy' },
  'Apex Legends':      { '1080p': 305, '1440p': 231, '4k': 158, weight: 'balanced' },
  'League of Legends': { '1080p': 510, '1440p': 420, '4k': 340, weight: 'cpu-bound' },
  'Minecraft Shaders': { '1080p': 203, '1440p': 147, '4k': 91,  weight: 'gpu-heavy' },
  'Red Dead 2':        { '1080p': 132, '1440p': 105, '4k': 62,  weight: 'gpu-heavy' },
  'Marvel Rivals':     { '1080p': 142, '1440p': 110, '4k': 68,  weight: 'balanced' },
  'Wuthering Waves':   { '1080p': 162, '1440p': 126, '4k': 74,  weight: 'balanced' },
  'Black Myth Wukong': { '1080p': 142, '1440p': 105, '4k': 62,  weight: 'gpu-heavy' },
  'CS2':               { '1080p': 355, '1440p': 294, '4k': 204, weight: 'cpu-bound' },
  'Rainbow Six Siege': { '1080p': 405, '1440p': 336, '4k': 226, weight: 'balanced' },
};

// CPU impact on FPS by game weight type and resolution
// Higher value = CPU weakness hurts more
const CPU_IMPACT = {
  'cpu-bound': { '1080p': 0.55, '1440p': 0.35, '4k': 0.15 },
  'balanced':  { '1080p': 0.35, '1440p': 0.20, '4k': 0.08 },
  'gpu-heavy': { '1080p': 0.18, '1440p': 0.10, '4k': 0.04 },
};

export const GAMES = Object.keys(GAME_BASE_FPS).map(name => ({ name }));

// ═══════ GPU PERFORMANCE FACTOR ═══════
// Returns 0.0 – 1.0+ using real Tom's Hardware benchmark data

function getGpuFactor(gpu, resolution = '1080p') {
  if (!gpu) return 0.3;
  const bench = findGPUBenchmark(gpu.name);
  if (bench) {
    const key = resolution === '4k' || resolution === '4K' ? 'p4k' : resolution === '1440p' ? 'p1440' : 'p1080';
    return bench[key] / 100;
  }
  // Fallback: estimate from db score (RTX 5090 ≈ score 100)
  const score = gpu.score || 30;
  return Math.max(0.08, Math.min(1.05, score / 95));
}

// ═══════ GAMING CPU SCORE ═══════
// Returns 0-100 gaming score. Uses real benchmark data when available.

export function getGamingCpuScore(cpu) {
  if (!cpu) return 50;
  const bench = findCPUBenchmark(cpu.name);
  if (bench) return bench.gamingScore;
  // Fallback: algorithmic estimation
  return algorithmicGamingScore(cpu);
}

function algorithmicGamingScore(cpu) {
  const name = (cpu.name || '').toLowerCase();
  const clock = cpu.boostClock || 4.0;
  const cores = cpu.cores || 4;

  let score = Math.max(0, ((clock - 3.0) / 3.0)) * 50;
  score += Math.min(cores, 8) * 2 + Math.max(0, cores - 8) * 0.25;

  if (name.includes('x3d')) score += 15;
  if (name.includes('9800x3d') || name.includes('9950x3d')) score += 5;
  if (name.includes('14900') || name.includes('13900') || name.includes('285k')) score += 8;
  if (name.includes('14700') || name.includes('13700') || name.includes('12700')) score += 3;
  if (name.includes('threadripper')) score -= 20;

  return Math.min(Math.max(Math.round(score), 10), 100);
}

// ═══════ BOTTLENECK ANALYSIS ═══════
// Resolution-aware using real benchmark tiers

export function analyzeBottleneck(cpu, gpu, resolution = '1080p') {
  if (!cpu || !gpu) return null;

  const gamingCpu = getGamingCpuScore(cpu);
  const gpuScore = Math.round(getGpuFactor(gpu, resolution) * 100);
  const cpuBench = findCPUBenchmark(cpu.name);

  // Resolution affects which component matters more
  let cpuWeight, gpuWeight;
  if (resolution === '4K' || resolution === '4k') {
    cpuWeight = 0.20; gpuWeight = 0.80;
  } else if (resolution === '1440p') {
    cpuWeight = 0.40; gpuWeight = 0.60;
  } else {
    cpuWeight = 0.55; gpuWeight = 0.45;
  }

  const effectiveCpu = gamingCpu / cpuWeight;
  const effectiveGpu = gpuScore / gpuWeight;
  const ratio = effectiveCpu / effectiveGpu;

  let bottleneckPercent = 0;
  let limitingComponent = null;

  if (ratio < 0.80) {
    bottleneckPercent = (1 - ratio) * 33;
    limitingComponent = 'CPU';
  } else if (ratio > 1.30) {
    bottleneckPercent = (1 - (1 / ratio)) * 30;
    limitingComponent = 'GPU';
  }

  // Flagship detection using real benchmark tiers
  const cpuTier = cpuBench?.tier || (gamingCpu >= 90 ? 'flagship' : gamingCpu >= 70 ? 'high' : 'mid');
  const isFlagshipCPU = cpuTier === 'flagship' || gamingCpu >= 92;
  const isFlagshipGPU = gpuScore >= 85;

  // Flagship CPU should almost never bottleneck
  if (limitingComponent === 'CPU' && isFlagshipCPU) {
    bottleneckPercent = Math.max(0, bottleneckPercent - 35);
  }

  // Flagship pair: excellent balance
  if (isFlagshipCPU && isFlagshipGPU && bottleneckPercent <= 25) {
    bottleneckPercent = Math.min(bottleneckPercent, 5);
    limitingComponent = null;
  }

  // Budget CPU + high-end GPU = real bottleneck
  const isBudgetCPU = gamingCpu < 35;
  const isHighEndGPU = gpuScore >= 70;
  if (isBudgetCPU && isHighEndGPU) {
    bottleneckPercent = Math.max(bottleneckPercent, 35);
    limitingComponent = 'CPU';
  }

  bottleneckPercent = Math.min(Math.round(bottleneckPercent), 60);

  let severity, description;
  if (bottleneckPercent <= 5) {
    severity = 'none';
    limitingComponent = null;
    description = isFlagshipCPU && isFlagshipGPU
      ? 'توازن ممتاز — أقوى قطع متوفرة، أداء بلا حدود'
      : 'تجميعة متوازنة — أداء ممتاز بين المعالج والكرت';
  } else if (bottleneckPercent <= 15) {
    severity = 'minor';
    description = limitingComponent === 'CPU'
      ? 'عنق زجاجة بسيط من المعالج — لن تلاحظه في أغلب الألعاب'
      : 'عنق زجاجة بسيط من الكرت — لن تلاحظه في أغلب الألعاب';
  } else if (bottleneckPercent <= 35) {
    severity = 'moderate';
    description = limitingComponent === 'CPU'
      ? 'عنق زجاجة — المعالج يحد من أداء الكرت. يُنصح بترقية المعالج'
      : 'عنق زجاجة — الكرت يحد من الأداء. يُنصح بترقية كرت الشاشة';
  } else {
    severity = 'severe';
    description = limitingComponent === 'CPU'
      ? 'عنق زجاجة شديد — المعالج ضعيف جداً مقارنة بالكرت'
      : 'عنق زجاجة شديد — الكرت ضعيف جداً مقارنة بالمعالج';
  }

  return {
    percent: bottleneckPercent,
    limitingComponent,
    severity,
    description,
    gamingCpuScore: gamingCpu,
    gpuScore,
    resolution,
    balanced: bottleneckPercent <= 10,
  };
}

// ═══════ BUILD SCORE ═══════

export function calcBuildScore(components, compatResult, bottleneck) {
  const filled = Object.values(components).filter(Boolean).length;
  if (filled === 0) return 0;

  let score = 0;
  // Part completion (30 pts)
  score += Math.round((filled / 7) * 30);
  // Compatibility (30 pts)
  const errors = compatResult?.errors?.length || compatResult?.issues?.length || 0;
  score += errors === 0 ? 30 : (errors === 1 ? 15 : 0);
  // Balance (25 pts)
  if (bottleneck?.severity === 'none') score += 25;
  else if (bottleneck?.severity === 'minor') score += 20;
  else if (bottleneck?.severity === 'moderate') score += 10;
  // Warnings (15 pts)
  const warnings = compatResult?.warnings?.length || 0;
  score += warnings === 0 ? 15 : 5;

  return Math.min(score, 100);
}

// ═══════ FPS PREDICTION (Real benchmark data) ═══════

export function predictFPS(components, game) {
  if (!components.cpu || !components.gpu) return null;
  const baseData = GAME_BASE_FPS[game.name];
  if (!baseData) return null;

  const cpuFactor = getGamingCpuScore(components.cpu) / 100;
  const results = {};

  for (const res of ['1080p', '1440p', '4k']) {
    const baseFPS = baseData[res];
    if (!baseFPS) continue;

    // GPU determines base rendering capability
    const gpuF = getGpuFactor(components.gpu, res);
    let fps = Math.round(baseFPS * gpuF);

    // CPU penalty: weaker CPUs reduce FPS, scaled by game type and resolution
    if (cpuFactor < 1.0) {
      const impact = CPU_IMPACT[baseData.weight || 'balanced']?.[res] || 0.25;
      const penalty = (1 - cpuFactor) * impact;
      fps = Math.round(fps * (1 - penalty));
    }

    // Game-specific engine caps
    if (baseData.cap) fps = Math.min(fps, baseData.cap);

    results[res] = { fps: Math.max(1, fps) };
  }

  return results;
}

// ═══════ SMART RECOMMENDATIONS ═══════

export function getRecommendations(components) {
  if (!components.cpu || !components.gpu) return [];
  const recs = [];
  const bn = analyzeBottleneck(components.cpu, components.gpu);

  // Use Cyberpunk 2077 as benchmark reference game (demanding AAA)
  const cyberResults = predictFPS(components, { name: 'Cyberpunk 2077' });
  const cyberFPS_1080 = cyberResults?.['1080p']?.fps || 0;
  const cyberFPS_1440 = cyberResults?.['1440p']?.fps || 0;
  const cyberFPS_4k = cyberResults?.['4k']?.fps || 0;

  if (cyberFPS_4k >= 55) {
    recs.push({ icon: "🟢", text: "ممتازة لـ 4K Ultra في كل الألعاب" });
    recs.push({ icon: "🟢", text: "ممتازة للستريم + القيمنق بنفس الوقت" });
  } else if (cyberFPS_1440 >= 80) {
    recs.push({ icon: "🟢", text: "ممتازة لـ 1440p Ultra" });
    recs.push({ icon: "🟡", text: "4K ممكنة بتنازلات على الإعدادات" });
  } else if (cyberFPS_1080 >= 60) {
    recs.push({ icon: "🟢", text: "قوية لـ 1080p Ultra" });
    recs.push({ icon: "🟡", text: "1440p High — سلسة في أغلب الألعاب" });
    recs.push({ icon: "🔴", text: "غير مناسبة لـ 4K الثقيل" });
  } else if (cyberFPS_1080 >= 30) {
    recs.push({ icon: "🟢", text: "كافية لـ 1080p High في التنافسية" });
    recs.push({ icon: "🔴", text: "1440p غير مريحة في AAA" });
  } else {
    recs.push({ icon: "🟡", text: "1080p Medium في الألعاب الثقيلة" });
    recs.push({ icon: "🟢", text: "الألعاب الخفيفة سلسة" });
  }

  // Upgrade advice based on bottleneck — but don't suggest upgrading flagship parts
  const cpuBench = findCPUBenchmark(components.cpu.name);
  const gpuBench = findGPUBenchmark(components.gpu.name);
  const isFlagshipCPU = cpuBench?.tier === 'flagship' || getGamingCpuScore(components.cpu) >= 92;
  const isFlagshipGPU = gpuBench && gpuBench.p1080 >= 85;

  if (bn?.limitingComponent === 'GPU' && !isFlagshipGPU) {
    recs.push({ icon: "⬆️", text: "ارفع كرت الشاشة أولاً — المعالج ممتاز" });
  } else if (bn?.limitingComponent === 'CPU' && !isFlagshipCPU) {
    recs.push({ icon: "⬆️", text: "ارفع المعالج أولاً — الكرت ممتاز" });
  } else if (bn) {
    recs.push({ icon: "✅", text: "لا تغيّر شيء الآن — التوازن ممتاز" });
  }

  return recs;
}

// ═══════ COMPARE WORTH-IT ═══════

export function compareWorthIt(a, b) {
  if (!a?.score || !b?.score) return null;
  const perfDiff = Math.round(((b.score - a.score) / a.score) * 100);
  const priceDiff = Math.round(((b.price - a.price) / a.price) * 100);
  const ratio = perfDiff > 0 && priceDiff > 0 ? parseFloat((perfDiff / priceDiff).toFixed(2)) : 0;

  let verdict = "", color = "";
  if (perfDiff <= 0) { verdict = "الأولى أفضل أو متساوية — لا تستحق الترقية"; color = "red"; }
  else if (ratio >= 0.8) { verdict = "تستحق فرق السعر! أداء أعلى بنسبة كبيرة"; color = "green"; }
  else if (ratio >= 0.5) { verdict = "مقبولة — تحسّن جيد لكن فرق السعر ملحوظ"; color = "yellow"; }
  else { verdict = "لا تستحق — فرق السعر كبير مقارنة بالتحسّن"; color = "red"; }

  return { perfDiff, priceDiff, ratio, verdict, color };
}

// ═══════ UPGRADE ROADMAP ═══════

export function getUpgradeRoadmap(components, allComponents) {
  if (!components.cpu || !components.gpu) return [];
  const bn = analyzeBottleneck(components.cpu, components.gpu);
  const items = [];

  if (bn?.limitingComponent === 'GPU' || !bn?.limitingComponent) {
    const betterGPUs = allComponents
      .filter(c => c.type === 'gpu' && c.score > components.gpu.score)
      .sort((a, b) => a.price - b.price);

    if (betterGPUs.length) {
      items.push({
        priority: bn?.limitingComponent === 'GPU' ? 1 : 2,
        label: bn?.limitingComponent === 'GPU' ? "كرت الشاشة (الأولوية)" : "كرت الشاشة (تحسين)",
        icon: "🎨",
        current: components.gpu,
        options: [
          betterGPUs[0] && { tag: "اقتصادية", part: betterGPUs[0], gain: betterGPUs[0].score - components.gpu.score },
          betterGPUs[Math.floor(betterGPUs.length / 2)] && { tag: "متوسطة", part: betterGPUs[Math.floor(betterGPUs.length / 2)], gain: betterGPUs[Math.floor(betterGPUs.length / 2)].score - components.gpu.score },
          betterGPUs[betterGPUs.length - 1] && betterGPUs.length > 2 && { tag: "قوية", part: betterGPUs[betterGPUs.length - 1], gain: betterGPUs[betterGPUs.length - 1].score - components.gpu.score },
        ].filter(Boolean)
      });
    }
  }

  if (bn?.limitingComponent === 'CPU' || !bn?.limitingComponent) {
    const sameSocket = allComponents
      .filter(c => c.type === 'cpu' && c.score > components.cpu.score && c.socket === components.cpu.socket)
      .sort((a, b) => a.price - b.price);
    const diffSocket = allComponents
      .filter(c => c.type === 'cpu' && c.score > components.cpu.score && c.socket !== components.cpu.socket)
      .sort((a, b) => a.price - b.price);

    const opts = [];
    if (sameSocket[0]) opts.push({ tag: "نفس السوكت", part: sameSocket[0], gain: sameSocket[0].score - components.cpu.score });
    if (diffSocket.length) {
      const best = diffSocket[diffSocket.length - 1];
      opts.push({ tag: "سوكت جديد ⚠️", part: best, gain: best.score - components.cpu.score });
    }

    if (opts.length) {
      items.push({
        priority: bn?.limitingComponent === 'CPU' ? 1 : 2,
        label: bn?.limitingComponent === 'CPU' ? "المعالج (الأولوية)" : "المعالج (تحسين)",
        icon: "🧠",
        current: components.cpu,
        options: opts
      });
    }
  }

  return items.sort((a, b) => a.priority - b.priority);
}

// ═══════ SMART DOWNGRADE SUGGESTIONS ═══════

export function getSmartDowngrades(components, allComponents) {
  if (!components.cpu || !components.gpu) return [];
  const totalPrice = Object.values(components).reduce((sum, c) => sum + (c?.price || 0), 0);
  if (totalPrice < 3000) return [];

  const suggestions = [];
  const bn = analyzeBottleneck(components.cpu, components.gpu);

  // If GPU is overkill (CPU bottleneck), suggest cheaper GPU
  if (bn?.limitingComponent === 'CPU' && bn.percent > 15) {
    const cheaperGPUs = allComponents
      .filter(c => c.type === 'gpu' && c.price < components.gpu.price * 0.7 && c.score >= components.gpu.score * 0.75)
      .sort((a, b) => b.score - a.score);
    if (cheaperGPUs[0]) {
      const saving = components.gpu.price - cheaperGPUs[0].price;
      suggestions.push({
        type: 'gpu',
        current: components.gpu,
        suggested: cheaperGPUs[0],
        saving,
        reason: 'المعالج يحد من أداء الكرت — كرت أقل بيعطي نفس الأداء تقريباً',
        perfLoss: Math.round((1 - cheaperGPUs[0].score / components.gpu.score) * 100),
      });
    }
  }

  // If CPU is overkill (GPU bottleneck), suggest cheaper CPU
  if (bn?.limitingComponent === 'GPU' && bn.percent > 15) {
    const gamingScore = getGamingCpuScore(components.cpu);
    const cheaperCPUs = allComponents
      .filter(c => c.type === 'cpu' && c.price < components.cpu.price * 0.7 && getGamingCpuScore(c) >= gamingScore * 0.80)
      .sort((a, b) => getGamingCpuScore(b) - getGamingCpuScore(a));
    if (cheaperCPUs[0]) {
      const saving = components.cpu.price - cheaperCPUs[0].price;
      suggestions.push({
        type: 'cpu',
        current: components.cpu,
        suggested: cheaperCPUs[0],
        saving,
        reason: 'الكرت يحد من الأداء — معالج أقل بيكفي بدون فرق ملحوظ',
        perfLoss: Math.round((1 - getGamingCpuScore(cheaperCPUs[0]) / gamingScore) * 100),
      });
    }
  }

  // If PSU is way oversized
  if (components.psu) {
    const wattNeeded = (components.cpu?.tdp || 65) + (components.gpu?.tdp || 150) + 100;
    if (components.psu.watt > wattNeeded * 1.6) {
      const cheaperPSUs = allComponents
        .filter(c => c.type === 'psu' && c.watt >= wattNeeded * 1.2 && c.price < components.psu.price * 0.7)
        .sort((a, b) => a.price - b.price);
      if (cheaperPSUs[0]) {
        suggestions.push({
          type: 'psu',
          current: components.psu,
          suggested: cheaperPSUs[0],
          saving: components.psu.price - cheaperPSUs[0].price,
          reason: `الباور أكبر من اللازم — ${cheaperPSUs[0].watt}W يكفي تجميعتك`,
          perfLoss: 0,
        });
      }
    }
  }

  return suggestions.sort((a, b) => b.saving - a.saving);
}

// ═══════ FUTURE-PROOF SCORE ═══════

export function calcFutureProof(components) {
  if (!components.cpu || !components.gpu) return null;

  let score = 50;
  const gpuF = getGpuFactor(components.gpu);
  const gamingCpu = getGamingCpuScore(components.cpu);
  const cpuName = (components.cpu.name || '').toLowerCase();
  const gpuName = (components.gpu.name || '').toLowerCase();

  // GPU power (biggest factor for future games)
  if (gpuF >= 0.85) score += 25;
  else if (gpuF >= 0.65) score += 18;
  else if (gpuF >= 0.45) score += 10;
  else if (gpuF >= 0.28) score += 3;
  else score -= 5;

  // CPU headroom
  if (gamingCpu >= 75) score += 12;
  else if (gamingCpu >= 55) score += 7;
  else if (gamingCpu >= 35) score += 2;
  else score -= 5;

  // Modern platform bonuses (DDR5, PCIe 5.0, etc.)
  if (cpuName.includes('9800x3d') || cpuName.includes('9950x') || cpuName.includes('285k')) score += 5;
  if (gpuName.includes('50') && (gpuName.includes('rtx') || gpuName.includes('nvidia'))) score += 5;
  if (gpuName.includes('9070')) score += 4;

  // RAM amount
  if (components.ram) {
    if (components.ram.size >= 32) score += 5;
    else if (components.ram.size >= 16) score += 2;
    if (components.ram.type === 'DDR5') score += 3;
  }

  // Penalties for aging platforms
  if (cpuName.includes('10th') || cpuName.includes('10100') || cpuName.includes('10400')) score -= 8;
  if (gpuName.includes('1650') || gpuName.includes('1050') || gpuName.includes('6400')) score -= 10;

  score = Math.min(Math.max(Math.round(score), 5), 100);

  let label, description;
  if (score >= 80) {
    label = 'ممتاز';
    description = 'تجميعتك جاهزة للألعاب الجاية لـ 3-4 سنوات على الأقل';
  } else if (score >= 60) {
    label = 'جيد';
    description = 'تشتغل كويس لسنتين — بعدها ممكن تحتاج ترقية الكرت';
  } else if (score >= 40) {
    label = 'متوسط';
    description = 'الألعاب الحالية أوكي — الجاية بتحتاج تنازلات بالإعدادات';
  } else {
    label = 'ضعيف';
    description = 'الألعاب الثقيلة الجاية بتكون صعبة — فكر بترقية قريبة';
  }

  return { score, label, description };
}

// ═══════ CHAT RESPONSES ═══════

export function getChatResponse(message, components, recommendations, roadmap) {
  const lower = message.toLowerCase();

  if (lower.includes("قيّم") || lower.includes("تقييم") || lower.includes("تحليل")) {
    if (!components.cpu || !components.gpu) return "اختر معالج وكرت شاشة أولاً عشان أقيّم التجميعة 🔍";
    return recommendations.map(r => `${r.icon} ${r.text}`).join("\n");
  }

  if (lower.includes("ترقي") || lower.includes("رقي") || lower.includes("أرقّي")) {
    if (!roadmap.length) return "حط قطعك أولاً في صفحة التجميعة وبعدين أرجع أسألني 🔧";
    const first = roadmap[0];
    const opt = first.options[0];
    return `أول ترقية: ${first.label}\n→ ${opt.part.name} (+${opt.gain} أداء)\n💰 ${opt.part.price?.toLocaleString()} ر.س`;
  }

  if (lower.includes("عنق") || lower.includes("bottleneck")) {
    const bn = analyzeBottleneck(components.cpu, components.gpu);
    if (!bn) return "اختر معالج وكرت شاشة أولاً 🔍";
    return `${bn.severity === 'none' ? "✅" : "⚠️"} ${bn.severity === 'none' ? 'تجميعة متوازنة' : `عنق زجاجة: ${bn.limitingComponent}`}\n${bn.description}`;
  }

  if (lower.includes("أشتري") || lower.includes("متجر") || lower.includes("شراء")) {
    return "🛒 أفضل المتاجر السعودية:\n• جرير — ضمان محلي\n• اكسترا — عروض دورية\n• نون — توصيل سريع\n• أمازون SA — تنوع كبير\n• حاسبات العرب — متخصص\n\nتابع صفحة العروض للتخفيضات! 🏷️";
  }

  if (lower.includes("ميزاني") || lower.includes("budget")) {
    return "💰 دليل الميزانيات:\n• 3-4.5K ر.س → 1080p Gaming\n• 5-8K ر.س → 1440p Ultra\n• 9-14K ر.س → 4K + Stream\n• 15K+ ر.س → أقصى أداء\n\nجرب التجميعات الجاهزة في الصفحة الرئيسية!";
  }

  return "جرب تسألني عن:\n📊 قيّم تجميعتي\n🔧 وش أرقّي أول\n🔍 عنق الزجاجة\n🛒 وين أشتري\n💰 الميزانيات";
}

// ═══════ COLOR HELPERS ═══════

export function severityColor(sev) {
  if (sev === 'none') return '#00e676';
  if (sev === 'minor') return '#ffd740';
  if (sev === 'moderate') return '#ff9100';
  return '#ff5252';
}

export function fpsColor(level) {
  if (level === "exc") return { text: "#00e676", bg: "rgba(0,230,118,0.15)" };
  if (level === "good") return { text: "#ffd740", bg: "rgba(255,215,64,0.15)" };
  if (level === "ok") return { text: "#ff9100", bg: "rgba(255,145,0,0.15)" };
  return { text: "#ff5252", bg: "rgba(255,82,82,0.15)" };
}

// PCBux Smart Engine
// Ported from the original app + enhanced

// Real FPS data: base FPS for RTX 4090 at each resolution (Ultra settings)
// Source: Tom's Hardware, TechPowerUp, Digital Foundry benchmarks (2024-2025)
const GAME_BASE_FPS = {
  'GTA VI':            { '1080p': 140, '1440p': 110, '4k': 65,  weight: 'gpu-heavy' },
  'Cyberpunk 2077':    { '1080p': 160, '1440p': 110, '4k': 60,  weight: 'gpu-heavy' },
  'Elden Ring':        { '1080p': 200, '1440p': 180, '4k': 120, weight: 'cpu-bound', cap: 60 },
  'Valorant':          { '1080p': 500, '1440p': 400, '4k': 300, weight: 'cpu-bound' },
  'Fortnite':          { '1080p': 240, '1440p': 180, '4k': 100, weight: 'balanced' },
  'COD MW3':           { '1080p': 200, '1440p': 150, '4k': 80,  weight: 'balanced' },
  'FC 25':             { '1080p': 200, '1440p': 160, '4k': 100, weight: 'cpu-bound' },
  'Hogwarts Legacy':   { '1080p': 120, '1440p': 85,  '4k': 45,  weight: 'gpu-heavy' },
  'Apex Legends':      { '1080p': 300, '1440p': 220, '4k': 140, weight: 'balanced' },
  'League of Legends': { '1080p': 500, '1440p': 400, '4k': 300, weight: 'cpu-bound' },
  'Minecraft Shaders': { '1080p': 200, '1440p': 140, '4k': 80,  weight: 'gpu-heavy' },
  'Red Dead 2':        { '1080p': 130, '1440p': 100, '4k': 55,  weight: 'gpu-heavy' },
  'Marvel Rivals':     { '1080p': 140, '1440p': 105, '4k': 60,  weight: 'balanced' },
  'Wuthering Waves':   { '1080p': 160, '1440p': 120, '4k': 65,  weight: 'balanced' },
  'Black Myth Wukong': { '1080p': 140, '1440p': 100, '4k': 55,  weight: 'gpu-heavy' },
};

// Known GPU FPS multipliers (relative to RTX 4090 = 1.0)
// Based on aggregate benchmark data from TechPowerUp, Tom's Hardware, HW Unboxed
const GPU_FPS_MULTIPLIER = {
  // RTX 50 series
  '5090': 1.30, '5080': 1.10, '5070 ti': 0.95, '5070': 0.85, '5060 ti': 0.65, '5060': 0.55,
  // RTX 40 series
  '4090': 1.00, '4080 super': 0.85, '4080': 0.82, '4070 ti super': 0.75, '4070 ti': 0.72,
  '4070 super': 0.70, '4070': 0.65, '4060 ti': 0.52, '4060': 0.45,
  // RTX 30 series
  '3090 ti': 0.72, '3090': 0.70, '3080 ti': 0.68, '3080': 0.65, '3070 ti': 0.58, '3070': 0.55,
  '3060 ti': 0.48, '3060': 0.40, '3050': 0.28,
  // RTX 20 series
  '2080 ti': 0.55, '2080 super': 0.48, '2080': 0.45, '2070 super': 0.42, '2070': 0.38,
  '2060 super': 0.35, '2060': 0.32,
  // GTX 16 series
  '1660 super': 0.25, '1660 ti': 0.25, '1660': 0.22, '1650 super': 0.20, '1650': 0.16,
  // GTX 10 series
  '1080 ti': 0.38, '1080': 0.30, '1070 ti': 0.28, '1070': 0.25, '1060': 0.18, '1050 ti': 0.12,
  // AMD RX 9000 series
  '9070 xt': 0.80, '9070': 0.70,
  // AMD RX 7000 series
  '7900 xtx': 0.82, '7900 xt': 0.75, '7900 gre': 0.62, '7800 xt': 0.65, '7700 xt': 0.55,
  '7600 xt': 0.48, '7600': 0.45,
  // AMD RX 6000 series
  '6950 xt': 0.62, '6900 xt': 0.58, '6800 xt': 0.55, '6800': 0.48, '6750 xt': 0.45,
  '6700 xt': 0.42, '6700': 0.38, '6650 xt': 0.35, '6600 xt': 0.32, '6600': 0.28,
  '6500 xt': 0.15, '6400': 0.12,
  // Intel Arc
  'b580': 0.32, 'a770': 0.35, 'a750': 0.28, 'a580': 0.22, 'a380': 0.10,
};

export const GAMES = Object.keys(GAME_BASE_FPS).map(name => ({ name }));

// ═══════ GAMING CPU SCORE ═══════
// The raw CPU scores in the DB are multi-threaded benchmarks (Threadripper 3990X=100, 7800X3D=17).
// For GAMING, single-thread perf + 6-8 cores + cache matter most.
// This function normalizes to a 0-100 gaming scale comparable to GPU scores.

export function getGamingCpuScore(cpu) {
  if (!cpu) return 50;
  const name = (cpu.name || '').toLowerCase();
  const clock = cpu.boostClock || 4.0;
  const cores = cpu.cores || 4;

  // Base from clock speed (single-thread perf is king for gaming)
  let score = Math.max(0, ((clock - 3.0) / 3.0)) * 50;

  // Core count (diminishing returns after 8 for gaming)
  score += Math.min(cores, 8) * 2 + Math.max(0, cores - 8) * 0.25;

  // Architecture bonuses for known gaming-excellent CPUs
  if (name.includes('x3d')) score += 15; // 3D V-Cache is massive for gaming
  if (name.includes('9800x3d') || name.includes('9950x3d')) score += 5;
  if (name.includes('14900') || name.includes('13900') || name.includes('285k')) score += 8;
  if (name.includes('14700') || name.includes('13700') || name.includes('12700')) score += 3;

  // Threadripper penalty (great multi-core, bad per-core for gaming)
  if (name.includes('threadripper')) score -= 20;

  return Math.min(Math.max(Math.round(score), 10), 100);
}

// ═══════ BOTTLENECK ANALYSIS ═══════
// Resolution-aware algorithm using normalized gaming CPU scores

export function analyzeBottleneck(cpu, gpu, resolution = '1080p') {
  if (!cpu || !gpu) return null;

  const gamingCpu = getGamingCpuScore(cpu);
  const gpuScore = gpu.score || 50;

  // Resolution affects which component matters more
  let cpuWeight, gpuWeight;
  if (resolution === '4K') {
    cpuWeight = 0.20; gpuWeight = 0.80; // GPU dominant at 4K
  } else if (resolution === '1440p') {
    cpuWeight = 0.40; gpuWeight = 0.60;
  } else {
    cpuWeight = 0.55; gpuWeight = 0.45; // CPU matters more at 1080p
  }

  // Effective scores weighted by resolution
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

  // High-end CPU correction: X3D, i9, Ultra 9 should almost never bottleneck
  const cpuName = (cpu.name || '').toLowerCase();
  const isHighEndCPU = cpuName.includes('x3d') || cpuName.includes('9900') || cpuName.includes('9950') ||
    cpuName.includes('14900') || cpuName.includes('13900') || cpuName.includes('285k') || gamingCpu >= 75;

  if (limitingComponent === 'CPU' && isHighEndCPU) {
    bottleneckPercent = Math.max(0, bottleneckPercent - 30);
  }

  // Budget CPU + high-end GPU = real bottleneck
  const isBudgetCPU = gamingCpu < 35;
  const isHighEndGPU = gpuScore >= 70;
  if (isBudgetCPU && isHighEndGPU) {
    bottleneckPercent = Math.max(bottleneckPercent, 35);
    limitingComponent = 'CPU';
  }

  // Cap at reasonable values
  bottleneckPercent = Math.min(Math.round(bottleneckPercent), 60);

  // Determine severity
  let severity, description;
  if (bottleneckPercent <= 5) {
    severity = 'none';
    limitingComponent = null;
    description = 'تجميعة متوازنة — أداء ممتاز بين المعالج والكرت';
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

// ═══════ FPS PREDICTION (Benchmark-based) ═══════

function getGpuMultiplier(gpu) {
  const gpuName = (gpu.name || '').toLowerCase();
  // Try longest keys first to match "4080 super" before "4080"
  const sortedKeys = Object.keys(GPU_FPS_MULTIPLIER).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (gpuName.includes(key)) return GPU_FPS_MULTIPLIER[key];
  }
  // Fallback: estimate from GPU score relative to RTX 4090 (score 88)
  const score = gpu.score || 30;
  return Math.max(0.08, Math.min(1.4, score / 88));
}

export function predictFPS(components, game) {
  if (!components.cpu || !components.gpu) return null;
  const baseData = GAME_BASE_FPS[game.name];
  if (!baseData) return null;

  const gpuMult = getGpuMultiplier(components.gpu);
  const gamingCpu = getGamingCpuScore(components.cpu);
  const results = {};

  for (const res of ['1080p', '1440p', '4k']) {
    const baseFPS = baseData[res];
    if (!baseFPS) continue;

    let fps = Math.round(baseFPS * gpuMult);

    // CPU bottleneck penalty at 1080p for CPU-bound / balanced games
    if (res === '1080p' && gamingCpu < 50 && baseData.weight !== 'gpu-heavy') {
      const cpuPenalty = (50 - gamingCpu) / 100;
      fps = Math.round(fps * (1 - cpuPenalty * 0.5));
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
  const gpuMult = getGpuMultiplier(components.gpu);
  const recs = [];
  const bn = analyzeBottleneck(components.cpu, components.gpu);

  // Use Cyberpunk 2077 as benchmark reference game (demanding AAA)
  const cyberFPS_1080 = Math.round(160 * gpuMult);
  const cyberFPS_1440 = Math.round(110 * gpuMult);
  const cyberFPS_4k = Math.round(60 * gpuMult);

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

  if (bn?.limitingComponent === 'GPU') recs.push({ icon: "⬆️", text: "ارفع كرت الشاشة أولاً — المعالج ممتاز" });
  else if (bn?.limitingComponent === 'CPU') recs.push({ icon: "⬆️", text: "ارفع المعالج أولاً — الكرت ممتاز" });
  else if (bn) recs.push({ icon: "✅", text: "لا تغيّر شيء الآن — التوازن ممتاز" });

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

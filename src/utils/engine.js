// GamerBuild Smart Engine
// Ported from the original app + enhanced

export const GAMES = [
  { name: "GTA VI", icon: "🎯", needs: { "4K": 95, "1440p": 80, "1080p": 60 } },
  { name: "Cyberpunk 2077", icon: "🌃", needs: { "4K": 90, "1440p": 75, "1080p": 55 } },
  { name: "Elden Ring", icon: "⚔️", needs: { "4K": 70, "1440p": 55, "1080p": 40 } },
  { name: "Valorant", icon: "🔫", needs: { "4K": 30, "1440p": 20, "1080p": 15 } },
  { name: "Fortnite", icon: "🏗️", needs: { "4K": 50, "1440p": 35, "1080p": 25 } },
  { name: "COD MW3", icon: "💥", needs: { "4K": 85, "1440p": 70, "1080p": 50 } },
  { name: "FC 25", icon: "⚽", needs: { "4K": 45, "1440p": 30, "1080p": 20 } },
  { name: "Hogwarts Legacy", icon: "🧙", needs: { "4K": 88, "1440p": 72, "1080p": 52 } },
];

// Bottleneck analysis
export function analyzeBottleneck(cpu, gpu) {
  if (!cpu?.score || !gpu?.score) return null;
  const diff = cpu.score - gpu.score;
  const abs = Math.abs(diff);

  if (abs <= 12) return {
    label: "متوازنة",
    msg: "أداء متوازن ممتاز — لا عنق زجاجة",
    severity: "good",
    pct: abs,
    type: "balanced"
  };

  if (diff > 0) return {
    label: "عنق زجاجة: GPU",
    msg: `المعالج أقوى بـ ~${abs}% — كرت الشاشة يبطّئ الأداء`,
    severity: abs > 25 ? "bad" : "warn",
    pct: abs,
    type: "gpu"
  };

  return {
    label: "عنق زجاجة: CPU",
    msg: `كرت الشاشة أقوى بـ ~${abs}% — المعالج يبطّئ الأداء`,
    severity: abs > 25 ? "bad" : "warn",
    pct: abs,
    type: "cpu"
  };
}

// Build score (0-100)
export function calcBuildScore(components, compatResult, bottleneck) {
  const filled = Object.values(components).filter(Boolean).length;
  if (filled === 0) return 0;

  let score = 0;
  // Part completion (30 pts)
  score += Math.round((filled / 7) * 30);
  // Compatibility (30 pts)
  score += (compatResult?.issues?.length === 0) ? 30 : (compatResult?.issues?.length === 1 ? 15 : 0);
  // Balance (25 pts)
  if (bottleneck?.severity === "good") score += 25;
  else if (bottleneck?.severity === "warn") score += 12;
  // Warnings (15 pts)
  score += (compatResult?.warnings?.length === 0) ? 15 : 5;

  return Math.min(score, 100);
}

// FPS prediction per game
export function predictFPS(components, game) {
  if (!components.cpu?.score || !components.gpu?.score) return null;
  const avg = (components.cpu.score + components.gpu.score) / 2;
  const results = {};

  for (const [setting, req] of Object.entries(game.needs)) {
    if (avg >= req + 20) results[setting] = { fps: "120+", level: "exc", label: "ممتاز" };
    else if (avg >= req + 5) results[setting] = { fps: "60–90", level: "good", label: "سلس" };
    else if (avg >= req - 10) results[setting] = { fps: "30–60", level: "ok", label: "مقبول" };
    else results[setting] = { fps: "<30", level: "bad", label: "ضعيف" };
  }

  return results;
}

// Smart recommendations
export function getRecommendations(components) {
  if (!components.cpu?.score || !components.gpu?.score) return [];
  const avg = (components.cpu.score + components.gpu.score) / 2;
  const recs = [];
  const bn = analyzeBottleneck(components.cpu, components.gpu);

  if (avg >= 90) {
    recs.push({ icon: "🟢", text: "ممتازة لـ 4K Ultra في كل الألعاب" });
    recs.push({ icon: "🟢", text: "ممتازة للستريم + القيمنق بنفس الوقت" });
  } else if (avg >= 80) {
    recs.push({ icon: "🟢", text: "ممتازة لـ 1440p Ultra" });
    recs.push({ icon: "🟡", text: "4K ممكنة بتنازلات على الإعدادات" });
  } else if (avg >= 65) {
    recs.push({ icon: "🟢", text: "قوية لـ 1080p Ultra" });
    recs.push({ icon: "🟡", text: "1440p High — سلسة في أغلب الألعاب" });
    recs.push({ icon: "🔴", text: "غير مناسبة لـ 4K الثقيل" });
  } else if (avg >= 50) {
    recs.push({ icon: "🟢", text: "كافية لـ 1080p High في التنافسية" });
    recs.push({ icon: "🔴", text: "1440p غير مريحة في AAA" });
  } else {
    recs.push({ icon: "🟡", text: "1080p Medium في الألعاب الثقيلة" });
    recs.push({ icon: "🟢", text: "الألعاب الخفيفة سلسة" });
  }

  if (bn?.type === "gpu") recs.push({ icon: "⬆️", text: "ارفع كرت الشاشة أولاً — المعالج ممتاز" });
  else if (bn?.type === "cpu") recs.push({ icon: "⬆️", text: "ارفع المعالج أولاً — الكرت ممتاز" });
  else if (bn) recs.push({ icon: "✅", text: "لا تغيّر شيء الآن — التوازن ممتاز" });

  return recs;
}

// Compare worth-it analysis
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

// Upgrade roadmap
export function getUpgradeRoadmap(components, allComponents) {
  if (!components.cpu || !components.gpu) return [];
  const bn = analyzeBottleneck(components.cpu, components.gpu);
  const items = [];

  if (bn?.type === "gpu" || bn?.type === "balanced") {
    const betterGPUs = allComponents
      .filter(c => c.type === 'gpu' && c.score > components.gpu.score)
      .sort((a, b) => a.price - b.price);

    if (betterGPUs.length) {
      items.push({
        priority: bn?.type === "gpu" ? 1 : 2,
        label: bn?.type === "gpu" ? "كرت الشاشة (الأولوية)" : "كرت الشاشة (تحسين)",
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

  if (bn?.type === "cpu" || bn?.type === "balanced") {
    // Same socket CPUs first
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
        priority: bn?.type === "cpu" ? 1 : 2,
        label: bn?.type === "cpu" ? "المعالج (الأولوية)" : "المعالج (تحسين)",
        icon: "🧠",
        current: components.cpu,
        options: opts
      });
    }
  }

  return items.sort((a, b) => a.priority - b.priority);
}

// Chat responses
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
    return `${bn.severity === "good" ? "✅" : "⚠️"} ${bn.label}\n${bn.msg}`;
  }

  if (lower.includes("أشتري") || lower.includes("متجر") || lower.includes("شراء")) {
    return "🛒 أفضل المتاجر السعودية:\n• جرير — ضمان محلي\n• اكسترا — عروض دورية\n• نون — توصيل سريع\n• أمازون SA — تنوع كبير\n• حاسبات العرب — متخصص\n\nتابع صفحة العروض للتخفيضات! 🏷️";
  }

  if (lower.includes("ميزاني") || lower.includes("budget")) {
    return "💰 دليل الميزانيات:\n• 3-4.5K ر.س → 1080p Gaming\n• 5-8K ر.س → 1440p Ultra\n• 9-14K ر.س → 4K + Stream\n• 15K+ ر.س → أقصى أداء\n\nجرب التجميعات الجاهزة في الصفحة الرئيسية!";
  }

  return "جرب تسألني عن:\n📊 قيّم تجميعتي\n🔧 وش أرقّي أول\n🔍 عنق الزجاجة\n🛒 وين أشتري\n💰 الميزانيات";
}

// Color helpers
export function severityColor(sev) {
  if (sev === "good") return "#00e676";
  if (sev === "warn") return "#ffd740";
  return "#ff5252";
}

export function fpsColor(level) {
  if (level === "exc") return { text: "#00e676", bg: "rgba(0,230,118,0.15)" };
  if (level === "good") return { text: "#ffd740", bg: "rgba(255,215,64,0.15)" };
  if (level === "ok") return { text: "#ff9100", bg: "rgba(255,145,0,0.15)" };
  return { text: "#ff5252", bg: "rgba(255,82,82,0.15)" };
}

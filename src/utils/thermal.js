// PCBux Thermal & Acoustic Harmony Index
// Evaluates cooler adequacy, case airflow, and overall thermal design

export function calcThermalHarmony(components) {
  const { cpu, gpu, cooler, case: pcCase, psu } = components;
  if (!cpu || !gpu) return null;

  let score = 70; // Base — decent until proven otherwise
  const issues = [];
  const tips = [];

  const cpuTDP = cpu.tdp || 65;
  const gpuTDP = gpu.tdp || 150;
  const totalHeat = cpuTDP + gpuTDP;

  // ── Cooler adequacy ──
  if (cooler) {
    const coolerMax = cooler.tdpMax || 150;
    const headroom = coolerMax / cpuTDP;

    if (headroom >= 1.5) {
      score += 10;
      tips.push('المبرد ممتاز — يتحمل حتى كسر السرعة');
    } else if (headroom >= 1.1) {
      score += 5;
    } else if (headroom < 0.9) {
      score -= 15;
      issues.push(`المبرد (${coolerMax}W) ضعيف للمعالج (${cpuTDP}W TDP)`);
    }

    // AIO bonus for high-TDP CPUs
    if (cooler.type === 'liquid' || (cooler.name || '').toLowerCase().includes('aio')) {
      score += 5;
    }
  } else {
    // No cooler selected
    if (cpuTDP > 95) {
      score -= 10;
      issues.push('المعالج يحتاج مبرد قوي — اختر واحد');
    } else {
      score -= 3;
      tips.push('أضف مبرد — حتى لو المعالج بارد');
    }
  }

  // ── Case airflow ──
  if (pcCase) {
    const caseName = (pcCase.name || '').toLowerCase();
    const isAirflow = caseName.includes('airflow') || caseName.includes('mesh') || caseName.includes('flow');
    const maxGPU = pcCase.maxGPU || 350;

    if (isAirflow) {
      score += 8;
      tips.push('الكيس يدعم تدفق هوا ممتاز');
    }

    // GPU clearance check
    if (gpu.length && maxGPU < gpu.length) {
      score -= 12;
      issues.push('الكرت أطول من المساحة المتاحة بالكيس!');
    }

    // Tiny case + high TDP = thermal problem
    if (pcCase.formFactor === 'Mini-ITX' && totalHeat > 300) {
      score -= 10;
      issues.push('كيس ITX مع قطع حارة — الحرارة بتكون مشكلة');
    }
  } else {
    tips.push('اختر كيس مع تهوية جيدة (Mesh/Airflow)');
  }

  // ── Total system heat ──
  if (totalHeat > 500) {
    score -= 8;
    issues.push('الحرارة الكلية عالية جداً — تأكد من التبريد');
  } else if (totalHeat > 350) {
    score -= 3;
  } else if (totalHeat <= 200) {
    score += 5;
    tips.push('تجميعة باردة وهادية');
  }

  // ── PSU efficiency affects heat ──
  if (psu) {
    const rating = (psu.rating || '').toLowerCase();
    if (rating.includes('platinum') || rating.includes('titanium')) {
      score += 3;
    } else if (rating.includes('gold')) {
      score += 1;
    }
  }

  score = Math.min(Math.max(Math.round(score), 5), 100);

  let label, color, emoji;
  if (score >= 80) { label = 'ممتاز'; color = '#00e676'; emoji = '🧊'; }
  else if (score >= 60) { label = 'جيد'; color = '#ffd740'; emoji = '👍'; }
  else if (score >= 40) { label = 'متوسط'; color = '#ff9100'; emoji = '🌡️'; }
  else { label = 'ضعيف'; color = '#ff5252'; emoji = '🔥'; }

  // Noise estimate (1-5 scale)
  let noise = 2;
  if (totalHeat > 400) noise = 4;
  else if (totalHeat > 300) noise = 3;
  if (cooler?.type === 'liquid') noise = Math.max(1, noise - 1);
  if (pcCase && (pcCase.name || '').toLowerCase().includes('silent')) noise = Math.max(1, noise - 1);

  const noiseLabels = ['', 'صامت 🤫', 'هادي 😊', 'متوسط 🔊', 'مسموع 📢', 'عالي 🔴'];

  return {
    score,
    label,
    emoji,
    color,
    noise,
    noiseLabel: noiseLabels[noise] || 'متوسط',
    issues,
    tips,
    totalHeat,
  };
}

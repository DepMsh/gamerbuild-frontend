/**
 * PCBux Analytics — Track user events via Google Analytics
 *
 * Events are sent to GA4 (G-08H0W8XRRN) and also stored
 * in localStorage for the simple admin dashboard.
 */

function sendGA(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

function storeLocal(eventName) {
  try {
    const key = 'pcbux_analytics';
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    const today = new Date().toISOString().split('T')[0];

    if (!data[today]) data[today] = {};
    if (!data[today][eventName]) data[today][eventName] = 0;
    data[today][eventName]++;

    // Keep only last 30 days
    const keys = Object.keys(data).sort().reverse();
    if (keys.length > 30) {
      keys.slice(30).forEach(k => delete data[k]);
    }

    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // Silently fail
  }
}

export const track = {
  selectPart: (category, partName) => {
    sendGA('select_part', { category, part_name: partName });
    storeLocal('select_part');
  },
  completeBuild: (totalPrice) => {
    sendGA('complete_build', { value: totalPrice, currency: 'SAR' });
    storeLocal('complete_build');
  },
  clickAmazon: (partName, price) => {
    sendGA('click_amazon', { part_name: partName, value: price, currency: 'SAR' });
    storeLocal('click_amazon');
  },
  saveBuild: () => {
    sendGA('save_build');
    storeLocal('save_build');
  },
  shareBuild: () => {
    sendGA('share_build');
    storeLocal('share_build');
  },
  loadPreset: (presetName) => {
    sendGA('load_preset', { preset: presetName });
    storeLocal('load_preset');
  },
  viewAnalysis: () => {
    sendGA('view_analysis');
    storeLocal('view_analysis');
  },
  viewFPS: () => {
    sendGA('view_fps');
    storeLocal('view_fps');
  },
  openSharedBuild: () => {
    sendGA('open_shared_build');
    storeLocal('open_shared_build');
  },
  clearBuild: () => {
    sendGA('clear_build');
    storeLocal('clear_build');
  },
  pageView: () => {
    storeLocal('page_view');
  },
};

export function getAnalytics() {
  try {
    return JSON.parse(localStorage.getItem('pcbux_analytics') || '{}');
  } catch {
    return {};
  }
}

export function clearAnalytics() {
  localStorage.removeItem('pcbux_analytics');
}

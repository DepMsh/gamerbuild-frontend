import { createContext, useContext, useReducer, useCallback } from 'react';
import { encodeBuild, decodeBuild, generateBuildCode } from '../utils/buildShare';
import { track } from '../utils/analytics';

const BuildContext = createContext();

const initialState = {
  components: {
    cpu: null,
    gpu: null,
    motherboard: null,
    ram: null,
    ssd: null,
    psu: null,
    cooler: null,
    case: null,
  },
  compatibility: { status: 'unknown', issues: [] },
  totalPrice: 0,
};

function buildReducer(state, action) {
  switch (action.type) {
    case 'SET_COMPONENT': {
      const newComponents = { ...state.components, [action.category]: action.component };
      const totalPrice = Object.values(newComponents).reduce((sum, c) => sum + (c?.price || 0), 0);
      return { ...state, components: newComponents, totalPrice };
    }
    case 'REMOVE_COMPONENT': {
      const newComponents = { ...state.components, [action.category]: null };
      const totalPrice = Object.values(newComponents).reduce((sum, c) => sum + (c?.price || 0), 0);
      return { ...state, components: newComponents, totalPrice };
    }
    case 'LOAD_BUILD': {
      const totalPrice = Object.values(action.components).reduce((sum, c) => sum + (c?.price || 0), 0);
      return { ...state, components: action.components, totalPrice };
    }
    case 'SET_COMPATIBILITY':
      return { ...state, compatibility: action.compatibility };
    case 'CLEAR_BUILD':
      return { ...initialState };
    default:
      return state;
  }
}

export function BuildProvider({ children }) {
  const [state, dispatch] = useReducer(buildReducer, initialState);

  const setComponent = useCallback((category, component) => {
    dispatch({ type: 'SET_COMPONENT', category, component });
    if (component?.name) track.selectPart(category, component.name);
  }, []);

  const removeComponent = useCallback((category) => {
    dispatch({ type: 'REMOVE_COMPONENT', category });
  }, []);

  const loadBuild = useCallback((components) => {
    dispatch({ type: 'LOAD_BUILD', components });
  }, []);

  const clearBuild = useCallback(() => {
    dispatch({ type: 'CLEAR_BUILD' });
    track.clearBuild();
  }, []);

  const loadPreset = useCallback(async (presetName) => {
    const presets = {
      budget:         { cpu: 'cpu-43',  gpu: 'gpu-116', motherboard: 'mb-85',  ram: 'ram-176', ssd: 'ssd-1061', psu: 'psu-140', cooler: 'cool-58',  case: 'case-460' },
      amd_value:      { cpu: 'cpu-22',  gpu: 'gpu-30',  motherboard: 'mb-85',  ram: 'ram-176', ssd: 'ssd-1061', psu: 'psu-140', cooler: 'cool-56',  case: 'case-192' },
      mid:            { cpu: 'cpu-21',  gpu: 'gpu-343', motherboard: 'mb-433', ram: 'ram-421', ssd: 'ssd-719',  psu: 'psu-138', cooler: 'cool-51',  case: 'case-453' },
      nvidia_premium: { cpu: 'cpu-21',  gpu: 'gpu-296', motherboard: 'mb-186', ram: 'ram-116', ssd: 'ssd-719',  psu: 'psu-133', cooler: 'cool-43',  case: 'case-174' },
      beast:          { cpu: 'cpu-3',   gpu: 'gpu-230', motherboard: 'mb-176', ram: 'ram-73',  ssd: 'ssd-164',  psu: 'psu-130', cooler: 'cool-476', case: 'case-174' },
    };
    const preset = presets[presetName];
    if (!preset) return;
    const { getById } = await import('../utils/db');
    const newComponents = { cpu: null, gpu: null, motherboard: null, ram: null, ssd: null, psu: null, cooler: null, case: null };
    Object.entries(preset).forEach(([category, id]) => {
      const comp = getById(id);
      if (comp) newComponents[category] = comp;
    });
    dispatch({ type: 'LOAD_BUILD', components: newComponents });
    track.loadPreset(presetName);
  }, []);

  const loadFromEncoded = useCallback(async (encoded) => {
    const ids = decodeBuild(encoded);
    if (!ids) return false;
    const { getById } = await import('../utils/db');
    const newComponents = { cpu: null, gpu: null, motherboard: null, ram: null, ssd: null, psu: null, cooler: null, case: null };
    Object.entries(ids).forEach(([category, id]) => {
      const comp = getById(id);
      if (comp) newComponents[category] = comp;
    });
    if (Object.values(newComponents).some(Boolean)) {
      dispatch({ type: 'LOAD_BUILD', components: newComponents });
      track.openSharedBuild();
      return true;
    }
    return false;
  }, []);

  const getShareUrl = useCallback(() => {
    const encoded = encodeBuild(state.components);
    if (!encoded) return null;
    return `${window.location.origin}/b/${encoded}`;
  }, [state.components]);

  const getBuildCode = useCallback(() => {
    return generateBuildCode(state.components);
  }, [state.components]);

  const saveBuild = useCallback((name) => {
    const saved = JSON.parse(localStorage.getItem('pcbux_builds') || '[]');
    const buildData = {
      id: Date.now().toString(36),
      name: name || generateBuildCode(state.components),
      date: new Date().toLocaleDateString('ar-SA'),
      encoded: encodeBuild(state.components),
      parts: Object.entries(state.components)
        .filter(([, v]) => v)
        .map(([cat, comp]) => ({ category: cat, name: comp.name, price: comp.price })),
      totalPrice: state.totalPrice,
    };
    saved.unshift(buildData);
    if (saved.length > 20) saved.pop();
    localStorage.setItem('pcbux_builds', JSON.stringify(saved));
    track.saveBuild();
    return buildData;
  }, [state.components, state.totalPrice]);

  const getSavedBuilds = useCallback(() => {
    return JSON.parse(localStorage.getItem('pcbux_builds') || '[]');
  }, []);

  const deleteSavedBuild = useCallback((buildId) => {
    const saved = JSON.parse(localStorage.getItem('pcbux_builds') || '[]');
    localStorage.setItem('pcbux_builds', JSON.stringify(saved.filter(b => b.id !== buildId)));
  }, []);

  const selectedCount = Object.values(state.components).filter(Boolean).length;

  return (
    <BuildContext.Provider value={{
      ...state,
      selectedCount,
      setComponent,
      removeComponent,
      loadBuild,
      loadPreset,
      loadFromEncoded,
      getShareUrl,
      getBuildCode,
      saveBuild,
      getSavedBuilds,
      deleteSavedBuild,
      clearBuild,
    }}>
      {children}
    </BuildContext.Provider>
  );
}

export function useBuild() {
  const ctx = useContext(BuildContext);
  if (!ctx) throw new Error('useBuild must be used within BuildProvider');
  return ctx;
}

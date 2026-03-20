import { createContext, useContext, useReducer, useCallback } from 'react';
import { getById } from '../utils/db';

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
  }, []);

  const removeComponent = useCallback((category) => {
    dispatch({ type: 'REMOVE_COMPONENT', category });
  }, []);

  const loadBuild = useCallback((components) => {
    dispatch({ type: 'LOAD_BUILD', components });
  }, []);

  const clearBuild = useCallback(() => {
    dispatch({ type: 'CLEAR_BUILD' });
  }, []);

  const loadPreset = useCallback((presetName) => {
    const presets = {
      budget: { cpu: 'cpu-48', gpu: 'gpu-129', motherboard: 'mb-85', ram: 'ram-572', ssd: 'ssd-399', psu: 'psu-57', cooler: 'cool-352', case: 'case-460' },
      mid:    { cpu: 'cpu-22', gpu: 'gpu-61',  motherboard: 'mb-26', ram: 'ram-549', ssd: 'ssd-32',  psu: 'psu-123', cooler: 'cool-44',  case: 'case-252' },
      beast:  { cpu: 'cpu-7',  gpu: 'gpu-230', motherboard: 'mb-3',  ram: 'ram-4',   ssd: 'ssd-1037', psu: 'psu-73', cooler: 'cool-43',  case: 'case-246' },
    };
    const preset = presets[presetName];
    if (!preset) return;
    const newComponents = { cpu: null, gpu: null, motherboard: null, ram: null, ssd: null, psu: null, cooler: null, case: null };
    Object.entries(preset).forEach(([category, id]) => {
      const comp = getById(id);
      if (comp) newComponents[category] = comp;
    });
    dispatch({ type: 'LOAD_BUILD', components: newComponents });
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

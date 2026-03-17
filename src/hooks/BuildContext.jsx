import { createContext, useContext, useReducer, useCallback } from 'react';

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

  const selectedCount = Object.values(state.components).filter(Boolean).length;

  return (
    <BuildContext.Provider value={{
      ...state,
      selectedCount,
      setComponent,
      removeComponent,
      loadBuild,
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

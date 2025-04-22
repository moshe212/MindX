import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import AgentModal from '../components/common/AgentModal';

// Define action types
const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
const SET_MODAL = 'SET_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

// Initial state
const initialState = {
  activeTab: 'conversation',
  modal: {
    isOpen: false,
    type: null
  }
};

// Reducer function
const uiReducer = (state, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
    case SET_MODAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          type: action.payload.type,
          props: action.payload.props
        }
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          isOpen: false,
          type: null,
          props: null
        }
      };
    default:
      return state;
  }
};

// Create context
const UiContext = createContext();

// Create provider component
export const UiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  
  // Tab management
  const setActiveTab = useCallback((tab) => {
    dispatch({ type: SET_ACTIVE_TAB, payload: tab });
  }, []);
  
  // Modal management
  const setModal = useCallback((modalConfig) => {
    dispatch({ type: SET_MODAL, payload: modalConfig });
  }, []);
  
  const closeModal = useCallback(() => {
    dispatch({ type: CLOSE_MODAL });
  }, []);
  
  // Mapping of modal types to components
  const modalComponents = useMemo(() => ({
    agentModal: AgentModal
  }), []);
  
  // Current modal to display
  const CurrentModal = state.modal.isOpen 
    ? modalComponents[state.modal.type] 
    : null;
  
  return (
    <UiContext.Provider value={{ 
      state, 
      setActiveTab,
      setModal,
      closeModal
    }}>
      {children}
      
      {/* Render current modal if one is open */}
      {CurrentModal && <CurrentModal {...(state.modal.props || {})} />}
    </UiContext.Provider>
  );
};

// Custom hook to use the context
export const useUiContext = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error('useUiContext must be used within a UiProvider');
  }
  return context;
};
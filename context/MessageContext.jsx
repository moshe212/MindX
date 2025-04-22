import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { formatDate } from "../utils/dateFormatter";
import { messageService } from "../services/index";
import { agentService } from "../services/index";

// Define action types
const ADD_MESSAGE = "ADD_MESSAGE";
const SET_MESSAGES = "SET_MESSAGES";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";
const CHANGE_MODE = "CHANGE_MODE";
const CHANGE_AGENT = "CHANGE_AGENT";
const ADD_AGENT = "ADD_AGENT";
const SET_AGENTS = "SET_AGENTS";

// Initial state
const initialState = {
  messages: [
    {
      id: 1,
      text: "ברוך הבא למערכת הצ'אט של קוגלי. במה אוכל לעזור?",
      isUser: false,
      timestamp: formatDate(),
      sources: ["מאגר מידע פנימי"],
    },
  ],
  loading: false,
  error: null,
  selectedMode: "dataRepository",
  selectedAgent: "free",
  agents: [
    { id: "free", name: "חופשי", role: "כללי" },
    { id: "marketing", name: "יועץ שיווקי", role: "שיווק" },
    { id: "training", name: "מאמן הדרכה", role: "הדרכה" },
  ],
};

// Reducer function
const messageReducer = (state, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CHANGE_MODE:
      return {
        ...state,
        selectedMode: action.payload,
      };
    case CHANGE_AGENT:
      return {
        ...state,
        selectedAgent: action.payload,
      };
    case ADD_AGENT:
      return {
        ...state,
        agents: [...state.agents, action.payload],
      };
    case SET_AGENTS:
      return {
        ...state,
        agents: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const MessageContext = createContext();

// Create provider component
export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  // Add a single message to the state
  const addMessage = useCallback((message) => {
    dispatch({ type: ADD_MESSAGE, payload: message });
  }, []);

  // Set the entire messages array
  const setMessages = useCallback((messages) => {
    dispatch({ type: SET_MESSAGES, payload: messages });
  }, []);

  // Set loading state
  const setLoading = useCallback((isLoading) => {
    dispatch({ type: SET_LOADING, payload: isLoading });
  }, []);

  // Set error state
  const setError = useCallback((error) => {
    dispatch({ type: SET_ERROR, payload: error });
  }, []);

  // Change conversation mode
  const changeMode = useCallback(
    (mode) => {
      dispatch({ type: CHANGE_MODE, payload: mode });

      // Add system message about mode change
      const modeMessages = {
        dataRepository: "תשובות שיתקבלו מעכשיו יתבססו על מאגר המידע",
        gptOnly: "תשובות שיתקבלו מעכשיו יתבססו על GPT בלבד",
        combined: "תשובות שיתקבלו מעכשיו יתבססו על שאלות משולבות",
      };

      addMessage({
        id: Date.now(),
        text: modeMessages[mode],
        isUser: false,
        timestamp: formatDate(),
        sources: ["הגדרות מערכת"],
      });
    },
    [addMessage]
  );

  // Change selected agent
  const changeAgent = useCallback(
    (selectedAgent) => {
      dispatch({ type: CHANGE_AGENT, payload: selectedAgent });

      // Add system message about agent change
      const agentInfo = state.agents.find((a) => a.id === selectedAgent) || {
        name: "חופשי",
      };

      addMessage({
        id: Date.now(),
        text: `עברת לסוכן: ${agentInfo.name}`,
        isUser: false,
        timestamp: formatDate(),
        sources: ["הגדרות מערכת"],
      });
    },
    [addMessage, state.agents]
  );

  // Fetch chat history
  const fetchChatHistory = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const history = await messageService.getChatHistory();
      setMessages(history);
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
      setError("אירעה שגיאה בטעינת היסטוריית הצ'אט");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setMessages]);

  // Send a new user message and get AI response
  const sendUserMessage = useCallback(
    async (text) => {
      if (!text || text.trim() === "") return;

      // Add user message to the state
      const userMessage = {
        id: Date.now(),
        text,
        isUser: true,
        timestamp: formatDate(),
      };

      addMessage(userMessage);
      setLoading(true);
      setError(null);

      try {
        // Call API to get AI response
        const response = await messageService.sendMessage(
          text,
          state.selectedMode,
          state.selectedAgent
        );

        // Add AI response to the state
        const aiMessage = {
          id: Date.now() + 1,
          text: response.text,
          isUser: false,
          timestamp: formatDate(),
          sources: response.sources || ["מאגר מידע פנימי"],
        };

        addMessage(aiMessage);
      } catch (error) {
        console.error("Failed to send message:", error);
        setError("אירעה שגיאה בשליחת ההודעה");
      } finally {
        setLoading(false);
      }
    },
    [addMessage, setLoading, setError, state.selectedMode, state.selectedAgent]
  );

  // Add a new agent
  const addAgent = useCallback(
    async (agentData) => {
      setLoading(true);
      setError(null);

      try {
        // Call API to add the agent
        const newAgent = await agentService.addAgent(agentData);

        // Add the new agent to the state
        dispatch({ type: ADD_AGENT, payload: newAgent });

        // Add system message about agent addition
        addMessage({
          id: Date.now(),
          text: `הסוכן ${newAgent.name} נוסף בהצלחה`,
          isUser: false,
          timestamp: formatDate(),
          sources: ["הגדרות מערכת"],
        });

        return newAgent;
      } catch (error) {
        console.error("Failed to add agent:", error);
        setError("אירעה שגיאה בהוספת הסוכן");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addMessage, setLoading, setError]
  );

  // Fetch all agents
  const fetchAgents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const agents = await agentService.getAgents();
      dispatch({ type: SET_AGENTS, payload: agents });
    } catch (error) {
      console.error("Failed to fetch agents:", error);
      setError("אירעה שגיאה בטעינת הסוכנים");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  return (
    <MessageContext.Provider
      value={{
        state,
        addMessage,
        setMessages,
        setLoading,
        setError,
        changeMode,
        changeAgent,
        fetchChatHistory,
        sendUserMessage,
        addAgent,
        fetchAgents,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook to use the context
export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};

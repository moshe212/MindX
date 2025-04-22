// This file contains mock implementations of all API services
// In a real application, these would make actual API calls

import { formatDate } from '../utils/dateFormatter';

// Mock data
let mockMessages = [
  { 
    id: 1, 
    text: 'ברוך הבא למערכת הצ\'אט של קוגלי. במה אוכל לעזור?', 
    isUser: false,
    timestamp: formatDate(new Date(2025, 3, 21, 8, 30)),
    sources: ['מאגר מידע פנימי']
  }
];

let mockUsers = [
  { id: 1, name: 'משתמש 1', email: 'user1@example.com', role: 'מנהל', active: true },
  { id: 2, name: 'משתמש 2', email: 'user2@example.com', role: 'משתמש', active: true },
  { id: 3, name: 'משתמש 3', email: 'user3@example.com', role: 'משתמש', active: true },
  { id: 4, name: 'משתמש 4', email: 'user4@example.com', role: 'משתמש', active: true },
  { id: 5, name: 'משתמש 5', email: 'user5@example.com', role: 'משתמש', active: false }
];

let mockAgents = [
  { id: 'free', name: 'חופשי', role: 'כללי', prompt: '' },
  { id: 'marketing', name: 'יועץ שיווקי', role: 'שיווק', prompt: 'אתה יועץ שיווקי מומחה' },
  { id: 'training', name: 'מאמן הדרכה', role: 'הדרכה', prompt: 'אתה מאמן הדרכה מומחה' }
];

let mockIntegrations = [
  { id: 1, name: 'אינטגרציה 1', category: 'מאגרי מידע', description: 'תיאור האינטגרציה יופיע כאן', isConnected: true },
  { id: 2, name: 'אינטגרציה 2', category: 'מערכות ניהול', description: 'תיאור האינטגרציה יופיע כאן', isConnected: false },
  { id: 3, name: 'אינטגרציה 3', category: 'שיווק', description: 'תיאור האינטגרציה יופיע כאן', isConnected: true },
  { id: 4, name: 'אינטגרציה 4', category: 'מכירות', description: 'תיאור האינטגרציה יופיע כאן', isConnected: false },
  { id: 5, name: 'אינטגרציה 5', category: 'שירות לקוחות', description: 'תיאור האינטגרציה יופיע כאן', isConnected: true },
  { id: 6, name: 'אינטגרציה 6', category: 'משאבי אנוש', description: 'תיאור האינטגרציה יופיע כאן', isConnected: false }
];

let mockCurrentUser = {
  id: 1,
  name: 'אבי כהן',
  email: 'avi@example.com',
  role: 'מנהל'
};

// Helper to simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock response for AI messages based on conversation mode
const getAIResponse = async (text, mode) => {
  // Generate a mock response based on the mode
  let responseText = '';
  let sources = [];
  
  switch (mode) {
    case 'dataRepository':
      responseText = `קיבלתי את השאלה שלך: "${text}". הנה התשובה ממאגר המידע...`;
      sources = ['מאגר מידע פנימי', 'Google Drive', 'SharePoint'];
      break;
    case 'gptOnly':
      responseText = `קיבלתי את השאלה שלך: "${text}". הנה התשובה מ-GPT...`;
      sources = ['מודל GPT'];
      break;
    case 'combined':
      responseText = `קיבלתי את השאלה שלך: "${text}". הנה התשובה משולבת...`;
      sources = ['מאגר מידע פנימי', 'מודל GPT'];
      break;
    default:
      responseText = `קיבלתי את השאלה שלך: "${text}". אני מעבד את המידע...`;
      sources = ['מאגר מידע פנימי'];
  }
  
  return {
    text: responseText,
    sources
  };
};

// Mock Services
export const messageService = {
  getChatHistory: async () => {
    await delay();
    return [...mockMessages];
  },
  
  sendMessage: async (text, mode, agent) => {
    await delay(1000);
    const response = await getAIResponse(text, mode);
    
    const newMessage = {
      id: Date.now(),
      text: response.text,
      isUser: false,
      timestamp: formatDate(),
      sources: response.sources
    };
    
    mockMessages.push(newMessage);
    return response;
  },
  
  clearHistory: async () => {
    await delay();
    mockMessages = [];
    return true;
  }
};

export const authService = {
  getCurrentUser: async () => {
    await delay();
    return { ...mockCurrentUser };
  },
  
  login: async (email, password) => {
    await delay();
    // Simulate authentication
    if (email && password) {
      return { ...mockCurrentUser };
    }
    throw new Error('אימייל או סיסמה לא תקינים');
  },
  
  logout: async () => {
    await delay();
    return true;
  },
  
  updateProfile: async (userData) => {
    await delay();
    mockCurrentUser = { ...mockCurrentUser, ...userData };
    return { ...mockCurrentUser };
  }
};

export const userService = {
  getUsers: async () => {
    await delay();
    return [...mockUsers];
  },
  
  getUserById: async (id) => {
    await delay();
    const user = mockUsers.find(user => user.id === id);
    if (!user) throw new Error('משתמש לא נמצא');
    return { ...user };
  },
  
  addUser: async (userData) => {
    await delay();
    const newUser = {
      id: mockUsers.length + 1,
      ...userData
    };
    mockUsers.push(newUser);
    return { ...newUser };
  },
  
  updateUser: async (id, userData) => {
    await delay();
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) throw new Error('משתמש לא נמצא');
    
    mockUsers[index] = { ...mockUsers[index], ...userData };
    return { ...mockUsers[index] };
  },
  
  deleteUser: async (id) => {
    await delay();
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) throw new Error('משתמש לא נמצא');
    
    mockUsers = mockUsers.filter(user => user.id !== id);
    return true;
  }
};

export const agentService = {
  getAgents: async () => {
    await delay();
    return [...mockAgents];
  },
  
  addAgent: async (agentData) => {
    await delay();
    const newAgent = {
      id: `agent-${Date.now()}`,
      ...agentData
    };
    mockAgents.push(newAgent);
    return { ...newAgent };
  },
  
  updateAgent: async (id, agentData) => {
    await delay();
    const index = mockAgents.findIndex(agent => agent.id === id);
    if (index === -1) throw new Error('סוכן לא נמצא');
    
    mockAgents[index] = { ...mockAgents[index], ...agentData };
    return { ...mockAgents[index] };
  },
  
  deleteAgent: async (id) => {
    await delay();
    const index = mockAgents.findIndex(agent => agent.id === id);
    if (index === -1) throw new Error('סוכן לא נמצא');
    
    mockAgents = mockAgents.filter(agent => agent.id !== id);
    return true;
  }
};

export const integrationService = {
  getIntegrations: async () => {
    await delay();
    return [...mockIntegrations];
  },
  
  connectIntegration: async (id) => {
    await delay();
    const index = mockIntegrations.findIndex(integration => integration.id === id);
    if (index === -1) throw new Error('אינטגרציה לא נמצאה');
    
    mockIntegrations[index].isConnected = true;
    return { ...mockIntegrations[index] };
  },
  
  syncIntegration: async (id) => {
    await delay(1500);
    const index = mockIntegrations.findIndex(integration => integration.id === id);
    if (index === -1) throw new Error('אינטגרציה לא נמצאה');
    
    return { success: true, message: 'סנכרון הושלם בהצלחה' };
  }
};

export const dataUploadService = {
  uploadFiles: async (files, type) => {
    await delay(2000);
    
    // Simulate upload success
    return {
      success: true,
      filesUploaded: files.length,
      message: `${files.length} קבצים הועלו בהצלחה`
    };
  }
};

// Mock analytics data
const generateMockAnalyticsData = (timeRange) => {
  const data = {
    messageStats: {
      total: 0,
      userMessages: 0,
      aiMessages: 0
    },
    topSources: [],
    dailyActivity: []
  };
  
  // Set base numbers based on time range
  let factor = 1;
  let days = 7;
  
  switch (timeRange) {
    case 'day':
      factor = 1;
      days = 1;
      break;
    case 'week':
      factor = 7;
      days = 7;
      break;
    case 'month':
      factor = 30;
      days = 30;
      break;
    case 'year':
      factor = 365;
      days = 30; // Show last 30 days for year view
      break;
  }
  
  // Generate message stats
  data.messageStats.total = Math.floor(120 * factor);
  data.messageStats.userMessages = Math.floor(50 * factor);
  data.messageStats.aiMessages = Math.floor(70 * factor);
  
  // Generate top sources
  data.topSources = [
    { name: 'מאגר מידע פנימי', count: Math.floor(80 * factor) },
    { name: 'Google Drive', count: Math.floor(30 * factor) },
    { name: 'SharePoint', count: Math.floor(25 * factor) },
    { name: 'מודל GPT', count: Math.floor(15 * factor) }
  ];
  
  // Generate daily activity data
  const now = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.dailyActivity.unshift({
      date: formatDate(date).split(' ')[0], // Just the date part
      conversations: Math.floor(Math.random() * 10 * factor) + 1,
      messages: Math.floor(Math.random() * 20 * factor) + 5
    });
  }
  
  return data;
};

export const analyticsService = {
  getAnalytics: async (timeRange = 'week') => {
    await delay();
    return generateMockAnalyticsData(timeRange);
  }
};
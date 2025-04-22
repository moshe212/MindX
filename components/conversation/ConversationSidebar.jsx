import React from 'react';
import { UserPlus } from 'lucide-react';
import { useMessageContext } from '../../context/MessageContext';
import { useUiContext } from '../../context/UiContext';

const ConversationSidebar = () => {
  const { state: messageState, changeMode } = useMessageContext();
  const { selectedMode, selectedAgent } = messageState;
  const { state: uiState, setModal } = useUiContext();

  const handleModeChange = (mode) => {
    changeMode(mode);
  };

  const handleAgentChange = (agent) => {
    if (agent === 'add') {
      setModal({ isOpen: true, type: 'agentModal' });
    } else {
      changeMode({ type: 'agent', value: agent });
    }
  };

  return (
    <div className="w-64 p-4 border-l border-gray-700">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-200">מצב התכתבות</h3>
        <div className="space-y-2">
          <div 
            className={`p-2 rounded-lg cursor-pointer transition-all flex items-center ${selectedMode === 'dataRepository' ? 'bg-gray-800 border-r-4 border-cyan-400' : 'hover:bg-gray-800'}`}
            onClick={() => handleModeChange('dataRepository')}
          >
            <div className={`w-4 h-4 rounded-full ml-2 ${selectedMode === 'dataRepository' ? 'bg-cyan-400' : 'border border-gray-500'}`}></div>
            <span className="text-gray-200">מאגר המידע</span>
          </div>
          <div 
            className={`p-2 rounded-lg cursor-pointer transition-all flex items-center ${selectedMode === 'gptOnly' ? 'bg-gray-800 border-r-4 border-cyan-400' : 'hover:bg-gray-800'}`}
            onClick={() => handleModeChange('gptOnly')}
          >
            <div className={`w-4 h-4 rounded-full ml-2 ${selectedMode === 'gptOnly' ? 'bg-cyan-400' : 'border border-gray-500'}`}></div>
            <span className="text-gray-200">GPT ללא מאגר מידע</span>
          </div>
          <div 
            className={`p-2 rounded-lg cursor-pointer transition-all flex items-center ${selectedMode === 'combined' ? 'bg-gray-800 border-r-4 border-cyan-400' : 'hover:bg-gray-800'}`}
            onClick={() => handleModeChange('combined')}
          >
            <div className={`w-4 h-4 rounded-full ml-2 ${selectedMode === 'combined' ? 'bg-cyan-400' : 'border border-gray-500'}`}></div>
            <span className="text-gray-200">שאלות משולבות</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-200">בחירת סוכן</h3>
        <div className="space-y-2">
          <div 
            className={`p-2 rounded-lg cursor-pointer transition-all ${selectedAgent === 'free' ? 'bg-gray-800 border-r-4 border-cyan-400 text-cyan-100' : 'hover:bg-gray-800 text-gray-200'}`}
            onClick={() => handleAgentChange('free')}
          >
            חופשי
          </div>
          <div 
            className={`p-2 rounded-lg cursor-pointer transition-all ${selectedAgent === 'marketing' ? 'bg-gray-800 border-r-4 border-cyan-400 text-cyan-100' : 'hover:bg-gray-800 text-gray-200'}`}
            onClick={() => handleAgentChange('marketing')}
          >
            יועץ שיווקי
          </div>
          <div 
            className={`p-2 rounded-lg cursor-pointer transition-all ${selectedAgent === 'training' ? 'bg-gray-800 border-r-4 border-cyan-400 text-cyan-100' : 'hover:bg-gray-800 text-gray-200'}`}
            onClick={() => handleAgentChange('training')}
          >
            מאמן הדרכה
          </div>
          <div 
            className="p-2 rounded-lg cursor-pointer transition-all bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-cyan-400"
            onClick={() => handleAgentChange('add')}
          >
            <UserPlus size={16} className="ml-1" />
            <span>הוספת סוכן</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationSidebar;
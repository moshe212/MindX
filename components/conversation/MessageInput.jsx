import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useMessageContext } from '../../context/MessageContext';

const MessageInput = ({ disabled }) => {
  const [inputValue, setInputValue] = useState('');
  const { sendUserMessage } = useMessageContext();

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    try {
      await sendUserMessage(inputValue);
      setInputValue(''); // Clear input only after successful send
    } catch (error) {
      console.error('Failed to send message:', error);
      // Error handling is managed by the context
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="הקלד הודעה..."
        className="flex-grow p-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
        autoFocus
        disabled={disabled}
        aria-label="תוכן ההודעה"
      />
      <button 
        onClick={handleSendMessage}
        className="mr-2 p-3 bg-cyan-600 text-gray-100 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled || inputValue.trim() === ''}
        aria-label="שלח הודעה"
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default MessageInput;
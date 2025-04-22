import React from 'react';
import ConversationSidebar from './ConversationSidebar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useMessageContext } from '../../context/MessageContext';

const ConversationTab = () => {
  const { state } = useMessageContext();
  const { loading, error } = state;

  return (
    <div dir="rtl" className="flex h-full">
      <ConversationSidebar />
      
      <div className="flex-grow p-4 flex flex-col h-full">
        {error && (
          <div className="bg-red-900 text-red-100 p-3 rounded-lg mb-4">
            <p>{error}</p>
          </div>
        )}
        
        <MessageList />
        
        <MessageInput disabled={loading} />
      </div>
    </div>
  );
};

export default ConversationTab;
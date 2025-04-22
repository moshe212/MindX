import React, { useCallback, useRef, useEffect } from 'react';
import MessageItem from './MessageItem';
import { useMessageContext } from '../../context/MessageContext';

const MessageList = () => {
  const { state } = useMessageContext();
  const { messages, loading } = state;
  const endOfMessagesRef = useRef(null);
  
  // Auto-scroll to the bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);
  
  return (
    <div className="flex-grow overflow-y-auto bg-gray-900 rounded-lg shadow-md mb-4 p-4 border border-gray-800">
      {messages.map(message => (
        <MessageItem key={message.id} message={message} />
      ))}
      
      {loading && (
        <div className="flex justify-center my-4">
          <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default React.memo(MessageList);
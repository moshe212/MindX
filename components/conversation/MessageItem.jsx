import React from 'react';
import { Info } from 'lucide-react';

const MessageItem = ({ message }) => {
  const { id, text, isUser, timestamp, sources } = message;
  
  return (
    <div 
      className="mb-6 flex"
      style={{ justifyContent: isUser ? 'flex-end' : 'flex-start' }}
    >
      <div className="flex items-start gap-2 max-w-md">
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-cyan-700 flex-shrink-0 flex items-center justify-center text-cyan-100 font-bold" aria-hidden="true">
            AI
          </div>
        )}
        <div 
          className={`p-4 rounded-lg relative ${
            isUser 
              ? 'bg-gray-800 text-gray-100 border border-gray-700' 
              : 'bg-gray-800 border border-cyan-900 text-cyan-100'
          }`}
          role={isUser ? "complementary" : "region"}
          aria-label={isUser ? "הודעה שלך" : "תשובת קוגלי"}
        >
          <div className="mb-1">{text}</div>
          
          {/* Sources for AI messages */}
          {!isUser && sources && sources.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-700">
              <div className="text-xs text-gray-400 mb-1">מקורות:</div>
              <div className="flex flex-wrap gap-1">
                {sources.map((source, idx) => (
                  <span key={idx} className="text-xs bg-gray-700 text-cyan-300 rounded px-1 py-0.5">{source}</span>
                ))}
              </div>
            </div>
          )}
          
          {/* Info icon with timestamp tooltip */}
          <div className="absolute -top-1 -left-1 group">
            <div 
              className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 cursor-help text-xs hover:bg-gray-600"
              aria-label="צפה בזמן ההודעה"
            >
              <Info size={12} />
            </div>
            <div 
              className="hidden group-hover:block absolute left-0 -translate-y-full -translate-x-1/2 bottom-6 bg-gray-800 text-gray-300 text-xs rounded p-2 shadow-lg border border-gray-700 whitespace-nowrap z-10"
              role="tooltip"
            >
              {timestamp}
            </div>
          </div>
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-gray-300 font-bold" aria-hidden="true">
            א
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(MessageItem);
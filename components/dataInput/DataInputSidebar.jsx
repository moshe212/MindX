import React from 'react';

const DataInputSidebar = ({ selectedType, onTypeSelect }) => {
  const fileTypes = [
    { id: 'text', name: 'מסמכים טקסטואליים' },
    { id: 'excel', name: 'טעינת אקסלים' },
    { id: 'images', name: 'העלאת תמונות' },
    { id: 'audio', name: 'קבצי קול' },
    { id: 'meetings', name: 'הקלטות פגישות' },
    { id: 'calls', name: 'הקלטות שיחות טלפוניות' },
    { id: 'scanned', name: 'מסמכים סרוקים' },
    { id: 'url', name: 'קישור לדף אינטרנט' },
    { id: 'special', name: 'מיוחדים' }
  ];

  return (
    <div className="w-64 bg-gray-900 border-l border-gray-700 overflow-y-auto p-4">
      <div className="space-y-3">
        {fileTypes.map(type => (
          <div 
            key={type.id}
            className={`p-2 rounded-lg cursor-pointer ${
              selectedType === type.id 
                ? 'bg-gray-800 text-cyan-400 border-r-2 border-cyan-500' 
                : 'hover:bg-gray-800 text-gray-300'
            }`}
            onClick={() => onTypeSelect(type.id)}
            role="button"
            aria-pressed={selectedType === type.id}
          >
            {type.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DataInputSidebar);
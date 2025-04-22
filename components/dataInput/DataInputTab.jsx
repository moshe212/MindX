import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import DataInputSidebar from './DataInputSidebar';
import { useDataUpload } from '../../hooks/useDataUpload';

const DataInputTab = () => {
  const [selectedType, setSelectedType] = useState('text');
  const { uploadFiles, uploading, error } = useDataUpload();
  
  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        await uploadFiles(files, selectedType);
      } catch (err) {
        console.error('File upload failed:', err);
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      try {
        await uploadFiles(e.dataTransfer.files, selectedType);
      } catch (err) {
        console.error('File upload failed:', err);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="h-full flex bg-gray-900" dir="rtl">
      <DataInputSidebar selectedType={selectedType} onTypeSelect={setSelectedType} />
      
      <div className="flex-grow p-6 text-gray-100">
        <h2 className="text-2xl font-bold mb-2">הזנת נתונים</h2>
        <p className="text-gray-400 mb-6">העלה קבצים או הזן מידע למערכת</p>
        
        {error && (
          <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}
        
        <div 
          className="border-2 border-dashed border-gray-700 rounded-lg p-10 flex flex-col items-center justify-center bg-gray-800"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-cyan-400 mb-4">
            <Upload size={30} />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-200">גרור ושחרר קבצים כאן</h3>
          <p className="text-gray-400 mb-4 text-center">או לחץ על הכפתור לבחירת קבצים מהמחשב</p>
          
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            multiple 
            onChange={handleFileSelect}
            disabled={uploading}
          />
          <label 
            htmlFor="file-upload" 
            className={`bg-cyan-600 text-gray-100 px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploading ? 'מעלה קבצים...' : 'בחר קבצים'}
          </label>
        </div>
      </div>
    </div>
  );
};

export default DataInputTab;
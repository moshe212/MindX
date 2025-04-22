import React, { useState } from 'react';
import { useMessageContext } from '../../context/MessageContext';
import { useUiContext } from '../../context/UiContext';

const AgentModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    prompt: ''
  });
  
  const [errors, setErrors] = useState({});
  const { addAgent, loading } = useMessageContext();
  const { closeModal } = useUiContext();
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'נדרש למלא שם';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'נדרש למלא תפקיד';
    }
    
    if (!formData.prompt.trim()) {
      newErrors.prompt = 'נדרש למלא פרומפט';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async () => {
    if (!validate()) return;
    
    try {
      await addAgent(formData);
      closeModal();
    } catch (error) {
      console.error('Error adding agent:', error);
      setErrors(prev => ({ ...prev, submit: 'אירעה שגיאה בהוספת הסוכן' }));
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">הוספת סוכן חדש</h2>
        
        {errors.submit && (
          <div className="bg-red-900 text-red-100 p-3 rounded mb-4">
            {errors.submit}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">שם</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-md text-gray-200 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">תפקיד</label>
            <input 
              type="text" 
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full p-2 bg-gray-700 border ${errors.role ? 'border-red-500' : 'border-gray-600'} rounded-md text-gray-200 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500`}
            />
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>
          
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-1">פרומפט</label>
            <textarea 
              id="prompt"
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              className={`w-full p-2 bg-gray-700 border ${errors.prompt ? 'border-red-500' : 'border-gray-600'} rounded-md text-gray-200 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500 h-24`}
            />
            {errors.prompt && <p className="text-red-500 text-xs mt-1">{errors.prompt}</p>}
          </div>
        </div>
        
        <div className="flex justify-end mt-6 gap-2">
          <button 
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 border border-gray-600"
            onClick={closeModal}
            disabled={loading}
          >
            ביטול
          </button>
          <button 
            className="px-4 py-2 bg-cyan-600 text-gray-100 rounded-md hover:bg-cyan-700 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'מוסיף...' : 'הוסף סוכן'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentModal;
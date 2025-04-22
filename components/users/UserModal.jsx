import React, { useState, useEffect } from 'react';
import { useUserService } from '../../hooks/useUserService';

const UserModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    active: true
  });
  
  const [errors, setErrors] = useState({});
  const { addUser, updateUser, loading } = useUserService();
  
  // Initialize form with user data if editing
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
        active: user.active !== undefined ? user.active : true
      });
    }
  }, [user]);
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'נדרש למלא שם';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'נדרש למלא אימייל';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      if (user) {
        // Update existing user
        await updateUser(user.id, formData);
      } else {
        // Add new user
        await addUser(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
      setErrors(prev => ({ ...prev, submit: 'אירעה שגיאה בשמירת המשתמש' }));
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">
          {user ? 'עריכת משתמש' : 'הוספת משתמש חדש'}
        </h2>
        
        {errors.submit && (
          <div className="bg-red-900 text-red-100 p-3 rounded mb-4">
            {errors.submit}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">אימייל</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md text-gray-200 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">תפקיד</label>
              <select 
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="user">משתמש</option>
                <option value="admin">מנהל</option>
                <option value="editor">עורך</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="active"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-500 rounded"
              />
              <label htmlFor="active" className="mr-2 block text-sm text-gray-300">
                משתמש פעיל
              </label>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 gap-2">
            <button 
              type="button"
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 border border-gray-600"
              onClick={onClose}
              disabled={loading}
            >
              ביטול
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-gray-100 rounded-md hover:bg-cyan-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'שומר...' : user ? 'עדכן' : 'הוסף'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
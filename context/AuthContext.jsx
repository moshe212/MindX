import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/index';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check for existing login session on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setError('אירעה שגיאה באימות המשתמש');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await authService.login(email, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      setError('אירעה שגיאה בהתחברות, אנא בדוק את פרטי הכניסה');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Logout function
  const logout = useCallback(async () => {
    setLoading(true);
    
    try {
      await authService.logout();
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      setError('אירעה שגיאה בהתנתקות');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Update user profile
  const updateProfile = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await authService.updateProfile(userData);
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error);
      setError('אירעה שגיאה בעדכון הפרופיל');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // The value to be provided to consumers
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    updateProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
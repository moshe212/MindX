import { useState, useCallback } from 'react';
import { userService } from '../services/index';

/**
 * Hook for managing user-related operations
 */
export const useUserService = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);

  /**
   * Fetches all users
   */
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedUsers = await userService.getUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError(err.message || 'אירעה שגיאה בטעינת המשתמשים');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Adds a new user
   */
  const addUser = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newUser = await userService.addUser(userData);
      setUsers(prevUsers => [...prevUsers, newUser]);
      return newUser;
    } catch (err) {
      console.error('Failed to add user:', err);
      setError(err.message || 'אירעה שגיאה בהוספת המשתמש');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Updates an existing user
   */
  const updateUser = useCallback(async (id, userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await userService.updateUser(id, userData);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === id ? updatedUser : user
        )
      );
      return updatedUser;
    } catch (err) {
      console.error('Failed to update user:', err);
      setError(err.message || 'אירעה שגיאה בעדכון המשתמש');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Deletes a user
   */
  const deleteUser = useCallback(async (id) => {
    setDeletingUserId(id);
    setError(null);
    
    try {
      await userService.deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (err) {
      console.error('Failed to delete user:', err);
      setError(err.message || 'אירעה שגיאה במחיקת המשתמש');
      throw err;
    } finally {
      setDeletingUserId(null);
    }
  }, []);

  return {
    users,
    loading,
    error,
    deletingUserId,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  };
};
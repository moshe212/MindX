import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import UserTable from './UserTable';
import UserModal from './UserModal';
import { useUserService } from '../../hooks/useUserService';

const UsersTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, loading, error, fetchUsers } = useUserService();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = () => {
    setSelectedUser(null); // No user selected means we're adding a new one
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-gray-900 p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">ניהול משתמשים</h2>
        <button 
          className="bg-cyan-600 text-gray-100 px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors flex items-center"
          onClick={handleAddUser}
        >
          <UserPlus size={18} className="ml-2" />
          הוסף משתמש
        </button>
      </div>
      
      {error && (
        <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <UserTable 
          users={users} 
          onEditUser={handleEditUser} 
        />
      )}
      
      {isModalOpen && (
        <UserModal 
          user={selectedUser} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default UsersTab;
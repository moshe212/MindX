import React from 'react';
import { useUserService } from '../../hooks/useUserService';

const UserTable = ({ users, onEditUser }) => {
  const { deleteUser, deletingUserId } = useUserService();

  const handleDeleteUser = async (userId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק משתמש זה?')) {
      try {
        await deleteUser(userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  if (!users || users.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-8 text-center">
        <p className="text-gray-400">אין משתמשים להצגה</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">שם</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">אימייל</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">תפקיד</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">סטטוס</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">פעולות</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-300">{user.name}</td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4 text-gray-300">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.active ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {user.active ? 'פעיל' : 'לא פעיל'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button 
                      className="text-cyan-400 hover:text-cyan-300 mx-1"
                      onClick={() => onEditUser(user)}
                    >
                      ערוך
                    </button>
                    <button 
                      className="text-red-400 hover:text-red-300 mx-1"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deletingUserId === user.id}
                    >
                      {deletingUserId === user.id ? 'מוחק...' : 'מחק'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(UserTable);
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchUsers, updateFilter, User } from '../features/users/userSlice';

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, filter, status } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const filterKey = name as keyof User;
    dispatch(updateFilter({ key: filterKey, value }));
  };

  return (
    <div className="App max-w-6xl mx-auto p-4 sm:p-8 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-2xl rounded-xl mt-5">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-6 sm:mb-10">
        User Management Table
      </h1>

      {/* Filter Inputs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filter.name}
          onChange={handleFilterChange}
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors"
        />
        <input
          type="text"
          name="username"
          placeholder="Filter by username"
          value={filter.username}
          onChange={handleFilterChange}
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by email"
          value={filter.email}
          onChange={handleFilterChange}
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        />
        <input
          type="text"
          name="phone"
          placeholder="Filter by phone"
          value={filter.phone}
          onChange={handleFilterChange}
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
        />
      </div>

      {/* Loading and Error Messages */}
      {status === 'loading' && <p className="text-center text-white font-semibold">Loading...</p>}
      {status === 'failed' && <p className="text-center text-red-600 font-semibold">Error loading data.</p>}

      {/* Responsive Table */}
      {status === 'idle' && (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-indigo-700 text-white">
                  <th className="p-4 text-left font-semibold uppercase text-sm border-b border-indigo-500">Name</th>
                  <th className="p-4 text-left font-semibold uppercase text-sm border-b border-indigo-500">Username</th>
                  <th className="p-4 text-left font-semibold uppercase text-sm border-b border-indigo-500">Email</th>
                  <th className="p-4 text-left font-semibold uppercase text-sm border-b border-indigo-500">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-indigo-100 transition-colors">
                    <td className="p-4 text-gray-900 border-r border-gray-200">{user.name}</td>
                    <td className="p-4 text-gray-900 border-r border-gray-200">{user.username}</td>
                    <td className="p-4 text-gray-900 border-r border-gray-200">{user.email}</td>
                    <td className="p-4 text-gray-900">{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="block sm:hidden">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md bg-white hover:bg-indigo-50 transition-colors">
                <p className="font-semibold text-gray-700">
                  <span className="font-bold">Name:</span> {user.name}
                </p>
                <p className="font-semibold text-gray-700">
                  <span className="font-bold">Username:</span> {user.username}
                </p>
                <p className="font-semibold text-gray-700">
                  <span className="font-bold">Email:</span> {user.email}
                </p>
                <p className="font-semibold text-gray-700">
                  <span className="font-bold">Phone:</span> {user.phone}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;
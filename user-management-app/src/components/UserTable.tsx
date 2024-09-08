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
    <div className="app-container">
      <h1 className="title">User Management Table</h1>

      {/* Filter Inputs */}
      <div className="filter-container">
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filter.name}
          onChange={handleFilterChange}
          className="input-filter"
        />
        <input
          type="text"
          name="username"
          placeholder="Filter by username"
          value={filter.username}
          onChange={handleFilterChange}
          className="input-filter"
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by email"
          value={filter.email}
          onChange={handleFilterChange}
          className="input-filter"
        />
        <input
          type="text"
          name="phone"
          placeholder="Filter by phone"
          value={filter.phone}
          onChange={handleFilterChange}
          className="input-filter"
        />
      </div>

      {/* Loading and Error Messages */}
      {status === 'loading' && <p className="loading-message">Loading...</p>}
      {status === 'failed' && <p className="error-message">Error loading data.</p>}

      {/* Responsive Table */}
      {status === 'idle' && (
        <>
          {/* Desktop Table */}
          <div className="desktop-table-container">
            <table className="user-table">
              <thead>
                <tr className="table-header">
                  <th className="table-cell">Name</th>
                  <th className="table-cell">Username</th>
                  <th className="table-cell">Email</th>
                  <th className="table-cell">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="table-row">
                    <td className="table-cell">{user.name}</td>
                    <td className="table-cell">{user.username}</td>
                    <td className="table-cell">{user.email}</td>
                    <td className="table-cell">{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="mobile-view-container">
            {filteredUsers.map((user) => (
              <div key={user.id} className="mobile-user-card">
                <p className="user-info"><span className="info-label">Name:</span> {user.name}</p>
                <p className="user-info"><span className="info-label">Username:</span> {user.username}</p>
                <p className="user-info"><span className="info-label">Email:</span> {user.email}</p>
                <p className="user-info"><span className="info-label">Phone:</span> {user.phone}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;
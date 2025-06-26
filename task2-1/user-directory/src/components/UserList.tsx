import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types/User';
import { userService } from '../services/api';
import UserCard from './UserCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import './UserList.css';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await userService.getUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>User Directory ({filteredUsers.length} users)</h2>
        <p>Explore our community of {users.length} users</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {filteredUsers.length === 0 ? (
        <div className="no-results">
          <h3>No users found</h3>
          <p>
            {searchQuery 
              ? `No users match "${searchQuery}". Try a different search term.`
              : 'No users available at the moment.'
            }
          </p>
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map(user => (
            <Link key={user.id} to={`/user/${user.id}`} className="user-link">
              <UserCard user={user} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList; 
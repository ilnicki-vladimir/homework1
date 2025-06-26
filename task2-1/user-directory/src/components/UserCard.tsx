import React from 'react';
import { User } from '../types/User';
import './UserCard.css';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-avatar">
          {getInitials(user.name)}
        </div>
        <div className="user-basic-info">
          <h3 className="user-name">{user.name}</h3>
          <p className="user-username">@{user.username}</p>
        </div>
      </div>
      
      <div className="user-card-body">
        <div className="user-contact">
          <p className="user-email">📧 {user.email}</p>
          <p className="user-phone">📞 {user.phone}</p>
        </div>
        
        <div className="user-company">
          <p className="company-name">🏢 {user.company.name}</p>
          <p className="company-tagline">"{user.company.catchPhrase}"</p>
        </div>
        
        <div className="user-location">
          <p className="location">📍 {user.address.city}, {user.address.zipcode}</p>
          <p className="website">🌐 {user.website}</p>
        </div>
      </div>
      
      <div className="user-card-footer">
        <span className="view-details">View Details →</span>
      </div>
    </div>
  );
};

export default UserCard; 
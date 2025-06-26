import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Post, Album } from '../types/User';
import { userService } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import './UserDetails.css';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'posts' | 'albums'>('info');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const userId = parseInt(id);
        
        const [userData, userPosts, userAlbums] = await Promise.all([
          userService.getUserById(userId),
          userService.getUserPosts(userId),
          userService.getUserAlbums(userId)
        ]);

        setUser(userData);
        setPosts(userPosts);
        setAlbums(userAlbums);
      } catch (err) {
        setError('Failed to fetch user details. Please try again later.');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !user) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>⚠️ Error</h2>
          <p>{error || 'User not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-details-container">
      <div className="user-profile-header">
        <div className="user-avatar-large">
          {getInitials(user.name)}
        </div>
        <div className="user-profile-info">
          <h1 className="user-profile-name">{user.name}</h1>
          <p className="user-profile-username">@{user.username}</p>
          <div className="user-profile-contact">
            <p>📧 {user.email}</p>
            <p>📞 {user.phone}</p>
            <p>🌐 {user.website}</p>
          </div>
        </div>
      </div>

      <div className="user-details-tabs">
        <button 
          className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          📋 Details
        </button>
        <button 
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          📝 Posts ({posts.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'albums' ? 'active' : ''}`}
          onClick={() => setActiveTab('albums')}
        >
          📸 Albums ({albums.length})
        </button>
      </div>

      <div className="user-details-content">
        {activeTab === 'info' && (
          <div className="user-info-tab">
            <div className="info-section">
              <h3>🏢 Company Information</h3>
              <div className="info-card">
                <p><strong>Company:</strong> {user.company.name}</p>
                <p><strong>Position:</strong> {user.company.catchPhrase}</p>
                <p><strong>Business:</strong> {user.company.bs}</p>
              </div>
            </div>
            
            <div className="info-section">
              <h3>📍 Address Information</h3>
              <div className="info-card">
                <p><strong>Street:</strong> {user.address.street}, {user.address.suite}</p>
                <p><strong>City:</strong> {user.address.city}</p>
                <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
                <p><strong>Coordinates:</strong> {user.address.geo.lat}, {user.address.geo.lng}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="posts-tab">
            <h3>📝 User Posts</h3>
            {posts.length > 0 ? (
              <div className="posts-grid">
                {posts.map(post => (
                  <div key={post.id} className="post-card">
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-body">{post.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-content">No posts available</p>
            )}
          </div>
        )}

        {activeTab === 'albums' && (
          <div className="albums-tab">
            <h3>📸 User Albums</h3>
            {albums.length > 0 ? (
              <div className="albums-grid">
                {albums.map(album => (
                  <div key={album.id} className="album-card">
                    <h4 className="album-title">{album.title}</h4>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-content">No albums available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails; 
import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search users by name, email, username, or company..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
          {query && (
            <button onClick={clearSearch} className="clear-search-button">
              ✕
            </button>
          )}
        </div>
      </div>
      
      {query && (
        <div className="search-info">
          Searching for: <strong>"{query}"</strong>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
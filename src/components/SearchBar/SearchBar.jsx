import axios from 'axios';
import { API_ENDPOINTS } from '../../components/Auth/apiConfig';
import ProductComponent from '../ProductComponent/ProductComponent';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; // Make sure to create a CSS file for styling

function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // Check if the query isn't just whitespace
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_ENDPOINTS.search}create/`, { search_keyword: searchQuery },{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
      navigate('/search-results', { state: { results: response.data.products ,query: searchQuery } });
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('Failed to retrieve search results');
    }
    setIsLoading(false);
  };

  if (isLoading) return <div></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className={`search-form ${isExpanded ? 'expanded34' : ''}`}>
        {isExpanded && (
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
        )}
        <button type="submit" className="search-button" onClick={handleExpand}>
          <i className="fa fa-search"></i> 
        </button>
      </form> 
    </div>
  );
}

export default SearchBar;

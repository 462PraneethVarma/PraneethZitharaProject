import React, { useState } from 'react';
import './search.css';

const SearchBar = ({ userData, setFilteredData }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const filteredData = userData.filter(user =>
      user.CUSTOMER.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.LOCATION.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search by name or location"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

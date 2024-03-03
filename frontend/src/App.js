import React, { useState, useEffect } from 'react';
import SortButton from './sort';
import Pagination from './page';
import SearchBar from './search';
import './index.css';

const App = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);


  //searching and fetching
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setUserData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // Sorting
  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const dateComparison = new Date(b.DATE) - new Date(a.DATE);
      if (dateComparison === 0) {
        return b.TIME.localeCompare(a.TIME);
      }
      return dateComparison;
    });
    console.log('Sorted Data:', sortedData);
    setFilteredData(sortedData);
  };


  // Pagenation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 20;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="header">
        <SearchBar className="searcher" userData={userData} setFilteredData={setFilteredData} />
        <SortButton className="sorter" onClick={handleSort} />
      </div>
      <div className='Log-Main'>
        <div className="table-container">
          <div className="table-header">
            <div className="table-cell">SNo</div>
            <div className="table-cell">CUSTOMER</div>
            <div className="table-cell">AGE</div>
            <div className="table-cell">LOCATION</div>
            <div className="table-cell">DATE</div>
            <div className="table-cell">TIME</div>
          </div>
          <div className="table-body">
            {currentItems.map((user, index) => (
              <div key={index} className="table-row">
                <div className="table-cell">{user.SNo}</div>
                <div className="table-cell">{user.CUSTOMER}</div>
                <div className="table-cell">{user.AGE}</div>
                <div className="table-cell">{user.LOCATION}</div>
                <div className="table-cell">{user.DATE}</div>
                <div className="table-cell">{user.TIME}</div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default App;

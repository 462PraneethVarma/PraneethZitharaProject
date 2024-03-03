import React from 'react';
import './SortButton.css';

const SortButton = ({ onClick }) => {
  return (
    <button className="sort-button" onClick={onClick}>
      Sort by Date/Time
    </button>
  );
};

export default SortButton;

import React from 'react';
import { FILTER_TYPES } from '../utils/constants';

const FilterButtons = ({ currentFilter, onFilterChange, todoStats }) => {
  const filterButtons = [
    { type: FILTER_TYPES.ALL, label: 'All', count: todoStats.total },
    { type: FILTER_TYPES.ACTIVE, label: 'Active', count: todoStats.active },
    { type: FILTER_TYPES.COMPLETED, label: 'Completed', count: todoStats.completed }
  ];

  return (
    <div className="filter-container">
      <div className="filter-buttons">
        {filterButtons.map(({ type, label, count }) => (
          <button
            key={type}
            className={`filter-btn ${currentFilter === type ? 'active' : ''}`}
            onClick={() => onFilterChange(type)}
          >
            {label} ({count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
import React from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

const TaskFilter = ({ filter, selectFilter }) => {
  const buttons = [
    { name: 'all', text: 'All' },
    { name: 'active', text: 'Active' },
    { name: 'completed', text: 'Completed' },
  ];

  return (
    <ul className="filters">
      {buttons.map(({ name, text }) => {
        const selected = filter === name;
        const status = selected ? 'selected' : '';
        return (
          <li key={name}>
            <button className={status} onClick={() => selectFilter(name)}>
              {text}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  selectFilter: PropTypes.func,
};

export default TaskFilter;

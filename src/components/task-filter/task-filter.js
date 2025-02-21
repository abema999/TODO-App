import React from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

class TaskFilter extends React.Component {
  buttons = [
    { name: 'all', text: 'All' },
    { name: 'active', text: 'Active' },
    { name: 'completed', text: 'Completed' },
  ];

  render() {
    const { filter, selectFilter } = this.props;
    const buttons = this.buttons.map(({ name, text }) => {
      const selected = filter === name;
      const status = selected ? 'selected' : '';

      return (
        <li key={name}>
          <button className={status} onClick={() => selectFilter(name)}>
            {text}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}

TaskFilter.defaultProps = {
  filter: 'all',
  selectFilter: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  selectFilter: PropTypes.func,
};

export default TaskFilter;

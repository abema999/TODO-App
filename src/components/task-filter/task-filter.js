import React from 'react';
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

    return <ul className='filters'>{buttons}</ul>;
  }
}

export default TaskFilter;

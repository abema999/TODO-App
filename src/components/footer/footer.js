import React from 'react';
import './footer.css';

import TaskFilter from '../task-filter';

class Footer extends React.Component {
  render() {
    const { uncompletedTasks, deleteAllCompletedTasks, filter, selectFilter } = this.props;

    return (
      <footer className='footer'>
        <span className='todo-count'>{uncompletedTasks} items left</span>
        <TaskFilter filter={filter} selectFilter={selectFilter}></TaskFilter>
        <button className='clear-completed' onClick={() => deleteAllCompletedTasks()}>
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;

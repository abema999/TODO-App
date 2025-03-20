import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import TaskFilter from '../task-filter';

const Footer = ({ uncompletedTasks, deleteAllCompletedTasks, filter, selectFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{uncompletedTasks} items left</span>
      <TaskFilter filter={filter} selectFilter={selectFilter}></TaskFilter>
      <button className="clear-completed" onClick={() => deleteAllCompletedTasks()}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  uncompletedTasks: PropTypes.number,
  deleteAllCompletedTasks: PropTypes.func,
  filter: PropTypes.string,
  selectFilter: PropTypes.func,
};

export default Footer;

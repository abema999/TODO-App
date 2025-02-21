import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import TaskFilter from '../task-filter';

class Footer extends React.Component {
  render() {
    const { uncompletedTasks, deleteAllCompletedTasks, filter, selectFilter } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{uncompletedTasks} items left</span>
        <TaskFilter filter={filter} selectFilter={selectFilter}></TaskFilter>
        <button className="clear-completed" onClick={() => deleteAllCompletedTasks()}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  uncompletedTasks: 0,
  deleteAllCompletedTasks: () => {},
  filter: 'all',
  selectFilter: () => {},
};

Footer.propTypes = {
  uncompletedTasks: PropTypes.number,
  deleteAllCompletedTasks: PropTypes.func,
  filter: PropTypes.string,
  selectFilter: PropTypes.func,
};

export default Footer;

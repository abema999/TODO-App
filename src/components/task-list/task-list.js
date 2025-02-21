import React from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task/task';

class TaskList extends React.Component {
  render() {
    const { tasks, onDelete, onComplete } = this.props;
    const elements = tasks.map((task) => {
      return <Task key={task.id} {...task} onDelete={onDelete} onComplete={onComplete}></Task>;
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}

TaskList.defaultProps = {
  tasks: [],
  onDelete: () => {},
  onComplete: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
};

export default TaskList;

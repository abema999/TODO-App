import React from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task/task';

const TaskList = ({ tasks, onDelete, onComplete, onEdit, onStart, onStop }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            {...task}
            onDelete={onDelete}
            onComplete={onComplete}
            onEdit={onEdit}
            onStart={onStart}
            onStop={onStop}
          ></Task>
        );
      })}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      minutes: PropTypes.number,
      seconds: PropTypes.number,
      isRunning: PropTypes.bool,
      created: PropTypes.instanceOf(Date),
      completed: PropTypes.bool,
      id: PropTypes.number,
    }),
  ),
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
};

export default TaskList;

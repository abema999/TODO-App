import React from 'react';
import './task-list.css';

import Task from '../task/task';

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { id, status, ...itemProps } = item;

    return (
      <li key={id} className={status}>
        <Task {...itemProps} />
      </li>
    );
  });

  return <ul className='todo-list'>{elements}</ul>;
};

export default TaskList;

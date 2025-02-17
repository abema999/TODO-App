import React from 'react';
import './task-list.css';

import Task from '../task/task';

class TaskList extends React.Component {
  render() {
    const { tasks, onDelete, onComplete } = this.props;
    const elements = tasks.map((task) => {
      return <Task key={task.id} {...task} onDelete={onDelete} onComplete={onComplete}></Task>;
    });

    return <ul className='todo-list'>{elements}</ul>;
  }
}

export default TaskList;

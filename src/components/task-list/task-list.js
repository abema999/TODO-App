import React from 'react';
import './task-list.css';

import Task from '../task/task';

class TaskList extends React.Component {
  render() {
    const { todos, onDelete } = this.props;
    const elements = todos.map((item) => {
      const { ...itemProps } = item;

      return <Task key={item.id} {...itemProps} onDelete={onDelete}></Task>;
    });

    return <ul className='todo-list'>{elements}</ul>;
  }
}

export default TaskList;

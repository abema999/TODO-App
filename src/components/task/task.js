import React from 'react';
import './task.css';

import { formatDistanceToNow } from 'date-fns';

class Task extends React.Component {
  render() {
    const { description, created, completed, id, onDelete, onComplete } = this.props;
    const status = completed ? 'completed' : '';

    return (
      <li className={status}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            onChange={() => onComplete(id)}
            checked={this.props.completed}
          />
          <label>
            <span className='description'>{description}</span>
            <span className='created'>{formatDistanceToNow(created)}</span>
          </label>
          <button className='icon icon-edit'></button>
          <button className='icon icon-destroy' onClick={() => onDelete(id)}></button>
        </div>
        <input type='text' className='edit' value='Editing task' readOnly />
      </li>
    );
  }
}

export default Task;

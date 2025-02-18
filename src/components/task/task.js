import React from 'react';
import PropTypes from 'prop-types';
import './task.css';

import { formatDistanceToNowStrict } from 'date-fns';

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
            <span className='created'>created {formatDistanceToNowStrict(created)} ago</span>
          </label>
          <button className='icon icon-edit'></button>
          <button className='icon icon-destroy' onClick={() => onDelete(id)}></button>
        </div>
        <input type='text' className='edit' value='Editing task' readOnly />
      </li>
    );
  }
}

Task.defaultProps = {
  task: {
    id: 0,
    description: '',
    completed: false,
  },
  onDelete: () => {},
  onComplete: () => {},
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    completed: PropTypes.bool,
  }),
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
};

export default Task;

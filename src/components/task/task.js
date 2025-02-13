import React from 'react';
import './task.css';

class Task extends React.Component {
  state = {
    completed: false,
  };

  onComplete = () => {
    this.setState((prevState) => {
      return { completed: !prevState.completed };
    });
  };

  render() {
    const { description, created, id, onDelete } = this.props;
    const { completed } = this.state;
    let status = '';

    if (completed) {
      status = 'completed';
    }

    return (
      <li className={status}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            onChange={this.onComplete}
            checked={this.state.completed}
          />
          <label>
            <span className='description'>{description}</span>
            <span className='created'>{created}</span>
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

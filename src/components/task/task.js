import React from 'react';
import './task.css';

const Task = ({ description, created }) => {
  return (
    <div>
      <div className='view'>
        <input className='toggle' type='checkbox' />
        <label>
          <span className='description'>{description}</span>
          <span className='created'>{created}</span>
        </label>
        <button className='icon icon-edit'></button>
        <button className='icon icon-destroy'></button>
      </div>
      <input type='text' className='edit' value='Editing task' />
    </div>
  );
};

export default Task;

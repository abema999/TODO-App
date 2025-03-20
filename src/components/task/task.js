import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import { formatDistanceToNowStrict } from 'date-fns';

const Task = ({
  id,
  title,
  created,
  completed,
  min,
  sec,
  isTimer,
  onDelete,
  onComplete,
  onStart,
  onStop,
  onEdit,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const onClick = () => {
    setEditing(true);
    setNewTitle(title);
  };

  const onChange = (e) => {
    setNewTitle(e.target.value);
  };

  const onBlur = () => {
    saveTask();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveTask();
    }
  };

  const saveTask = () => {
    if (newTitle.trim()) {
      onEdit(id, newTitle.trim());
    }
    setEditing(false);
  };

  return (
    <li className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => onComplete(id)}
          checked={completed}
        />
        <label>
          <span className="title">{title}</span>
          <span className="description">
            <button
              className="icon icon-play"
              onClick={() => onStart(id)}
              disabled={isTimer}
            ></button>
            <button
              className="icon icon-pause"
              onClick={() => onStop(id)}
              disabled={!isTimer}
            ></button>
            {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
          </span>
          <span className="description">created {formatDistanceToNowStrict(created)} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onClick}></button>
        <button className="icon icon-destroy" onClick={() => onDelete(id)}></button>
      </div>
      {editing && (
        <input
          type="text"
          className="edit"
          value={newTitle}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          autoFocus
        />
      )}
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  created: PropTypes.instanceOf(Date),
  completed: PropTypes.bool,
  min: PropTypes.number,
  sec: PropTypes.number,
  isTimer: PropTypes.bool,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
};

export default Task;

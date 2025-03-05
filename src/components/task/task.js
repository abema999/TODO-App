import React from 'react';
import PropTypes from 'prop-types';
import './task.css';
import { formatDistanceToNowStrict } from 'date-fns';

class Task extends React.Component {
  state = {
    editing: false,
    newTitle: this.props.title,
  };

  onClick = () => {
    this.setState({ editing: true, newTitle: this.props.title });
  };

  onChange = (e) => {
    this.setState({ newTitle: e.target.value });
  };

  onBlur = () => {
    this.saveTask();
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.saveTask();
    }
  };

  saveTask = () => {
    if (this.state.newTitle.trim()) {
      this.props.onEdit(this.props.id, this.state.newTitle.trim());
    }
    this.setState({ editing: false });
  };

  render() {
    const {
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
    } = this.props;
    const { editing, newTitle } = this.state;

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
          <button className="icon icon-edit" onClick={this.onClick}></button>
          <button className="icon icon-destroy" onClick={() => onDelete(id)}></button>
        </div>
        {editing && (
          <input
            type="text"
            className="edit"
            value={newTitle}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            autoFocus
          />
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  title: '',
  created: new Date(),
  completed: false,
  min: 0,
  sec: 0,
  isTimer: false,
  onDelete: () => {},
  onComplete: () => {},
  onEdit: () => {},
  onStart: () => {},
  onStop: () => {},
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

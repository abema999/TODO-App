import React from 'react';
import PropTypes from 'prop-types';
import './task.css';
import { formatDistanceToNowStrict } from 'date-fns';

class Task extends React.Component {
  state = {
    editing: false,
    newDescription: this.props.description,
  };

  onClick = () => {
    this.setState({ editing: true, newDescription: this.props.description });
  };

  onChange = (e) => {
    this.setState({ newDescription: e.target.value });
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
    if (this.state.newDescription.trim()) {
      this.props.onEdit(this.props.id, this.state.newDescription.trim());
    }
    this.setState({ editing: false });
  };

  render() {
    const { description, created, completed, id, onDelete, onComplete } = this.props;
    const { editing, newDescription } = this.state;

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
            <span className="description">{description}</span>
            <span className="created">created {formatDistanceToNowStrict(created)} ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.onClick}></button>
          <button className="icon icon-destroy" onClick={() => onDelete(id)}></button>
        </div>
        {editing && (
          <input
            type="text"
            className="edit"
            value={newDescription}
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
  description: '',
  completed: false,
  onDelete: () => {},
  onComplete: () => {},
  onEdit: () => {},
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  completed: PropTypes.bool,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Task;

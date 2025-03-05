import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends React.Component {
  state = {
    title: '',
    min: '',
    sec: '',
  };

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  onChangeMin = (e) => {
    let min = +e.target.value.replace(/[^0-9]/g, '');
    this.setState({
      min: min === 0 ? '' : min,
    });
  };
  onChangeSec = (e) => {
    let sec = +e.target.value.replace(/[^0-9]/g, '');
    this.setState({
      sec: sec === 0 || sec > 59 ? '' : sec,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.title.trim()) {
      this.setState({ title: '' });
      return;
    }
    this.props.onAdd(this.state.title, this.state.min, this.state.sec);
    this.setState({ title: '', min: '', sec: '' });
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSubmit(e);
    }
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit} onKeyDown={this.onKeyDown}>
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          onChange={this.onChangeTitle}
          value={this.state.title}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onChangeMin}
          value={this.state.min}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onChangeSec}
          value={this.state.sec}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onAdd: () => {},
};

NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
};

export default NewTaskForm;

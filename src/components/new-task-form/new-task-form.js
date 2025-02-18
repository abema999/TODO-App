import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

class NewTaskForm extends React.Component {
  state = {
    description: '',
  };

  onChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description.trim()) {
      return;
    }
    this.props.onAdd(this.state.description);
    this.setState({ description: '' });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className='new-todo'
          placeholder='What needs to be done?'
          autoFocus
          onChange={this.onChange}
          value={this.state.description}
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

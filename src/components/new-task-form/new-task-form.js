import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

const NewTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeMin = (e) => {
    let min = +e.target.value.replace(/[^0-9]/g, '');
    setMin(min === 0 ? '' : min);
  };

  const onChangeSec = (e) => {
    let sec = +e.target.value.replace(/[^0-9]/g, '');
    setSec(sec === 0 || sec > 59 ? '' : sec);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitle('');
      return;
    }
    onAdd(title, min, sec);
    setTitle('');
    setMin('');
    setSec('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit} onKeyDown={onKeyDown}>
      <input
        className="new-todo"
        placeholder="Task"
        autoFocus
        onChange={onChangeTitle}
        value={title}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onChangeMin}
        value={min}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onChangeSec}
        value={sec}
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
};

export default NewTaskForm;

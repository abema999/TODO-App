import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';

import './index.css';
import TaskList from './components/task-list';
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const idCounter = useRef(1);
  const timers = useRef({});

  const createTask = (text, min = 0, sec = 0) => {
    return {
      title: text,
      min: min === '' ? 0 : min,
      sec: sec === '' ? 0 : sec,
      isTimer: false,
      created: new Date(),
      completed: false,
      id: idCounter.current++,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTodoData((prev) =>
        prev.map((task) => ({
          ...task,
          created: new Date(task.created),
        })),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [todoData, setTodoData] = useState([createTask('1'), createTask('2'), createTask('3')]);
  const [filter, setFilter] = useState('all');

  const addTask = (text, min, sec) => {
    const newTask = createTask(text, min, sec);
    setTodoData((prev) => [...prev, newTask]);
  };

  const deleteTask = (id) => {
    clearInterval(timers.current[id]);
    delete timers.current[id];
    setTodoData((prev) => prev.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTodoData((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  const deleteAllCompletedTasks = () => {
    setTodoData((prev) => {
      const completedTasks = prev.filter((task) => task.completed);
      completedTasks.forEach((task) => {
        if (timers.current[task.id]) {
          clearInterval(timers.current[task.id]);
          delete timers.current[task.id];
        }
      });
      return prev.filter((task) => !task.completed);
    });
  };

  const filterTasks = (tasks, filter) => {
    switch (filter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const selectFilter = (filter) => {
    setFilter(filter);
  };

  const editTask = (id, newTitle) => {
    setTodoData((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task)),
    );
  };

  const startTimer = (id) => {
    if (timers.current[id]) {
      clearInterval(timers.current[id]);
    }
    timers.current[id] = setInterval(() => updateTimer(id), 1000);
    setTodoData((prev) => prev.map((task) => (task.id === id ? { ...task, isTimer: true } : task)));
  };

  const stopTimer = (id) => {
    clearInterval(timers.current[id]);
    setTodoData((prev) =>
      prev.map((task) => (task.id === id ? { ...task, isTimer: false } : task)),
    );
  };

  const updateTimer = (id) => {
    setTodoData((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          if (task.min === 0 && task.sec === 0) {
            clearInterval(timers.current[id]);
            return { ...task, isTimer: false };
          }
          const newSec = task.sec - 1;
          return {
            ...task,
            min: newSec < 0 ? task.min - 1 : task.min,
            sec: newSec < 0 ? 59 : newSec,
          };
        }
        return task;
      }),
    );
  };

  const uncompletedTasks = todoData.filter((task) => !task.completed).length;
  const filteredTasks = filterTasks(todoData, filter);
  return (
    <section className="todo-app">
      <header className="header">
        <h1>TODOS</h1>
        <NewTaskForm onAdd={addTask}></NewTaskForm>
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onComplete={completeTask}
          onEdit={editTask}
          onStart={startTimer}
          onStop={stopTimer}
        ></TaskList>
        <Footer
          uncompletedTasks={uncompletedTasks}
          deleteAllCompletedTasks={deleteAllCompletedTasks}
          filter={filter}
          selectFilter={selectFilter}
        ></Footer>
      </section>
    </section>
  );
};

App.propTypes = {
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      min: PropTypes.number,
      sec: PropTypes.number,
      isTimer: PropTypes.bool,
      created: PropTypes.instanceOf(Date),
      completed: PropTypes.bool,
      id: PropTypes.number,
    }),
  ),
  filter: PropTypes.string,
};

root.render(<App></App>);

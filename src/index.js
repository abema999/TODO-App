import React from 'react';
import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';

import './index.css';
import TaskList from './components/task-list';
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

class App extends React.Component {
  idCounter = 1;
  timers = {};

  createTask = (text, min = 0, sec = 0) => {
    return {
      title: text,
      min: min === '' ? 0 : min,
      sec: sec === '' ? 0 : sec,
      isTimer: false,
      created: new Date(),
      completed: false,
      id: this.idCounter++,
    };
  };

  state = {
    todoData: [this.createTask('1'), this.createTask('2'), this.createTask('3')],
    filter: 'all',
  };

  addTask = (text, min, sec) => {
    const newTask = this.createTask(text, min, sec);
    this.setState((prevState) => ({
      todoData: [...prevState.todoData, newTask],
    }));
  };

  deleteTask = (id) => {
    clearInterval(this.timers[id]);
    delete this.timers[id];
    this.setState((prevState) => ({
      todoData: prevState.todoData.filter((task) => task.id !== id),
    }));
  };

  completeTask = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    }));
  };

  deleteAllCompletedTasks = () => {
    this.setState((prevState) => {
      const completedTasks = prevState.todoData.filter((task) => task.completed);
      completedTasks.forEach((task) => {
        if (this.timers[task.id]) {
          clearInterval(this.timers[task.id]);
          delete this.timers[task.id];
        }
      });
      return {
        todoData: prevState.todoData.filter((task) => !task.completed),
      };
    });
  };

  filterTasks(tasks, filter) {
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
  }

  selectFilter = (filter) => {
    this.setState({ filter });
  };

  editTask = (id, newTitle) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    }));
  };

  startTimer = (id) => {
    if (this.timers[id]) {
      clearInterval(this.timers[id]);
    }
    this.timers[id] = setInterval(() => this.updateTimer(id), 1000);
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) =>
        task.id === id ? { ...task, isTimer: true } : task,
      ),
    }));
  };

  stopTimer = (id) => {
    clearInterval(this.timers[id]);
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) =>
        task.id === id ? { ...task, isTimer: false } : task,
      ),
    }));
  };

  updateTimer = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) => {
        if (task.id === id) {
          const newSec = task.sec + 1;
          return {
            ...task,
            min: newSec === 60 ? task.min + 1 : task.min,
            sec: newSec === 60 ? 0 : newSec,
          };
        }
        return task;
      }),
    }));
  };

  render() {
    const uncompletedTasks = this.state.todoData.filter((task) => !task.completed).length;
    const filteredTasks = this.filterTasks(this.state.todoData, this.state.filter);
    return (
      <section className="todo-app">
        <header className="header">
          <h1>TODOS</h1>
          <NewTaskForm onAdd={this.addTask}></NewTaskForm>
        </header>
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDelete={this.deleteTask}
            onComplete={this.completeTask}
            onEdit={this.editTask}
            onStart={this.startTimer}
            onStop={this.stopTimer}
          ></TaskList>
          <Footer
            uncompletedTasks={uncompletedTasks}
            deleteAllCompletedTasks={this.deleteAllCompletedTasks}
            filter={this.state.filter}
            selectFilter={this.selectFilter}
          ></Footer>
        </section>
      </section>
    );
  }
}

App.defaultProps = {
  todoData: [],
  filter: 'all',
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

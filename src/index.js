import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import TaskList from './components/task-list';
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

class App extends React.Component {
  idCounter = 1;

  createTask = (text) => {
    return {
      description: text,
      created: new Date(),
      completed: false,
      id: this.idCounter++,
    };
  };

  state = {
    todoData: [this.createTask('1'), this.createTask('2'), this.createTask('3')],
    filter: 'all',
  };

  addTask = (text) => {
    const newTask = this.createTask(text);

    this.setState((prevState) => {
      const newArr = [...prevState.todoData, newTask];

      return {
        todoData: newArr,
      };
    });
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.filter((task) => task.id !== id),
    }));
  };

  completeTask = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  deleteAllCompletedTasks = () => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.filter((task) => !task.completed),
    }));
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

  render() {
    const uncompletedTasks = this.state.todoData.filter((task) => !task.completed).length;
    const filteredTasks = this.filterTasks(this.state.todoData, this.state.filter);

    return (
      <section className='todo-app'>
        <header className='header'>
          <h1>TODOS</h1>
          <NewTaskForm onAdd={this.addTask}></NewTaskForm>
        </header>
        <section className='main'>
          <TaskList
            tasks={filteredTasks}
            onDelete={this.deleteTask}
            onComplete={this.completeTask}
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

root.render(<App></App>);

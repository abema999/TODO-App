import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import TaskList from './components/task-list';
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';

import { formatDistanceToNow } from 'date-fns';

const root = ReactDOM.createRoot(document.getElementById('root'));

class App extends React.Component {
  state = {
    todoData: [
      {
        description: 'Task 1',
        created: formatDistanceToNow(new Date()),
        id: 1,
      },
      {
        description: 'Task 2',
        created: formatDistanceToNow(new Date()),
        id: 2,
      },
      {
        description: 'Task 3',
        created: formatDistanceToNow(new Date()),
        id: 3,
      },
    ],
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.filter((task) => task.id !== id),
    }));
  };

  render() {
    return (
      <section className='todo-app'>
        <header className='header'>
          <h1>TODOS</h1>
          <NewTaskForm></NewTaskForm>
        </header>
        <section className='main'>
          <TaskList todos={this.state.todoData} onDelete={this.deleteTask}></TaskList>
          <Footer></Footer>
        </section>
      </section>
    );
  }
}

root.render(<App></App>);

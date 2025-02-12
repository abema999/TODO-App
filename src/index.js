import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import TaskList from './components/task-list';
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';

import { formatDistanceToNow } from 'date-fns';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const todoData = [
    {
      description: 'Completed task',
      created: formatDistanceToNow(new Date()),
      status: 'completed',
      id: 1,
    },
    {
      description: 'Editing task',
      created: formatDistanceToNow(new Date()),
      status: 'editing',
      id: 2,
    },
    { description: 'Active task', created: formatDistanceToNow(new Date()), status: null, id: 3 },
  ];

  return (
    <section className='todo-app'>
      <header className='header'>
        <h1>TODOS</h1>
        <NewTaskForm></NewTaskForm>
      </header>
      <section className='main'>
        <TaskList todos={todoData}></TaskList>
        <Footer></Footer>
      </section>
    </section>
  );
};

root.render(<App></App>);

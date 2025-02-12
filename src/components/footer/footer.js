import React from 'react';
import './footer.css';

import TaskFilter from '../task-filter';

const Footer = () => {
  return (
    <footer className='footer'>
      <span className='todo-count'>1 items left</span>
      <TaskFilter></TaskFilter>
      <button className='clear-completed'>Clear completed</button>
    </footer>
  );
};

export default Footer;

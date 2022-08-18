import { Component, createSignal } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          How about no
        </a>
        <Button />
      </header>
    </div>
  );
};

const Button: Component = () => {
  const [count, setCount] =  createSignal(0)
  return(
    <button type="button">Don't click here</button> 
  );
}; 

export default App;

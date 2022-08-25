import { Component } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";
import { Login } from "./pages/Login";
import { Callback } from "./pages/Callback";
import { Playlists } from "./pages/Playlists";
import logo from "./logo.svg";
import styles from "./App.module.css";

const App: Component = () => {
  return (
    <Router>
      <div class={styles.App}>
        <Routes>
          <Route path="/playlists" component={Playlists} />
          <Route path="/callback" component={Callback} />
          <Route path="/" component={Login} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import { Component } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";
import { Header } from "./components/Header";
import { Login } from "./pages/Login";
import { Callback } from "./pages/Callback";
import { Playlists } from "./pages/Playlists";
import { JSRLiveImport } from "./pages/JSRLiveImport";
import { Search } from "./pages/Search";
import logo from "./logo.svg";
import styles from "./App.module.css";

const App: Component = () => {
  return (
    <Router>
      <div class={styles.App}>
        <Header />
        <main>
          <Routes>
            <Route path="/search" component={Search} />
            <Route path="/playlists" component={Playlists} />
            <Route path="/JSRLiveImport" component={JSRLiveImport} />
            <Route path="/callback" component={Callback} />
            <Route path="/" component={Login} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

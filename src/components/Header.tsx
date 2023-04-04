import { Component } from "solid-js";
import { Link } from "@solidjs/router";
import styles from "./Header.module.css";

export const Header: Component = () => {
  return (
    <header class={styles.header}>
        <Link href="/">Home</Link>
        <Link href="/playlists">Playlists</Link>
        <Link href="/search">Search</Link>
        <Link href="/JSRLiveImport">Import JSRL</Link>
    </header>
  );
};

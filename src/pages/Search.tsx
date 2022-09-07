import { Component, createEffect, createSignal, For } from "solid-js";
import axios from "axios";
import styles from "./Search.module.css";

export const Search: Component = () => {
  const token = localStorage.getItem("access_token");
  const [searchResults, setSearchResults] = createSignal<any[]>([]);
  const [searchQuery, setSearchQuery] = createSignal("");

  const request = axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: { Authorization: `Bearer ${token}` },
  });

  const handleSearch = () => {
    request
      .get(`/search?q=${searchQuery()}&type=track&limit=5`)
      .then((response) => {
        setSearchResults(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleAddToPlaylist = () => {
    const PLAYLIST_ID = "3ZZGLlczbDq0BJfgIJsxci";
    const results = searchResults();
    if (results.length == 0) {
      return;
    }

    request
      .post(`/playlists/${PLAYLIST_ID}/tracks`, {
        uris: [results[0].uri],
      })
      .then(() => {
        console.log("Track added to playlist");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div class={styles.searchBar}>
      <input
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        type="text"
      />
      <button onClick={handleSearch}>Click me to search!</button>
      <button onClick={handleAddToPlaylist}>Add song to playlist</button>
      <ul>
        <For each={searchResults()}>
          {(track: any) => (
            <li>{`${track.name} - ${track.uri} - ${track.artists
              .map((artist: any) => artist.name)
              .join(", ")}`}</li>
          )}
        </For>
      </ul>
    </div>
  );
};

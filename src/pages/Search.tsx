import { Component, createRenderEffect, createSignal, For } from "solid-js";
import type { JSX } from "solid-js";
import styles from "./Search.module.css";
import {
  addTrackToPlaylist,
  createPlaylist,
  getPlaylists,
  searchTracks,
} from "../services/spotify-service";

export const Search: Component = () => {
  const [searchResults, setSearchResults] = createSignal<any[]>([]);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [selectedPlaylistId, setSelectedPlaylistId] = createSignal("");
  const [playlists, setPlaylists] = createSignal<any[]>([]);

  createRenderEffect(() => {
    getPlaylists().then((items) => {
      if (items.length > 0) {
        setSelectedPlaylistId(items[0].id);
      }

      setPlaylists(items);
    });
  });

  const handleSearch = () => {
    searchTracks(searchQuery()).then((items) => {
      setSearchResults(items);
    });
  };

  const handleAddToPlaylist = (track: { uri: string }) => {
    const results = searchResults();
    if (results.length == 0) {
      return;
    }

    addTrackToPlaylist(selectedPlaylistId(), [track.uri])
      .then(() => {
        console.log("Track added to playlist");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handlePlaylistChange: JSX.EventHandler<HTMLSelectElement, Event> = (
    event
  ) => {
    setSelectedPlaylistId(event.currentTarget.value);
  };

  return (
    <div class={styles.searchBar}>
      <div class={styles.searchBarHeader}>
        <label>Select Playlist</label>
        <select value={selectedPlaylistId()} onChange={handlePlaylistChange}>
          <For each={playlists()}>
            {(item: any) => <option value={item.id}>{item.name}</option>}
          </For>
        </select>
        <input
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          type="text"
        />
        <button onClick={handleSearch}>Click me to search!</button>
      </div>
      <ul>
        <For each={searchResults()}>
          {(track: any) => (
            <li>
              <span>{`${track.name} - ${track.uri} - ${track.artists
                .map((artist: any) => artist.name)
                .join(", ")} `}</span>
              <button onClick={() => handleAddToPlaylist(track)}>
                Add song to playlist
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

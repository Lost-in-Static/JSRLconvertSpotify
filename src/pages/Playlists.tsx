import { Component, createSignal, For } from "solid-js";
import { getPlaylists } from "../services/spotify-service";

export const Playlists: Component = () => {
  const [playlists, setPlaylists] = createSignal<any[]>([]);

  getPlaylists().then((items) => {
    setPlaylists(items);
  });

  return (
    <div>
      <ul>
        <For each={playlists()}>
          {(playlist: any) => <li>{playlist.name}</li>}
        </For>
      </ul>
    </div>
  );
};
import { Component, createSignal, For } from "solid-js";
import axios from "axios";

export const Playlists: Component = () => {
  const [playlists, setPlaylists] = createSignal<any[]>([]);
  const token = localStorage.getItem("access_token");

  axios
    .get("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setPlaylists(response.data.items);
    })
    .catch((error) => {
      console.log(error.message);
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

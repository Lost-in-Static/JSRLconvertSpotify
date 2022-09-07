import { Component, createSignal, For } from "solid-js";
import axios from "axios";

export const Search: Component = () => {
  const token = localStorage.getItem("access_token");
  const [searchResults, setSearchResults] = createSignal<any>();

  axios
    .get(
      "https://api.spotify.com/v1/search?q=Hideki Naganuma - Rock It On (D.S. Remix)&type=track%2Cartist&limit=5",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      setSearchResults(response.data.tracks.items);
    })
    .catch((error) => {
      console.log(error.message);
    });

  return (
    <div>
      <ul>
        <For each={searchResults()}>
          {(track: any) => (
            <li>{`${track.name} - ${track.popularity} - ${track.artists
              .map((artist: any) => artist.name)
              .join(", ")}`}</li>
          )}
        </For>
      </ul>
    </div>
  );
};

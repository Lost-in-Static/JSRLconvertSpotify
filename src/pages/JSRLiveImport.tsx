import { Component, createSignal, For } from "solid-js";
import JSRLMap from "../playlistMap.json";

export const JSRLiveImport: Component = () => {
  return (
    <div>
      <ul>
        <For each={Object.keys(JSRLMap)}>
          {(playlistName) => <li>{playlistName}</li>}
        </For>
      </ul>
    </div>
  );
};

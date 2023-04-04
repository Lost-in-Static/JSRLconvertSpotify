import { Component, createSignal, For } from "solid-js";
import {PlaylistMap} from "../types/Map"
import JSRLMap from "../playlistMap.json";

export const JSRLiveImport: Component = () => {
  const playlistMap = JSRLMap as any as PlaylistMap
  
  return (
    <div>
      <ul>
        <For each={Object.keys(playlistMap)}>
          {(playlistName) => (
            <li>
              <span>{playlistName}</span>
              <button
                onClick={() => {
                  console.log(playlistMap[playlistName]);
                }}
              >
                Import
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

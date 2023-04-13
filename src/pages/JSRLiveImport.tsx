import { Component, createSignal, For } from "solid-js";
import { PlaylistMap, Track } from "../types/Map";
import JSRLMap from "../playlistMap.json";
import {
  addTrackToPlaylist,
  createPlaylist,
} from "../services/spotify-service";

export const JSRLiveImport: Component = () => {
  const playlistMap = JSRLMap as any as PlaylistMap;

  return (
    <div>
      <ul>
        <For each={Object.keys(playlistMap)}>
          {(playlistName) => (
            <li>
              <span>{playlistName}</span>
              <button
                onClick={async () => {
                  const createdPlaylistId = await createPlaylist(playlistName);
                  console.log(`Created playlist: ${playlistName} - ${createdPlaylistId} \n Starting import`);
                  const uriArray: string[] = [];
                  const playlist = playlistMap[playlistName];
                  for (const tracks of playlist) {
                    const uri = tracks.spotifyUri;
                    uriArray.push(uri);
                  }
                  console.log("Completed import");

                  addTrackToPlaylist(createdPlaylistId, uriArray);
                }}
              >
                Import Playlist
              </button>
              <button
                onClick={async () => {
                  const createdPlaylistId = await createPlaylist(playlistName);
                }}
              >
                Create Playlist
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

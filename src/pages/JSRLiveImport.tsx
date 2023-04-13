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
                  const uriArray: string[] = [];
                  const playlist = playlistMap[playlistName];
                  for (const tracks of playlist) {
                    const uri = tracks.spotifyUri;
                    if (uri) {
                      // tests if URI is null. Will need to fix this on SQL
                      uriArray.push(uri);
                    } else {
                      console.log("No URI for Track: " + tracks.name);
                    }
                  } // Tests if Array is over 100 items due to Spotify API limits
                  if (uriArray.length < 100) {
                    const createdPlaylistId = await createPlaylist(
                      playlistName
                    );
                    console.log(
                      `Created playlist: ${playlistName} - ${createdPlaylistId} \n Starting import`
                    );
                    addTrackToPlaylist(createdPlaylistId, uriArray);
                    console.log("Completed import");
                  } else {
                    console.log(
                      "STOPPING IMPORT - Playlist is over 100 items. WILL NEED TO FIX THIS"
                    );
                  }
                }}
              >
                Import Playlist
              </button>
              <button
                onClick={async () => {
                  // const createdPlaylistId = await createPlaylist(playlistName);
                  // console.log(`Created playlist: ${playlistName} - ${createdPlaylistId} \n Starting import`);
                  const uriArray: string[] = [];
                  const playlist = playlistMap[playlistName];
                  for (const tracks of playlist) {
                    const uri = tracks.spotifyUri;
                    if (uri) {
                      // tests if URI is null. Will need to fix this on SQL
                      uriArray.push(uri);
                    } else {
                      console.log("No URI for Track: " + tracks.name);
                    }
                  } // Tests if Array is over 100 items due to Spotify API limits
                  if (uriArray.length < 100) {
                    // addTrackToPlaylist(createdPlaylistId, uriArray);
                    console.log("Completed import");
                  } else {
                    console.log(uriArray);
                    console.log(
                      "STOPPING IMPORT - Playlist is over 100 items. WILL NEED TO FIX THIS"
                    );
                  }
                }}
              >
                TEST Playlist
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

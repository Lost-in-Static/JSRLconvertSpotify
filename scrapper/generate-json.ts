const { getTracks } = require('./data.js');
import {writeFileSync} from 'fs';
 
export type Track = {
    name: string
    artist: string
    spotifyUri: string
}

export type Playlist = {
    name: string
    tracks: Array<Track>
}

export type TrackData = {
    playlists: Array<Playlist>
}

async function generate() {
    const allTracks: any[] = await getTracks()

    const trackData = allTracks.reduce<Map<string, Track[]>>((acc, track) => {
        const mappedTrack: Track = {
            name: track.name,
            artist: track.artist,
            spotifyUri: track.uri
        }

        if (acc.has(track.playlistName)) {
            acc.get(track.playlistName)!.push(mappedTrack)
            return acc
        }

        acc.set(track.playlistName, [mappedTrack])
        return acc
    }, new Map())

    writeFileSync('src/assets/playlistMap.json', JSON.stringify(Object.fromEntries(trackData), null, 2))
}

generate()
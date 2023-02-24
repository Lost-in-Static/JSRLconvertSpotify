const { getTracks } = require('./data.js');

export type Track = {
    name: string
    artist: string
    spotifyUri: string[]
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
        // {
        //     playlists: [
        //         {
        //             name: "summer",
        //             tracks: [
        //                 ...
        //             ]
        //         }
        //     ]
        // }
        acc.set(track.playlistName, []) // will override, needs change
        acc[track.playlistName] = acc[track.playlistName].concat(track)
        
        return acc
    }, new Map())
}

generate()

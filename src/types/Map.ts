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

export type PlaylistMap = Record<string, Track>
const axios = require('axios')
const CLIENTID = process.env.SPOTIFYAPI_APP_CLIENTID
const CLIENTSECRET = process.env.SPOTIFYAPI_APP_SECRET

async function authenticate () {
  const params = new URLSearchParams({ grant_type: 'client_credentials' })

  const { data } = await axios.post(
    'https://accounts.spotify.com/api/token',
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(`${CLIENTID}:${CLIENTSECRET}`).toString('base64')
      }
    }
  )

  return axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: { Authorization: `Bearer ${data.access_token}` }
  })
}

async function searchTrack (client, searchQuery) {
  const result = await client.get(
    `/search?q=${searchQuery}&type=track&limit=1`
  )
  return result.data.tracks.items[0]
}

async function getTracks (client, tracks) {
  const newTracks = []
  for (const track of tracks) {
    const { artists, uri } = await searchTrack(client, track.name)
    newTracks.push({
      ...track,
      spotify: { artists, uri }
    })
  }
  return newTracks
}

async function updateTrackInfo (playlistMap) {
  const client = await authenticate()

  // Planos para Knoch do futuro

  // playlists = await data.getPlaylists()
  // playlists.forEach(playlist => {
  //   tracks = await data.getTracks(playlist.id)
  //   tracks.forEach(track => {
  //     const updatedTrack = await searchTrack(client, track.name)
  //     data.updateTrack(track.id, updatedTrack)
  //   })
  // })

  for (const key in playlistMap) {
    playlistMap[key] = await getTracks(client, playlistMap[key])
  }
  console.log(playlistMap)
}

module.exports = {
  updateTrackInfo
}

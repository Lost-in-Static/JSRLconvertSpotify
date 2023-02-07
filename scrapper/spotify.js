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

async function searchTrack (searchQuery) {
  const client = await authenticate()
  try {
    const result = await client.get(encodeURI(`/search?q=${searchQuery}&type=track&limit=1`))

    const track = result?.data?.tracks?.items[0]

    if (!track) {
      throw new Error(`No tracks found for "${searchQuery}"`)
    }
    return track
  } catch (error) {
    console.log(error)
  }
}

// async function getSpotifyTrackInfo (tracks) {
//   const newTracks = []
//   for (const track of tracks) {
//     try {
//       const { uri } = await searchTrack(track.name)
//       newTracks.push({
//         ...track,
//         spotify: { uri }
//       })
//     } catch (error) {
//       console.log(error)
//       console.log(track.name)
//     }
//   }
//   return newTracks
// }

module.exports = {
  searchTrack
}

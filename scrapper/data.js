const fs = require('fs')
const mysql = require('mysql-await')

const dbConfig = JSON.parse(fs.readFileSync('database.json'))
const dbClient = mysql.createConnection(dbConfig.dev)
dbClient.on('error', (err) => {
  console.error(`Connection error ${err.code}`)
})

// Get all playlists > Show playlist > Get all tracks from Playlist > Get track > Send to spotify > Update track with new data > Rinse & Repeat
// Known info from SQL > Table names Tracks & Playlists
// SELECT * FROM playlists > SELECT * FROM tracks WHERE playlistId = <ID> > UPDATE tracks SET spotifyUrl = x WHERE trackId = <ID>

const addEverything = async (playlistMap) => {
  const entities = []

  for (const key in playlistMap) {
    const { insertId: playlistId } = await dbClient.awaitQuery(
      'INSERT INTO playlists (name) VALUES (?)',
      [key]
    )

    const tracks = playlistMap[key]
    for (const track of tracks) {
      const { insertId: trackId } = await dbClient.awaitQuery(
        'INSERT INTO tracks (name, artist, playlistid) VALUES (?)',
        [[track.name, track.artist, playlistId]]
      )
      entities.push({
        ...track,
        playlistId,
        id: trackId
      })
    }
  }

  return entities
}

const getPlaylists = async () => {
  return await dbClient.awaitQuery('SELECT * FROM playlists')
}

const setDbTrackUri = async (tracks) => {
  for (const track of tracks) {
    const result = await dbClient.awaitQuery('UPDATE tracks SET uri = ? WHERE id = ?',
      [track.spotify.uri, track.id])
    console.log(result)
  }
}

const endConnection = async () => {
  await dbClient.awaitEnd()
}

module.exports = {
  addEverything,
  getPlaylists,
  setDbTrackUri,
  endConnection
}

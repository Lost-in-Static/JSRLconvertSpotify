const { extractTracks } = require('./extract-data.js')
const { addEverything, endConnection } = require('./data.js')
const fs = require('fs')

async function main () {
  const playlistMap = await extractTracks()

  fs.writeFileSync('scrapperdbFuture.json', JSON.stringify(playlistMap, null, 2))
  // const playlistMap = JSON.parse(fs.readFileSync('scrapperdb.json', 'utf8'))

  console.log('extract complete')

  // console.log('Adding scrapped to SQL -- Start')
  // const rawTracks = await addEverything(playlistMap)
  // console.log('added raw to SQL -- Starting Spotify Calls')
  // const curatedTracks = await getSpotifyTrackInfo(rawTracks)
  // console.log('finished Spotify -- Starting DB update')
  // await setDbTrackUri(curatedTracks)
  // console.log('finished everything')
  // await endConnection()
}

main()

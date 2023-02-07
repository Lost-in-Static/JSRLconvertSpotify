const { extractTracks } = require('./extract-data.js')
const { addEverything, endConnection } = require('./data.js')
const fs = require('fs')

async function main () {
  // const playlistMap = await extractTracks()
  // console.log('extract complete')

  // fs.writeFileSync('scrapperdbFuture.json', JSON.stringify(playlistMap, null, 2))
  const playlistMap = JSON.parse(fs.readFileSync('scrapperdbJSRL.json', 'utf8'))

  console.log('Starting')
  console.log('Adding scrapped information to SQL & Searching URI with SPOTIFY API')
  const rawTracks = await addEverything(playlistMap)
  console.log('Finished adding information to DB')
  await endConnection()
}

main()

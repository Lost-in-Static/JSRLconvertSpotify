const { extractTracks } = require('./extract-data.js')
const { getSpotifyTrackInfo } = require('./spotify.js')
const { setDbTrackUri, addEverything, endConnection } = require('./data.js')
const fs = require('fs')

async function main () {
  // const playlistMap = await extractTracks();
  // await addEverything(playlistMap);

  // await spotify(playlistMap);

  // fs.writeFileSync(
  //   "scrapperdb.json",
  //   JSON.stringify(playlistMap, null, 2),
  //   "utf8"
  // );
  // const playlistMap = JSON.parse(fs.readFileSync('scrapperdb.json', 'utf8'))

  // await getPlaylists()
  const playlistMap = {
    rockRadio: [
      {
        name: 'Reverie',
        artist: 'Polyphia'
      },
      {
        name: 'Knife party',
        artist: 'Deftones'
      }
    ],
    nonPoggy: [
      {
        name: 'Digital Bath',
        artist: 'Deftones'
      },
      {
        name: 'Baby',
        artist: 'Justice Beaver'
      }
    ]
  }

  const rawTracks = await addEverything(playlistMap)
  const curatedTracks = await getSpotifyTrackInfo(rawTracks)
  await setDbTrackUri(curatedTracks)

  await endConnection()
}

main()

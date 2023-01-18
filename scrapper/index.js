const { extractTracks } = require('./extract-data.js')
const { updateTrackInfo } = require('./spotify.js')
const { addEverything, getPlaylists } = require('./data.js')
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

  // await addEverything(playlistMap)
  // await getPlaylists()
  await updateTrackInfo({
    poggers: [
      {
        name: 'Reverie',
        artist: 'Polyphia'
      },
      {
        name: 'Knife party',
        artist: 'Deftones'
      },
      {
        name: 'Digital Bath',
        artist: 'Deftones'
      }
    ],
    notPog: [
      {
        name: 'Baby',
        artist: 'Justice Beaver'
      }
    ]
  })
}

main()

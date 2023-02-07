const axios = require('axios')
const baseUrl = 'https://www.jetsetradiofuture.live'

function splitNameArtist (track) {
  const [artist, ...nameFragments] = track.split(' - ')
  return { artist, track: nameFragments.join(' - ') }
}

async function extractTracks () {
  const response = await axios.get(baseUrl)

  const rows = response.data.split('\n')
  const scriptRadioRows = rows.filter((row) =>
    row.includes('<script') && row.includes('src="radio/stations/')
  )
  console.log(scriptRadioRows)

  const srcRegExp = /src="(.*)"/
  const sanitizedRows = scriptRadioRows.map((row) => srcRegExp.exec(row)[1])
  const radios = sanitizedRows.map((radio) => {
    const name = radio.split('/')[2]

    return {
      name,
      uri: `${baseUrl}/${radio}`
    }
  })

  const playlistMap = {}
  await Promise.all(
    radios.map(async (radio) => {
      if (radio.name === 'bumps') {
        return
      }

      const radioResponse = await axios.get(radio.uri)
      const radioRows = radioResponse.data.split('\n')
      const tracksStartIndex =
        radioRows.findIndex((row) => row.startsWith('//TRACKS')) + 1
      const allTracks = radioRows.slice(tracksStartIndex)
      const trackRegExp = /=\s"(.*)"/
      const tracks = allTracks.reduce((filteredTracks, row) => {
        const isTrack = trackRegExp.test(row)
        if (isTrack) {
          const trackAndArtist = trackRegExp.exec(row)[1]
          const { artist, track } = splitNameArtist(trackAndArtist)
          filteredTracks.push({
            name: track,
            artist
          })
        }

        return filteredTracks
      }, [])

      playlistMap[radio.name] = tracks
    })
  )
  return playlistMap
}
module.exports = {
  extractTracks,
  splitNameArtist
}

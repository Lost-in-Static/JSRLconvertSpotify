const fs = require("fs");
const axios = require("axios");
const baseUrl = "https://www.jetsetradio.live";

async function main() {
  const response = await axios.get(baseUrl);

  const rows = response.data.split("\n");
  const scriptRadioRows = rows.filter((row) =>
    row.startsWith('<script src="radio/stations/')
  );

  const srcRegExp = new RegExp(/src="(.*)"/);
  const sanitizedRows = scriptRadioRows.map((row) => srcRegExp.exec(row)[1]);
  const radios = sanitizedRows.map((radio) => {
    const name = radio.split("/")[2];

    return {
      name,
      uri: `${baseUrl}/${radio}`,
    };
  });

  let playlistMap = {};
  await Promise.all(
    radios.map(async (radio) => {
      if (radio.name === "bumps") {
        return;
      }

      const radioResponse = await axios.get(radio.uri);
      const radioRows = radioResponse.data.split("\n");
      const tracksStartIndex =
        radioRows.findIndex((row) => row.startsWith("//TRACKS")) + 1;
      const allTracks = radioRows.slice(tracksStartIndex);
      const trackRegExp = new RegExp(/=\s"(.*)"/);
      const tracks = allTracks.reduce((filteredTracks, row) => {
        const isTrack = trackRegExp.test(row);
        if (isTrack === true) {
          const track = trackRegExp.exec(row)[1];
          filteredTracks.push(track);
        }

        return filteredTracks;
      }, []);

      playlistMap[radio.name] = tracks;

      return;
    })
  );

  fs.writeFileSync("scrapperdb.json", JSON.stringify(playlistMap, null, 2));
}
main();

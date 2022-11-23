const { extractTracks } = require("./extract-data.js");
const { spotify } = require("./spotify.js");
const { addEverything } = require("./data.js");

async function main() {
  // const playlistMap = await extractTracks();
  const playlistMap = {
    "playlist 1": [],
    "playlist 2": [],
    "playlist 3": [],
    "playlist 4": [],
    "playlist 5": [],
  };

  // await spotify(playlistMap);

  await addEverything(playlistMap);
}
main();

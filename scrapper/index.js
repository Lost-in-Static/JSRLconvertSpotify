const fs = require("fs");
const { extractTracks } = require("./extract-data.js");
const { spotify } = require("./spotify.js");

async function main() {
  const playlistMap = await extractTracks();
  await spotify(playlistMap);
  
//   fs.writeFileSync("scrapperdb.json", JSON.stringify(playlistMap, null, 2));
}
main();

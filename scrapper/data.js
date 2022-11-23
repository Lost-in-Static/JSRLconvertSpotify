const fs = require("fs");
const mysql = require("mysql-await");

const addEverything = async (playlistMap) => {
  const dbConfig = JSON.parse(fs.readFileSync("database.json"));
  const connection = mysql.createConnection(dbConfig.dev);

  connection.on("error", (err) => {
    console.error(`Connection error ${err.code}`);
  });

  const playlistNames = Object.keys(playlistMap);
  const playlists = await connection.awaitQuery(
    "INSERT INTO playlists (name) VALUES ?",
    [playlistNames.map((playlist) => [playlist])]
  );
  console.log(playlists.insertId);

  connection.awaitEnd();
};

module.exports = {
  addEverything,
};

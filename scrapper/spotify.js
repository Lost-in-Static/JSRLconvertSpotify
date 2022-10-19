const axios = require("axios");
const {CLIENTID , CLIENTSECRET} = require ("secret.js")

test = {
  playlist: [
    {
      fullName: "Rob Zombie - Trade In Your Guns For A Coffin",
    }
  ],
  testpl: [
    { fullName: "Deftones - When Girls Telephone Boys" },
    { fullName: "Disturbed - God Of The Mind" },
  ],
};

async function authenticate() {
  const params = new URLSearchParams({ grant_type: "client_credentials" });

  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(`${CLIENTID}:${CLIENTSECRET}`).toString("base64"),
      },
    }
  );

  return axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: { Authorization: `Bearer ${data.access_token}` },
  });
}

async function searchTrack(client, searchQuery) {
  const result = await client.get(
    `/search?q=${searchQuery}&type=track&limit=1`
  );
  console.log("search");
  console.log(result.data.tracks);
  return result.data.tracks;
}

async function getTracks(client) {
  for (key in test) {
    const playlistTracks = test[key];
    playlistTracks.forEach(async (track) => {
      const trackName = track.fullName;
      console.log(trackName);
      const uri = await searchTrack(client, trackName);
      console.log(uri.items[0].uri);
    });
  }
}

async function spotify(playlistMap) {
  const client = await authenticate();
  console.log(await getTracks(client));

  //   for (key in playlistMap) {
  // playlistMap[key] = getTracks(client, playlistMap[key])
  //   }
}
module.exports = {
  spotify,
};

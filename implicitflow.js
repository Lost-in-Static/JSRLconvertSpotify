const { CLIENTID } = require("./secrets.js");
const express = require("express");
const { default: axios } = require("axios");
const { response } = require("express");
const app = express();
const PORT = 8888;
const redirect_uri = `http://localhost:${PORT}/callback`;
const scope = "user-read-private user-read-email";
const base_url = "https://accounts.spotify.com";
const state = "poggers";

app.get("/", (_req, res) => {
  const authorize_url = `${base_url}/authorize?response_type=token&client_id=${CLIENTID}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;

  res.redirect(authorize_url);
});

app.get("/callback", (req, res) => {
  const token = req.query.access_token;
  if (!token) {
    res.send("No tokens??? 👽");
  }

  res.redirect(`/test?access_token=${token}`);
});

// https://localhost:8888/test?token=[TOKEN]
app.get("/test", (req, res) => {
  const token = req.query.access_token;
  if (!token) {
    res.send("No tokens??? 👽");
  }

  axios
    .get("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      res.send();
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

/* Load the HTTP library */
const http = require("http");
const axios = require("axios").default; // "Axios" library
const { CLIENTID, CLIENTSECRET } = require("../secrets.js");

/* Create an HTTP server to handle responses */

http
  .createServer((request, response) => {
    const params = new URLSearchParams({ grant_type: "client_credentials" });

    axios
      .post("https://accounts.spotify.com/api/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer(CLIENTID + ":" + CLIENTSECRET).toString("base64"),
        },
      })
      .then((token) => {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Hello");
        response.end();
        console.log(token.data);
      })
      .catch(() => {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Hello Sad World");
        response.end();
      });
  })
  .listen(8888);

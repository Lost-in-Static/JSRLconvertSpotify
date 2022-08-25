import { Component } from "solid-js";

export const Login: Component = () => {
  const client_id = "f479df5a46a643148e2ea67ba8d66afd"
  const base_url = "https://accounts.spotify.com";
  const scope = "user-read-private user-read-email";
  const redirect_uri = "http://localhost:3000/callback";
  const state = "poggers";

  const authorize_url = `${base_url}/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`

  return (
    <div>
      <h1>Welcome to JSRLconvertSpoofy</h1>
      <a href={authorize_url}>Login to Spotify</a>
    </div>
  );
};
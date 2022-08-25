import { Navigate, useLocation } from "@solidjs/router";
import { Component } from "solid-js";

const parseHashFragments = (stringFragment: string) => {
  const parsedFragments: { [key: string]: string } = {};

  stringFragment
    .substr(1)
    .split("&")
    .forEach((fragment) => {
      const [key, value] = fragment.split("=");

      parsedFragments[key] = value;
    });

  return parsedFragments;
};

export const Callback: Component = () => {
  const location = useLocation();
  const authParameters = parseHashFragments(location.hash);
  localStorage.setItem("access_token", authParameters.access_token);

  return <Navigate href="/playlists" />;
};

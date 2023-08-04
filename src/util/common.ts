import { store } from "../store";

export const getToken = () => {
  const userToken = localStorage.getItem("oauth_token");
  return userToken;
};

export const getAccessToken = () => {
  const user = store.getState().account.user.data;
  const headers = {
    Authorization: `Bearer ${user.token}`,
  };
  return headers;
};

export const convertToHMS = (seconds: number) => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  // return { hours, minutes, seconds: remainingSeconds };
  return `${hours}h, ${minutes}m and ${remainingSeconds}s`
}
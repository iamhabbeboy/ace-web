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

  return { hours, minutes, seconds: remainingSeconds };
};

export const convertTimestampToHumanReadable = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  // console.log(date.toLocaleDateString())
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };
}

export const convertTimeToTimestamp = () => {
  const hours = 1;
  const minutes = 30;
  const currentTimestamp = Date.now();
  const durationInMilliseconds = (hours * 60 + minutes) * 60 * 1000;
  const resultingTimestamp = currentTimestamp + durationInMilliseconds;

  return resultingTimestamp;
};

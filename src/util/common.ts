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
  const key = "countdown-acetesttop-1";
  let timestmp = 0;
  if (sessionStorage.getItem(key) !== null) {
    const time = sessionStorage.getItem(key);
    timestmp = Number(time);
    // console.log(timeDifference, "from storage")
  } else {
    timestmp = timestamp
    sessionStorage.setItem(key, String(timestamp));
  }

  const currentTime = new Date() as any;
  const endTime = new Date(timestmp) as any;
  const timeDifference = endTime - currentTime;

  if (timeDifference <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const hours = Math.floor(timeDifference / (60 * 60 * 1000));
  const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

export const convertTimeToTimestamp = (data: {
  hours: number;
  minutes: number;
}) => {
  const hours = data.hours;
  const minutes = data.minutes;
  const currentTimestamp = Date.now();
  const durationInMilliseconds = (hours * 60 + minutes) * 60 * 1000;
  const resultingTimestamp = currentTimestamp + durationInMilliseconds;

  return resultingTimestamp;
};

export function jsonToQueryString(json: any) {
  return Object.keys(json)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
    .join('&');
}

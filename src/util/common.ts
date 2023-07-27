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

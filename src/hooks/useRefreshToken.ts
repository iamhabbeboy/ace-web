import { RootState, store } from "../store";
import { setToken } from "../store/collections/user";
import { useSelector } from "react-redux";
import axios from "../util/axios.lib";
import { logger } from "../lib/logger";

const useRefreshToken = () => {
    const user =  useSelector((_state: RootState) => _state.account.user)
    const token = user.data.token;
    if(!token) {
     logger.debug("Auth", "token is missing")
    }
  const refresh = async () => {
    const response = await axios.get("/refresh_token", {
      headers: {
        Authorization: `Bearer ${token}`
    }
    });
    console.log(response);
    store.dispatch(setToken(response.data));
    return response.data;
  };
  return refresh;
};

export default useRefreshToken;

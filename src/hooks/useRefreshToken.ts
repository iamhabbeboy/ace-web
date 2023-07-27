import { RootState, store } from "../store";
import { setToken } from "../store/collections/user";
import { useSelector } from "react-redux";
import axios from "../util/axios.lib";

const useRefreshToken = () => {
    const user =  useSelector((_state: RootState) => _state.account.user)
    const token = user.data.token;
  const refresh = async () => {
    const response = await axios.get("/refresh_token", {
      headers: {
        Authorization: `Bearer ${token}`
    }
    });
    store.dispatch(setToken(response.data));
    return response.data;
  };
  return refresh;
};

export default useRefreshToken;

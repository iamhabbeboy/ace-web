import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("http://localhost:9200/api/refresh_token", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data);
      return {
        ...prev,
        accessToken: response.data,
      };
    });
    return response.data;
  };
  return refresh;
};
export default useRefreshToken;

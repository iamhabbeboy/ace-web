import { UserToken } from "../types/Type";

export const getToken = () => {
    const userToken = localStorage.getItem("oauth_token");
    if(!userToken) return "";
    const jsonToken: UserToken = JSON.parse(userToken);
    return jsonToken.access_token;
}
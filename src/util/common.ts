export const getToken = () => {
    const userToken = localStorage.getItem("oauth_token");
    return userToken;
}
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Axios } from "../util/axios.lib";
import useRefreshToken from "../hooks/useRefreshToken";

const ProtectedRoute = ({ children }: any) => {
    const refresh = useRefreshToken();
    const user = useSelector((_state: RootState) => _state.account.user)
    const token = user.data.token;
    // const location = useLocation();
    // useEffect(() => {
    const requestIntercept = Axios.interceptors.request.use(config => {
        if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }, (error) => Promise.reject(error));
    const responseIntercept = Axios.interceptors.response.use(response => response, async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return Axios(prevRequest);
        }
    })
    // Axios.interceptors.request.eject(requestIntercept);
    // Axios.interceptors.response.eject(responseIntercept);
    // return () => {
    //     Axios.interceptors.request.eject(requestIntercept);
    //     Axios.interceptors.response.eject(responseIntercept);
    // }
    // })
    // return (
    //     token 
    //     ? <Outlet /> 
    //     : <Navigate to="/signin" state={{ from: location }} replace />
    //     )
    return children;
}
export default ProtectedRoute;
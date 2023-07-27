import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../store";

const ProtectedRoute = (): JSX.Element => {
    const user =  useSelector((_state: RootState) => _state.account.user)
    const token = user.data.token;
    const location = useLocation();
    return (
        token 
        ? <Outlet /> 
        : <Navigate to="/signin" state={{ from: location }} replace />
        )
}
export default ProtectedRoute;
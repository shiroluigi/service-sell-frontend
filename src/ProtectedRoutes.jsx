import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({isAuthenticated}) => {
    if (!isAuthenticated()){
        return <Navigate to={'/'} replace></Navigate>
    }else{
        return <Outlet />;
    }
}

export default ProtectedRoutes;
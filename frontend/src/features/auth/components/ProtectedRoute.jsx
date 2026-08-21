import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

const ProtectedRoute = () => {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Loader/>
        );
    }

    if (!user) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
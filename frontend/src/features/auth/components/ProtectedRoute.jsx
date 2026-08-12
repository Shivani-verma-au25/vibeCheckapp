import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function ProtectedRoute() {
    const { user, initializing } = useAuth();
    const location = useLocation();

    if (initializing) {
        return (
            <>
                <LoadingSpinner />
            </>
        );
    }

    if (!user) {
        return <Navigate
            to="/login"
            replace
            state={{ from: location }}
        />
    }

    return <Outlet />
}
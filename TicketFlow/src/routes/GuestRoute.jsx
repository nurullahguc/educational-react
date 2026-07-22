import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function GuestRoute() {
    const { user, initializing } = useAuth();
    const location = useLocation();

    if (initializing) {
        return (
            <>
                <LoadingSpinner />
            </>
        );
    }

    if (user) {
        const previousPage = location.state?.from?.pathname ?? "/";

        return <Navigate to={previousPage} replace />
    }

    return <Outlet />
}
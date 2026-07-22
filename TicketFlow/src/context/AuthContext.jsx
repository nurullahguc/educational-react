import { createContext, useEffect, useState } from "react";
import {
    getCurrentUser,
    login as loginRequest,
    logout as logoutRequest,
    register as registerRequest
} from "../api/authApi";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setInitializing(false);
            }
        }

        loadCurrentUser();
    }, []);

    const login = async (credentials) => {
        const loggedInUser = await loginRequest(credentials);

        setUser(loggedInUser);

        return loggedInUser;
    };

    const register = async (userData) => {
        const registeredUser = await registerRequest(userData);

        setUser(registeredUser);

        return registeredUser;
    };

    const logout = async () => {
        await logoutRequest();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                initializing,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
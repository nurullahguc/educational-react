import http from "./http";

export const getCsrfCookie = async () => {
    await http.get("/sanctum/csrf-cookie");
}

export const getCurrentUser = async () => {
    const response = await http.get("/api/user");

    return response.data.data;
}

export const login = async (credentials) => {
    await getCsrfCookie();

    await http.get("/api/login", credentials);

    return getCurrentUser();
}

export const register = async (userData) => {
    await getCsrfCookie();

    await http.get("/api/register", userData);

    return getCurrentUser();
}

export const logout = async () => {
    await http.get("/api/logout");
}
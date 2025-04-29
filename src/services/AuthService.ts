import {apiClient} from "../utils/constants.ts";
import {AuthResponse, TokenResponse} from "../types/login.ts";

export const storeTokens = (accessToken: string, refreshToken: string) => {
    if (!accessToken || !refreshToken) {
        console.error("Attempted to store empty tokens:", { accessToken, refreshToken });
        return false;
    }

    try {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return true;
    } catch (error) {
        console.error("Error storing tokens:", error);
        return false;
    }
};

export const getTokens = () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error getting tokens:", error);
        return { accessToken: null, refreshToken: null };
    }
};

export const clearTokens = () => {
    try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        return true;
    } catch (error) {
        console.error("Error clearing tokens:", error);
        return false;
    }
};

export const isAuthenticated = () => {
    const { accessToken } = getTokens();
    return !!accessToken;
};

export const login = async (credentials: { email: string; password: string }) => {
    try {
        const response = await apiClient.post('/Auth/login', credentials, {
            headers: {
                Accept: "text/plain",
            },
        });

        const data: AuthResponse = response.data;
        const stored = storeTokens(data.accessToken, data.refreshToken);

        if (!stored) {
            throw new Error("Failed to store authentication tokens");
        }

        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const { refreshToken } = getTokens();

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await apiClient.post('/Auth/refresh-token', { refreshToken }, {
            headers: {
                Accept: "text/plain",
            },
        });

        const data: TokenResponse = response.data;
        const stored = storeTokens(data.accessToken, data.refreshToken);

        if (!stored) {
            throw new Error("Failed to store refreshed tokens");
        }

        return data.accessToken;
    } catch (error) {
        console.error("Token refresh error:", error);
        clearTokens();
        throw error;
    }
};

export const logout = async () => {
    try {
        const { refreshToken, accessToken } = getTokens();

        if (refreshToken) {
            await apiClient.post('/Auth/revoke', { refreshToken }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "text/plain",
                },
            });
        }

        return true;
    } catch (error) {
        console.error("Logout error:", error);
        return false;
    } finally {
        clearTokens();
    }
};
import {apiClient, AUTH_TOKEN} from "../utils/constants.ts";
import {AuthResponse, TokenResponse} from "../types/login.ts";

const storeTokens = (accessToken :string, refreshToken :string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};


const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

 export const getStoredTokens = () => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
});

export async function refreshAccessToken() {
    try {
        const { refreshToken } = getStoredTokens();
        if (!refreshToken) throw new Error('No refresh token available');
        
        const response = await apiClient.post( `Auth/refresh-token`, {refreshToken}, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
                Accept: "text/plain",
            },
        });

        const data :TokenResponse = await response.data;
        storeTokens(data.accessToken, data.refreshToken);
        
        return data.accessToken;
    } catch (error) {
        console.error("Error for checking credentials :", error);
        removeTokens();
        throw error;
    }
}

export async function login(data:any) {
    try {
        const response = await apiClient.post( `/Auth/login`, data, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
                Accept: "text/plain",
            },
        });

        const res :AuthResponse = await response.data;
        storeTokens(res.accessToken, res.refreshToken);
        return res;
    } catch (error) {
        console.error("Error for checking credentials :", error);
        throw error;
    }
}

export async function logout() {
    try {
        const { refreshToken } = getStoredTokens();
        if (!refreshToken) throw new Error('No refresh token available');
        
        const response = await apiClient.post( `/Auth/revoke`, {refreshToken}, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
                Accept: "text/plain",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error for checking credentials :", error);
        throw error;
    }finally {
        removeTokens();
    }
}



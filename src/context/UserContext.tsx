import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {User} from "../types/User.ts";
import {useNavigate} from "react-router-dom";

interface UserContextType {
    user: User | null;
    accessToken: string | null;
    loginUser: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser && savedUser !== "undefined"  ? JSON.parse(savedUser) : null;
    });

    const [accessToken, setAccessToken] = useState<string | null>(() => {
        return localStorage.getItem("accessToken") || null;
    });

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const savedUser = localStorage.getItem("user");

        if (!token || !savedUser) {
            logout();
        }
    }, []);

    const loginUser = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <UserContext.Provider
            value={{
                user,
                accessToken,
                loginUser,
                logout,
                isAuthenticated: !!user && !!accessToken
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
}
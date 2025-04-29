import {User} from "../types/User.ts";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {clearTokens, getTokens, isAuthenticated, storeTokens ,logout as apiLogout} from "../services/AuthService.ts";

interface UserContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginUser: (userData: User, accessToken: string, refreshToken: string) => void;
    logout: () => Promise<void>;
}


const UserContext = createContext<UserContextType | undefined>(undefined);
interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUser = () => {
            try {
                const { accessToken } = getTokens();

                if (!accessToken) {
                    setUser(null);
                    setIsLoading(false);
                    return;
                }

                const savedUser = localStorage.getItem('user');

                if (savedUser && savedUser !== 'undefined') {
                    setUser(JSON.parse(savedUser));
                } else {
                    console.warn('Found access token but no user data');
                    clearTokens();
                    setUser(null);
                }
            } catch (error) {
                console.error('Error loading user:', error);
                clearTokens();
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const loginUser = (userData: User, accessToken: string, refreshToken: string) => {
        const stored = storeTokens(accessToken, refreshToken);

        if (!stored) {
            console.error('Failed to store tokens');
            return;
        }

        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = async () => {
        try {
            await apiLogout();
            console.log("here in the incorrect method ")
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setUser(null);
            navigate('/login');
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                isAuthenticated:isAuthenticated(),
                isLoading,
                loginUser,
               logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
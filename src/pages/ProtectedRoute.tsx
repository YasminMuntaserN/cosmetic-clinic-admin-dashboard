import { Navigate, Outlet } from "react-router-dom";
import {useUser } from "../context/UserContext";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useUser();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

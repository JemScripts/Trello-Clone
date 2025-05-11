import { Navigate } from "react-router-dom";
import userService from "../services/user.service.js";
import { useAuth } from "../context/AuthContext.jsx";

export const ProtectedRoute = ({children}) => {
    const { user } = useAuth();

    return user ? children : <Navigate to="/login" />;
}
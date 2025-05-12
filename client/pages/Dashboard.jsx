import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        if(!user) {
            navigate("/login");
        }
    }, [user, navigate, logout])

    if(!user) return null;

    return (
    <div>
        <h2>hi {user.username}</h2>
        <button type="submit" onClick={ logout }>Logout</button>
    </div>
    )
}
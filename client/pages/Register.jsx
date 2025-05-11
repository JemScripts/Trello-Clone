import { useState, useEffect } from "react";
import userService from "../services/user.service.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await userService.register(username, email, password);
            setSuccess(true);
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };
    
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit = {handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setError("");
                    }}
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setError("");
                    }}
                />
                <button type="submit">Register</button>
            </form>
            { success && <p style={{ color: "green" }}>Success!</p>}
            { error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
};
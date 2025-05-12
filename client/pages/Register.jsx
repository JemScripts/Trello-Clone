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
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if(!email.trim()) return setError("Email is required.");
        if(!username.trim()) return setError("Username is required.");
        if(password.length < 6) return setError("Password must be at least 6 characters.");

        try {
            await userService.register(username, email, password);
            setSuccess(true);
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setLoading(false);
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
                        setLoading(false);
                        setError("");
                    }}
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setLoading(false);
                      setError("");
                    }}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setLoading(false);
                        setError("");
                    }}
                />
                <button type="submit" disabled={loading}> { loading ? "Registering..." : "Register" }</button>
            </form>
            { success && <p style={{ color: "green" }}>Success!</p>}
            { error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
};
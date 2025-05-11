import { useState } from "react";
import userService from "../services/user.service.js";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await userService.register(username, email, password);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };
    
    const newAccount = () => {
        setUsername("");
        setPassword("");
        setError("");
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit = {handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            { error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
};
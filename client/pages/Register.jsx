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
        <div className="flex-grow flex items-center justify-center px-4">
            <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Create An Account</h2>
                <form onSubmit = {handleSubmit} className="flex flex-col gap-4">
                    <input
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setLoading(false);
                            setError("");
                        }}
                    />
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200"> { loading ? "Registering..." : "Register" }</button>
                </form>
                { success && <p className="text-green-600 mt-3 text-center">Success! Redirecting you to the login page...</p>}
                { error && <p className="text-red-600 mt-3 text-center">{error}</p>}
            </div>
        </div>
    )
};
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Sidebar } from "../components/Sidebar.jsx";

export const Dashboard = () => {
    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        if(!user) {
            navigate("/login");
        }
    }, [user, navigate, logout])

    if(!user) return null;

    return (
    <div className="flex h-screen">
        <Sidebar onSelectedBoard={setSelectedBoardId} />
        <main className="flex-1 p-4">
            {selectedBoardId ? (
                <h2>Board ID: {selectedBoardId}</h2>
            ) : (
                <p>Select a board to view its content</p>
            )}
        </main>
    </div>
    );
};
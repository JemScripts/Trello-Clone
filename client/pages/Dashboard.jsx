import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Sidebar } from "../components/Sidebar.jsx";
import { BoardView } from "../components/BoardView.jsx";
import boardService from "../services/board.service.js";

export const Dashboard = () => {
    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [selectedBoardTitle, setSelectedBoardTitle] = useState("");
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        if(!user) {
            navigate("/login");
        }
    }, [user, navigate, logout]);

    useEffect(() => {
        const fetchBoard = async () => {
            if(!selectedBoardId) {
                setSelectedBoardTitle("");
                return;
            }

            try {
                const res = await boardService.getByBoardId(selectedBoardId);
                setSelectedBoardTitle(res.data.title);
            } catch (err) {
                console.error("Failed to fetch board", err);
                setSelectedBoardTitle("");
            }
        };
        fetchBoard();
    }, [selectedBoardId])

    if(!user) return null;

    return (
    <div className="flex h-screen">
        <Sidebar onSelectedBoard={setSelectedBoardId} />
        <main className="flex-1 p-4">
            {selectedBoardId ? (
                <BoardView boardId={selectedBoardId} boardTitle={selectedBoardTitle} />
            ) : (
                <p>Select a board to view its content</p>
            )}
        </main>
    </div>
    );
};
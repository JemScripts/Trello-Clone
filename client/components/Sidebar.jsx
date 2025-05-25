import { useEffect, useState } from "react";
import boardService from "../services/board.service.js";
import { useAuth } from "../context/AuthContext.jsx";
import { CreateBoard } from "./CreateBoard.jsx";

export const Sidebar = ({ onSelectedBoard }) => {
    const [boards, setBoards] = useState([]);
    const [error, setError] = useState("");
    const [windowVisible, setWindowVisible] = useState(false);
    const { user } = useAuth();

    const fetchBoards = async () => {
        try {
            const res = await boardService.getAllBoards();
            setBoards(res.data);
        } catch (err) {
            setError("You don't have any boards to show!");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    const deleteBoard = async (boardId) => {
        try {
            await boardService.deleteByBoardId(boardId);
            fetchBoards();
        } catch (err) {
            setError("Couldn't delete board!");
            console.error(err);
        }
    }

    return (
        <div className="w-64 bg-gray-100 border-r h-screen p-4">
            <div className="flex flex-row gap-2 items-center justify-center">
                <h2 className="text-xl font-bold">
                    Your Boards
                </h2>

                <button className="bg-green-500 rounded-md h-8 w-8 flex items-center justify-center text-lg text-white hover:bg-green-400 transition duration-150" onClick={() => setWindowVisible(!windowVisible)}>{windowVisible ? "x" : "+"}</button>
            </div>
            
            {windowVisible && (
                <CreateBoard 
                onClose={() => setWindowVisible(false)}
                onBoardCreated={fetchBoards} 
                />
            )}

            {error && <p className="text-red-500">{error}</p>}

            <ul className="space-y-2">
                {boards.map((board) => (
                    <li
                        key={board.id}
                        className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                        onClick={() => onSelectedBoard(board.id)}
                    >
                        {board.title}
                        <button className="bg-red-500 rounded-md h-8 w-8 flex items-center justify-center text-lg text-white hover:bg-red-400 transition duration-150" onClick={(e) => {
                            e.stopPropagation(); deleteBoard(board.id); 
                        }}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
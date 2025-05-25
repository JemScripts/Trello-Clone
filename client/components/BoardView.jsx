import { useEffect, useState } from "react";
import columnService from "../services/column.service.js";

export const BoardView = ({ boardId, boardTitle }) => {
    const [columns, setColumns] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchColumns = async() => {
            try {
                const res = await columnService.getByBoardId(boardId);
                console.log(res.data);
                setColumns(res.data);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to fetch columns.");
            }
        };
        fetchColumns();
    }, [boardId]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{boardTitle}</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex gap-4 overflow-x-auto">
                {columns.map((column) => (
                    <div key={column.id} className="bg-gray-100 p-4 rounded w-64 shadow">
                        <h2 className="text-lg font-semibold">{column.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};
import { useEffect, useState } from "react";
import columnService from "../services/column.service.js";
import cardService from "../services/card.service.js";

export const BoardView = ({ boardId, boardTitle }) => {
    const [columns, setColumns] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchColumnsAndCards = async() => {
            try {
                const res = await columnService.getByBoardId(boardId);
                const columnData = res.data;

                const columnCards = await Promise.all(
                    columnData.map(async (col) => {
                        const cardRes = await cardService.getCards(col.id);
                        return { ...col, cards: cardRes.data };
                    })
                );

                setColumns(columnCards);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to fetch columns.");
            }
        };
        
        if(boardId) {
        fetchColumnsAndCards();
        }
        
    }, [boardId]);

    return (
        <div className="p-4">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">{boardTitle}</h1>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="flex flex-wrap justify-between gap-6 overflow-x-auto text-center">
                {columns.map((column) => (
                    <div key={column.id} className="bg-gray-100 p-4 rounded w-64 shadow">
                        <h2 className="text-lg font-semibold">{column.title}</h2>
                        <div className="flex flex-col gap-2">
                            {column.cards?.map((card) => (
                                <div key={card.id} className="bg-white p-2 rounded shadow-sm">
                                    <p className="font-semibold">{card.title}</p>
                                    {card.description && (
                                        <p className="text-sm text-gray-600">{card.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
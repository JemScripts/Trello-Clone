import ReactDOM from "react-dom";
import { useState } from "react";
import boardService from "../services/board.service.js";
import { useAuth } from "../context/AuthContext";

export const CreateBoard = ( { onClose, onBoardCreated } ) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            console.log("SUBMIT:", { title, description });
            await boardService.create(title, description);
            onBoardCreated();
            onClose();
        } catch(err) {
            setError(err.response?.data?.message || "Failed to create board.");
        }
    }


    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="absolute inset-0 bg-black/20 z-0"/>
                <div className="relative z-10 bg-white p-6 rounded shadow-xl w-96 border border-gray-300 ">
                    <h2 className="text-xl font-bold mb-4">
                        Create a New Board
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input 
                            className="px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setError("");
                            }}
                        />
                        <textarea 
                            className="px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setError("");
                            }}
                        />
                        <button className="bg-green-500 rounded-md text-white" type="submit">Create</button>
                    </form>
                </div>
        </div>,
        document.body
    );
};
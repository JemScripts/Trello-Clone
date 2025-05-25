import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
});

const getAllBoards = () => http.get("/boards");

const getByBoardId = (boardId) => http.get(`/boards/${boardId}`);

const create = (title, description) => {
    return http.post("/boards/", {
        title,
        description,
    });
};

export default { getAllBoards, getByBoardId, create };
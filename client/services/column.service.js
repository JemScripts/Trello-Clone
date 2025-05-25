import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
});

const getByBoardId = (boardId) => http.get(`/columns/board/${boardId}`);

export default {
    getByBoardId,
}
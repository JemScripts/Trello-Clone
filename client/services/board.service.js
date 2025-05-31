import http from "./http";

const getAllBoards = () => http.get("/boards");

const getByBoardId = (boardId) => http.get(`/boards/${boardId}`);

const deleteByBoardId = (boardId) => http.delete(`/boards/${boardId}`);

const create = (title, description) => {
    return http.post("/boards/", {
        title,
        description,
    });
};

export default { getAllBoards, getByBoardId, deleteByBoardId, create };
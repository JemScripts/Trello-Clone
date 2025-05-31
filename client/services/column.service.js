import http from "./http";

const getByBoardId = (boardId) => http.get(`/columns/board/${boardId}`);

export default {
    getByBoardId,
}
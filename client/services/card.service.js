import http from "./http";

const getCards = async (columnId) => {
    return http.get(`/cards?columnId=${columnId}`);
}

const createCard = async (data) => {
    return http.post("/cards", data);
}

const updateCard = async (id, data) => {
    return http.put(`/cards/${id}`, data);
}

const deleteCard = async (id) => {
    return http.delete(`/cards/${id}`);
}

export default {
    getCards,
    createCard,
    updateCard,
    deleteCard,
}
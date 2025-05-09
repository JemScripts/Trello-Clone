import * as cards from "../controllers/card.controller.js";
import verifyToken from "../middleware/authMiddleware.js";
import express from "express";

export default (app) => {
    let router = express.Router();

    router.post("/", verifyToken, cards.create);
    router.get("/", verifyToken, cards.findAll);
    router.get("/:id", verifyToken, cards.findOne);
    router.put("/:id", verifyToken, cards.update);
    router.delete("/:id", verifyToken, cards.deleteOne);
    router.delete("/:id", verifyToken, cards.deleteAll);

    app.use("/api/cards", router);
}
import * as boards from "../controllers/board.controller.js";
import verifyToken from "../middleware/authMiddleware.js";
import express from "express";

export default (app) => {
    let router = express.Router();

    router.post("/", verifyToken, boards.create);
    router.get("/", verifyToken, boards.findAll);
    router.get("/:id", verifyToken, boards.findOne);
    router.put("/:id", verifyToken, boards.update);
    router.delete("/:id", verifyToken, boards.deleteOne);
    router.delete("/:id", verifyToken, boards.deleteAll);

    app.use("/api/boards", router);
}
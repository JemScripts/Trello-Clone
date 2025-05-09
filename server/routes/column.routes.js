import * as columns from "../controllers/column.controller.js";
import verifyToken from "../middleware/authMiddleware.js";
import express from "express";

export default (app) => {
    let router = express.Router();

    router.post("/", verifyToken, columns.create);
    router.get("/", verifyToken, columns.findAll);
    router.get("/:id", verifyToken, columns.findOne);
    router.put("/:id", verifyToken, columns.update);
    router.delete("/:id", verifyToken, columns.deleteOne);
    router.delete("/:id", verifyToken, columns.deleteAll);

    app.use("/api/columns", router);
}
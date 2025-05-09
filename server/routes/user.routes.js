import * as users from "../controllers/user.controller.js";
import verifyToken from "../middleware/authMiddleware.js";
import express from "express";

export default (app) => {
    let router = express.Router();

    router.post("/register", users.register);
    router.post("/login", users.login);
    router.get("/me", verifyToken, users.getUserProfile);

    app.use("/api/users", router);
}
import express from "express";
import cors from "cors";
import db from "./index.js";
import userRoutes from "./routes/user.routes.js";
import boardRoutes from "./routes/board.routes.js";
import columnRoutes from "./routes/column.routes.js";
import cardRoutes from "./routes/card.routes.js";

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Live on air!" });
});

userRoutes(app);
boardRoutes(app);
columnRoutes(app);
cardRoutes(app);

db.sequelize.sync().then(() => {
    console.log("Synced db!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
});
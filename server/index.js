import dbConfig from "./config/db.config.js";
import Sequelize from "sequelize";
import Board from "./models/board.model.js";
import Column from "./models/column.model.js";
import Card from "./models/card.model.js";
import User from "./models/user.model.js";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    port: dbConfig.PORT,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = User(sequelize, Sequelize);
db.boards = Board(sequelize, Sequelize);
db.columns = Column(sequelize, Sequelize);
db.cards = Card(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


export default db;
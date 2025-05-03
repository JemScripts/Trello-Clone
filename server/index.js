import dbConfig from "./config/db.config.js";
import Sequelize from "sequelize";
import Board from "./models/board.model.js";
import Column from "./models/column.model.js";
import Card from "./models/card.model.js";
import User from "./models/user.model.js";

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

User.associate = (models) => {
    User.hasMany(models.Board, { foreignKey: 'userId' });
    User.hasMany(models.Column, { foreignKey: 'userId' });
    User.hasMany(models.Card, { foreignKey: 'userId' });
}

Board.associate = (models) => {
    Board.hasMany(models.User, { foreignKey: 'userId' });
    Board.hasMany(models.Column, { foreignKey: 'boardId' });
};

Column.associate = (models) => {
    Column.belongsTo(models.User, { foreignKey: 'userId' });
    Column.belongsTo(models.Board, { foreignKey: 'boardId' });
    Column.belongsTo(models.Card, { foreignKey: 'columnId' });
}

Card.associate = (models) => {
    Card.belongsTo(models.User, { foreignKey: 'userId' });
    Card.belongsTo(models.Column, { foreignKey: 'columnId' });
}


export default db;
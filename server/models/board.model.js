export default (sequelize, Sequelize) => {
    const Board = sequelize.define("board", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
    });
    return Board;
};
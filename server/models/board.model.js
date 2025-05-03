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
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: true,
    });

    Board.associate = (models) => {
        Board.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
        Board.hasMany(models.Column, { foreignKey: 'boardId' });
    };

    return Board;
};
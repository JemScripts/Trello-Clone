export default (Sequelize, sequelize) => {
    const Column = sequelize.define("column", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        position: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    Column.associate = (models) => {
        Column.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
        Column.belongsTo(models.Board, {
            foreignKey: 'boardId',
            onDelete: 'CASCADE',
        });
        Column.hasMany(models.Card, { foreignKey: 'columnId' });
    };

    return Column;
};
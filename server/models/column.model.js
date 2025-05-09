export default (sequelize, Sequelize) => {
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
        Column.belongsTo(models.boards, {
            foreignKey: 'boardId',
            onDelete: 'CASCADE',
        });
        Column.hasMany(models.cards, { foreignKey: 'columnId' });
    };

    return Column;
};
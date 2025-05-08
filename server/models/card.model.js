export default (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        dueDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
    });

    Card.associate = (models) => {
        Card.belongsTo(models.Column, {
            foreignKey: 'columnId',
            onDelete: 'CASCADE',
        });
    };

    return Card;
}
export default (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    User.associate = (models) => {
        User.hasMany(models.Board, { foreignKey: 'userId'});
    };

    return User;
}
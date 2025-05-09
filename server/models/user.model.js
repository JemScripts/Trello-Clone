import bcrypt from 'bcryptjs';

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
            validate: {
                isEmail: { msg: "Your email address is invalid! "},
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        }
    });

    User.associate = (models) => {
        User.hasMany(models.boards, { foreignKey: 'userId'});
    };

    return User;
}
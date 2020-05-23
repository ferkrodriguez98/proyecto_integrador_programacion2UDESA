const Review = require('./review.js')

module.exports = function (sequelize, DataTypes) {
    // const bcrypt = require("bcryptjs");

    const user = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            username: { 
                type: DataTypes.STRING, 
                primaryKey: true, 
                autoincrement: true, 
                unique: true,
            }, 
            email: { 
                type: DataTypes.STRING(255), 
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.CHAR(255),
                allowNull: false,
                defaultValue: "",
            },
            birthdate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            favorite_genre: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: "",
            },
        },
        {
            tableName: 'users',
            timestamps: false,
        }
    );

    // user.associate = function(models) {
    //     user.hasMany(models.Review, {
    //         as: 'review',
    //     });
    // }

    // user.beforeCreate(user => {
    //     if (user.password !== null) {
    //         user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    //     }
    // });

    return user;
}
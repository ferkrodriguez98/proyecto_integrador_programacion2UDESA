const Review = require('./review.js')

module.exports = function (sequelize, DataTypes) {

    const user = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            username: { 
                type: DataTypes.STRING(255), 
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
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            favorite_genre: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: "Drama",
            },
        },
        {
            tableName: 'users',
            timestamps: false,
        }
    );

    return user;
}
module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define(
        'User',
        {
           username: DataTypes.STRING,
           email: DataTypes.STRING,
           password: DataTypes.STRING,
           birthdate: DataTypes.DATE,
           favorite_genre: DataTypes.STRING,
        },
        {
            tableName: 'users',
            timestamps: false
        }
    );

    return user;
}
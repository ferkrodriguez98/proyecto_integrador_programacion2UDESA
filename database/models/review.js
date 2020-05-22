const { DataTypes } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const review = sequelize.define(
        'Review',
        {
            series_id: DataTypes.INTEGER, // de TMDB
            user_id: DataTypes.INTEGER, // FK
            series_review: DataTypes.STRING, // la reseña
            rating: DataTypes.INTEGER, // puntaje de la serie
            createdAt: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
            updatedAt: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
        },
        {
            tableName: 'REVIEWS',
            timestamps: true // columnas de created y updated
        }
    );

    return review;
}
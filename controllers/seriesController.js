const DB = require('../database/models');
const Op = DB.Sequelize.Op;

module.exports = {
    // detalle de la serie con reseñas
    detail: function(req, res) {
        return res.render('detail');
    }
}
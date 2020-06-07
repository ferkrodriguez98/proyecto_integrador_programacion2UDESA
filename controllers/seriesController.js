const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const { User } = require('../database/models');

module.exports = {
    detail: function(req, res) { // detalle de la serie
        DB
            .Review
            .findAll(
            {
                where : {
                    series_id : req.params.id, // busco las reviews de la serie que coincide con la URL
                },
                order: [
                    [ 'updatedAt', 'DESC' ] // las ordeno desde las mas nuevas updateadas
                ],
                limit: 5,
                include: [
                    { 
                        model: User,
                        as: 'user',
                        required: false,
                    }
                ]
            })
            .then(function (results) {
                return res.render('series/detail', { // renderizo el detalle
                    params : req.params, // esto es para mandarle el ID de la serie
                    review : results, // mando todas las reviews
                });
            })
            .catch(function (error) {
                return res.send(error)
            })
    },

}
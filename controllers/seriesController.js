const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const { User } = require('../database/models');

module.exports = {
    detail: function(req, res) { // reviews in series detail
        DB
            .Review
            .findAll(
            {
                where : {
                    series_id : req.params.id,
                },
                order: [
                    [ 'updatedAt', 'DESC' ]
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
                return res.render('series/detail', {
                    params : req.params,
                    review : results,
                });
            })
            .catch(function (error) {
                return res.send(error)
            })
        console.log(req.params)
    },

}
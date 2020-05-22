const DB = require('../database/models');
const Op = DB.Sequelize.Op;

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

module.exports = {
    index: function(req, res) {
        return res.render('auth/register');
    },

    register: function(req, res) {
        DB
            .User
            .create(req.body)
            .then (savedUser => {
                return res.send(savedUser)
            })
            .catch (error => {
                return res.send(error)
            })
    }
}
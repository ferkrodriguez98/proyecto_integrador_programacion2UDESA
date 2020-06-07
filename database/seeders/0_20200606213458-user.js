"use strict";
var faker = require("faker");
var bcrypt = require("bcryptjs");
var moment = require("moment");

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);

var genres = ["Drama", "Comedy", "Horror", "Mistery", "Anime", "Action", "Adventure", "Talkshow", "Fiction",
];

var users = [];

module.exports = {
	up: (queryInterface, Sequelize) => {
		for (let i = 0; i < 9997; i++) {

			users.push({
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: bcrypt.hashSync(faker.internet.password(), 10),
				birthdate: moment(
					new Date(
						+new Date() - Math.floor(Math.random() * 1000000000000)
					)
				).format("YYYY/MM/DD"),
				favorite_genre: genres[Math.floor(Math.random() * (9))],
			})
		}
		console.log(users)
		return queryInterface.bulkInsert("Users", users);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	},
};

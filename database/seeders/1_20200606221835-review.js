"use strict";
var faker = require("faker");
var moment = require("moment");

var reviews = [];

module.exports = {
	up: (queryInterface, Sequelize) => {
		for (let i = 0; i < 1000; i++) {

			var date = moment(
				new Date(
				+new Date() - Math.floor(Math.random() * 100000000000)
				)
			).format("YYYY/MM/DD hh:mm:ss");

			let words = ''

			for (let j = 0; j < 10; j++) {
				words += faker.random.words() + ' ';	
			}

			reviews.push({
				series_id: Math.floor(Math.random() * (90000)),
				rating: Math.floor(Math.random() * (11)),
				series_review: words,
				user_id: Math.ceil(Math.random() * (100)),
				createdAt: date,
				updatedAt: moment(date).add(5, 'days').format("YYYY/MM/DD hh:mm:ss"),
			})

			console.log(i)
		}
		console.log(reviews)
		return queryInterface.bulkInsert("Reviews", reviews);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Reviews", null, {});
	},
};

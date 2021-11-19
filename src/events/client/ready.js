const { Client } = require('discord.js');
const mongoose = require('mongoose');
const { MONGO_URL, ACTIVITIY, ACTIVITIY_TYPE } = require('../../../config.js');

/**
 * @param {Client} client
 */

module.exports = {
	name: 'ready',
	once: true,
	/**
	 * @param {Client} client
	 */

	execute(client) {
		console.log(`I'm ready to go ${client.user.username} 🤖!`);
		client.user.setActivity(ACTIVITIY, { type: ACTIVITIY_TYPE });

		if (!MONGO_URL) return;
		mongoose
			.connect(MONGO_URL, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log(`${client.user.username} is now connected to 🗃`);
			})
			.catch((err) => {
				console.error(err);
			});
	},
};

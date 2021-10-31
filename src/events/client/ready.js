const { Client } = require('discord.js');

/**
 * @param {Client} client
 */

const activitiy = process.env.ACTIVITIY;

module.exports = {
	name: 'ready',
	once: true,
	/**
	 * @param {Client} client
	 */

	execute(client) {
		console.log(`I'm ready to go ${client.user.tag} 🤖!`);
		client.user.setActivity(activitiy, { type: 'WATCHING' });
	},
};

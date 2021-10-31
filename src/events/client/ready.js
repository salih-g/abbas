const { Client } = require('discord.js');

/**
 * @param {Client} client
 */

const { ACTIVITIY, ACTIVITIY_TYPE } = require('../../../config.json');

module.exports = {
	name: 'ready',
	once: true,
	/**
	 * @param {Client} client
	 */

	execute(client) {
		console.log(`I'm ready to go ${client.user.tag} 🤖!`);
		client.user.setActivity(ACTIVITIY, { type: ACTIVITIY_TYPE });
	},
};

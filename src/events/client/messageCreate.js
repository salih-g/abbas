const { Client } = require('discord.js');
const music = require('../../music');

/**
 * @param {Client} client
 */

module.exports = {
	name: 'messageCreate',
	/**
	 * @param {Client} client
	 */

	execute(message, client) {
		music(message, client);
	},
};

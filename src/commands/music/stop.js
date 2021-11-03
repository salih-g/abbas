const { Client } = require('discord.js');
const { PREFIX } = require('../../../config');

module.exports = {
	name: 'stop',
	description: 'Stop playing music',
	inVoiceChannel: true,
	/**
	 * @param {Client} client
	 */
	run: async (client, message) => {
		const queue = client.distube.getQueue(message);
		if (!queue)
			return message.channel.send(
				`❌ | There is nothing in the queue right now!`,
			);
		queue.stop();
		message.channel.send(`✅ | Stopped!`);
	},
};

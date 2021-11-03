const { Client } = require('discord.js');
const { PREFIX } = require('../../../config');

module.exports = {
	name: 'skip',
	description: 'Skips playing music',
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
		try {
			const song = queue.skip();
			message.channel.send(`✅ | Skipped! Now playing:\n${song.name}`);
		} catch (e) {
			message.channel.send(`❌ | ${e}`);
		}
	},
};

const { Client } = require('discord.js');

module.exports = {
	name: 'resume',
	description: 'Resume paused music',
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
		queue.resume();
		message.channel.send('Resumed the song for you :)');
	},
};

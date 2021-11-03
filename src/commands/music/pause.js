const { Client } = require('discord.js');

module.exports = {
	name: 'pause',
	description: 'Pause playing music',
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

		queue.pause();
		message.channel.send('Paused the song for you :)');
	},
};

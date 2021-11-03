const { Client } = require('discord.js');

module.exports = {
	name: 'autoplay',
	description: 'Play given music',
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
			const autoplay = queue.toggleAutoplay();
			message.channel.send(`✅ | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``);
		} catch (e) {
			message.channel.send(`❌ | ${e}`);
		}
	},
};

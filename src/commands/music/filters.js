const { Client } = require('discord.js');

module.exports = {
	name: 'filter',
	description: 'Music filters',
	inVoiceChannel: true,
	/**
	 * @param {Client} client
	 */
	run: async (client, message) => {
		const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
		const queue = client.distube.getQueue(message);
		if (!queue)
			return message.channel.send(
				`❌ | There is nothing in the queue right now!`,
			);
		if (args[1] === 'off' && queue.filters?.length) queue.setFilter(false);
		else if (Object.keys(client.distube.filters).includes(args[1]))
			queue.setFilter(args[1]);
		else if (args[1]) return message.channel.send(`❌ | Not a valid filter`);
		message.channel.send(
			`Current Queue Filter: \`${queue.filters.join(', ') || 'Off'}\``,
		);
	},
};

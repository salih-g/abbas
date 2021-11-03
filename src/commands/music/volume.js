const { Client } = require('discord.js');
const { PREFIX } = require('../../../config');

module.exports = {
	name: 'volume',
	description: 'Set volume',
	inVoiceChannel: true,
	aliases: ['v', 'set', 'set-volume'],
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
		const volume = parseInt(args[1]);
		if (isNaN(volume))
			return message.channel.send(`❌| Please enter a valid number!`);
		queue.setVolume(volume);
		message.channel.send(`✅ | Volume set to \`${volume}\``);
	},
};

const { Client } = require('discord.js');
const { PREFIX } = require('../../../config');

module.exports = {
	name: 'play',
	description: 'Play given music',
	inVoiceChannel: true,
	aliases: ['p'],
	/**
	 * @param {Client} client
	 */
	run: async (client, message) => {
		const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
		if (!args[1])
			return message.channel.send(
				`❌ | Please enter a song url or query to search.`,
			);
		try {
			client.distube.play(message, args[1]);
		} catch (e) {
			message.channel.send(`❌ | Error: \`${e}\``);
		}
	},
};

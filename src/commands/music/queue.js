const { Client } = require('discord.js');
const { PREFIX } = require('../../../config');

module.exports = {
	name: 'queue',
	description: 'List of musics',
	inVoiceChannel: true,
	aliases: ['q'],
	/**
	 * @param {Client} client
	 */
	run: async (client, message) => {
		const queue = client.distube.getQueue(message);
		if (!queue) return message.channel.send(`❌ | There is nothing playing!`);
		const q = queue.songs
			.map(
				(song, i) =>
					`${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${
						song.formattedDuration
					}\``,
			)
			.join('\n');
		message.channel.send(`🎶 | **Server Queue**\n${q}`);
	},
};

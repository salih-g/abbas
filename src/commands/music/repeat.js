const { Client } = require('discord.js');
const { PREFIX } = require('../../../config');

module.exports = {
	name: 'repeat',
	description: 'Repeat playing music',
	inVoiceChannel: true,
	aliases: ['loop', 'rp'],
	/**
	 * @param {Client} client
	 */
	run: async (client, message) => {
		const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
		const queue = client.distube.getQueue(message);
		if (!queue) return message.channel.send(`❌ | There is nothing playing!`);
		let mode = null;
		switch (args[1]) {
			case 'off':
				mode = 0;
				break;
			case 'song':
				mode = 1;
				break;
			case 'queue':
				mode = 2;
				break;
		}
		mode = queue.setRepeatMode(mode);
		mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off';
		message.channel.send(`⏯️  | Set repeat mode to \`${mode}\``);
	},
};

const { Client, MessageEmbed, CommandInteraction } = require('discord.js');
const { connection } = require('mongoose');
require('../../events/client/ready');

module.exports = {
	name: 'status',
	description: 'Display the status of client and DB connection. ',
	permissions: 'ADMINISTRATOR',
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */

	async execute(interaction, client) {
		const Response = new MessageEmbed()
			.setColor('BLUE')
			.setDescription(
				`**${client.user.username}**: \`💚 ONLINE\` - \`${
					client.ws.ping
				}ms\`\n **Uptime**: <t:${parseInt(
					client.readyTimestamp / 1000,
				)}:R>\n **Database**:\`${switchTo(connection.readyState)}\``,
			);

		interaction.reply({ embeds: [Response] });
	},
};

const switchTo = (val) => {
	let status = ' ';

	switch (val) {
		case 0:
			status = `⛔ DISCONNECTED`;
			break;
		case 1:
			status = `✅ CONNECTED`;
			break;
		case 2:
			status = `⏳ CONNECTING`;
			break;
		case 3:
			status = `⭕ DISCONNECTING`;
			break;
	}

	return status;
};

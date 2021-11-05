const { CommandInteraction, MessageEmbed, client } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all commands',
	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const embed = new MessageEmbed()
			.setTitle('Commands')
			.setDescription(
				client.commands.map((cmd) => `\`${cmd.name}\``).join(', '),
			)
			.setTimestamp();
		interaction.reply({ embeds: [embed] });
	},
};

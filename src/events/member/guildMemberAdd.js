const { MessageEmbed, WebhookClient, GuildMember } = require('discord.js');

const { BASE_ROLE_ID, WEBHOOK_ID, WEBHOOK_TOKEN } = require('../../../config');

module.exports = {
	name: 'guildMemberAdd',

	/**
	 *
	 * @param {GuildMember} member
	 */

	execute(member) {
		const { user, guild } = member;

		member.roles.add(BASE_ROLE_ID);

		const Welcomer = new WebhookClient({
			id: WEBHOOK_ID,
			token: WEBHOOK_TOKEN,
		});

		const Welcome = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
			.setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
			.setDescription(
				`
            Welcome ${member} to the **${guild.name}** !\n
            Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R> \n
            Latest Member Count: **${guild.memberCount}** \n
            ID: ${user.id} 
            `,
			);

		Welcomer.send({ embeds: [Welcome] });
	},
};

const { MessageEmbed, WebhookClient, GuildMember } = require('discord.js');

const { BASE_ROLE_ID, WEBHOOK_ID, WEBHOOK_TOKEN } = require('../../../config');

module.exports = {
	name: 'guildMemberRemove',

	/**
	 *
	 * @param {GuildMember} member
	 */

	execute(member) {
		const { user, guild } = member;

		const Loger = new WebhookClient({
			id: WEBHOOK_ID,
			token: WEBHOOK_TOKEN,
		});

		const Welcome = new MessageEmbed()
			.setColor('RED')
			.setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
			.setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
			.setDescription(
				`
             ${member} has left  the community!\n
            Joined : <t:${parseInt(member.joinedTimestamp / 1000)}:R> \n
            Latest Member Count: **${guild.memberCount}** \n
            ID: ${user.id} 
            `,
			);

		Loger.send({ embeds: [Welcome] });
	},
};

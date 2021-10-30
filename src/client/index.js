const { Client, Intents } = require('discord.js');
const client = new Client({ intents: 32767 });

const Connect_Client = () => {
	client.on('ready', () => {
		console.log(`Logged in as ${client.user.tag} 🤖!`);
	});

	return client;
};

module.exports = {
	Connect_Client,
};

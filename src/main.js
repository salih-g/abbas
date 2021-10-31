require('dotenv').config();
const { Connect_Client } = require('./client');
const commandHandler = require('./commands');

const client = Connect_Client();

const TOKEN = process.env.TOKEN;

client.once('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.once('ready', () => {
	console.log("I'm ready to go 🎆");
});

client.on('message', commandHandler);

// client.on('message', (msg) => {
// 	if (msg.channelId === process.env.CHANNEL_ID && msg.content === 'ping')
// 		msg.reply('Pong 🍾!');
// });

client.login(TOKEN);

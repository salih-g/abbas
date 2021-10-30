require('dotenv').config();
const { Connect_Client } = require('./src/client');

const client = Connect_Client();

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.on('ready', () => {
	console.log("I'm ready to go 🎆");
});

client.on('message', (msg) => {
	if (msg.channelId === '886907165699342386' && msg.content === 'ping')
		msg.reply('Pong 🍾!');
});

client.login(process.env.TOKEN);

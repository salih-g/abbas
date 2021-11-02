const { Client, Collection } = require('discord.js');
const { TOKEN } = require('../config.js');
const { promisify } = require('util');
const { glob } = require('glob');

const PG = promisify(glob);
const client = new Client({ intents: 32767 });

client.commands = new Collection();

['events', 'commands'].forEach((handler) => {
	require(`./handlers/${handler}`)(client, PG);
});

client.login(TOKEN);

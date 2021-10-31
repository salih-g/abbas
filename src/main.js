const { Client } = require('discord.js');
const client = new Client({ intents: 32767 });

const { TOKEN } = require('../config.json');

require('./handlers/events')(client);

client.login(TOKEN);

const { Client, Collection } = require('discord.js');
const { TOKEN } = require('../config.json');

const client = new Client({ intents: 32767 });

client.commands = new Collection();

require('./handlers/events')(client);
require('./handlers/commands')(client);

client.login(TOKEN);

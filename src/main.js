const { Client, Collection, Intents } = require('discord.js');
const { TOKEN } = require('../config.js');

const client = new Client({ intents: Intents.FLAGS.GUILDS });

client.commands = new Collection();

require('./handlers/events')(client);
require('./handlers/commands')(client);

client.login(TOKEN);

require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client({ intents: 32767 });

const TOKEN = process.env.TOKEN;

require('./handlers/events')(client);

client.login(TOKEN);

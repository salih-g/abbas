const { Client, Collection } = require('discord.js');
const { TOKEN, PORT } = require('../config.js');

const http = require('http');

const server = http.createServer((req, res) => {
	if (req.method !== 'GET') {
		res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
	} else {
		if (req.url === '/') {
			res.end(`<h3>Alive</h3>`);
		}
	}
	res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
});

server.listen(PORT, () => {
	console.log(`HTTP server listening on ${PORT} 🌐`);
});
const client = new Client({ intents: 32767 });

client.commands = new Collection();

require('./handlers/events')(client);
require('./handlers/commands')(client);

client.login(TOKEN);

const { Client, Collection } = require('discord.js');
const { TOKEN } = require('../config.js');
const { promisify } = require('util');
const { glob } = require('glob');
const DisTube = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');

const PG = promisify(glob);
const client = new Client({ intents: 32767 });

const { onDistube } = require('./music');

client.commands = new Collection();
client.distube = new DisTube.default(client, {
	searchSongs: 1,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 0,
	leaveOnFinish: true,
	leaveOnStop: true,
	plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],
});
client.aliases = new Collection();

['events', 'commands'].forEach((handler) => {
	require(`./handlers/${handler}`)(client, PG);
});

onDistube(client);

client.login(TOKEN);

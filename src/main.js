const { Client, Collection } = require('discord.js');
const { TOKEN } = require('../config.js');
const { promisify } = require('util');
const { glob } = require('glob');

const DisTube = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');

const PG = promisify(glob);
const client = new Client({ intents: 32767 });

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

['events', 'commands'].forEach((handler) => {
	require(`./handlers/${handler}`)(client, PG);
});

// Queue status template
const status = (queue) =>
	`Volume: \`${queue.volume}%\` | Filter: \`${
		queue.filters.join(', ') || 'Off'
	}\` | Loop: \`${
		queue.repeatMode
			? queue.repeatMode === 2
				? 'All Queue'
				: 'This Song'
			: 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

// DisTube event listeners, more in the documentation page
client.distube
	.on('playSong', (queue, song) =>
		queue.textChannel.send(
			`Playing \`${song.name}\` - \`${
				song.formattedDuration
			}\`\nRequested by: ${song.user}\n${status(queue)}`,
		),
	)
	.on('addSong', (queue, song) =>
		queue.textChannel.send(
			`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
		),
	)
	.on('addList', (queue, playlist) =>
		queue.textChannel.send(
			`Added \`${playlist.name}\` playlist (${
				playlist.songs.length
			} songs) to queue\n${status(queue)}`,
		),
	)
	// DisTubeOptions.searchSongs = true
	.on('searchResult', (message, result) => {
		let i = 0;
		message.channel.send(
			`**Choose an option from below**\n${result
				.map(
					(song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``,
				)
				.join('\n')}\n*Enter anything else or wait 30 seconds to cancel*`,
		);
	})
	// DisTubeOptions.searchSongs = true
	.on('searchCancel', (message) => message.channel.send(`Searching canceled`))
	.on('searchInvalidAnswer', (message) =>
		message.channel.send(`searchInvalidAnswer`),
	)
	.on('searchNoResult', (message) => message.channel.send(`No result found!`))
	.on('error', (textChannel, e) => {
		console.error(e);
		textChannel.send(`An error encountered: ${e.slice(0, 2000)}`);
	})
	.on('finish', (queue) => queue.textChannel.send('Finish queue!'))
	.on('finishSong', (queue) => queue.textChannel.send('Finish song!'))
	.on('disconnect', (queue) => queue.textChannel.send('Disconnected!'))
	.on('empty', (queue) => queue.textChannel.send('Empty!'));

client.login(TOKEN);

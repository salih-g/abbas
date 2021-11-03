const { PREFIX } = require('../../config.js');

const musicBot = (message, client) => {
	if (!message.content.startsWith(PREFIX)) return;
	const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const cmd =
		client.commands.get(command) ||
		client.commands.get(client.aliases.get(command));
	if (!cmd) return;
	if (cmd.inVoiceChannel && !message.member.voice.channel)
		return message.channel.send(`❌ | You must be in a voice channel!`);
	try {
		cmd.run(client, message, args);
	} catch (e) {
		console.error(e);
		message.reply(`Error: ${e}`);
	}
};

const onDistube = (client) => {
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
						(song) =>
							`**${++i}**. ${song.name} - \`${song.formattedDuration}\``,
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
};

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

module.exports = {
	musicBot,
	onDistube,
};

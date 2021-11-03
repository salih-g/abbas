const { PREFIX } = require('../../config.js');

const musicBot = (message, client) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(PREFIX)) return;
	const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
	const command = args.shift();

	if (command === 'play') client.distube.play(message, args.join(' '));

	if (['repeat', 'loop'].includes(command)) {
		const mode = client.distube.setRepeatMode(message);
		message.channel.send(
			`Set repeat mode to \`${
				mode ? (mode === 2 ? 'All Queue' : 'This Song') : 'Off'
			}\``,
		);
	}

	if (command === 'stop') {
		client.distube.stop(message);
		message.channel.send('Stopped the music!');
	}

	if (command === 'resume') client.distube.resume(message);

	if (command === 'pause') client.distube.pause(message);

	if (command === 'skip') client.distube.skip(message);

	if (command === 'queue') {
		const queue = client.distube.getQueue(message);
		if (!queue) {
			message.channel.send('Nothing playing right now!');
		} else {
			message.channel.send(
				`Current queue:\n${queue.songs
					.map(
						(song, id) =>
							`**${id ? id : 'Playing'}**. ${song.name} - \`${
								song.formattedDuration
							}\``,
					)
					.slice(0, 10)
					.join('\n')}`,
			);
		}
	}

	if (
		[`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(
			command,
		)
	) {
		const filter = client.distube.setFilter(message, command);
		message.channel.send(`Current queue filter: ${filter.join(', ') || 'Off'}`);
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

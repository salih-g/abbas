const { PREFIX } = require('../../config.js');

module.exports = (message, client) => {
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

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`I'm ready to go ${client.user.tag} 🤖!`);
	},
};

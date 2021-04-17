const Guild = require("../../db/guild");

module.exports = {
	name: "remove",
	alias: ["rm"],
	description: "Removes a certain entry from the queue.",
	args: true,
	usage: "<song_index 1-n>",
	guildOnly: true,
	async execute(message, args) {
		const { client: { distube, getCmd }, guild } = message;
		const gdb = await Guild(guild.id);
		const songs = distube.getQueue(message)?.songs;
		if (!songs)
			return message.reply(`:x: **I am not connected to a voice channel. Type** \`${gdb.get().prefix}join\` **to get me in one**`);
		if (songs.length === 0)
			return message.reply(":x: No songs in queue");
		const index = parseInt(args[0]);
		if (!index || index <= 0 || index >= songs.length) {
			getCmd("queue").execute(message);
			return message.reply(":x: Please enter a number from the queue index");
		}
		if (index === 0)
			return message.reply(":x: Cannot remove the currently playing song");
		const song = songs.splice(index, 1)[0];
		message.reply(`**Removed** \`${song.name}\``);
	}
};
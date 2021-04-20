const Guild = require("../../db/guild");

module.exports = {
	name: "disconnect",
	alias: ["dc", "leave", "dis", "fuckoff", "stop"],
	description: "Disconnects the bot from the voice channel it is in.",
	guildOnly: true,
	async execute(message) {
		const { client: { distube }, guild } = message;
		const gdb = await Guild(guild.id);
		if (!distube.getQueue(message))
			return message.reply(`:x: **I am not playing music. Use** \`${gdb.get().prefix}play\`** to play some music!**`);
		distube.stop(message);
		message.reply("**Successfully disconnected**");
	}
};
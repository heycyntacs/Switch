const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');
const { makeQueue } = require('../src/queue-system');
const { userNotConntected, botNotConnected } = require('../src/utils/not-connected');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Checks queue'),
	async execute(interaction) {
		const guild = interaction.guild.id;
		const connection = getVoiceConnection(guild);

		if (userNotConntected(interaction)) return;
		if (botNotConnected(interaction, connection)) return;

		makeQueue(interaction, guild);
	},
};
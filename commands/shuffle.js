const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');
const { getSongs } = require('../src/queue-system');
const { editEmbed } = require('../src/utils/embeds');
const { userNotConntected, botNotConnected } = require('../src/utils/not-connected');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffles the queue'),
	async execute(interaction) {
		if (userNotConntected(interaction)) return;

		const guild = interaction.guild.id;
		const connection = getVoiceConnection(guild);

		if (botNotConnected(interaction, connection)) return;

		await interaction.deferReply();

		const queue = getSongs(guild);

		for (let position = queue.length - 1; position > 0; position--) {
			const newPosition = Math.floor(Math.random() * (position + 1));
			const placeholder = queue[position];
			queue[position] = queue[newPosition];
			queue[newPosition] = placeholder;
		}

		console.log(queue);
		const embed = new MessageEmbed();
		editEmbed.shuffle(embed, interaction);
		await interaction.followUp({ embeds: [embed] });
	},
};
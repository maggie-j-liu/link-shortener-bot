import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
const info = {
  data: new SlashCommandBuilder()
    .setName("shorten")
    .setDescription("Sends a shortened url.")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("The URL you would like to shorten.")
        .setRequired(true)
    ),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply(`shorten ${interaction.options.getString("url")}`);
  },
};

export default info;

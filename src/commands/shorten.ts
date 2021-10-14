import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
const info = {
  data: new SlashCommandBuilder()
    .setName("shorten")
    .setDescription("Sends a shortened url."),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply("shorten");
  },
};

export default info;

import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
const info = {
  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Links a url to a particular short link.")
    .setDefaultPermission(false),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply("link");
  },
};

export default info;

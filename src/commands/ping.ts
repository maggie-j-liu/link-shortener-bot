import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
const info = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!")
    .setDefaultPermission(false),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply("pong");
  },
};

export default info;

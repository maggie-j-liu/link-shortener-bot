import prisma from "../prisma";
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
    const url = interaction.options.getString("url");
    if (!url) {
      await interaction.reply("Must include a url.");
      return;
    }
    const route = await prisma.addRandomLink(url);
    await interaction.reply(`linked ${url} to /${route}`);
  },
};

export default info;

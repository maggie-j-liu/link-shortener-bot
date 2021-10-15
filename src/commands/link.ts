import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { SITE_URL } from "../lib/config";
import prisma from "../lib/prisma";

const info = {
  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Links a url to a particular short link.")
    .setDefaultPermission(false)
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("The long URL you would like to link.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("route")
        .setDescription("The route of the short URL you want to use.")
        .setRequired(true)
    ),
  execute: async (interaction: CommandInteraction) => {
    const route = interaction.options.getString("route");
    const url = interaction.options.getString("url");
    if (!route || !url) {
      await interaction.reply({
        content: "Must include route and url",
        ephemeral: true,
      });
      return;
    }
    await prisma.addLink(route, url);
    await interaction.reply(`linked ${url} to ${SITE_URL}/${route}`);
  },
};

export default info;

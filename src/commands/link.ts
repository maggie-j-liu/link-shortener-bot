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
    let route = interaction.options.getString("route");
    const url = interaction.options.getString("url");
    if (!route || !url) {
      await interaction.reply({
        content: "Must include route and url",
        ephemeral: true,
      });
      return;
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      await interaction.reply({
        content: "Please include the url scheme, for example, https://",
        ephemeral: true,
      });
      return;
    }
    if (route.startsWith("/")) {
      route = route.substring(1);
    }
    if (route.includes("/")) {
      await interaction.reply({
        content: "The route cannot include `/`.",
        ephemeral: true,
      });
      return;
    }
    await prisma.addLink(route, url, interaction.user.id);
    await interaction.reply(
      `linked ${url} to ${SITE_URL}/${encodeURIComponent(route)}`
    );
  },
};

export default info;

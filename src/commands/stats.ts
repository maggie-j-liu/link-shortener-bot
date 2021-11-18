import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { SITE_URL } from "../lib/config";
import getStats from "../lib/prisma/getStats";

const info = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Gets stats about a link.")
    .setDefaultPermission(false)
    .addStringOption((option) =>
      option
        .setName("route")
        .setDescription("The route of the URL to get stats for.")
        .setRequired(true)
    ),
  execute: async (interaction: CommandInteraction) => {
    let route = interaction.options.getString("route");
    if (!route) {
      await interaction.reply({
        content: "Must include route.",
        ephemeral: true,
      });
      return;
    }
    if (route.startsWith("/")) {
      route = route.substring(1);
    }
    const stats = await getStats(route);
    if (!stats) {
      await interaction.reply(`The route /${route} is not linked to anything.`);
    } else {
      await interaction.reply(
        `The link <${SITE_URL}/${route}> has ${stats.clicks} clicks.`
      );
    }
  },
};

export default info;

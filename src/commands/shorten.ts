import addRandomLink from "../lib/prisma/addRandomLink";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { SITE_URL } from "../lib/config";

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
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      await interaction.reply({
        content: "Please include the url scheme, for example, https://",
        ephemeral: true,
      });
      return;
    }
    const route = await addRandomLink(url, interaction.user.id);
    await interaction.reply(`linked ${url} to ${SITE_URL}/${route}`);
  },
};

export default info;

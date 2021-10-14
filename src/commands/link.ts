import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
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
    await interaction.reply(
      `link ${interaction.options.getString(
        "url"
      )} to ${interaction.options.getString("route")}`
    );
  },
};

export default info;

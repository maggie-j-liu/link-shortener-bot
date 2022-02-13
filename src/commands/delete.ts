import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember } from "discord.js";
import { SITE_URL } from "../lib/config";
import deleteLink from "../lib/prisma/deleteLink";
import dotenv from "dotenv";

dotenv.config();
const info = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Deletes a short link.")
    .addStringOption((option) =>
      option
        .setName("route")
        .setDescription("The route or short URL you would like to delete.")
        .setRequired(true)
    ),
  execute: async (interaction: CommandInteraction) => {
    let route = interaction.options.getString("route");
    if (!route) {
      await interaction.reply({
        content: "Must include route and url",
        ephemeral: true,
      });
      return;
    }
    let id = route;
    if (route.startsWith(SITE_URL)) {
      id = route.replace(SITE_URL, "");
    }
    let isAdmin = (interaction.member as GuildMember).roles.cache.some(
      (role) => role.id === process.env.LINK_ADMIN_ROLE_ID
    );
    const res = await deleteLink(id, interaction.user.id, isAdmin);
    if (res.error) {
      if (res.error === "not found") {
        await interaction.reply(`The link ${SITE_URL}/${id} doesn't exist.`);
      } else if (res.error === "not authorized") {
        await interaction.reply(`You are not authorized to delete this link.`);
      } else {
        await interaction.reply(res.error);
      }
    } else {
      await interaction.reply(`Successfully deleted ${SITE_URL}/${id}.`);
    }
  },
};

export default info;

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const clientId = process.env.CLIENT_ID as string;
const guildId = process.env.GUILD_ID as string;
const linkAdminRoleId = process.env.LINK_ADMIN_ROLE_ID as string;

const commands: string[] = [];

const commandFiles = fs
  .readdirSync(`${__dirname}/commands`)
  .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`).default;
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(
  process.env.DISCORD_TOKEN as string
);

interface Command {
  id: string;
  application_id: string;
  name: string;
  description: string;
  version: string;
  default_permission: boolean;
  type: number;
  guild_id: string;
}

// type: ROLE = 1, USER = 2
interface Permission {
  id: string;
  type: number;
  permission: boolean;
}
interface FullPermission {
  id: string;
  permissions: Permission[];
}

(async () => {
  const response: Command[] = (await rest.put(
    Routes.applicationGuildCommands(clientId, guildId),
    { body: commands }
  )) as Command[];
  console.log("Successfully registered application commands.");
  // console.log(response);
  const restrictedCommands = response.filter(
    (cmd) => cmd.default_permission === false
  );
  const fullPermissions: FullPermission[] = [];
  for (const command of restrictedCommands) {
    fullPermissions.push({
      id: command.id,
      permissions: [
        {
          id: linkAdminRoleId,
          type: 1,
          permission: true,
        },
      ],
    });
  }
  await rest.put(
    Routes.guildApplicationCommandsPermissions(clientId, guildId),
    { body: fullPermissions }
  );
  console.log("Successfully updated permissions");
})();

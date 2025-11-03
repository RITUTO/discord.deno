# 導入方法<br>

import {Client} from "https://deno.land/x/discordjs_deno@0.20/mod.ts"

# サンプルコード<br>

```js
import {
    ActionRowBuilder,
    ButtonBuilder,
    Client,
    EmbedBuilder,
} from "https://deno.land/x/discordjs_deno@0.18β/mod.ts";

const client = new Client({
    Intents: ["GUILDS", "MESSAGE_CONTENT", "GUILD_MESSAGES"],
});
client.once("ready", async (c) => {
    console.log("botを起動しました");
    const ch = await c.channels.fetch("1289808121732006012");
    if (!ch) return;
    ch.send("botを起動しました");
    const data = [{
        name: "ping",
        description: "Replies with Pong!",
    }];
    await client.application.commands.set(data, "1289808121270894675");
});
client.on("messageCreate", (message) => {
    if (message.content == "test") {
        message.reply("Hello World!");
    }
    if (message.content == "embed") {
        const embed = new EmbedBuilder()
            .setTitle("embed")
            .setDescription("despcription")
            .addField("fild1", "fild", true);
        message.reply({ embeds: [embed] });
    }
    if (message.content == "button") {
        const button = new ButtonBuilder()
            .setCustomId("test")
            .setLabel("test")
            .setStyle("SUCCESS");
        const row = new ActionRowBuilder()
            .addComponent(button);
        message.reply({ components: [row] });
    }
});
client.on("Debug", (string) => {
    console.log(string);
});
client.on("interactionCreate", async (interaction) => {
    if (interaction?.commandName === "ping") {
        await interaction.reply("Pong! " + interaction.user.username);
    }
    if (interaction?.customId === "test") {
        await interaction.reply({
            content: "Buttonが押されました！",
            ephemeral: true,
        });
    }
});
client.login("");
```

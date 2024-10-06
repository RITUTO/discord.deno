# 導入方法<br>
import {Client} from "https://deno.land/x/discordjs_deno@0.16/src/index.ts"
# サンプルコード<br>
```js
import {Client,EmbedBuilder,ButtonBuilder,ActionRowBuilder} from "https://deno.land/x/discordjs_deno@0.1/src/index.ts"
const client = new Client({Intents:["GUILDS","MESSAGE_CONTENT","GUILD_MESSAGES"]})
client.on("ready", () =>{
    console.log("botを起動しました")
})
client.on("messageCreate",(message) =>{
   if (message.content == "test"){
    message.reply("Hello World!")
   }
   if (message.content == "embed"){
    const embed = new EmbedBuilder()
    .setTitle("embed")
    .setDescription("despcription")
    .addField("fild1","fild",true)
    message.reply({embeds:[embed]})
   }
   if (message.content == "button"){
    const button = new ButtonBuilder()
    .setCustomId("test")
    .setLabel("test")
    .setStyle("SUCCESS")
    const row = new ActionRowBuilder()
    .addComponent(button)
    message.reply({components:[row]})
   }
})
client.on("Debug",(string) =>{
    console.log(string)
})
client.login("token")
```

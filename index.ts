import {Client,EmbedBuilder} from "./src/index.ts"
const client = new Client({Intents:["GUILDS","MESSAGE_CONTENT"]})
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
})
client.on("Debug",(string) =>{
    console.log(string)
})
client.login("token")

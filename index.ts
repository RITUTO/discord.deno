import {Client} from "./src/client/client.ts"
const client = new Client()
client.on("ready", () =>{
    console.log("botを起動しました")
})
client.on("messageCreate",(message) =>{
   if (message.content == "test"){
    message.reply("Hello World!")
   }
})
client.login("token")

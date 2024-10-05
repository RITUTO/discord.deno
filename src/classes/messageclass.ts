// deno-lint-ignore-file no-explicit-any
import { member } from "./member.ts";
import { user } from "./user.ts";
import {Client,EmbedBuilder} from "../index.ts"
export class message{
    client:Client
    #clientclass:Client;
    tts:boolean
    autor:user
    content:string;
    member:member
    pinned:boolean
    channel_id:string
    id:string
    mentions:{username:string,member:member}[]
    constructor(messaged:any,clientclass:Client){
        this.client = clientclass
        this.#clientclass = clientclass
        this.tts = messaged.tts;
        this.autor = new user(messaged.author)
        this.content = messaged.content
        this.member = new member(messaged.member)
        this.mentions = messaged.mentions.map((m: { username: any; member: any; }) =>({username:m.username,member:new member(m.member)}))
        this.pinned = messaged.pinned
        this.channel_id = messaged.channel_id
        this.id = messaged.id
    }
    async reply(args: string | { content?: string; embeds?: EmbedBuilder[]|object[];  }){
      const message: any = {};

      if (typeof args === 'string') {
        message.content = args;
        message.tts = false;
      } else {
        message.content = args.content;
        message.tts = false;
          message.message_reference = {
            message_id: this.id
          };
        
    
        if (args.embeds) {
          if ( args.embeds instanceof EmbedBuilder) {
          message.embeds = args.embeds.build()
        }else{
          message.embeds = args.embeds
        }
      }
          await this.#clientclass.request(`channels/${this.channel_id}/messages`, {
            method: "POST",
            body: JSON.stringify(message),
          });
        }
    }

  }
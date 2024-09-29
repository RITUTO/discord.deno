// deno-lint-ignore-file no-explicit-any
import { member } from "./member.ts";
import { user } from "./user.ts";
import { Client } from "../client.ts";
export class message{
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
    async reply(content:string){
        const message: any = {
            content: content,
            tts: false,
          };
            message.message_reference = {
              message_id: this.id,
            };
          await this.#clientclass.request(`channels/${this.channel_id}/messages`, {
            method: "POST",
            body: JSON.stringify(message),
          });
        }
    }


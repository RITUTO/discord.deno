// deno-lint-ignore-file no-explicit-any
import { user } from "./user.ts"
export class Channel {
    id!:number
    type!:number
    guild_id!:number|undefined
    nsfw!:boolean|undefined
    last_message_id!:number|undefined
    icon!:number|undefined
    owner_id!:number|undefined
    application_id!:number|undefined
    message_count!:number|undefined
    permissions!:string|undefined
    users!:string|undefined
    constructor(channelstructure:any,clientclass:any){
        this.clientclass = clientclass
        this.id = channelstructure.id
        this.type = channelstructure.type
        this.guild_id = channelstructure.guild_id
        this.nsfw = channelstructure.nsfw
        this.last_message_id = channelstructure.last_message_id
        this.icon = channelstructure.icon
        this.owner_id = channelstructure.owner_id
        this.application_id = channelstructure.application_id
        this.message_count = channelstructure.message_count
        this.permissions = channelstructure.permissions
        // deno-lint-ignore ban-ts-comment
        //@ts-ignore
        this.users = channelstructure.recipients?.map(m => new user(m))
    }
     async send(args: string | { content?: string; embeds?: EmbedBuilder[] | object[]; components?: ActionRowBuilder | ActionRowBuilder[] | any[] }) {
      const message: any = {};
    
      if (typeof args === 'string') {
        message.content = args;
        message.tts = false;
      } else {
        message.content = args.content;
        message.tts = false;

    

        if (args.embeds) {
          if (args.embeds instanceof EmbedBuilder) {
              message.embeds = [args.embeds.build()];
            } else {
                message.embeds = args.embeds; 
        }
            }
        if (args.components) {
          if (Array.isArray(args.components)) {
            message.components = args.components.map(component => {
              if (component instanceof ActionRowBuilder) {
                return component.build(); 
              } else if (typeof component === 'object') {
                return component;
              }
              return component;
            });
          } else if (args.components instanceof ActionRowBuilder) {
            message.components = [args.components.build()]; 
          } else if (typeof args.components === 'object') {
            message.components = [args.components];
          }
        }

      }
      await this.#clientclass.request(`channels/${this.channel_id}/messages`, {
        method: "POST",
        body: JSON.stringify(message),
      });
    }
    
}

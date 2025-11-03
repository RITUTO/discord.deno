import { user } from "./user.ts";
import { Channel } from "./channel.ts";
import { Client, EmbedBuilder } from "../../mod.ts"
import { ActionRowBuilder } from "../../mod.ts";
export class interaction {
    client:Client
    type!:number
    token!: string
    user!:user
    commandName:string|undefined
    customId:string|undefined
    id!:string
    channel!:Channel|undefined
    // deno-lint-ignore no-explicit-any
    constructor(interactionstructure: any,clientclass:Client){ 
        this.client = clientclass
        this.type = interactionstructure.type
        this.token = interactionstructure.token
        this.user = new user(interactionstructure.member.user)
        this.commandName = interactionstructure.data?.name
        this.customId = interactionstructure.data?.custom_id
        this.id = interactionstructure.id
        this.channel = interactionstructure.channel_id ? new Channel(interactionstructure.channel_id,clientclass) : undefined
    }
    async reply(args: string | {
  content?: string;
  embeds?: EmbedBuilder[] | object[];
  components?: ActionRowBuilder | ActionRowBuilder[] | any[];
  ephemeral?: boolean;
}) {
  const message: any = {
    type: 4, 
    data: {}
  };

  if (typeof args === 'string') {
    message.data.content = args;
  } else {
    if (args.content) message.data.content = args.content;

    if (args.embeds) {
      if (args.embeds instanceof EmbedBuilder) {
        message.data.embeds = [args.embeds.build()];
      } else {
        message.data.embeds = args.embeds;
      }
    }

    if (args.components) {
      if (Array.isArray(args.components)) {
        message.data.components = args.components.map(c => c instanceof ActionRowBuilder ? c.build() : c);
      } else {
        message.data.components = [args.components instanceof ActionRowBuilder ? args.components.build() : args.components];
      }
    }

    if (args.ephemeral) {
      message.data.flags = 64; 
    }
  }

  await this.client.request(`/interactions/${this.id}/${this.token}/callback`, {
    method: "POST",
    body: JSON.stringify(message),
  });
}
  async deleteReply() {
    await this.client.request(`/interactions/${this.id}/${this.token}/messages/@original`, {
     method: "DELETE"
    });

  }
}


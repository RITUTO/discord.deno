// deno-lint-ignore-file no-explicit-any
import { user } from "./user.ts"
export class channel {
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
    constructor(channelstructure:any){
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
    
}
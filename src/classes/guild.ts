// deno-lint-ignore-file no-explicit-any
//import { user } from "./user.ts"
export class guild {
    id!: number
    constructor(guildstructure: any) {
        this.id = guildstructure.id
    }

}
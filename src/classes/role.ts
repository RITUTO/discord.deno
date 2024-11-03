export class role {
    id!: number
    name!: string
    color!: number
    hoist!: boolean
    icon!: string | undefined
    unicode_emoji!: string | undefined
    position!: number
    managed!: boolean
    mentionable!: boolean
    flags!: number
    // deno-lint-ignore no-explicit-any
    constructor(rolestructure: any) {
        this.id = rolestructure.id
        this.name = rolestructure.name
        this.color = rolestructure.color
        this.hoist = rolestructure.hoist
        this.icon = rolestructure.icon
        this.unicode_emoji = rolestructure.unicode_emoji
        this.position = rolestructure.position
        this.managed = rolestructure.managed
        this.mentionable = rolestructure.mentionable
        this.flags = rolestructure.flags;
    }
}
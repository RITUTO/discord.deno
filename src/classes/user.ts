export class user{
    id!: number;
    username!: string;
    discriminator!:string
    global_name!:string|undefined;
    avatar!: string|undefined;
    bot!:boolean|undefined;
    system!:boolean|undefined;
    banner!:string|undefined;
    email!:string|undefined
    // deno-lint-ignore no-explicit-any
    constructor(userstructure:any){
        this.id = userstructure.id;
        this.username = userstructure.username;
        this.discriminator = userstructure.discriminator;
        this.global_name = userstructure.global_name;
        this.avatar = userstructure.avatar;
        this.bot = userstructure.bot;
        this.system = userstructure.system;
        this.banner = userstructure.banner;
        this.email = userstructure.email;
        
    }
}
// deno-lint-ignore-file no-explicit-any
import { user } from "./user.ts";
import { role } from "./role.ts";
export class member{
    user!: user;
    id!: number;
    username!: string;
    avatar!: string|undefined;
    banner!:string|undefined;
    email!:string|undefined
    roles!:role|undefined
    constructor(userstructure:any){
        this.id = userstructure.id;
        this.username = userstructure.username;
        this.avatar = userstructure.avatar;
        this.banner = userstructure.banner;
        this.email = userstructure.email;
        this.roles = undefined//userstructure.roles.map((role: new (arg0: any) => any) => new role(role))
    }
}
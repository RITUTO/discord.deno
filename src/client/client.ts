// deno-lint-ignore-file ban-ts-comment no-explicit-any
const gatewayUrl = "wss://gateway.discord.gg/?v=9&encoding=json";
import { Events } from "../../types/events.d.ts";
import {message} from "./classes/messageclass.ts"
export class Client {
  token!: string;
  #socket!: WebSocket;
  events:{name:any,fn:(arg?:any) =>void}[]=[]
  constructor() {}
  async request(endpoint: string, options: RequestInit) {
    const url = `https://discord.com/api/v10/${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": `Bot ${this.token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.error("Error in API request:", response.statusText);
      throw new Error("Failed to make API request");
    }

    return await response.json();
  }
  login(token: string) {
    this.token = token;
    this.#socket = new WebSocket(gatewayUrl);
    this.#socket.onopen = () => {
      console.log("Connected to Discord Gateway");

      // Discordに認証メッセージを送信
      const identifyMessage = {
        op: 2,
        d: {
          token: this.token,
          intents: 513,  // 513はGUILD_MESSAGESとDIRECT_MESSAGES
          properties: {
            $os: "windows",
            $browser: "deno",
            $device: "deno",
          },
        },
      };
      this.#socket.send(JSON.stringify(identifyMessage));
    };

    this.#socket.onmessage = (event) => {
      const messagedata = JSON.parse(event.data);
      if (messagedata.op === 10) {
        const heartbeatInterval = messagedata.d.heartbeat_interval;
        setInterval(() => {
          this.#socket.send(JSON.stringify({ op: 1, d: null }));
        }, heartbeatInterval);
      }
      if (messagedata.op === 0 && messagedata.t === "MESSAGE_CREATE") {
        this.emit("messageCreate",new message(messagedata.d,this))
      }
      if (messagedata.op === 0 && messagedata.t === "READY"){
        this.emit("ready",undefined)
      }
    };
  }
  on<K extends keyof Events>(eventname: K, fn: (arg: Events[K]) => void){
  //@ts-ignore
  this.events.push({name: eventname, fn});
  }
  emit<K extends keyof Events>(eventName: K, eventData: any){
    this.events.forEach(e =>{
      if (e.name == eventName){
        e.fn(eventData)
      }
    })
  }
  
}

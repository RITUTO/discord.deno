import { Client } from "../mod.ts";
import { message } from "../src/classes/messageclass.ts"
import { interaction } from "../src/classes/interaction.ts";
export interface Events {
  [ready]: Client;
  [messageCreate]: message
  [Debug]: string
  [interactionCreate]: interaction
}
export const ready: "ready";
export const messageCreate: "messageCreate";
export const Debug: "Debug";
export const interactionCreate: "interactionCreate";


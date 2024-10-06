import {message} from "../src/classes/messageclass.ts"
export interface Events {
    [ready]:  void;
    [messageCreate]:message
    [Debug]:string
    [interactionCreate]:void
  }
export const ready: "ready";
export const messageCreate: "messageCreate";
export const Debug: "Debug";
export const interactionCreate: "interactionCreate";


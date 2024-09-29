import {message} from "../src/client/classes/messageclass.ts"
export interface Events {
    [ready]:  void;
    [messageCreate]:message
  }
export const ready: "ready";
export const messageCreate: "messageCreate";

import { Channel } from "../classes/channel.ts"
import { Client } from "../client/client.ts"
import { Routes } from "../util/roots.js";
import { CachedManager } from "./CachedManager.ts";
// deno-lint-ignore ban-ts-comment
//@ts-ignore
export class ChannelManager extends CachedManager {
  client: Client
  constructor(client: Client) {
    super()
    this.client = client
  }
  async fetch(id: string, { force = false } = {}): Promise<Channel | undefined> {
    if (!force) {
      const existing = this.cache.get(id);
      if (existing && !existing.partial) return existing;
    }
    const data = await this.client.request(Routes.channel(id), { method: "GET" });

    return this._add(data);

  }
  // deno-lint-ignore no-explicit-any
  _add(data: any) {

    const channel = new Channel(data, this.client);

    if (!channel) {
      this.client.emit("Debug", `Failed to find guild, or unknown type for channel ${data.id} ${data.type}`);
      return;
    }
    this.set(channel.id, channel);
    return channel;
  }
}

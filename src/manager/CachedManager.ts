import { Channel } from "../classes/channel.ts";
export class CachedManager {
  cache: Map<string | number, Channel>;
  constructor() {
    this.cache = new Map<string | number, Channel>();
  }

  public get(id: string | number): Channel | null {
    return this.cache.get(id) || null;
  }

  public set(id: string | number, data: Channel): Channel {
    this.cache.set(id, data);
    return data;
  }

  public delete(id: string | number): boolean {
    return this.cache.delete(id);
  }



  public clear(): void {
    this.cache.clear();
  }

  // resolveメソッド: キャッシュに無ければfetchする
  public resolve(id: string | number) {
    const cachedItem = this.get(id);
    if (cachedItem) {
      return cachedItem;
    }
  }
}

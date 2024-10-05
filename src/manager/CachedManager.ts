export class CachedManager<T> {
        cache: Map<string | number, T>;
        constructor() {
          this.cache = new Map<string | number, T>();
        }
      
        public get(id: string | number): T | null {
          return this.cache.get(id) || null;
        }
      
        public set(id: string | number, data: T): T {
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
        public resolve(id: string | number)  {
          const cachedItem = this.get(id);
          if (cachedItem) {
            return cachedItem;
          }
        }
      }
      
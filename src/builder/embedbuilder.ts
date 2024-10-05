interface EmbedAuthor {
    name: string;
    url?: string;
    iconURL?: string;
  }
  
  interface EmbedFooter {
    text: string;
    iconURL?: string;
  }
  
  interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
  }
  
 export class EmbedBuilder {
    private title?: string;
    private description?: string;
    private author?: EmbedAuthor;
    private footer?: EmbedFooter;
    private fields: EmbedField[] = [];
  
    public setTitle(title: string): this {
      this.title = title;
      return this;
    }
  
    public setDescription(description: string): this {
      this.description = description;
      return this;
    }
  
    public setAuthor(name: string, iconURL?: string, url?: string): this {
      this.author = { name, iconURL, url };
      return this;
    }
  
    public setFooter(text: string, iconURL?: string): this {
      this.footer = { text, iconURL };
      return this;
    }
  
    public addField(name: string, value: string, inline: boolean = false): this {
      this.fields.push({ name, value, inline });
      return this;
    }
  
    public build(): Record<string, unknown> {
      return {
        title: this.title,
        description: this.description,
        author: this.author,
        footer: this.footer,
        fields: this.fields,
      };
    }
  }
  
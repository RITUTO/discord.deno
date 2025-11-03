// deno-lint-ignore-file ban-ts-comment
type ButtonStyle =
  | 'PRIMARY'
  | 'SECONDARY'
  | 'SUCCESS'
  | 'DANGER'
  | 'LINK';

interface ButtonData {
  type: 2;
  label?: string;
  style?: ButtonStyle;
  custom_id?: string;
  url?: string; 
}
const stylenumber = {
    'PRIMARY':1,
    'SECONDARY':2,
    'SUCCESS':3,
    'DANGER':4,
    'LINK':5,
    "Premium":6
}
export class ButtonBuilder {
  private data: Record<string, any> = {};

  constructor() {
  }

  public setStyle(style:ButtonStyle): this {
    //@ts-ignore
    this.data.style = stylenumber[style];
    return this;
  }

  public setLabel(label:string): this {
    this.data.label = label;
    return this;

  }

  public setCustomId(id: string): this {
    this.data.custom_id = id;
    return this;
  }

  public setUrl(url: string): this {
    this.data.url = url;
    return this;
  }

  public build(): ButtonData {
    return {
      type: 2,
      label: this.data.label,
      style: this.data.style,
      custom_id: this.data.custom_id,
      url: this.data.style === 'LINK' ? this.data.url : undefined, // LINKスタイルの場合のみURLを含める
    };
  }

  public toJSON() {
    return { type: 2, ...this.data }; // type 2 = BUTTON in Discord API
  }
}
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
  private label?: string 
  private style?: ButtonStyle 
  private customId?: string;
  private url?: string;
  constructor() {
  }
  public setStyle(style:ButtonStyle): this {
    //@ts-ignore
    this.style = stylenumber[style];
    return this;
  }
  public setLabel(label:string): this {
    this.label = label;
    return this;

  }
  public setCustomId(id: string): this {
    this.customId = id;
    return this;
  }

  public setUrl(url: string): this {
    this.url = url;
    return this;
  }

  public build(): ButtonData {
    return {
      type: 2,
      label: this.label,
      style: this.style,
      custom_id: this.customId,
      url: this.style === 'LINK' ? this.url : undefined, // LINKスタイルの場合のみURLを含める
    };
  }
}
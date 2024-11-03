// deno-lint-ignore-file no-explicit-any

// ボタンのスタイルを定義
type ButtonStyle =
  | 'PRIMARY'
  | 'SECONDARY'
  | 'SUCCESS'
  | 'DANGER'
  | 'LINK';

// ボタンデータのインターフェース
interface ButtonData {
  type: 2;
  label: string;
  style: ButtonStyle;
  customId?: string;
  url?: string; // LINKスタイルのボタンにのみ使用
}


// アクション行データのインターフェース
interface ActionRowData {
  type: 1;
  components: (ButtonData | any)[];
}
import { ButtonBuilder } from "../../mod.ts";
// アクション行ビルダー
export class ActionRowBuilder {
  private components: (ButtonData | any)[] = [];

  // ButtonBuilder インスタンスも受け入れるように修正
  public addComponent(component: ButtonData | ButtonBuilder): this {
    if (component instanceof ButtonBuilder) {
      this.components.push(component.build());
    }
    return this;
  }

  public build(): ActionRowData {
    return {
      type: 1,
      components: this.components,
    };
  }
}

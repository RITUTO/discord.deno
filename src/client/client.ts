// deno-lint-ignore-file ban-ts-comment
const gatewayUrl = "wss://gateway.discord.gg/?v=9&encoding=json";

export class Client {
  token!: string;
  #socket!:typeof WebSocket
  constructor() {}

  // Discord APIへのリクエストメソッド（サンプル）
  async request(endpoint: string, options: RequestInit) {
    const url = `https://discord.com/api/v10/${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": `Bot ${this.token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.error("Error in API request:", response.statusText);
      throw new Error("Failed to make API request");
    }

    return await response.json();
  }
  login(token: string) {
    this.token = token;
    const socket = new WebSocket(gatewayUrl);

    socket.onopen = () => {
      console.log("Connected to Discord Gateway");

      // Discordに認証メッセージを送信
      const identifyMessage = {
        op: 2,
        d: {
          token: this.token,
          intents: 513,  // 513はGUILD_MESSAGESとDIRECT_MESSAGES
          properties: {
            $os: "windows",
            $browser: "deno",
            $device: "deno",
          },
        },
      };
      socket.send(JSON.stringify(identifyMessage));
      //@ts-ignore
      this.socket = socket
    };

    // メッセージ受信時の処理
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // ハートビートのタイミングが来たら、心拍メッセージを送信
      if (message.op === 10) {
        const heartbeatInterval = message.d.heartbeat_interval;
        setInterval(() => {
          socket.send(JSON.stringify({ op: 1, d: null }));
        }, heartbeatInterval);
      }

      // メッセージイベント処理（例: "MESSAGE_CREATE" イベント）
      if (message.op === 0 && message.t === "MESSAGE_CREATE") {
        const content = message.d.content;
        if (content === "ping") {
          this.sendMessage(message.d.channel_id, "pong!");
        }
      }
    };

  }
  async sendMessage(channelId: string, content: string) {
    const message = {
      content: content,
      tts: false,
    };
    await this.request(`channels/${channelId}/messages`, {
      method: "POST",
      body: JSON.stringify(message),
    });
  }
}

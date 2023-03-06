# SignalR-Nextjs-chat

🐔🐔🐔 SignalR(C#)とNext.js(React)を使ったチャットアプリ。  

## 実行方法

```shell
docker build -t signalr-nextjs-chat .
docker run -itd -p 8000:8000 my-signalr-nextjs-chat signalr-nextjs-chat
```

## 開発環境の構築

### クライアント

```shell
yarn --pwd ./client install
yarn --pwd ./client dev
```

### サーバ

```shell
dotnet run --project ./server
```

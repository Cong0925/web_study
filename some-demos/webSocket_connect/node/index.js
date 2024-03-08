const WebSocket = require('ws');
const PORT = 8080;
const URL = 'ws://127.0.0.1:8080';
const wss = new WebSocket.Server({ port: PORT });
const clients = new Map();


wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    if (typeof data !== 'string') {
      
      let targetUser = data.toUser

      // 如果客户端之前没有存储在 clients Map 中，则存储客户端连接
      if (!clients.has(data.user)) {
        clients.set(data.user, ws);
      }
      console.log(clients.keys())

      // 将格式化后的消息发送给客户端
      const formattedMessage = `${data.user}:  - ${data.time}<br>${data.message}`;

      if (clients.has(targetUser)) {
        ws.send(formattedMessage);
        const clientSocket = clients.get(targetUser);

        // 检查连接是否已经打开
        if (clientSocket.readyState === WebSocket.OPEN) {
          // 发送消息给目标用户
          clientSocket.send(formattedMessage);
        } else {
          clientSocket.send(`连接到用户 ${targetUser} 的WebSocket已关闭。`);
        }
      } else {
        ws.send(`用户 ${targetUser} 不在线或未连接到WebSocket服务器。`);
      }
      console.log('Received:', formattedMessage);
    }


  });

  // 当完成后释放连接回连接池
  // webSocketPool.releaseConnection(connection);
});

console.log('WebSocket server is running on port 8080');
console.log(`WebSocket 服务器正在监听 127.0.0.1:${PORT}`);

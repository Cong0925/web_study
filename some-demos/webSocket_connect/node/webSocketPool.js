class WebSocketPool {
  /**
   * 构造函数
   * @param {WebSocket} WebSocketClass WebSocket 类
   * @param {string} URL WebSocket 服务的 URL
   * @param {number} maxConnections 最大连接数
   */
  constructor(WebSocketClass, URL, maxConnections) {
    // 初始化 connections 数组，用于存储连接信息
    this.connections = [];
    // 连接池最大连接数
    this.maxConnections = maxConnections || 10;
    this.WebSocketClass = WebSocketClass;
    this.URL = URL;
  }

  /**
   * 获取连接
   */
  getConnection() {
    // 如果连接池中有可用的连接，则直接返回第一个连接
    if (this.connections.length > 0) {
      // 移除并返回连接池中的第一个连接
      return this.connections.shift();
    }

    // 如果连接池中没有可用的连接，则创建一个新的连接并添加事件处理
    const connection = new this.WebSocketClass(this.URL);

    connection.onopen = () => {
      console.log('WebSocket 连接已打开');
    };

    connection.onerror = (error) => {
      console.error('WebSocket 错误:', error);
    };

    connection.onclose = () => {
      console.log('WebSocket 连接已关闭');
      // 当连接关闭时从连接池中移除连接
      const index = this.connections.indexOf(connection);
      if (index !== -1) {
        this.connections.splice(index, 1);
      }
    };

    return connection;
  }

  /**
   * 释放连接，将连接放回连接池中
   * @param {WebSocket} connection 连接对象
   */
  releaseConnection(connection) {
    // 先关闭连接
    connection.close();

    // 释放连接，将连接放回连接池中
    this.connections.push(connection);
  }

  /**
   * 初始化连接池，创建指定数量的 WebSocket 连接
   */
  init() {
    // 创建连接池中连接数量为 maxConnections 的连接
    for (let i = 0; i < this.maxConnections; i++) {
      this.connections.push(this.createConnection());
    }
  }

  /**
   * 创建连接并添加事件处理程序
   * @returns {WebSocket} WebSocket 连接对象
   */
  createConnection() {
    const connection = new this.WebSocketClass(this.URL);

    connection.onopen = () => {
      console.log('WebSocket 连接已打开');
    };

    connection.onerror = (error) => {
      console.error('WebSocket 错误:', error);
    };

    connection.onclose = () => {
      console.log('WebSocket 连接已关闭');
      // 当连接关闭时从连接池中移除连接
      const index = this.connections.indexOf(connection);
      if (index !== -1) {
        this.connections.splice(index, 1);
      }
    };

    return connection;
  }
}

// 将 WebSocketPool 导出
module.exports = WebSocketPool;

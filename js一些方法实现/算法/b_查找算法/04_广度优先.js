class Graph {
  /**
   * 构造函数
   */
  constructor() {
    // 创建一个空的Map对象，用于存储邻接表
    this.adjList = new Map();
  }

  /**
   * 添加一个顶点
   *
   * @param vertex 要添加的顶点
   */
  addVertex(vertex) {
    // 判断顶点是否已经存在于邻接表中
    if (!this.adjList.has(vertex)) {
      // 如果不存在，则在邻接表中添加该顶点，并将其对应的值初始化为空数组
      this.adjList.set(vertex, []);
    }
  }

  /**
   * 添加边
   *
   * @param vertex 顶点
   * @param neighbor 邻接点
   */
  addEdge(vertex, neighbor) {
    // 将邻居节点添加到当前节点的邻接表中
    this.adjList.get(vertex).push(neighbor);
    // 由于是无向图，所以需要将当前节点也添加到邻居节点的邻接表中
    this.adjList.get(neighbor).push(vertex); // 无向图需要加上这一行
  }

  /**
   * 广度优先搜索算法
   *
   * @param start 起始节点
   * @returns 返回从起始节点开始的广度优先搜索遍历结果
   */
  bfs(start) {
    // 创建一个队列，将起始节点放入队列中
    const queue = [start];
    // 创建一个空对象用于记录已访问的节点
    const visited = {};
    // 创建一个空数组用于存储结果
    const result = [];

    // 将起始节点标记为已访问
    visited[start] = true;

    // 当队列不为空时，循环执行以下操作
    while (queue.length) {
      // 从队列中取出第一个节点
      const vertex = queue.shift();
      // 将该节点加入结果数组中
      result.push(vertex);

      // 获取该节点的邻居节点
      const neighbors = this.adjList.get(vertex);

      // 遍历邻居节点
      for (const neighbor of neighbors) {
        // 如果该邻居节点未被访问过
        if (!visited[neighbor]) {
          // 将其标记为已访问
          visited[neighbor] = true;
          // 将该邻居节点加入队列中
          queue.push(neighbor);
        }
      }
    }

    // 返回结果数组
    return result;
  }
}

// 创建一个新的图对象
const graph = new Graph();


graph.addVertex('A'); // 向图中添加节点 'A'
graph.addVertex('B');// 向图中添加节点 'B'
graph.addVertex('C');// 向图中添加节点 'C'
graph.addVertex('D');// 向图中添加节点 'D'
graph.addVertex('E');// 向图中添加节点 'E'


graph.addEdge('A', 'B');// 在节点 'A' 和 'B' 之间添加一条边
graph.addEdge('A', 'C');// 在节点 'A' 和 'C' 之间添加一条边
graph.addEdge('B', 'D');// 在节点 'B' 和 'D' 之间添加一条边
graph.addEdge('C', 'E');// 在节点 'C' 和 'E' 之间添加一条边

// 调用广度优先搜索方法，从节点 'A' 开始遍历图，并打印结果
console.log('BFS:', graph.bfs('A'));

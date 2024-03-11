class Graph {
  /**
   * 构造函数
   */
  constructor() {
    // 创建一个空的无向图
    this.adjList = new Map();
  }

  /**
   * 向邻接表中添加顶点
   *
   * @param vertex 要添加的顶点
   */
  addVertex(vertex) {
    // 判断顶点是否已经存在于邻接表中
    if (!this.adjList.has(vertex)) {
      // 如果不存在，则在邻接表中添加该顶点，并设置其对应的邻接节点列表为空数组
      this.adjList.set(vertex, []);
    }
  }

  /**
   * 添加一条边到无向图中
   *
   * @param vertex 顶点
   * @param neighbor 邻居顶点
   */
  addEdge(vertex, neighbor) {
    // 向顶点的邻接表中添加邻居顶点
    this.adjList.get(vertex).push(neighbor);
    // 无向图需要加上这一行，将邻居顶点也添加到当前顶点的邻接表中
    this.adjList.get(neighbor).push(vertex); // 无向图需要加上这一行
  }

  /**
   * DFS辅助函数，用于遍历从指定节点开始的所有可达节点
   *
   * @param vertex 当前遍历的节点
   * @param visited 记录节点是否被访问过的数组
   * @param result 存储遍历结果的数组
   */
  dfsHelper(vertex, visited, result) {
    // 将当前顶点标记为已访问
    visited[vertex] = true;
    // 将当前顶点加入结果列表
    result.push(vertex);
    // 获取当前顶点的邻接表
    const neighbors = this.adjList.get(vertex);
    // 遍历邻接表中的每个邻居顶点
    for (const neighbor of neighbors) {
      // 如果邻居顶点未被访问过
      if (!visited[neighbor]) {
        // 递归调用dfsHelper函数，继续遍历邻居顶点的邻接表
        this.dfsHelper(neighbor, visited, result);
      }
    }
  }

  /**
   * 深度优先搜索算法
   *
   * @param start 开始节点
   * @returns 返回从start开始的所有路径
   */
  dfs(start) {
    // 创建一个空对象用于记录访问过的节点
    const visited = {};
    // 创建一个空数组用于存储结果
    const result = [];
    // 调用深度优先搜索辅助函数
    this.dfsHelper(start, visited, result);
    // 返回结果
    return result;
  }
}

// 创建一个新的图对象
const graph = new Graph();

graph.addVertex('A');// 向图中添加顶点 'A'
graph.addVertex('B');// 向图中添加顶点 'B'
graph.addVertex('C');// 向图中添加顶点 'C'
graph.addVertex('D');// 向图中添加顶点 'D'
graph.addVertex('E');// 向图中添加顶点 'E'


graph.addEdge('A', 'B');// 在顶点 'A' 和 'B' 之间添加一条边
graph.addEdge('A', 'C');// 在顶点 'A' 和 'C' 之间添加一条边
graph.addEdge('B', 'D');// 在顶点 'B' 和 'D' 之间添加一条边
graph.addEdge('C', 'E');// 在顶点 'C' 和 'E' 之间添加一条边

// 使用深度优先搜索算法从顶点 'A' 开始遍历图，并打印出遍历的结果
console.log('DFS:', graph.dfs('A'));

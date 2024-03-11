class PriorityQueue {
  /**
   * 优先队列构造函数
   */
  constructor() {
    // 初始化队列为空数组
    this.queue = [];
  }

  /**
   * 将顶点及其权重添加到优先队列
   * @param {string} vertex - 顶点
   * @param {number} weight - 权重
   */
  enqueue(vertex, weight) {
    this.queue.push({ vertex, weight });
    this.sort();
  }

  /**
   * 从优先队列中删除并返回顶点及其权重
   * @returns {Object} - 包含顶点及其权重的对象
   */
  dequeue() {
    return this.queue.shift();
  }

  /**
   * 对队列进行排序
   */
  sort() {
    this.queue.sort((a, b) => a.weight - b.weight);
  }

  /**
   * 检查队列是否为空
   * @returns {boolean} - 如果队列为空则返回true，否则返回false
   */
  isEmpty() {
    return this.queue.length === 0;
  }
}

/**
 * 使用Prim算法查找最小生成树
 * @param {Object} graph - 表示图的邻接表
 * @returns {Array} - 包含最小生成树的边的数组
 */
function prim(graph) {
  const visited = {};
  const mst = [];
  const startVertex = Object.keys(graph)[0];
  const priorityQueue = new PriorityQueue();

  visited[startVertex] = true;

  // 将起始顶点的所有相邻顶点及权重添加到优先队列
  for (const neighbor in graph[startVertex]) {
    const weight = graph[startVertex][neighbor];
    priorityQueue.enqueue(neighbor, weight);
  }

  // 遍历优先队列，直到队列为空
  while (!priorityQueue.isEmpty()) {
    const { vertex, weight } = priorityQueue.dequeue();
    if (!visited[vertex]) {
      visited[vertex] = true;
      // 将顶点、权重和起始顶点添加到最小生成树中
      mst.push({ from: startVertex, to: vertex, weight });
      // 将顶点的所有未访问相邻顶点及其权重添加到优先队列
      for (const neighbor in graph[vertex]) {
        if (!visited[neighbor]) {
          const weight = graph[vertex][neighbor];
          priorityQueue.enqueue(neighbor, weight);
        }
      }
    }
  }

  return mst;
}

// 示例图
const graph = {
  A: { B: 2, D: 3 },
  B: { A: 2, C: 1, D: 1 },
  C: { B: 1, D: 4, E: 5 },
  D: { A: 3, B: 1, C: 4, E: 1 },
  E: { C: 5, D: 1 }
};

const minimumSpanningTree = prim(graph);
console.log(minimumSpanningTree);

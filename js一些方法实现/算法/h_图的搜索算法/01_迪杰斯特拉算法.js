/**
 * 使用Dijkstra算法计算图中从起点到所有其他顶点的最短路径
 *
 * @param graph 图对象，以顶点为键，以相邻顶点及其权重为值的对象
 * @param start 起点顶点
 * @returns 返回一个对象，表示从起点到所有其他顶点的最短路径
 */
function dijkstra(graph, start) {
  // 存储每个顶点到起始顶点的最短距离
  const distances = {};
  // 标记每个顶点是否已被访问
  const visited = {};
  // 使用优先队列，用于存放待访问的顶点及对应的距离
  const queue = new PriorityQueue();

  // 初始化每个顶点到起始顶点的距离
  for (let vertex in graph) {
    if (vertex === start) {
      distances[vertex] = 0;
      // 将起始顶点加入优先队列，距离为0
      queue.enqueue(vertex, 0);
    } else {
      distances[vertex] = Infinity;
      // 将其他顶点加入优先队列，距离设为无穷大
      queue.enqueue(vertex, Infinity);
    }
  }

  // 当优先队列不为空时，持续执行循环
  while (!queue.isEmpty()) {
    // 取出距离最短的顶点作为当前顶点
    const currentVertex = queue.dequeue().data;
    // 标记当前顶点为已访问
    visited[currentVertex] = true;
    // 获取当前顶点的邻居顶点
    const neighbors = graph[currentVertex];
    // 遍历邻居顶点
    for (let neighbor in neighbors) {
      // 计算从当前顶点到邻居顶点的距离
      const distance = distances[currentVertex] + neighbors[neighbor];
      // 如果计算出的距离小于邻居顶点当前的距离，则更新邻居顶点的距离
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        // 将邻居顶点加入优先队列，距离为计算出的距离
        queue.enqueue(neighbor, distance);
      }
    }
  }

  // 返回每个顶点到起始顶点的最短距离
  return distances;
}

// 示例图
const graph = {
  A: { B: 2, C: 4 },
  B: { D: 3 },
  C: { D: 1 },
  D: {}
};

console.log(dijkstra(graph, 'A')); // 输出：{ A: 0, B: 2, C: 4, D: 5 }

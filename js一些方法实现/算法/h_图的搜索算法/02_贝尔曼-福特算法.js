/**
 * Bellman-Ford 算法实现
 *
 * @param graph 图，用邻接表表示
 * @param start 起始节点
 * @returns 返回包含最短距离和前驱节点的对象，如果图中存在负权环则返回 "Graph contains a negative-weight cycle"
 */
function bellmanFord(graph, start) {
  const distances = {};
  const predecessors = {};
  const vertices = Object.keys(graph);

  // 初始化距离和前驱节点
  for (let vertex of vertices) {
    distances[vertex] = Infinity;
    predecessors[vertex] = null;
  }
  distances[start] = 0;

  // 迭代 |V| - 1 次
  for (let i = 0; i < vertices.length - 1; i++) {
    for (let u of vertices) {
      for (let v in graph[u]) {
        const weight = graph[u][v];
        // 更新距离和前驱节点
        if (distances[u] + weight < distances[v]) {
          distances[v] = distances[u] + weight;
          predecessors[v] = u;
        }
      }
    }
  }

  // 检测负权环
  for (let u of vertices) {
    for (let v in graph[u]) {
      const weight = graph[u][v];
      // 如果存在负权环，则返回错误信息
      if (distances[u] + weight < distances[v]) {
        return "Graph contains a negative-weight cycle";
      }
    }
  }

  // 返回距离和前驱节点
  return { distances, predecessors };
}

// 示例图
const graph = {
  A: { B: -1, C: 4 },
  B: { C: 3, D: 2, E: 2 },
  C: {},
  D: { B: 1, C: 5 },
  E: { D: -3 }
};

console.log(bellmanFord(graph, 'A'));

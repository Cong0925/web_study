/**
 * Floyd-Warshall 算法求最短路径
 *
 * @param graph 图，用邻接矩阵表示
 * @returns 返回从任意两点之间的最短路径的矩阵
 */
function floydWarshall(graph) {
  // 获取所有顶点的集合
  const vertices = Object.keys(graph);
  // 初始化距离矩阵
  const distances = {};

  // 初始化距离矩阵
  for (let u of vertices) {
    distances[u] = {};
    for (let v of vertices) {
      // 如果两个顶点相同，距离为0，否则为图中边的权重（若不存在边则为无穷大）
      distances[u][v] = (u === v) ? 0 : (graph[u][v] || Infinity);
    }
  }

  // 动态规划求解最短路径
  for (let k of vertices) {
    for (let i of vertices) {
      for (let j of vertices) {
        // 如果通过顶点k的路径更短，则更新距离
        if (distances[i][k] + distances[k][j] < distances[i][j]) {
          distances[i][j] = distances[i][k] + distances[k][j];
        }
      }
    }
  }

  // 返回最短路径矩阵
  return distances;
}

// 示例图
const graph = {
  A: { B: 3, C: 8, E: -4 },
  B: { D: 1, E: 7 },
  C: { B: 4 },
  D: { A: 2, C: -5 },
  E: { D: 6 }
};

console.log(floydWarshall(graph));

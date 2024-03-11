class DisjointSet {
  /**
   * 创建一个新的并查集
   * @param {number} n - 初始大小
   */
  constructor(n) {
    this.parent = new Array(n).fill(-1);
  }

  /**
   * 查找元素所属的集合
   * @param {number} x - 要查找的元素
   * @returns {number} - 元素所属的集合的根节点
   */
  find(x) {
    if (this.parent[x] < 0) return x;
    return this.parent[x] = this.find(this.parent[x]);
  }

  /**
   * 合并两个集合
   * @param {number} x - 第一个元素
   * @param {number} y - 第二个元素
   * @returns {boolean} - 如果两个元素属于不同的集合，则返回true；否则返回false
   */
  union(x, y) {
    // 查找节点x的根节点
    const rootX = this.find(x);
    // 查找节点y的根节点
    const rootY = this.find(y);

    // 如果两个节点不是同一个根节点
    if (rootX !== rootY) {
      // 如果节点x的根节点的父节点小于节点y的根节点的父节点
      if (this.parent[rootX] < this.parent[rootY]) {
        // 将节点x的根节点的父节点值加上节点y的根节点的父节点值
        this.parent[rootX] += this.parent[rootY];
        // 将节点y的根节点的父节点设置为节点x的根节点
        this.parent[rootY] = rootX;
        // 如果节点y的根节点的父节点小于等于节点x的根节点的父节点
      } else {
        // 将节点y的根节点的父节点值加上节点x的根节点的父节点值
        this.parent[rootY] += this.parent[rootX];
        // 将节点x的根节点的父节点设置为节点y的根节点
        this.parent[rootX] = rootY;
      }
      // 返回true，表示合并成功
      return true;
    }
    // 如果两个节点是同一个根节点，表示已经在同一个集合中，不需要合并
    return false;
  }
}

/**
* 使用Kruskal算法查找最小生成树
* @param {Object} graph - 表示图的邻接表
* @returns {Array} - 包含最小生成树的边的数组
*/
function kruskal(graph) {
  // 存储边的数组
  const edges = [];
  // 存储顶点的数组
  const vertices = Object.keys(graph);
  // 创建一个并查集
  const disjointSet = new DisjointSet(vertices.length);
  // 存储最小生成树的边
  const mst = [];

  // 遍历图中的所有边，并将它们添加到边数组中
  // 将所有边添加到边数组中
  for (const from in graph) {
    for (const to in graph[from]) {
      edges.push({ from, to, weight: graph[from][to] });
    }
  }

  // 对边数组进行排序，按照边的权重从小到大排序
  // 根据权重对边数组进行排序
  edges.sort((a, b) => a.weight - b.weight);

  // 遍历排序后的边数组，依次加入最小生成树中
  for (const edge of edges) {
    const { from, to, weight } = edge;
    // 如果两个顶点不在同一个集合中，则加入最小生成树，并合并两个集合
    if (disjointSet.union(vertices.indexOf(from), vertices.indexOf(to))) {
      mst.push(edge);
    }
  }

  // 返回最小生成树
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

const minimumSpanningTree = kruskal(graph);
console.log(minimumSpanningTree);

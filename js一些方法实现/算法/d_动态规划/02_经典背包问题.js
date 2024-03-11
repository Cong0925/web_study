/**
 * 01背包问题
 *
 * @param weights 物品重量数组
 * @param values 物品价值数组
 * @param W 背包容量
 * @returns 返回最大价值
 */
function knapsack(weights, values, W) {
  const n = weights.length;

  // 创建一个二维数组dp，用于存储中间结果
  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  // 遍历每个物品
  for (let i = 1; i <= n; i++) {
    // 遍历每个背包容量
    for (let j = 1; j <= W; j++) {
      // 如果当前物品的重量小于等于当前背包容量
      if (weights[i - 1] <= j) {
        // 更新dp[i][j]的值为当前背包容量下，选择当前物品和不选择当前物品中的较大值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i - 1]] + values[i - 1]);
      } else {
        // 如果当前物品的重量大于当前背包容量，则无法选择当前物品，dp[i][j]的值与dp[i-1][j]相同
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  // 返回dp[n][W]，即背包容量为W时，能够装载的物品的最大价值
  return dp[n][W];
}

const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
const W = 8;
console.log('背包能获得的最大总价值为:', knapsack(weights, values, W));

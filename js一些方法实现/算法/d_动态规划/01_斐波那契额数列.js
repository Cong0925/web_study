/**
 * 计算斐波那契数列的第n项
 *
 * @param n 第n项，n为大于等于0的整数
 * @returns 返回斐波那契数列的第n项
 */
function fibonacci(n) {
  // 如果 n 小于等于 1，则直接返回 n
  if (n <= 1) {
      return n;
  }
  // 创建一个长度为 n+1 的数组 dp，用于存储斐波那契数列的值
  let dp = new Array(n + 1);
  // 初始化 dp 数组的前两个元素
  dp[0] = 0;
  dp[1] = 1;
  // 从第三个元素开始，计算斐波那契数列的值
  for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
  }
  // 返回斐波那契数列的第 n 个值
  return dp[n];
}

console.log('斐波那契数列的第 10 项为:', fibonacci(10)); // 输出：55

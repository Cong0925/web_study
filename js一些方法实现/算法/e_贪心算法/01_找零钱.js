/**
 * 贪心算法求解硬币找零问题
 *
 * @param amount 目标金额
 * @param coins 可用硬币面额数组
 * @returns 返回凑齐目标金额所需的硬币数量
 */
function greedyCoinChange(amount, coins) {
  // 按面额从大到小排序
  coins.sort((a, b) => b - a);

  let numCoins = 0;
  let remainingAmount = amount;

  // 遍历硬币数组
  for (const coin of coins) {
      // 如果当前硬币的面额小于等于剩余金额
      if (coin <= remainingAmount) {
          // 计算可以使用的当前硬币的数量
          const num = Math.floor(remainingAmount / coin);
          // 更新硬币数量
          numCoins += num;
          // 更新剩余金额
          remainingAmount -= num * coin;
      }

      // 如果剩余金额为0，跳出循环
      if (remainingAmount === 0) {
          break;
      }
  }

  // 如果剩余金额不为0，说明无法凑齐零钱
  if (remainingAmount !== 0) {
      console.log('无法凑齐零钱的金额:', amount);
  }

  // 返回使用的硬币数量
  return numCoins;
}

const coins = [25, 10, 5, 1];
console.log('需要的最少硬币数量:', greedyCoinChange(37, coins)); // 输出：4

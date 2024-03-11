/**
 * 生成给定字符集中所有长度为指定长度的排列组合
 *
 * @param chars 字符集
 * @param length 排列组合的长度
 * @param prefix 当前排列组合的前缀
 * @param result 存储结果的数组
 */
function generatePermutations(chars, length, prefix = '', result = []) {
  // 如果前缀长度等于目标长度，则将前缀添加到结果数组中，并返回
  if (prefix.length === length) {
      result.push(prefix);
      return;
  }
  // 遍历给定的字符数组
  for (const char of chars) {
      // 递归调用generatePermutations函数，传入字符数组、目标长度、前缀加上当前字符以及结果数组
      generatePermutations(chars, length, prefix + char, result);
  }
}

/**
 * 回溯排列
 *
 * @param chars 字符数组
 * @param length 排列长度
 * @param prefix 当前排列前缀
 * @param result 存储排列结果的数组
 */
function backtrackPermutations(chars, length, prefix = '', result = []) {
  // 如果前缀的长度等于目标长度，则将前缀添加到结果数组中，并返回
  if (prefix.length === length) {
      result.push(prefix);
      return;
  }
  // 遍历字符数组中的每个字符
  for (const char of chars) {
      // 如果前缀中不包含当前字符
      if (!prefix.includes(char)) {
          // 递归调用回溯函数，更新前缀和结果数组
          backtrackPermutations(chars, length, prefix + char, result);
      }
  }
}

const chars = ['a', 'b', 'c'];
const length = 3;

let result1 = [];
generatePermutations(chars, length, '', result1);
console.log('递归生成的字符串排列:', result1);

let result2 = [];
backtrackPermutations(chars, length, '', result2);
console.log('回溯生成的字符串排列:', result2);

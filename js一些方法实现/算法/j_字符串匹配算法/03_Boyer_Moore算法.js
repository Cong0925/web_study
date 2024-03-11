/**
 * Boyer-Moore 字符串匹配算法
 *
 * @param text 待匹配的文本
 * @param pattern 待匹配的模式
 * @returns 返回匹配到的起始位置，若未找到则返回-1
 */
function boyerMoore(text, pattern) {
  const m = text.length;
  const n = pattern.length;
  if (n === 0) {
    return 0;
  }

  // 构建字符最后出现位置的映射
  const skip = {};
  for (let i = 0; i < n - 1; i++) {
    skip[pattern[i]] = n - i - 1;
  }
  skip[pattern[n - 1]] = n;

  let i = 0;
  while (i <= m - n) {
    let j = n - 1;
    // 从后往前匹配文本和模式
    while (j >= 0 && text[i + j] === pattern[j]) {
      j--;
    }
    if (j === -1) {
      return i; // 如果全部匹配成功，返回匹配的起始位置
    }
    // 根据字符最后出现位置的映射计算下一个匹配位置
    i += skip[text[i + n - 1]] || n;
  }
  return -1; // 没有找到匹配
}

// 示例用法
const text = "hello world";
const pattern = "world";
console.log(boyerMoore(text, pattern)); // 输出: 6

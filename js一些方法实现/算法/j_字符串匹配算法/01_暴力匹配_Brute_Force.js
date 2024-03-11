/**
 * 暴力匹配算法
 *
 * @param text 目标文本
 * @param pattern 匹配模式
 * @returns 返回匹配模式在目标文本中的起始位置，如果没有找到匹配则返回-1
 */
function bruteForce(text, pattern) {
  const m = text.length;
  const n = pattern.length;

  // 遍历文本串，查找模式串
  for (let i = 0; i <= m - n; i++) {
    let j = 0;

    // 逐个比较文本串和模式串的字符
    while (j < n && text[i + j] === pattern[j]) {
      j++;
    }

    // 如果模式串全部匹配成功
    if (j === n) {
      return i; // 返回匹配的起始位置
    }
  }

  // 没有找到匹配
  return -1; // 没有找到匹配
}

// 示例用法
const text = "hello world";
const pattern = "world";
console.log(bruteForce(text, pattern)); // 输出: 6

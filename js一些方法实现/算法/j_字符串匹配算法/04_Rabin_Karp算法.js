/**
 * Rabin-Karp 字符串匹配算法
 *
 * @param text 文本字符串
 * @param pattern 模式字符串
 * @returns 返回模式字符串在文本字符串中首次出现的位置，若未找到则返回 -1
 */
function rabinKarp(text, pattern) {
  const m = text.length;
  const n = pattern.length;
  if (n === 0) {
    return 0;
  }
  // 字符集大小
  const d = 256; // 字符集大小
  // 一个质数
  const q = 101; // 一个质数
  let p = 0, t = 0, h = 1;
  // 计算哈希值的基础值
  for (let i = 0; i < n - 1; i++) {
    h = (h * d) % q;
  }
  // 计算模式串和文本串的哈希值
  for (let i = 0; i < n; i++) {
    p = (d * p + pattern.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }
  // 遍历文本串，查找匹配
  for (let i = 0; i <= m - n; i++) {
    // 哈希值相等且字符串相等时，返回匹配的起始位置
    if (p === t && text.substring(i, i + n) === pattern) {
      return i; // 返回匹配的起始位置
    }
    // 更新文本串的哈希值
    if (i < m - n) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + n)) % q;
      if (t < 0) {
        t += q;
      }
    }
  }
  // 没有找到匹配
  return -1; // 没有找到匹配
}

// 示例用法
const text = "hello world";
const pattern = "world";
console.log(rabinKarp(text, pattern)); // 输出: 6

/**
 * 生成KMP算法中的部分匹配表
 *
 * @param pattern 待匹配的字符串
 * @returns 返回部分匹配表
 */
function kmpTable(pattern) {
  // 获取模式串的长度
  const n = pattern.length;
  // 初始化表数组，初始值都为0
  const table = new Array(n).fill(0);
  // 初始化指针i和j
  let i = 1, j = 0;
  // 当i小于n时，循环执行以下操作
  while (i < n) {
    // 如果模式串的第i个字符与第j个字符相等
    if (pattern[i] === pattern[j]) {
      // j指针向后移动一位
      j++;
      // 将j的值赋给表数组的第i个位置
      table[i] = j;
      // i指针向后移动一位
      i++;
      // 如果j大于0
    } else if (j > 0) {
      // 将j的值更新为表数组的第j-1个位置的值
      j = table[j - 1];
      // 如果j等于0
    } else {
      // i指针向后移动一位
      i++;
    }
  }
  // 返回表数组
  return table;
}

/**
 * 使用KMP算法在文本中搜索模式串
 *
 * @param text 文本
 * @param pattern 模式串
 * @returns 返回模式串在文本中的起始位置，如果未找到则返回-1
 */
function kmpSearch(text, pattern) {
  const m = text.length;
  const n = pattern.length;
  if (n === 0) {
    return 0;
  }

  // 生成部分匹配表
  const table = kmpTable(pattern);

  let i = 0, j = 0;
  while (i < m) {
    // 如果当前字符匹配成功
    if (text[i] === pattern[j]) {
      i++;
      j++;
      // 如果已经匹配完整个模式串
      if (j === n) {
        return i - n; // 返回匹配的起始位置
      }
      // 如果当前字符匹配失败，且模式串的下一个字符不是第一个字符
    } else if (j > 0) {
      // 根据部分匹配表进行跳转
      j = table[j - 1];
      // 如果当前字符匹配失败，且模式串的下一个字符是第一个字符
    } else {
      i++;
    }
  }

  // 没有找到匹配
  return -1; // 没有找到匹配
}

// 示例用法
const text = "hello world";
const pattern = "world";
console.log(kmpSearch(text, pattern)); // 输出: 6

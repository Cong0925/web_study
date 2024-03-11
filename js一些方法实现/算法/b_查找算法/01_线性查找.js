/**
 * 线性查找函数
 *
 * @param arr 目标数组
 * @param target 目标元素
 * @returns 返回目标元素在数组中的索引，若不存在则返回-1
 */
function linearSearch(arr, target) {
  // 遍历数组
  for (let i = 0; i < arr.length; i++) {
      // 如果当前元素等于目标元素
      if (arr[i] === target) {
          // 返回目标元素的索引
          return i; // 找到目标元素，返回索引
      }
  }
  // 如果循环结束仍未找到目标元素
  // 返回-1表示目标元素不存在
  return -1; // 目标元素不存在，返回-1
}

let arr = [64, 34, 25, 12, 22, 11, 90];
let target = 22;
let index = linearSearch(arr, target);
if (index !== -1) {
  console.log("线性搜索：元素", target, "的索引为", index);
} else {
  console.log("线性搜索：元素", target, "不存在于数组中");
}

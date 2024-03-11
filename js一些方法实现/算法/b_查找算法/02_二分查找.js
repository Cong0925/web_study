/**
 * 二分查找算法
 *
 * @param arr 目标数组
 * @param target 目标元素
 * @returns 返回目标元素在数组中的索引，若不存在则返回-1
 */
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      // 如果中间元素等于目标元素，返回中间元素的索引
      if (arr[mid] === target) {
          return mid; // 找到目标元素，返回索引
      // 如果中间元素小于目标元素，更新 low 为 mid + 1
      } else if (arr[mid] < target) {
          low = mid + 1;
      // 如果中间元素大于目标元素，更新 high 为 mid - 1
      } else {
          high = mid - 1;
      }
  }
  // 目标元素不存在于数组中，返回 -1
  return -1; // 目标元素不存在，返回-1
}

let arr = [11, 12, 22, 25, 34, 64, 90];
let target = 22;
let index = binarySearch(arr, target);
if (index !== -1) {
  console.log("二分搜索：元素", target, "的索引为", index);
} else {
  console.log("二分搜索：元素", target, "不存在于数组中");
}

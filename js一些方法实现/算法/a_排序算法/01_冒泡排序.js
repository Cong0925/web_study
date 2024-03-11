/**
 * 冒泡排序
 * 遍历数组，对于每个元素，与其后一个元素进行比较，如果前一个元素大于后一个元素，则交换它们的位置
 *
 * @param arr 要排序的数组
 */
function bubbleSort(arr) {
  // 获取数组的长度
  const n = arr.length;
  // 遍历数组
  for (let i = 0; i < n; i++) {
      // 遍历数组中未排序的部分
      for (let j = 0; j < n - i - 1; j++) {
          // 如果前一个元素大于后一个元素，则交换它们的位置
          if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
      }
  }
}

// 定义要排序的数组
let arr = [64, 34, 25, 12, 22, 11, 90];
// 调用bubbleSort()函数对数组进行冒泡排序
bubbleSort(arr);
// 输出排序后的数组
console.log("冒泡排序结果:", arr);


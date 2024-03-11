/**
 * 选择排序
 *遍历数组，找出最小元素的索引，将其与当前元素交换

 * @param arr 要排序的数组
 */
function selectionSort(arr) {
    // 获取数组的长度
    const n = arr.length;
    // 遍历数组
    for (let i = 0; i < n; i++) {
        // 找出最小元素的索引
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // 交换当前元素与最小元素的位置
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  // 定义要排序的数组
  let arr = [64, 34, 25, 12, 22, 11, 90];
  // 调用selectionSort()函数对数组进行选择排序
  selectionSort(arr);
  // 输出排序后的数组
  console.log("选择排序结果:", arr);
  

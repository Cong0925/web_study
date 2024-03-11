/**
 * 插入排序
 *
 * @param arr 待排序的数组
 */
function insertionSort(arr) {
  // 获取数组长度
  const n = arr.length;
  // 从第二个元素开始遍历
  for (let i = 1; i < n; i++) {
      // 将当前元素作为待插入的键值
      let key = arr[i];
      // 从当前元素的前一个元素开始向前遍历
      let j = i - 1;
      // 当遍历到的元素大于键值并且索引大于等于0时，将遍历到的元素后移一位
      while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          j--;
      }
      // 将键值插入到正确的位置
      arr[j + 1] = key;
  }
}

let arr = [64, 34, 25, 12, 22, 11, 90];
insertionSort(arr);
console.log("插入排序结果:", arr);

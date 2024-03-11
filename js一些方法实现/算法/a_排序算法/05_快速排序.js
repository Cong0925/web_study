/**
 * 快速排序函数
 *
 * @param arr 待排序数组
 * @returns 排序后的数组
 */
function quickSort(arr) {
  // 如果数组长度小于等于1，则直接返回数组
  if (arr.length <= 1) {
      return arr;
  }
  // 选取数组最后一个元素作为枢轴
  const pivot = arr[arr.length - 1];
  // 初始化左、右两个空数组
  const left = [];
  const right = [];
  // 遍历数组，将小于枢轴的元素放入左数组，大于等于枢轴的元素放入右数组
  for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) {
          left.push(arr[i]);
      } else {
          right.push(arr[i]);
      }
  }
  // 对左、右两个数组进行递归排序，并将排序结果和枢轴拼接起来返回
  return quickSort(left).concat(pivot, quickSort(right));
}

let arr = [64, 34, 25, 12, 22, 11, 90];
arr = quickSort(arr);
console.log("快速排序结果:", arr);

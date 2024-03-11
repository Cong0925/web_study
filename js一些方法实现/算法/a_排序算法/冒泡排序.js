const arr = [5, 2, 9, 1, 7, 6];
const sortedArr = bubbleSort(arr);
console.log(sortedArr); // [1, 2, 5, 6, 7, 9]
//从小到大
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换位置
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
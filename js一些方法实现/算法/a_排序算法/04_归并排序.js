/**
 * 使用归并排序算法对数组进行排序
 *
 * @param arr 需要排序的数组
 * @returns 排序后的数组
 */
function mergeSort(arr) {
  // 如果数组长度小于等于1，则直接返回该数组
  if (arr.length <= 1) {
      return arr;
  }
  // 计算数组中间位置
  const mid = Math.floor(arr.length / 2);
  // 对左半部分进行归并排序
  const left = mergeSort(arr.slice(0, mid));
  // 对右半部分进行归并排序
  const right = mergeSort(arr.slice(mid));
  // 合并左右两部分排序后的数组
  return merge(left, right);
}

/**
 * 合并两个有序数组
 *
 * @param left 左侧有序数组
 * @param right 右侧有序数组
 * @returns 返回合并后的有序数组
 */
function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;
  
  // 当左右两个数组都有元素时
  while (i < left.length && j < right.length) {
    // 将较小的元素添加到结果数组中
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  // 当左数组还有剩余元素时
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  
  // 当右数组还有剩余元素时
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }
  
  // 返回合并后的数组
  return result;
}

/**
 * 合并两个已排序好的数组，返回一个新数组，新数组也是已排序的
 *
 * @param left 左侧已排序数组
 * @param right 右侧已排序数组
 * @returns 返回合并后已排序的新数组
 */
function merge(left, right) {
  // 创建一个空数组用于存储合并后的结果
  let result = [];
  // 定义左数组索引
  let leftIndex = 0;
  // 定义右数组索引
  let rightIndex = 0;

  // 当左右两个数组都还有元素时执行循环
  while (leftIndex < left.length && rightIndex < right.length) {
      // 如果左数组当前元素小于右数组当前元素
      if (left[leftIndex] < right[rightIndex]) {
          // 将左数组当前元素添加到结果数组中
          result.push(left[leftIndex]);
          // 左数组索引加1
          leftIndex++;
      } else {
          // 否则将右数组当前元素添加到结果数组中
          result.push(right[rightIndex]);
          // 右数组索引加1
          rightIndex++;
      }
  }

  // 循环结束后，将左数组剩余的元素添加到结果数组中
  // 使用slice方法从leftIndex开始截取左数组剩余的元素
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

let arr = [64, 34, 25, 12, 22, 11, 90];
arr = mergeSort(arr);
console.log("归并排序结果:", arr);

/**
 * 对给定的数组进行堆排序
 *
 * @param arr 待排序的数组
 */
function heapSort(arr) {
    const n = arr.length; // 获取数组的长度

    // 从最后一个非叶子节点开始，向上到根节点，逐个进行堆化
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // 从堆顶开始，将最大值与堆尾元素交换，然后重新堆化剩下的元素
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]; // 交换堆顶元素和当前元素
        heapify(arr, i, 0); // 重新对剩下的元素进行堆化
    }
}


/**
 * 将数组 arr 中以索引 i 为根节点的子树堆化
 *
 * @param arr 数组
 * @param n 数组长度
 * @param i 当前节点索引
 */
function heapify(arr, n, i) {
    let largest = i; // 初始化最大值为当前节点
    const left = 2 * i + 1; // 左子节点索引
    const right = 2 * i + 2; // 右子节点索引

    // 如果左子节点大于当前最大值，则更新最大值
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // 如果右子节点大于当前最大值，则更新最大值
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // 如果最大值不是当前节点，则交换它们，并继续堆化子树
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // 交换节点
        heapify(arr, n, largest); // 堆化子树
    }
}

// 示例数组
let arr = [64, 34, 25, 12, 22, 11, 90];

// 对示例数组进行堆排序
heapSort(arr);

// 输出排序后的结果
console.log("堆排序结果:", arr); // 输出：[11, 12, 22, 25, 34, 64, 90]
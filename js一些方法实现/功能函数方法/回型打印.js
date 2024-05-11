function fun(arr) {
  let result = []; // 保存打印结果的数组
  let rowsNum = arr.length;
  let colsNum = arr[0].length;
  let top = 0;
  let bottom = rowsNum - 1;
  let left = 0;
  let right = colsNum - 1;
  let direction = 0;

  while (top <= bottom && left <= right) {
    if (direction === 0) { // 从左到右 
      for (let i = left; i <= right; i++) {
        result.push(arr[top][i]);
      } top++;
    } else if (direction === 1) { // 从上到下 
      for (let i = top; i <= bottom; i++) {
        result.push(arr[i][right]);
      } right--;
    } else if (direction === 2) { // 从右到左 
      for (let i = right; i >= left; i--) {
        result.push(arr[bottom][i]);
      }
      bottom--;
    } else if (direction === 3) { // 从下到上
      for (let i = bottom; i >= top; i--) {
        result.push(arr[i][left]);
      }
      left++;
    }

    direction = (direction + 1) % 4; // 调整方向
  }

  console.log(result);
}
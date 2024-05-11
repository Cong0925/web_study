function fun1(arr) {
    let left = 0
    let leftMax = arr[0]
    let right = arr.length - 1
    let rightMax = arr[right]
    let water = 0

    while (left < right) {
        if (arr[left] < arr[right]) {
            if (arr[left] < leftMax) {
                water += (leftMax - arr[left])
            } else {
                leftMax = arr[left]
            }
            left++
        } else {
            if (arr[right] < rightMax) {
                water += (rightMax - arr[right])
            } else {
                rightMax = arr[right]
            }
            right--
        }
    }
    console.log(water)
}

function fun2(arr) {
    let stack = []
    let water = 0
    for (let i = 0; i < arr.length; i++) {
        while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
            let top = stack.pop()
            if (stack.length === 0) break
            let distance = i - stack[stack.length - 1] - 1
            let step = Math.min(arr[i], arr[stack[stack.length - 1]]) - arr[top]
            water += distance * step
        }
        stack.push(i)
    }
    console.log(water)
}

fun1([0, 1, 2, 3, 4, 5, 6, 2, 1, 2, 4, 0, 5, 2, 7, 2, 4, 5, 1, 2, 3, 4, 5, 1, 2, 4, 6, 7, 8, 9, 5, 3, 2, 45, 5])
fun2([0, 1, 2, 3, 4, 5, 6, 2, 1, 2, 4, 0, 5, 2, 7, 2, 4, 5, 1, 2, 3, 4, 5, 1, 2, 4, 6, 7, 8, 9, 5, 3, 2, 45, 5])

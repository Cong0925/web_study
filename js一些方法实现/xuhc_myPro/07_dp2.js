// 
let arr = [1, 5, 6, 7, 2, 8, 3, 4, 9, 10]
let target = 11
function fun(arr, target) {
    let n = arr.length
    let dp = new Array(target + 1).fill(0)
    dp[0] = 1
    for (let i = 1; i <= target; i++) {
        arr.forEach(item => {
            if (i - item >= 0) {
                dp[i] += dp[i - item]
            }
        });
    }
    return dp[target]
}
console.log(fun(arr, target))

// 
function fun1(arr, target) {
    let n = arr.length
    let res = []
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] === target) {
                res.push([arr[i], arr[j]])
            }
        }
    }
    console.log(res, res.length)
    return res
}
fun1(arr, target)
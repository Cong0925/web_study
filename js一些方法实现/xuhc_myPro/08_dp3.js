let arr = [1, 2, 3, 4, 5, 6, 7, 8]
let arr1 = [1, 2, 3, 5]
function fun(arr) {
    let sum = arr.reduce((sum, cur) => {
        return sum + cur
    }, 0)
    if (sum % 2 !== 0) return false
    let target = sum / 2
    let dp = new Array(target + 1).fill(false)
    dp[0] = true
    arr.forEach(item => {
        for (let i = target; i >= item; i--) {
            dp[i] = dp[i] || dp[i - item]
        }
    });

    console.log(dp[target])
    return dp[target]
}
fun(arr)
fun(arr1)



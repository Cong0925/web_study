// 环形的住宅，偷窃财务，不能连续偷相邻的两家，求最大财务
let arr = [6,4,5,6]
function fun(arr){
    let n = arr.length
    if(n === 0) return 0
    if(n === 1) return arr[0]
    // 是否取第一家，dp1取，dp2不取
    let dp1 = new Array(n).fill(0)
    let dp2 = new Array(n).fill(0)
    dp1[0] = arr[0]
    dp1[1] = Math.max(arr[0],arr[1])
    dp2[1] = arr[1]
    for(let i=2;i<n-1;i++){
        dp1[i] = Math.max(dp1[i-1],dp1[i-2]+arr[i])
    }
    for(let i=2;i<n;i++){
        dp2[i] = Math.max(dp2[i-1],dp2[i-2]+arr[i])
    }
    return Math.max(dp1[n-2],dp2[n-1])
}
console.log(fun(arr))
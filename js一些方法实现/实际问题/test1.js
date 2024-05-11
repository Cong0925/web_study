let arr1 = [1, 2, 3, 2]
let arr2 = [2, 3, 4]
function fun(qrr1, arr2) {
  let add = arr2
  let del = arr1
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) !== -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1)
      arr2.splice(i, 1)
      i--
    }
  }
  console.log(add, del)
}
fun(arr1, arr2)
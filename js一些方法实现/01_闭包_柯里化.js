function fun (){
  let total = 0

  function sum(...values) {
    values.forEach(item=>{
      total += item
    })
    return sum
  }

  sum.toString = function () {
    return total
  }

  return sum
}
console.log(fun()(1)(2)(3)(2)(2).toString()); // 输出 6
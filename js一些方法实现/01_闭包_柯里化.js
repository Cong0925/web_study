function fun1(x) {
  let total = x;

  function sum(value) {
      total += value;
      return sum; // 返回自身以便链式调用
  }

  sum.toString = function () {
      return total;
  }

  return sum;
}

console.log(fun1(1)(2)(3).toString()); // 输出 6
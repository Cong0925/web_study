// 计算两个数的最大公约数
function gcd(a, b) {
  if (b === 0) {
      return a;
  }
  return gcd(b, a % b);
}

// 计算两个数的最小公倍数
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// 示例
const num1 = 6;
const num2 = 10;
const result = lcm(num1, num2);
console.log("最小公倍数为：" + result);

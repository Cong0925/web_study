const fun1 = (data) => {
  let str = '';

  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      str = data.join('');
    } else if (data instanceof Set || data instanceof Map) {
      str = Array.from(data.values()).join('');
    } else {
      str = JSON.stringify(data);
    }
  } else {
    str = data.toString();
  }

  let length = str.length
  let maxLength = 0
  let dp = Array(length).fill(0)
  let charIndex = {}
  let start = 0
  let end = 0

  for (let i = 0; i < length; i++) {
    let checkIndex = charIndex[str[i]] === undefined ? -1 : charIndex[str[i]]
    dp[i] = Math.min(i - checkIndex, dp[i - 1] === undefined ? 1 : dp[i - 1] + 1)
    charIndex[str[i]] = i;

    if (dp[i] > maxLength) {
      maxLength = dp[i]
      start = checkIndex === -1 ? 0 : checkIndex + 1
      end = i
    }
  }

  return {
    maxLength: maxLength,
    start: start,
    end: end,
    substring: str.substring(start, end + 1)
  }
}
let str = 'qweqrwetgdgasdgfdhh'
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 3, 2, 1, 23, 12, 41, 4, 4, 241, 4, 3424, 24, , 23412, 3]
let set = new Set([1, 2, 3, 4, 3, 2, 1]);
let map = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 1], ['e', 2]]);
console.log(fun1(str));
console.log(fun1(arr));
console.log(fun1(set));
console.log(fun1(map));




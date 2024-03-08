const fun = (urls, maxNum) => { // 定义一个名为 fun 的函数，接收两个参数：urls（一个数组，包含要请求的 URL）和 maxNum（一个数字，表示同时进行的最大请求数）
  if (urls.length === 0) return Promise.resolve({}); // 如果 urls 数组为空，则立即返回一个空对象的 Promise

  return new Promise(resolve => { // 返回一个新的 Promise 对象，并将 resolve 函数作为回调函数
    let index = 0; // 记录请求队列进行的的位置
    const result = {}; // 最后获取的请求结果
    let count = 0; // 记录完成的请求的数量
    async _request() { // 定义一个异步函数 _request，用于发起请求
      const i = index; // 记录每一个请求的数组索引位置
      const url = urls[i]; // 获取当前请求的 URL
      index++; // 将请求队列的位置向后移动一位

      try { // 尝试发起请求
        const resp = await fetch(url); // 使用 fetch 函数发送 HTTP 请求，并返回一个 Promise 对象
        result[i] = resp; // 将请求的结果存储在 result 对象中，键为请求的索引位置
      }
      catch (err) { // 如果请求失败，捕获错误
        result[i] = err; // 将请求的错误结果存储在 result 对象中，键为请求的索引位置
      }
      finally { // 无论请求成功与否，都会执行 finally 块中的代码
        count++; // 增加完成的请求的数量
        if (count === urls.length) { // 如果完成的请求数量等于 urls 数组的长度
          resolve(result); // 调用 resolve 函数，将 result 对象作为参数传递给 Promise 对象，从而结束 Promise 对象的等待状态
        }
        if (index < urls.length) { // 如果请求队列还有未完成的请求
          _request(); // 递归调用 _request 函数，继续发起请求
        }
      }
    }

    for (let i = 0; i < Math.min(urls.length, maxNum); i++) { // 循环执行 for 循环，最多执行 maxNum 次
      _request(); // 调用 _request 函数，发起请求
    }
  });
}
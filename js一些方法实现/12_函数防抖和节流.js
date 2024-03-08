/**
 * 防抖函数，在一定时间内只执行一次函数，避免函数因频繁触发而过度消耗性能
 *
 * @param func 要防抖的函数
 * @param wait 等待时间，单位为毫秒
 * @returns 返回防抖后的函数
 */
function debounce(func, wait) {
  // 定义一个变量timeoutId，用于存储setTimeout的返回值
  let timeoutId;

  // 返回一个函数
  return function () {
    // 获取当前函数的上下文和参数
    const context = this;
    const args = [...arguments];

    // 如果timeoutId存在，则清除之前的setTimeout定时器
    if (timeoutId) clearTimeout(timeoutId);

    // 设置一个新的setTimeout定时器，等待wait毫秒后执行func函数，并将上下文和参数传递给func函数
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}


// 节流函数
/**
 * 节流函数，限制函数的执行频率
 *
 * @param func 要进行节流的函数
 * @param wait 两次执行之间的时间间隔，单位毫秒
 * @returns 返回一个新的函数，该函数在wait毫秒内只执行一次func函数
 */
function throttle(func, wait) {
  // 定义一个变量lastTime，用于存储上一次触发的时间
  let lastTime = 0;
  // 返回一个函数
  return function () {
    // 获取当前函数的上下文和参数
    const context = this;
    const args = [...arguments];
    // 获取当前时间戳
    const now = Date.now();
    // 如果距离上次触发的时间间隔大于wait毫秒，则执行func函数，并更新lastTime为当前时间戳
    if (now - lastTime >= wait) {
      func.apply(context, args);
      lastTime = now;
    }
  };
}

/**
 * 节流函数，限制函数的执行频率
 *
 * @param func 要进行节流的函数
 * @param interval 两次执行之间的时间间隔，单位毫秒
 * @returns 返回一个新的函数，该函数在 interval 毫秒内只执行一次 func 函数
 */
function throttle(func, interval) {
  // 定义一个定时器ID
  let timeoutId;

  // 返回一个新的函数
  return function (...args) {
    // 获取当前上下文
    const context = this;

    // 如果定时器ID不存在
    if (!timeoutId) {
      // 设置定时器
      timeoutId = setTimeout(() => {
        // 在定时器回调函数中执行原始函数，并传入参数
        func.apply(context, args);
        // 将定时器ID置为null
        timeoutId = null;
      }, interval);
    }
  };
}
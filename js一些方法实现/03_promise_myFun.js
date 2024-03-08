// 来源 ESMAScript Promise
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

const isPromiseLike = function (obj) {
  return obj && typeof obj.then === 'function'
}

Promise.prototype.resolve = function (value) {
  if(value instanceof Promise)  return value
  if(isPromiseLike(value) ) {
    return new Promise((resolve, reject) => {
      value.then(resolve, reject)
    })
  }
  return new Promise(resolve => resolve(value))
}

Promise.prototype.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
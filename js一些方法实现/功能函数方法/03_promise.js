/**
 * resolve 尝试
 */
function test_resolve() {
  let promise1 = new Promise((resolve, reject) => {
    resolve('res1')
  })
  promise1.then((res) => {
    console.log(res);
    return res + res
  }).then((res) => {
    console.log(res);
  })
}

/**
 * reject 尝试
 */
function test_reject() {
  let promise2 = new Promise((resolve, reject) => {
    reject('err1')
  })
  promise2.catch((err) => {
    console.log(err);
  })
}

/**
 * 长链式调用 尝试
 */
function test_long_then() {
  let promise3 = new Promise((resolve, reject) => {
    resolve('res1')
  })
  promise3.then((res) => {
    console.log(res);
    return 'res2'
  }).then((res) => {
    console.log(res);
    return Promise.reject('err1')
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    console.log('end');
  })
}

/**
 * promise.all 尝试
 */
function test_all_resolve() {
  let arr = [
    Promise.resolve('err1'),
    Promise.resolve('res2'),
    Promise.resolve('res3'),
  ]

  Promise.all(arr).then((res) => {
    console.log(res)
    return res
  }).then((res)=>{
    console.log(res)
    if(res[0] === 'err1'){
      return Promise.reject(res[0])
    }
  }).catch((err)=>[
    console.log(err)
  ])
}

/**
 * promise.all 尝试
 * @property {Array} arr0 全是 resolve 的数组
 * @property {Array} arr1 全是 reject 的数组
 * @property {Array} arr2 先 resolve 后 reject 的数组
 * @property {Array} arr3 先 reject 后 resolve 的数组
 */
function test_all_reject() {
  let arr0 = [
    Promise.resolve('res1'),
    Promise.resolve('res2')
  ]
  let arr1 = [
    Promise.reject('err1'),
    Promise.reject('err2')
  ]
  let arr2 = [
    Promise.resolve('res1'),
    Promise.reject('err1'),
  ]
  let arr3 = [
    Promise.reject('err1'),
    Promise.resolve('res1'),
  ]

  Promise.all(arr0).then((res) => {
    console.log('all_resolve_res:',res)
  }).catch((err)=>{
    console.log('all_resolve_err:',err)
  })

  Promise.all(arr1).then((res) => {
    console.log('all_reject_res:',res)
  }).catch((err)=>{
    console.log('all_reject_err:',err)
  })

  Promise.all(arr2).then((res) => {
    console.log('resolve_reject_res:',res)
  }).catch((err)=>{
    console.log('resolve_reject_err:',err)
  })

  Promise.all(arr3).then((res) => {
    console.log('reject_resolve_res:',res)
  }).catch((err)=>{
    console.log('reject_resolve_err:',err)
  })
}



// test_resolve()
// test_reject()
// test_long_then()
// test_all_resolve()
test_all_reject()


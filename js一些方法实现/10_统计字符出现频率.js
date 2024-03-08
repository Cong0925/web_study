let str = 'qqwweqrqrqrqrqrqrqrsdvavsbbsavfGHSHJJMFJ'

const my_sort = (str)=>{
  str = str.split('')
  str = str.sort((a,b)=>a>b ? 1: a===b ? 0 : -1)
  return str
}

const fun1 = (str) => {
  let res = {}
  str = my_sort(str)
  for (let i = 0; i < str.length; i++) {
    if (res[str[i]]) {
      res[str[i]]++
    } else {
      res[str[i]] = 1
    }
  }
  // console.log(res)
  return res
}
// console.table(fun1(str))
// fun1(str)


const fun2 = (str)=>{
  str = my_sort(str)
  let res = [...str].reduce((r,cur)=> (r[cur]++ || (r[cur] = 1),r),{})
  // console.log(res)
  return res
}
// console.table(fun1(str))
// fun2(str)



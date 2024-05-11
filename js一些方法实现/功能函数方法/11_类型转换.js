// 定义所有的JS类型
let str = 'asdf'
let num = 123
let bool = true
let und = undefined
let nul = null

let obj = {}
let arr = []


//JS类型转换规则
// 对象转原始类型
// 1.先调用对象的valueOf方法，如果返回原始类型，则直接返回
// 2.如果valueOf返回的不是原始类型，则调用toString方法，如果返回原始类型，则直接返回
// 3.如果toString返回的不是原始类型，则报错

// 原始转对象,不修改方法
const fun0 = () => {
  console.log(obj.valueOf(), obj.toString()) // [object Object],'[object Object]';
  console.log('obj->str', String(obj), String(obj.valueOf()), String(obj.toString())) // '[object Object]', '[object Object]', '[object Object]'
  console.log('obj->number', Number(obj), Number(obj.valueOf()), Number(obj.toString())) // NaN,NaN,NaN
}

// 原始转对象,修改 valueOf 方法
const fun1 = () => {
  obj = {
    valueOf: function () {
      return 1
    }
  }
  console.log('obj->number', Number(obj), Number(obj.valueOf()), Number(obj.toString())) // 1,1,NaN
}
// 原始转对象,修改 valueOf 和 toString 方法
const fun2 = () => {
  obj = {
    valueOf: function () {
      return {}
    },
    toString: function () {
      return 1
    }
  }
  console.log('obj->number', Number(obj), Number(obj.valueOf()), Number(obj.toString())) // 1,NaN,1
}
// 原始转对象,修改 valueOf 和 toString 方法
const fun3 = () => {
  obj = {
    valueOf: function () {
      return {}
    },
    toString: function () {
      return {}
    }
  }
  console.log('obj->number', Number(obj), Number(obj.valueOf()), Number(obj.toString())) // 报错
}
fun1()
fun2()
fun3()


// 其他的转换
const other_change = () => {
  // 原始转字符串
  console.log(String(null), String(undefined), String(123), String(true), String(false)); // 'null','undefined','123','true','false'

  // 原始转数字
  console.log('bool->number', Number(true), Number(false)) // 1,0
  console.log('null/undefined->number', Number(null), Number(undefined));// 0,NaN
  console.log('str->number', Number('\n'), Number('123'), Number('123abc'));// 0,123,NaN

  // 所有转bool
  console.log(Boolean(null), Boolean(undefined), Boolean(0), Boolean(''), Boolean(NaN)) // false,false,false,false,false
}

// other_change()


var a =1
const fun1 = (code)=>{
  var a =2
  new Function(code)()
}

fun1('console.log("a",a)') // a 1
console.log('你好');
//  a 1 你好
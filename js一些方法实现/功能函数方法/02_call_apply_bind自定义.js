/**
 * 这里，我们使用原型方法给 Function 对象添加了 myCall、myApply 和 myBind 方法。 
 * myCall 和 myApply 非常相似，它们的不同之处在于参数传递方式。 
 * myCall 函数使用剩余参数语法 ...args 来传递参数，而 myApply 函数接受一个数组作为参数。 
 * myBind 函数返回一个新的函数，该函数接受一个参数，并将其与 myBind 中传递的参数合并，然后调用原始函数。
 * 对于 myCall 和 myApply，我们首先将传入的 context 参数与 window 对象进行比较，如果 context 是空的，
 * 则默认为全局 window 对象。然后，我们使用 Symbol 函数创建一个唯一的标识符 fnSymbol，并将原始函数存储为 context[fnSymbol] 的属性。
 * 我们然后调用函数，将结果存储在 result 变量中，并使用 delete 关键字从 context 对象中删除函数属性。最后，我们返回函数的结果。
 * 对于 myBind，我们首先将 this 存储在 fn 变量中，然后返回一个新的函数，
 * 该函数使用剩余参数语法将 myBind 中传递的参数与新函数的参数合并，并在新的上下文中使用 apply 调用原始函数。
 */

// 实现 call 方法
Function.prototype.myCall = function (context, ...args) {
  // 如果 context 参数为空，则默认为 window 对象
  context = context || window;
  // 使用 Symbol 函数创建一个唯一的标识符
  const fnSymbol = Symbol();
  // 将原始函数存储为 context 对象的属性
  context[fnSymbol] = this;
  // 调用函数并将结果存储在 result 变量中
  const result = context[fnSymbol](...args);
  // 删除 context 对象的属性
  delete context[fnSymbol];
  // 返回函数的结果
  return result;
};

// 实现 apply 方法
Function.prototype.myApply = function (context, args) {
  // 如果 context 参数为空，则默认为 window 对象
  context = context || window;
  // 使用 Symbol 函数创建一个唯一的标识符
  const fnSymbol = Symbol();
  // 将原始函数存储为 context 对象的属性
  context[fnSymbol] = this;
  // 调用函数并将结果存储在 result 变量中
  const result = context[fnSymbol](...args);
  // 删除 context 对象的属性
  delete context[fnSymbol];
  // 返回函数的结果
  return result;
};

// 实现 bind 方法
Function.prototype.myBind = function (context, ...args) {
  // 将 this 存储在 fn 变量中
  const fn = this;
  // 返回一个新的函数，该函数将传入的参数与新函数的参数合并，并在新的上下文中使用 apply 调用原始函数
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

// 测试数据
const obj = {
  name: 'obj.name',
  tryCall: function(...arg) {
    console.log(`Hello, my name is ${this.name},from:${arg}`);
  },
  tryApply:function(...args){
    console.log(`Hello, my name is ${this.name},from:${args}`);
  },
  tryBind:function(...args){
    console.log(`arg[0]:${args[0]},arg[1]:${args[1]}`);
  }
};
const person = {
  name: 'person.name'
};
// obj.tryCall('obj'); 
// obj.tryCall.call(person,'call');
// obj.tryCall.myCall(person,'mycall'); 

// obj.tryApply('obj','aaa'); 
// obj.tryApply.apply(person,['apply','aaa']); 
// obj.tryApply.myApply(person,['myapply','bbb']);

const oldBind = obj.tryBind.bind(person);
oldBind('London','UK'); 
const newBind = obj.tryBind.myBind(person);
newBind('London','UK'); 

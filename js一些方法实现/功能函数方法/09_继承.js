// 原型链继承
function Parent() {
  this.name = 'parent';
}

Parent.prototype.sayName = function() {
  console.log(this.name);
}

function Child() {
  this.name = 'child';
}

Child.prototype = new Parent();

var child = new Child();
child.sayName(); // 输出 'child'


//构造函数继承
function Parent() {
  this.name = 'parent';
}

Parent.prototype.sayName = function() {
  console.log(this.name);
}

function Child() {
  Parent.call(this); // 使用Parent构造函数创建对象
  this.name = 'child';
}

Child.prototype.constructor = Child; // 修改构造函数，使其指向Child类本身

var child = new Child();
child.sayName(); // 输出 'child'


//组合继承
function Parent() {
  this.name = 'parent';
}

Parent.prototype.sayName = function() {
  console.log(this.name);
}

function Child() {
  Parent.call(this); // 使用Parent构造函数创建对象
  this.name = 'child';
}

Child.prototype = new Parent();
Child.prototype.constructor = Child; // 修改构造函数，使其指向Child类本身

var child = new Child();
child.sayName(); // 输出 'child'


//寄生组合继承
function Parent() {
  this.name = 'parent';
}

Parent.prototype.sayName = function() {
  console.log(this.name);
}

function Child() {
  Parent.call(this); // 使用Parent构造函数创建对象
  this.name = 'child';
}

Child.prototype = Object.create(Parent.prototype); // 使用Object.create()创建一个新的对象，原型链指向Parent.prototype
Child.prototype.constructor = Child; // 修改构造函数，使其指向Child类本身

var child = new Child();
child.sayName(); // 输出 'child'



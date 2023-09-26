/**
 * Object.defineProperty 描述符尝试
 */
const fun1 = () => {
  let obj = {
    a: 'name',
    b: 'sex',
    c: 'age'
  }

  /**
   * @property {} value 重新赋值
   * @property {} writable 不可重写
   * @property {} enumerable 不可遍历
   * @property {} configurable 不可修改描述符本身
   * 
   */
  Object.defineProperty(obj, 'a', {
    value: 'name:xhc',
  })
  console.log(obj);


  Object.defineProperty(obj, 'a', {
    writable: false, // 不可重写
  })
  obj.a = 'aaa'
  console.log('不可重写', obj);


  Object.defineProperty(obj, 'a', {
    enumerable: false, // 不可遍历
  })
  for (let key in obj) {
    console.log(' a 不可遍历:', key);
  }

  let keys = Object.keys(obj)
  console.log(' a 不可遍历:', keys);


  Object.defineProperty(obj, 'a', {
    configurable: false, // 不可修改描述符本身
  })
  // Object.defineProperty(obj,'a',{
  //   value: 'name:aa',
  // })

}

/**
 * Object.defineProperty  的 set与get
 */
const fun2 = () => {
  let obj = {}
  let internalValue = undefined
  Object.defineProperty(obj,'a',{
    get:function () {
      return internalValue
    },
    set:function(val){
      internalValue = val
      // throw new Error(
      //   `兄弟,你正在给a这个属性重新赋值,你所赋的值是${val}，但是，这个属性是不能复制，你再考虑考虑`
      // );
    }
  })
  console.log(obj.a);
  obj.a = [{a:['a','s','d']},{b:[1,2,3,4]},{c:'asdffa'}]
  console.log(obj.a);
}

/**
 * Object.defineProperty 与构造函数搭配
 * Object.freeze()  冻结某个对象，使其不可修改
 */
const fun3 = () => {
  let aGoods = {
    pic: '.',
    title: '..',
    desc: `...`,
    sellNumber: 1,
    favorRate: 2,
    price: 3,
  };

  class UIGoods {
    get totalPrice() {
      return this.choose * this.data.price;
    }
  
    get isChoose() {
      return this.choose > 0;
    }
  
    constructor(g) {
      g = { ...g };
      Object.freeze(g);
      Object.defineProperty(this, 'data', {
        get: function () {
          return g;
        },
        set: function () {
          throw new Error('data 属性是只读的，不能重新赋值');
        },
        configurable: false,
      });
      var internalChooseValue = 0;
      Object.defineProperty(this, 'choose', {
        configurable: false,
        get: function () {
          return internalChooseValue;
        },
        set: function (val) {
          if (typeof val !== 'number') {
            throw new Error('choose属性必须是数字');
          }
          var temp = parseInt(val);
          if (temp !== val) {
            throw new Error('choose属性必须是整数');
          }
          if (val < 0) {
            throw new Error('choose属性必须大于等于 0');
          }
          internalChooseValue = val;
        },
      });
      this.a = 1;
      Object.seal(this);
    }
  }
  // Object.freeze(UIGoods.prototype);

  var g = new UIGoods(aGoods);
  UIGoods.prototype.haha = 'abc';
  // g.data.price = 100;
  
  g.choose = 123
  console.log(g.choose);

  console.log(g.haha);
  
}


// fun1()
// fun2()
fun3()
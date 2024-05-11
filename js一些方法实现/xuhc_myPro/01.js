function Parent(name = 'parent') {
    this.name = name
}
Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child(params) {
    // this.name = params
}

Child.prototype = new Parent()

let child1 = new Child('123')
let child2 = new Child()
// child1.getName()
// child2.getName()

function myNew(target, ...args) {
    let obj = Object.create(target.prototype)
    let res = target.apply(obj, args)
    return typeof res === 'object' ? res : obj
}
let c3 = myNew(Parent, 'c3')
c3.getName()

// 自定义call
Function.prototype.myCall = function (target, ...args) {
    target = target || window
    target.__fn__ = this
    let res = target.__fn__(...args)
    delete target.__fn__
    return res
}


// 深拷贝
function deepCoy(obj, map = new WeakMap()) {
    if (map.has(obj)) {
        return map.get(obj)
    }

    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    let copy = Array.isArray(obj) ? [] : {}
    map.set(obj, copy)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCoy(obj[key], map)
        }
    }
    return copy
}

// 链式相加
function fun(...args) {
    let sum = args.reduce((sum, cur) => sum + Number(cur), 0)
    function Sum(...args) {
        sum += args.reduce((sum, cur) => sum + Number(cur), 0)
        return Sum
    }
    Sum.res = function () {
        return sum
    }
    return Sum
}

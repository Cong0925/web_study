let obj = {
  name: 'xhc',
  age: 18,
  class: [
    {
      className: 'Chinese',
      score: 100
    },
    {
      className: 'math',
      score: 100
    },
    {
      className: 'English',
      score: 100
    }
  ],
  father: {
    name: 'xj',
    age: 50,
  }
}

// const fun1 = (arr) => {
//   let res = []
//   const fun11 = (arr) => {
//     if(Array.isArray(arr)){
//       for(let item of arr){
//         fun11(item)
//       }
//     }else{
//       res.push(arr)
//     }
//   }

//   fun11(arr)
//   console.log(res);
// }
// const nestedArray = [1, [2, [3, 4], 5], 6];
// fun1(nestedArray)

// function fun2(obj, preKey = "", res = {}) {
//   Object.entries(obj).forEach(([key, value]) => {
//     if (value && typeof value=== "object") {
//       fun2(value, preKey + key + ".", res);
//     } else {
//       res[preKey + key] = value;
//     }
//   });
//   return res;
// }

// const fun2 = (obj)=>{
//  let res = {}
//  const fun22 = (obj,pre='') => {
//    return Object.keys(obj).reduce((acc,key)=>{
//     let newKey = pre ? `${pre}.${key}` : key
//     console.log(typeof newKey);
//     if(typeof obj[key] === 'object' && obj[key] !== null){
//       let newobj = fun22(obj[key],newKey)
//       return { ...acc , ...newobj}
//     }else{
//       return {...acc, [newKey]:obj[key]}
//     }
//    },{})
//  }

//  res = fun22(obj)
//  console.log(res)
// }
// const nestedObject = {
//   a: 1,
//   b: {
//     c: 2,
//     d: {
//       e: 3,
//       f: 4
//     }
//   },
//   g: 5
// };
// fun2(nestedObject)

// function flattenMixed(input, prefix = '') {
//   return Object.entries(input).reduce((acc, [key, value]) => {
//     const nestedKey = prefix ? `${prefix}.${key}` : key;
//     if (Array.isArray(value)) {
//       const flattenedArray = flattenArray(value, nestedKey);
//       return { ...acc, ...flattenedArray };
//     } else if (typeof value === 'object' && value !== null) {
//       const flattenedObject = flattenMixed(value, nestedKey);
//       return { ...acc, ...flattenedObject };
//     } else {
//       return { ...acc, [nestedKey]: value };
//     }
//   }, {});
// }

// function flattenArray(arr, prefix = '') {
//   const flattened = {};
//   arr.forEach((item, index) => {
//     if (Array.isArray(item)) {
//       const nestedArray = flattenArray(item, `${prefix}[${index}]`);
//       Object.assign(flattened, nestedArray);
//     } else if (typeof item === 'object' && item !== null) {
//       const flattenedObject = flattenMixed(item, `${prefix}[${index}]`);
//       Object.assign(flattened, flattenedObject);
//     } else {
//       flattened[`${prefix}[${index}]`] = item;
//     }
//   });
//   return flattened;
// }

// const mixedData = {
//   a: 1,
//   b: [
//     { c: 2, d: [3, 4] },
//     { e: { f: 5 } }
//   ],
//   g: { h: 6 }
// };

// const flattenedData = flattenMixed(mixedData);
// console.log(flattenedData);



// function fun3(obj = {}, preKey = "", res = {}) {
//   //空值判断，如果obj是空，直接返回
//   if (!obj) return
//   //获取obj对象的所有[key,value]数组并且遍历，forEach的箭头函数中用了解构
//   Object.entries(obj).forEach(([key, value]) => {
//     if (Array.isArray(value)) {
//       //如果obj是数组，那么key就是数组的index，value就是对应的value
//       //obj是数组的话就用[]引起来
//       //因为value是数组，数组后面是直接跟元素的，不需要.号
//       let temp
//       if (!preKey) {
//         temp = Array.isArray(obj) ? `obj[${key}]` : `${preKey}${key}`
//       } else {
//         temp = Array.isArray(obj) ? `${preKey}[${key}]` : `${preKey}${key}`
//       }
//       fun3(value, temp, res)
//     } else if (typeof value === 'object') {
//       //因为value是对象类型，所以在末尾需要加.号
//       let temp
//       if (!preKey) {
//         temp = Array.isArray(obj) ? `obj[${key}].` : `${preKey}${key}.`
//       } else {
//         temp = Array.isArray(obj) ? `${preKey}[${key}].` : `${preKey}${key}.`
//       }
//       fun3(value, temp, res)
//     } else {
//       let temp
//       if (!preKey) {
//         temp = Array.isArray(obj) ? `obj[${key}]` : `${preKey}${key}`
//       } else {
//         temp = Array.isArray(obj) ? `${preKey}[${key}]` : `${preKey}${key}`
//       }
//       res[temp] = value
//     }
//   })
//   return res;
// }

// const obj1 = [1, 2, 3, { a: 1, b: { c: 2, d: { e: 3 } } }, [4, [5, 6, [7]]]]
// const obj2 = { a: [1, [2, [3]]], b: { c: { d: 1 } }, e: 2, f: 3 }
// const obj3 = [{ a: 1, b: [2, { c: 3 }] }]
// console.log(fun3(obj1));
// console.log(fun3(obj2));
// console.log(fun3(obj3));












// const fun1 = (arr) => {
//   let res = []
//   const fun11 = (arr) => {
//     if (Array.isArray(arr)) {
//       for (let item of arr) {
//         fun11(item)
//       }
//     } else {
//       res.push(arr)
//     }
//   }
// }

// const fun2 =(obj)=>{
//   const fun21=(obj,preKey,res)=>{
//     if(!obj) return 
//     Object.entries(obj).forEach(([key,value]) => {
//       if(value && typeof value === 'object'){
//         fun22(value,preKey + key +'.',res)
//       }else{
//         res[preKey+key] = value
//       }
//     });
//     return res
//   }

//   const fun22=(obj,prekey = '')=>{
//     if(!obj) return 
//     return Object.keys(obj).reduce((acc,curKey)=>{
//       let newKey =prekey? `${prekey}.${curKey}` : curKey
//       if(obj[key] && typeof obj[curKey] === 'object'){
//        let newObj =  fun22(obj[key], newKey)
//        return {...acc, ...newObj}
//       }else{
//         return {...acc, [newKey]:obj[key]}
//       }
//     },{})
//   }

// }

const fun3 = (obj) => {

  const fun31 = (obj = {}, prekey = '', res = {}) => {
    Object.entries(obj).forEach(([key, value]) => {
      let temp
      if (value && Array.isArray(value)) {
        temp = Array.isArray(obj) ? `${prekey}[${key}]` : `${prekey}${key}`
        fun31(value, temp, res)
      } else if (value && typeof value === 'object') {
        temp = Array.isArray(obj) ? `${prekey}[${key}].` : `${prekey}${key}.`
        fun31(value, temp, res)
      } else {
        temp = Array.isArray(obj) ? `${prekey}[${key}]` : `${prekey}${key}`
        res[temp] = value
      }
    })
    return res
  }

  return fun31(obj)
}


const fun4 = (obj = {}, preKey = '', res = {}) => {
  if (!obj) return
  Object.entries(obj).forEach(([key, value]) => {
    let temp
    if (typeof value === 'object') {
      temp = Array.isArray(obj) ? `${preKey}[${key}].` : `${preKey}${key}.`
      fun4(value, temp, res)
    } else if (Array.isArray(value)) {
      temp = Array.isArray(obj) ? `${preKey}[${key}]` : `${preKey}${key}`
      fun4(value, temp, res)
    } else {
      temp = Array.isArray(obj) ? `${preKey}[${key}]` : `${preKey}${key}`
      res[temp] = value
    }
  })
  return res

}

const obj1 = [1, 2, 3, { a: 1, b: { c: 2, d: { e: 3 } } }, [4, [5, 6, [7]]]]
const obj2 = { a: [1, [2, [3]]], b: { c: { d: 1 } }, e: 2, f: 3 }
const obj3 = [{ a: 1, b: [2, { c: 3 }] }]
// console.log(fun3(obj));
// console.log(fun3(obj1));
// console.log(fun3(obj2));
// console.log(fun3(obj3));

console.log(fun4(obj));
console.log(fun4(obj1));
console.log(fun4(obj2));
console.log(fun4(obj3));


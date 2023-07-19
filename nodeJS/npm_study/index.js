// const uniq = require('uniq')

// const arr =[11,11,22,3,2,2,3,4,4,5,123,42,31,2,3]
// // const aa = BigInt(321)
// // console.log(aa);
// const res = uniq(arr)
// console.log(res);


const {arrDeduplication} = require('arr_deduplication')
// const array = [1, 2, 3, 3, 4, 4, 5,66,7,7,7,7,7,8,8,9,8,7];
const array = ['aa','aa','cc','ss','cc','ds','asd','asd','asd','asd','das'];
// const array = [
//   {id:1,name:'aa'},
//   {id:1,name:'bb'},
//   {id:3,name:'aa'},
//   {id:2,name:'bb'},
//   'aa','aaa','aa',
//   1,1,1,2,3,
//   null,null,'null',
//   undefined,undefined,'undefined',
//   [1,2,3],[1,2,3],[1,2],
//   true,true,false,false
// ]

const uniqueArray = arrDeduplication(array,'name');
console.log(uniqueArray);
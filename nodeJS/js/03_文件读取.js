const fs = require('fs')

// 异步读取
// fs.readFile('../txt/静夜思.txt',(err,data)=>{
//   if(err){
//     console.log('读取失败');
//     return
//   }
//   console.log(data.toString());
// })

//流式读取
//2.创建读取流对象
const rs = fs.createReadStream('../txt/静夜思.txt');
//3.绑定data事件
rs.on('data', chunk => {
  //console.log(chunk.length); //65536=>64KB
  console.log(chunk.toString()); //65536 =64KB
});
//4.end可选事件
rs.on('end', () => {
  console.log('读取完成');
});

const fs = require('fs')

// 覆盖式写入
// fs.writeFile('../txt/2_文件写入','三人行必有我师',err=>{
//   if(err){
//     console.log('写入失败');
//     return 
//   }
// })

// 追加写入
// fs.appendFile('../txt/2_文件写入','三人行必有我师',err=>{
//   if(err){
//     console.log('写入失败');
//     return 
//   }
// })

// 流式写入
const ws = fs.createWriteStream('../txt/静夜思.txt')

ws.write('\t静夜思\r\n')
ws.write('床前明月光，\r\n')
ws.write('疑是地上霜, \r\n')
ws.write('举头望明月,\r\n')
ws.write('低头思故乡,\r\n')

ws.close()

const fs = require('fs');
//方式一readFile
// // 读取文件内容
// let data=fs.readFileSync('../mp4/戴森球录制.mp4');
// // 1/1写入文件
// fs.writeFileSync('../mp4/戴森球录制-2.mp4',data);


// 方式二流式操作
// 创建读取流对象
const rs = fs.createReadStream('../mp4/戴森球录制.mp4');
//创建写入流对象
const ws = fs.createWriteStream('../mp4/戴森球录制-3.mp4');

// 绑定data事件
// rs.on('data', chunk => {
//   ws.write(chunk);
// });

rs.pipe(ws)


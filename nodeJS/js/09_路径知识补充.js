const fs = require('fs')
const path = require('path');

let p = path.resolve(__dirname,'../../nodeJS')

// 相对路径有BUG,切换运行文件的目录，就会切换根目录， 改成绝对路径
console.log(p);

fs.readdir(p+'/mp4', (err, data) => {
  if (err) {
    console.log('读取失败');
    return;
  }
  console.log(data);
})


const fs = require('fs');
const path = require('path');
// 写入文件
// let p  = path.resolve(__dirname, '../html/html1.html')
// fs.writeFileSync(p, 'love');
// console.log(__dirname, '/html/html1.html');

//resolve解决
// console.log(path.resolve(__dirname, '../html/html1.html'));

// sep分隔符
// console.log(path.sep);

// parse方法
console.log(__filename);//文件的绝对路径
let str = 'E:\\MyProject\\StudySource\\git_pro\\web_study\\nodeJS\\js\\html\\html1.html';
console.log(path.parse(str));

//basename
console.log(path.basename(str));

//dirname
console.log(path.dirname(str));

//extname
console.log(path.extname(str));
const fs = require('fs')

// fs.unlink('../txt/2_静夜思.txt', err => {
//   if (err) {
//     console.log('删除失败~');
//     return;
//   }

//   console.log('删除成功');
// })

fs.rm('../txt/2_静夜思.txt', err => {
  if (err) {
    console.log('删除失败~');
    return;
  }

  console.log('删除成功');
})
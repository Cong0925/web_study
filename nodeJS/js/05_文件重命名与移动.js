const fs = require('fs')

fs.rename('../mp4/2_静夜思.txt','../txt/2_静夜思.txt',err=>{
  if(err){
    console.log('失败',err);
    return
  }
  console.log('成功');
})
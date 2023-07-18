const fs = require('fs')

fs.stat('../mp4/戴森球录制.mp4',(err,data)=>{
  if(err){
    console.log('失败');
    return
  }
  // console.log(data);
  console.log(data.isFile(),data.isDirectory());
})
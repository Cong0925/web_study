const fs = require('fs')

let files = fs.readdirSync('../js')

files.forEach((item,index)=>{
  // console.log(item)
  let data = item.split('_')
  let [num,name] = data
  if(Number(num)<10){
    num = '0' + num
  }
  let newName = num + '_' + name
  fs.renameSync(`../js/${item}`,`../js/${newName}`)
})
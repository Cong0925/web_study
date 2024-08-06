// 读取 ./data/txtName.txt 文件，并按照日期生成对应的文件夹 和文件

const fs = require('fs');
const path = require('path');

function readItemsFromFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  return data.split('\n').map(item => item.replace(/\r/g, '')).filter(item => item.trim()!== '');
}

function creatF(startDateTime, filePath) {
  const timestampFolder = String(Date.now());

  const txtFolderPath = path.join('./txt', timestampFolder);
  fs.mkdirSync(txtFolderPath, { recursive: true });

  const floadsFolderPath = path.join('./floads', timestampFolder);
  fs.mkdirSync(floadsFolderPath, { recursive: true });

  let arr = readItemsFromFile(filePath);
  console.log(arr)

  let date = new Date(startDateTime.slice(0, 4), startDateTime.slice(4, 6) - 1, startDateTime.slice(6));

  for (let i = 0; i < arr.length; i++) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let formattedDate = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;

    let fileName = `${formattedDate}_${arr[i]}.txt`;
    let filePathTxt = path.join(txtFolderPath, fileName);

    fs.writeFileSync(filePathTxt, '');

    let folderPath = path.join(floadsFolderPath, `${formattedDate}_${arr[i]}`);
    fs.mkdirSync(folderPath, { recursive: true });

    date.setDate(date.getDate() + 1);
  }
}

let startDateTime = '20241010';
let filePath = './data/txtName.txt'; // 请将此处替换为您实际的文件路径

creatF(startDateTime, filePath);
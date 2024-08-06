// 将 ./deal 目录下的所有 .txt 文件名 添加到文件内容中

const fs = require('fs');
const path = require('path');

const dealFolder = './deal';

fs.readdir(dealFolder, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  files
.filter(file => path.extname(file) === '.txt')
.forEach(file => {
    const filePath = path.join(dealFolder, file);
    const fileNameWithoutExtension = path.parse(file).name;
    const content = `十万个为什么之${fileNameWithoutExtension.split('_')[1]}\n\n`;
    fs.writeFile(filePath, content, err => {
      if (err) {
        console.error(`Error writing to file ${filePath}: ${err}`);
        return;
      }
      console.log(`Written to ${filePath} successfully.`);
    });
  });
});
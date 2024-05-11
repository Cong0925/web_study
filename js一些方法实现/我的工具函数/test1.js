const fs = require('fs');
const path = require('path');

// 假设 data1 文件在 src/data1.js 路径下
const data1Path = path.join(__dirname, 'data1.js');

// 读取 data1 文件内容
fs.readFile(data1Path, 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }

    // 使用正则表达式将驼峰式字段名转换为下划线式
    var transformedData = data.replace(/([A-Z])/g, ' $1').replace(/([A-Z][a-z])/g, '$1_').replace(/([a-z])([A-Z])/g, ' $1_$2').replace(/\s+/g, '').replace(/^_/, '').replace(/_$/, '');

    // 将转换后的数据写入到 data1.js 文件中
    fs.writeFile(data1Path, transformedData, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
});

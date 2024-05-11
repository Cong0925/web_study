const fs = require('fs');

function camelToSnakeCase(str) {
    return str.replace(/[A-Z]/g, function (letter) { return "_".concat(letter.toLowerCase()); });
}

function keysToSnakeCase(obj) {
    var newObj = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var newKey = camelToSnakeCase(key);
            newObj[newKey] = obj[key];
        }
    }
    return newObj;
}

function transformArrayObjectsToSnakeCase(arr) {
    return arr.map(function (obj) { return keysToSnakeCase(obj); });
}

// 读取 data.js 文件内容
fs.readFile('data.js', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    // 将读取的字符串转换为 JavaScript 对象
    var jsonObject = JSON.parse(data);

    // 检查 data 是否为数组
    if (Array.isArray(jsonObject.data)) {
        // 转换数组中的对象键名
        var transformedData = transformArrayObjectsToSnakeCase(jsonObject.data);
    } else {
        // 直接转换对象键名
        var transformedData = keysToSnakeCase(jsonObject.data);
    }

    // 将转换后的 data 写回到 jsonObject 中
    jsonObject.data = transformedData;

    // 将转换后的数据写入到 data.js 文件中
    fs.writeFile('data.js', JSON.stringify(jsonObject, null, 2), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
});

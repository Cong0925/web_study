// 判断当前元素的类型
function getDataType(value) {
  const type = typeof value;

  if (type !== "object") {
    return type;
  }

  if (Array.isArray(value)) {
    return "array";
  }

  if (value === null) {
    return "null";
  }

  return "object";
}

// 判断数组是否相等
function isArrayEqual(arr1, arr2) {
  if(arr1 && arr2){
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  
    return true;
  }
  return false
 
}

// 去重函数
function arrDeduplication(arr, targetKey) {
  const unique = [];

  arr.forEach(function(item) {
    if (getDataType(item) === "object" && targetKey && item[targetKey] !== undefined) {
      // 如果是对象类型且指定了 targetKey
      const index = unique.findIndex(function(obj) {
        return obj && obj[targetKey] === item[targetKey];
      });
      if (index === -1) {
        unique.push(item);
      }
    } else if (getDataType(item) === "array") {
      // 如果是数组类型
      const index = unique.findIndex(function(arr) {
        return isArrayEqual(arr, item);
      });
      if (index === -1) {
        unique.push(item);
      }
    } else {
      if (!unique.includes(item)) {
        unique.push(item);
      }
    }
  });
  
  return unique.sort();
}

module.exports = {
  arrDeduplication
}
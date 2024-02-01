// 获取 input 元素
var rowsInput = document.getElementById("rows");
var columnsInput = document.getElementById("columns");
var minesInput = document.getElementById("mines");


// 添加 input 事件监听器，对应 rowsInput 函数
rowsInput.addEventListener("input", function () {
  rowsInputFun(this);
});
columnsInput.addEventListener("input", function () {
  columnsInputFun(this);
});
minesInput.addEventListener("input", function () {
  minesInputFun(this);
});

// 添加 blur 事件监听器，对应 validateMax 函数
rowsInput.addEventListener("blur", function () {
  validateMaxFun(this);
});
columnsInput.addEventListener("blur", function () {
  validateMaxFun(this);
});
minesInput.addEventListener("blur", function () {
  validateMaxFun(this);
});

function rowsInputFun(input) {
  // 移除非数字字符
  input.value = input.value.replace(/[^\d]/g, '');

  // 将字符串转换为数字
  let numberValue = parseInt(input.value, 10);

  // 检查是否在1到100之间
  if (isNaN(numberValue) || numberValue < 1 || numberValue > 100) {
    // 输入不合法，清空输入框并给用户一些反馈
    input.setCustomValidity("请输入1到100之间的整数");
    input.reportValidity();
  } else {
    // 输入合法，清空自定义验证状态
    input.setCustomValidity("");
  }
}
function columnsInputFun(input) {
  // 移除非数字字符
  input.value = input.value.replace(/[^\d]/g, '');

  // 将字符串转换为数字
  let numberValue = parseInt(input.value, 10);

  // 检查是否在1到60之间
  if (isNaN(numberValue) || numberValue < 1 || numberValue > 60) {
    // 输入不合法，清空输入框并给用户一些反馈
    input.setCustomValidity("请输入1到60之间的整数");
    input.reportValidity();
  } else {
    // 输入合法，清空自定义验证状态
    input.setCustomValidity("");
  }
}
function minesInputFun(input) {
  // 移除非数字字符
  input.value = input.value.replace(/[^\d]/g, '');

  // 将字符串转换为数字
  let numberValue = parseInt(input.value, 10);
  let rows = document.getElementById("rows").value;
  let columns = document.getElementById("columns").value;

  // 检查是否在1到100之间
  if (isNaN(numberValue) || numberValue < 1 || numberValue >= rows * columns) {
    // 输入不合法，清空输入框并给用户一些反馈
    input.setCustomValidity("地雷数量不合理");
    input.reportValidity();
  } else {
    // 输入合法，清空自定义验证状态
    input.setCustomValidity("");
  }
  // 设置mines输入框的max属性为rows * columns
  document.getElementById("mines").setAttribute("max", rows * columns - 1);
}
function validateMaxFun(input) {
  let max = parseInt(input.getAttribute("max"), 10);
  let value = parseInt(input.value, 10);

  if (!isNaN(value) && value > max) {
    // 输入值超过最大值，将其设置为最大值
    input.value = max;
  }
}
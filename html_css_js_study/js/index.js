
/*
  obj       执行对象
  attr      修改的样式
  target    目标位置
  speed     移动速度
  callback  回调函数 动画执行完后执行
*/
function move(obj, attr, target, speed, callback) {
  clearInterval(obj.timer)
  var current = parseInt(getComputedStyle(obj, null)[attr])
  if (current < target) {
    speed = speed
  }
  else if (current > target) {
    speed = -speed
  }
  else {
    speed = 0
  }

  obj.timer = setInterval(function () {
    var oldValue = parseInt(getComputedStyle(obj, null)[attr])
    var newValue = oldValue + speed

    if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
      newValue = target
    }
    obj.style[attr] = newValue + 'px'

    if (newValue == target) {
      clearInterval(obj.timer)
      callback && callback()
    }

  }, 1000/60)
}

//增加 类名
function addClass(obj, cn) {
  if (!hasClass(obj, cn)) {
    obj.className += ' ' + cn
  }
}
//判断是否有 某个类名
function hasClass(obj, cn) {
  var reg = new RegExp('\\b' + cn + '\\b')
  return reg.test(obj.className)
}
//删除类名
function removeClass(obj, cn) {
  var reg = new RegExp('\\b' + cn + '\\b')
  obj.className = obj.className.replace(reg, '')
}
//类名切换 有则删除 无责加上
function toggleClass(obj, cn) {
  if(hasClass(obj,cn)){
    removeClass(obj, cn)
  }
  else{
    addClass(obj, cn)
  }
}
// console.log(lrc)

// 初始化 歌词数据
const initWords = () => {
  let lines = lrc.split('\n')
  let res = []
  lines.forEach(item => {
    let parts = item.split(']')
    let timeStr = parts[0].substring(1)
    let obj = {
      time: parseTime(timeStr),
      words: parts[1]
    }
    res.push(obj)
    // console.log(obj)
  });
  // console.log(res)
  return res
}

// 时间字符串转换 秒数
const parseTime = (timeStr) => {
  let parts = timeStr.split(':')
  let time = +parts[0] * 60 + +parts[1]
  // console.log(time)
  return time
}

let lrcData = initWords()

// 获取需要的节点元素
let doms = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('.container ul'),
  container: document.querySelector('.container')
}

// 得到当前显示歌词下标
const findIndex = () => {
  let curTime = doms.audio.currentTime
  for (let i = 0; i < lrcData.length; i++) {
    if (curTime < lrcData[i].time) {
      return i - 1
    }
  }
  return lrcData.length - 1
}

// 歌词元素显示
const creatLrcElements = () => {
  let frag = document.createDocumentFragment() //文档片段
  for (let i = 0; i < lrcData.length; i++) {
    let li = document.createElement('li')
    li.textContent = lrcData[i].words
    frag.appendChild(li)
  }
  doms.ul.appendChild(frag)
  console.log(doms.ul.clientHeight)
}
creatLrcElements()

let containerHeight = doms.container.clientHeight
let liHeight = doms.ul.children[0].clientHeight
let maxHeight = doms.ul.clientHeight - containerHeight

//设置偏移
const setOffset = () => {
  let index = findIndex()
  let offset = liHeight * index + liHeight / 2 - containerHeight / 2
  console.log(doms.ul.clientHeight,containerHeight)
  if (offset < 0) {
    offset = 0
  } else if (offset > maxHeight) {
    offset = maxHeight
  }
  doms.ul.style.transform = `translateY(-${offset}px)`

  let li = doms.ul.querySelector('.active')
  if (li) {
    li.classList.remove('active')
  }
  li = doms.ul.children[index]
  if (li) {
    li.classList.add('active')
  }
}

doms.audio.addEventListener('timeupdate', setOffset)

// 添加滚动事件监听器
doms.container.addEventListener('wheel', function(event) {
  var deltaY = event.deltaY; // 获取滚动的垂直方向位移
  doms.container.scrollTop += deltaY; // 根据滚动位移调整列表的滚动位置
  event.preventDefault(); // 阻止页面滚动
});

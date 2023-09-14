// const UIGoods = (g) => {
//   return {
//     data:g,
//     choose:0
//   }
// }

// function UIGoods(g) {
//   this.data = g
//   this.choose = 0
// }
// // 获取总价
// UIGoods.prototype.getTotalPrice = function () {
//   return this.data.price * this.choose
// }
// // 是否选中商品
// UIGoods.prototype.isChoose = function () {
//   return this.choose > 0
// }
// let uig = UIGoods(goods[0])
// console.log(uig);

// 单件商品数据
class UIGoods {
  constructor(g) {
    this.data = g
    this.choose = 0
  }
  // 获取总价
  getTotalPrice() {
    return this.data.price * this.choose
  }
  // 是否选中商品
  isChoose() {
    return this.choose > 0
  }
  //增加选择数量
  increase() {
    this.choose++
  }
  //减少选择数量
  decrease() {
    if (this.choose === 0) {
      return
    }
    this.choose--
  }
}

// 页面数据
class UIData {
  constructor() {
    let uiGoods = []
    goods.forEach(item => {
      let uig = new UIGoods(item)
      uiGoods.push(uig)
    })
    this.uiGoods = uiGoods // 页面商品数据
    this.startSendPrice = 30 // 起送价格
    this.needSendPrice = 5 // 配送费
  }
  // 获取总价
  getTotalPrice() {
    let sum = 0
    this.uiGoods.forEach((item, index) => {
      sum += item.getTotalPrice()
    })
    return sum
  }
  // 增加某个商品数量
  increase(index) {
    this.uiGoods[index].increase()
  }
  // 减少某个商品数量
  decrease(index) {
    this.uiGoods[index].decrease()
  }
  // 一共选择商品数量
  getTotalChooseNum() {
    let sum = 0
    this.uiGoods.forEach((item) => {
      sum += item.choose
    })
    return sum
  }
  // 是否有商品在购物车
  isGoodsInCar() {
    return this.getTotalChooseNum() > 0
  }
  // 是否达到配送门槛
  isStartSendPrice() {
    return this.getTotalPrice() > this.startSendPrice
  }
  // 是否选中
  isChoose(index) {
    return this.uiGoods[index].isChoose()
  }
}

// 整个界面
class UI {
  constructor() {
    this.uiData = new UIData()
    this.doms = {
      goodsContainer: document.querySelector('.goods-list'), // 商品块
      deliveryPrice: document.querySelector('.footer-car-tip'), // 页脚配送费
      footerPay: document.querySelector('.footer-pay'), // 页脚起送费
      footerPayInnerSpan: document.querySelector('.footer-pay span'), // 页脚距离起送差价 
      totalPrice: document.querySelector('.footer-car-total'), // 页脚总价
      car: document.querySelector('.footer-car'), // 购物车元素
      badge: document.querySelector('.footer-car-badge'), // 购物车商品数量

    }

    let carRect = this.doms.car.getBoundingClientRect() // 购物车元素坐标信息
    let jumpTarget = {
      x: carRect.left + carRect.width / 2,
      y: carRect.top + carRect.height / 5
    } // 商品数量跳跃的最终位置
    this.jumpTarget = jumpTarget

    this.creatHTML() // 初始化商品列表
    this.updateFooter() // 更新页脚信息
    this.listenEvent() // 事件监听
  }

  // 监听各种事件
  listenEvent() {
    this.doms.car.addEventListener('animationend', function () {
      this.classList.remove('animate')
    }) // 监听购物车变化
  }

  // 根据商品数据,创建商品元素
  creatHTML() {
    let html = ''
    this.uiData.uiGoods.forEach((item, index) => {
      html += `<div class="goods-item">
        <img src="${item.data.pic}" alt="" class="goods-pic" />
        <div class="goods-info">
          <h2 class="goods-title">${item.data.title}</h2>
          <p class="goods-desc">${item.data.desc}</p>
          <p class="goods-sell">
            <span>月售 ${item.data.sellNumber}</span>
            <span>好评率${item.data.favorRate}%</span>
          </p>
          <div class="goods-confirm">
            <p class="goods-price">
              <span class="goods-price-unit">￥</span>
              <span>${item.data.price}</span>
            </p>
            <div class="goods-btns">
              <i index="${index}" class="iconfont i-jianhao"></i>
              <span>${item.choose}</span>
              <i index="${index}" class="iconfont i-jiajianzujianjiahao"></i>
            </div>
          </div>
        </div>
      </div>`
    })
    this.doms.goodsContainer.innerHTML = html
  }
  // 选择增加商品
  increase(index) {
    this.uiData.increase(index)
    this.updateGoodsItem(index)
    this.updateFooter()
    this.jump(index)
  }
  // 选择减少商品
  decrease(index) {
    this.uiData.decrease(index)
    this.updateGoodsItem(index)
    this.updateFooter()
  }
  // 更新元素显示状态
  updateGoodsItem(index) {
    let goodsDom = this.doms.goodsContainer.children[index]
    if (this.uiData.isChoose(index)) {
      goodsDom.classList.add('active')
    }
    else {
      goodsDom.classList.remove('active')
    }
    let span = goodsDom.querySelector('.goods-btns span')
    span.textContent = this.uiData.uiGoods[index].choose
  }
  // 更新页脚
  updateFooter() {
    let totalPrice = this.uiData.getTotalPrice()
    // 设置配送费
    this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.needSendPrice}`
    // 设置起送
    if (this.uiData.isStartSendPrice()) {
      this.doms.footerPay.classList.add('active')
    }
    else {
      this.doms.footerPay.classList.remove('active')
      // 更新还差多少钱
      let dis = this.uiData.startSendPrice - totalPrice
      dis = Math.round(dis)
      this.doms.footerPayInnerSpan.textContent = `还差￥${dis}元起送`
    }
    // 设置总价
    this.doms.totalPrice.textContent = totalPrice.toFixed(2)
    // 设置购物车样式状态
    if (this.uiData.isGoodsInCar()) {
      this.doms.car.classList.add('active')
    }
    else {
      this.doms.car.classList.remove('active')
    }
    // 设置购物车数量
    this.doms.badge.textContent = this.uiData.getTotalChooseNum()
  }
  // 购物车动画
  carAnimate() {
    this.doms.car.classList.add('animate')
  }
  // 跳跃抛物线
  jump(index) {
    let btnadd = this.doms.goodsContainer.children[index].querySelector('.i-jiajianzujianjiahao')
    let rect = btnadd.getBoundingClientRect()
    let start = {
      x: rect.left,
      y: rect.top
    }

    let div = document.createElement('div')
    div.className = 'add-to-car'
    let i = document.createElement('i')
    i.className = 'iconfont i-jiajianzujianjiahao'
    // div.style.transform = `translate(${start.x}px,${start.y}px)`

    div.style.transform = `translateX(${start.x}px)`
    i.style.transform = `translateY(${start.y}px)`
    div.appendChild(i)
    document.body.appendChild(div)
    // 强行渲染
    div.clientWidth;

    // 到目标位置
    // div.style.transform = `translate(${this.jumpTarget.x}px,${this.jumpTarget.y}px)`

    div.style.transform = `translateX(${this.jumpTarget.x}px)`
    i.style.transform = `translateY(${this.jumpTarget.y}px)`

    let that = this
    div.addEventListener('transitionend', function () {
      div.remove()
      that.carAnimate()
    }, {
      once: true // 仅触发一次
    })
  }
}

let ui = new UI()

// 事件
ui.doms.goodsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('i-jiajianzujianjiahao')) {
    let index = +e.target.getAttribute('index')
    ui.increase(index)
  } else if ('i-jianhao') {
    let index = +e.target.getAttribute('index')
    ui.decrease(index)
  }
})
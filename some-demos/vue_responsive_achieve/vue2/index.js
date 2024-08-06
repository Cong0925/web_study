class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm
    this.key = key
    this.callback = callback

    Dep.target = this
    this.oldValue = vm[key]
    Dep.target = null
  }
  update() {
    const newValue = this.vm[this.key]
    if (newValue === this.oldValue) return
    this.callback(newValue)
    this.oldValue = newValue
  }

}

class Compile {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el
    this.compile(this.el)
  }

  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (node.nodeType === 3) {
        this.compileText(node)
      }

      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  compileText(node) {
    const reg = /\{\{(.+?)\}\}/g
    const value = node.textContent.replace(/\s/g, '')

    const tokens = []

    let result, index, lastIndex = 0
    while (result = reg.exec(value)) {
      index = result.index

      if (index > lastIndex) {
        tokens.push(value.slice(lastIndex, index))
      }
      const key = result[1].trim()
      tokens.push(this.vm[key])

      lastIndex = index + result[0].length

      const pos = tokens.length - 1
      // 更新操作
      new Watcher(this.vm, key, newValue => {
        tokens[pos] = newValue
        node.textContent = tokens.join('')
      })
    }
    if (lastIndex < value.length) {
      tokens.push(value.slice(lastIndex))
    }
    if (tokens.length) {
      node.textContent = tokens.join('')
    }
  }
}

class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }

}

class Observer {
  constructor(data) {
    this.data = data
    this.dep = new Dep()
    this.walk(data)
  }

  walk(data) {
    const dep = this.dep
    Object.keys(data).forEach(key => {
      myDefineProperty(data, key, data[key], dep)
    })
  }
}

function myDefineProperty(data, key, value, dep) {
  if (typeof value === 'object' && value !== null) {
    return new Observer(value)
  }
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set(newValue) {
      if (newValue === value) return
      value = newValue
      if (typeof value === 'object' && value !== null) {
        return new Observer(value)
      }
      dep.notify()
    }
  })
}

class Vue {
  constructor(options) {
    this.$options = options || {}
    this.$data = options.data || {}
    const el = options.el
    this.$el = typeof el === 'string' ? document.querySelector(el) : el

    // 1.将属性注入到vue实例
    myProxy(this, this.$data)

    // 2.创建 observer 进行 data 属性变化监听
    new Observer(this.$data)

    // 3. 视图解析
    new Compile(this)

  }
}
function myProxy(target, data) {
  Object.keys(data).forEach(key => {
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get() {
        return data[key]
      },
      set(newValue) {
        data[key] = newValue
      }
    })
  })
}
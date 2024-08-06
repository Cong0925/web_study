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
    this.$methods = options.methods || {}
    this.$watch = options.watch || {}

    // 钩子函数执行
    options.mounted()

    // 1.将属性注入到vue实例
    myProxy(this, this.$data)

    // 2.创建 observer 进行 data 属性变化监听
    new Observer(this.$data)

    // 3. 视图解析
    new Compile(this)

    // 4. 添加 methods 的初始化
    if (options.methods) {
      initMethods(this, options.methods);
    }
    // 初始化 watch 选项
    if (options.watch) {
      for (const key in options.watch) {
        this.watch(key, options.watch[key]);
      }
    }
  }
  watch(expOrFn, callback) {
    let whiteList = ['TEXTAREA', 'INPUT'];
    if (typeof expOrFn === 'string') {
      const element = document.getElementById(expOrFn);
      if (element && whiteList.includes(element.tagName)) {
        let oldVal = element.value;  // 新增：存储旧值
        element.addEventListener('input', () => {
          const newVal = element.value;
          callback(this, newVal, oldVal);  // 修改：将新值和旧值都传递给 callback
          oldVal = newVal;  // 更新旧值
        });
      }
    } else if (typeof expOrFn === 'function') {
      let oldVal;  // 新增：为函数式监听存储旧值
      const watcher = new Watcher(this, expOrFn, (vm, newVal) => {
        callback(vm, newVal, oldVal);  // 修改：将新值和旧值都传递给 callback
        oldVal = newVal;  // 更新旧值
      });
      this.watchers.push(watcher);
    }
  }
}

//  methods 的初始化
function initMethods(vm, methods) {
  for (const key in methods) {
    if (typeof methods[key] !== 'function') {
      throw new Error(`Method "${key}" has an undefined value in the component definition. Did you reference the function correctly?`);
    }
    if ((key in vm) && isReserved(key)) {
      throw new Error(`Method "${key}" conflicts with an existing Vue instance method. Avoid defining component methods that start with _ or $.`);
    }
    vm[key] = methods[key];
  }
}
function isReserved(str) {
  const c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

// 属性注入到vue实例
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
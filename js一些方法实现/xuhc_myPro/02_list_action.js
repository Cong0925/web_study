
// 链表 节点
function ListNode(val) {
    this.val = val
    this.next = null
}
// 链表结构
function List() {
    this.head = null
    this.length = function () {
        let length = 0
        if (!this.head) return length
        let cur = this.head
        while (cur) {
            cur = cur.next
            length++
        }
        return length
    }
}
// 添加节点
List.prototype.add = function (...args) {
    let cur = this.head;
    if (!this.head) {
        this.head = new ListNode(args.splice(0, 1)[0])
        cur = this.head
    } else {
        while (cur.next) {
            cur = cur.next
        }
    }
    args.forEach((item) => {
        cur.next = new ListNode(item)
        cur = cur.next
    })
}
// 根据节点进行删除
List.prototype.delNode = function (node) {
    if (!this.head) return console.log('当前链表为空')
    if (node === 0 || node > this.length() || -node > this.length()) return console.log(`节点从1开始,链表长度为${this.length()}`)

    if (node > 0) {
        let cur = this.head
        let n = 1
        while (n < node - 1) {
            cur = cur.next
            n++
        }
        cur.next = cur.next.next
    } else {
        let cur1 = this.head
        let cur2 = this.head
        for (let i = 0; i <= (-node); i++) {
            cur1 = cur1.next
        }
        while (cur1) {
            cur1 = cur1.next
            cur2 = cur2.next
        }
        cur2.next = cur2.next.next
    }
}
// 删除第一个符合条件的节点
List.prototype.delFirstVal = function (val) {
    if (!this.head) return console.log('当前链表为空')
    if (this.head.val === val) {
        this.head = this.head.next
        return console.log('删除节点为头结点')
    }
    let cur = this.head
    let pre = null
    while (cur !== null && cur.val !== val) {
        pre = cur
        cur = cur.next
    }
    if (cur !== null) {
        pre.next = cur.next
    } else {
        return console.log('当前值不在链表中！')
    }
}
// 删除所有符合条件值得节点
List.prototype.delAllVal = function (val) {
    if (!this.head) return console.log('当前链表为空')
    let cur = this.head
    let preN = null
    while (cur !== null) {
        if (this.head.val === val) {
            this.head = this.head.next
            cur = this.head
            break
        }
        if (cur.val === val) {
            preN.next = cur.next
            cur = cur.next
        } else {
            preN = cur
            cur = cur.next
        }
    }
}
// 根据节点，值进行替换
List.prototype.update = function (node, val) {
    if (!this.head) return console.log('当前链表为空')
    if (node === 0 || node > this.length() || -node > this.length()) return console.log(`节点从1开始,链表长度为${this.length()}`)

    if (node > 0) {
        let cur = this.head
        let n = 1
        while (n < node) {
            cur = cur.next
            n++
        }
        cur.val = val
    } else {
        let cur1 = this.head
        let cur2 = this.head
        for (let i = 0; i < (-node); i++) {
            cur1 = cur1.next
        }
        while (cur1) {
            cur1 = cur1.next
            cur2 = cur2.next
        }
        cur2.val = val
    }
}
// 获取 节点的值
List.prototype.getNodeVal = function (node) {
    if (!this.head) return console.log('当前链表为空')
    if (node === 0 || node > this.length() || -node > this.length()) return console.log(`节点从1开始,链表长度为${this.length()}`)

    if (node > 0) {
        let cur = this.head
        let n = 1
        while (n < node) {
            cur = cur.next
            n++
        }
        return cur.val
    } else {
        let cur1 = this.head
        let cur2 = this.head
        for (let i = 0; i < (-node); i++) {
            cur1 = cur1.next
        }
        while (cur1) {
            cur1 = cur1.next
            cur2 = cur2.next
        }
        return cur2.val
    }
}
// 获取值对应的节点
List.prototype.getValNode = function (val) {
    if (!this.head) return console.log('当前链表为空')
    let n = 1
    if (this.head.val === val) return console.log(`当前值在第${n}个节点`)
    let cur = this.head
    let pre = null
    while (cur && cur.val !== val) {
        pre = cur
        cur = cur.next
        n++
    }
    if (cur !== null) {
        return console.log(`当前值在第${n}个节点`)
    } else {
        return console.log('当前值不在链表中！')
    }
}
// 根据节点 进行插入
List.prototype.insertVal = function (node, val) {
    if (!this.head) {
        this.head = new ListNode(val)
        return this.console.log('链表为空，直接插入')
    }
    if (node === 0 || node > this.length() || -node > this.length()) return console.log(`节点从1开始,链表长度为${this.length()}`)
    if (node === 1) {
        let stepN = this.head
        this.head = new ListNode(val)
        this.head.next = stepN
    } else if (node > 1) {
        let cur = this.head
        let n = 1

        while (n < node - 1) {
            cur = cur.next
            n++
        }
        let nextN = cur.next
        cur.next = new ListNode(val)
        cur.next.next = nextN
    } else {
        let cur1 = this.head
        let cur2 = this.head
        for (let i = 0; i < (-node); i++) {
            cur1 = cur1.next
        }
        while (cur1) {
            cur1 = cur1.next
            cur2 = cur2.next
        }
        let stepN = cur2.next
        cur2.next = new ListNode(val)
        cur2.next.next = stepN
    }
}
// 反转链表
List.prototype.reserve = function () {
    let preN = null;
    let curN = this.head;
    let nextN = null
    while (curN !== null) {
        nextN = curN.next
        curN.next = preN
        preN = curN
        curN = nextN
    }
    this.head = preN
}
// 链表内容打印到数组里展示
List.prototype.console = function () {
    let curNode = this.head
    let arr = []
    while (curNode) {
        arr.push(curNode.val)
        curNode = curNode.next
    }
    console.log(arr)
}
// 合并多个有序链表 借助add方法
List.prototype.content = function (...args) {
    function fun(li1, li2) {
        let li = new List()
        let len = li2.length()
        let a1 = li1.head
        let a2 = li2.head
        while (len > 0) {
            if ((a1 !== null) && (a1.val < a2.val)) {
                li.add(a1.val)
                a1 = a1.next
            } else {
                li.add(a2.val)
                a2 = a2.next
                len--
            }
        }
        return li
    }
    let list = args.reduce(fun, this)

    return list
}
// 合并多个有序链表 不借助其他原型链方法
List.prototype.content1 = function (...args) {
    function fun(li1, li2) {
        let li = new List()
        let a1 = li1.head
        let a2 = li2.head
        let count = 0
        if (a1.val <= a2.val) {
            li.head = a1
            a1 = a1.next
        } else {
            li.head = a2
            a2 = a2.next
        }
        let step = li
        while (a1 && a2) {
            if (a1.val < a2.val) {
                if (count === 0) li.head.next = a1
                else li.next = a1
                a1 = a1.next
            } else {
                if (count === 0) li.head.next = a2
                else li.next = a2
                a2 = a2.next
            }
            count++
            li = count === 1 ? li.head.next : li.next
        }
        if (a1) li.next = a1
        if (a2) li.next = a2
        return step
    }
    let list = args.reduce(fun, this)

    return list
}
// 链表排序 返回新链表
List.prototype.sort = function(){
    let arr = []
    let cur = this.head
    while(cur){
        arr.push(cur.val)
        cur = cur.next
    }
    arr.sort((a,b)=>a-b)
    let li = new List()
    li.add(...arr)
    return  li
}
// 链表排序 修改原链表
List.prototype.sort1 = function(){
    let arr = []
    let cur = this.head
    while(cur){
        arr.push(cur.val)
        cur = cur.next
    }
    for(let i=0;i<arr.length -1;i++){
        for(let j=i+1;j<arr.length;j++){
            if(arr[i] > arr[j]){
                let step = arr[i]
                arr[i] = arr[j]
                arr[j] = step
            }
        }
    }
    this.head = null
    this.add(...arr)
}
// 


let list1 = new List()
list1.add(1, 3, 5, 7, 9)

let list2 = new List()
list2.add(2, 4, 6, 8, 10)

let list4 = new List()
list4.add(2, 4, 6, 8, 10)

let list5 = new List()
list5.add(1, 2, 2, 3, 4, 5, 6, 34, 244, 344, 444)

// // 合并，多个有序链表 借助add方法
// let list3 = list1.content(list2, list4, list5)
// list3.console()

// 合并，多个有序链表 不借助其他原型链方法
let list11 = list1.content1(list2, list4, list5)
list11.console()

// // 排序，修改原链表
// let list6 = new List()
// list6.add(1,2,33,12,3,123,4,1241,2,23,1,3,21,412,4,123)
// list6.sort1()
// list6.getValNode(1241)

// // 排序，不修改原链表
// let list7 = new List()
// list7.add(1,2,33,12,3,123,4,1241,2,23,1,3,21,412,4,123)
// let aa = list7.sort()
// list6.getValNode(1241)
// aa.console()
// list7.console()

// list.console()
// list.reserve()
// list.console()
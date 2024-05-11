// 不用加号实现相加
function fun1(n1, n2) {
    return (Math.max(n1, n2) * 2 - (Math.max(n1, n2) - Math.min(n1, n2)))
}
// console.log(fun1(5,2))

// 有效括号数量
function fun2(str) {
    let left = []
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            left.push(i)
        }
    }
    console.log('left', left)
    let right = []
    let res = 0
    for (let i = left.length - 1; i >= 0; i--) {
        for (let j = i + 1; j < str.length; j++) {
            if (!right.includes(j)) {
                right.push(j)
                res++
                break
            }
        }
    }
    console.log(res)
    return res
}
let str = 'asd(())()(())()'
// fun2(str)

// 快排递归
function fun3(arr) {
    if (arr.length <= 1) return arr

    let p = arr[arr.length - 1]
    let left = []
    let right = []
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] <= p) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return fun3(left).concat(p, fun3(right))
}
let arr = [45, 3, 4, 1, 2, 34, 5, 6, 4, 3, 4, 5, 6, 7, 8, 9, 6, 4, 3, 5, 7]
// console.log(fun3(arr))

// 二分查找
function fun4(arr, target) {
    let left = 0
    let rigth = arr.length - 1
    while (left <= rigth) {
        let mid = Math.floor((left + rigth) / 2)
        if (arr[mid] === target) {
            return mid
        } else if (arr[mid] > target) {
            rigth = mid - 1
        } else if (arr[mid] < target) {
            left = mid + 1
        }
    }
    return -1
}
let arr4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(fun4(arr4,10))

// 找到和为目标值的数组下标
function fun5(arr, target) {
    let res = []
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                res.push([i, j])
            }
        }
    }
    return res
}
let arr5 = [1, 2, 3, 4, 5, 6, 7, 23, 34, 5, 234, 234, 3, 2, 4, 5]
// console.log(fun5(arr5,6))

// 排序 时间复杂度小于 O(nlogn)，， O(1) O(log n) O(n) O(nlogn) O(n^2) O(2^n) O(n!)
function fun6(arr) {
    if (arr.length === 0) return []
    let max = Math.max(...arr) // 10
    let min = Math.min(...arr) // 1
    let count = new Array(max - min + 1).fill(0) // length=10 
    for (let num of arr) {
        count[num - min]++
    }
    let index = 0
    for (let i = 0; i < arr.length; i++) {
        while (count[i] > 0) {
            arr[index++] = i + min
            count[i]--
        }
    }
    return arr
}
let arr6 = [1, 3, 5, 7, 9, 8, 6, 4, 2, 10]
// console.log(fun6(arr6))

// 字符串数字相加
function fun7(str1, str2) {
    let res = []
    let r1 = str1.length - 1
    let r2 = str2.length - 1
    let step = 0
    while (r1 >= 0 || r2 >= 0 || step > 0) {
        let sum = step
        if (r1 >= 0) {
            sum += Number(str1[r1])
            r1--
        }
        if (r2 >= 0) {
            sum += Number(str2[r2])
            r2--
        }
        step = sum >= 10 ? 1 : 0
        res.push(sum >= 10 ? sum % 10 : sum)
    }
    return res.reverse().join('')
}
// console.log(fun7('445','9555'))

// 堆排序
function fun8(arr) {
    const heapSort = (arr) => {
        let n = arr.length
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i)
        }
        console.log(arr)
        for (let i = n - 1; i >= 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]]
            heapify(arr, i, 0)
        }
    }
    const heapify = (arr, n, i) => {
        let largest = i
        let left = 2 * i + 1
        let right = 2 * i + 2
        if (left < n && arr[left] > arr[largest]) {
            largest = left
        }
        if (right < n && arr[right] > arr[largest]) {
            largest = right
        }
        if (largest !== i) {
            [arr[largest], arr[i]] = [arr[i], arr[largest]]
        }
    }

    heapSort(arr)
    return arr
}
let arr8 = [64, 34, 25, 12, 22, 11, 90]
// console.log(fun8(arr8)) // [11,12,22,25,34,64,90]

// 全排列组合
function fun9(params) {
    let res = []
    const paileizuhe = (curArr, leaveArr) => {
        if (leaveArr.length === 0) {
            res.push(curArr.join(''))
            return
        }
        for (let i = 0; i < leaveArr.length; i++) {
            let next = curArr.concat(leaveArr[i])
            let leaveArrCopy = [...leaveArr.slice(0, i), ...leaveArr.slice(i + 1)]
            paileizuhe(next, leaveArrCopy)
        }
    }
    let arr = params
    if (!Array.isArray(arr)) {
        arr = arr.split('')
    }
    paileizuhe([], arr)
    return res
}
let arr9 = ['q', 'w', 'e', 'r']
let str9 = 'qwer'
// console.log(fun9(arr9), fun9(str9), fun9(arr9).join() === fun9(str9).join())

// Object.defineProperty 设置get、set
function fun10(num) {
    let obj = { _birth: num, age: 0 }
    Object.defineProperty(obj, 'year', {
        set: function (val) {
            if (val >= this._birth) {
                this.age = val - this._birth
            }
            console.log('age:', this.age)
        },
        get: function () { return this._birth + this.age }
    })
    obj.year = 2024
}
let birthYear = 2001
// fun10(birthYear)

// n*n的矩阵有多少个i*i的完美矩阵(1的数量等于0的数量)
function fun11(arr) {
    let n = arr11.length  // 6 * 6 ,n=6
    let res = []
    let resCount = 0
    for (let i = 2; i <= n; i += 2) {
        for (let m = 0; m < n - (i - 1); m++) {
            let newArr = []
            for (let j = 0; j < i; j++) {
                newArr.push(arr[j].slice(m, m + i))
            }
            let oneCount = 0
            for (let a = 0; a < newArr.length; a++) {
                oneCount += newArr[a].filter((item) => item === 1).length
            }
            // console.log(newArr,oneCount)
            if (oneCount === i * i / 2) {
                resCount++
                res.push(newArr)
            }
        }
    }
    return [res, resCount]
}
let arr11 = [
    [0, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 1, 0],
    [1, 0, 0, 1, 1, 0],
    [1, 0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0]
]
// console.log(fun11(arr11)[1])

// 正整数数组，未知元素为0，使用[l,r]范围数字替代。数组之和的最大值最小值，询问q次
// 比如询问 q=5 次，每次替换后计算数组之和，得到[51, 48, 46, 51, 41],此时min=41,max =51
function getAreaCount(area) {
    return Math.floor(Math.random() * (area[1] - area[0] + 1)) + area[0]
}
function fun12(arr, l, r, q) {
    let min = null
    let max = arr[0]
    function fn(arr, l, r) {
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 0) {
                newArr.push(getAreaCount([l, r]))
            } else {
                newArr.push(arr[i])
            }
        }
        console.log(newArr.reduce((sum, cur) => sum + cur, 0))
        return newArr.reduce((sum, cur) => sum + cur, 0)
    }

    for (let i = 0; i < q; i++) {
        let sum = fn(arr, l, r)
        min = min || sum
        min = Math.min(min, sum)
        max = Math.max(max, sum)
    }
    console.log(min, max)
    return [min, max]
}
let arr12 = [0, 0, 0]
// fun12(arr12,10,20,5)

// 替换’MT‘字符
function fun13(str, k) {
    let replaceCount = 0
    let regMT = /MT/g
    let regT = /M[^T]/g
    let regM = /[^M]T/g
    let resArr = []
    resArr = str.match(regMT)
    str = str.replaceAll('MT', '')
    for (let i = 0; i < str.length; i++) {
        if (regT.test(str)) {
            str = str.replace(str.match(regT)[0], '')
            resArr.push('MT')
            replaceCount++
        } else if (regM.test(str)) {
            str = str.replace(str.match(regM)[0], '')
            resArr.push('MT')
            replaceCount++
        }
        if (replaceCount >= k) {
            break
        }
    }
    while (replaceCount + 2 <= k) {
        if (str.length >= 2) {
            str = str.replace(str.slice(0, 2), '')
            resArr.push('MT')
            replaceCount += 2
        } else {
            break
        }
    }
    return [resArr.length, resArr.join('') + str]
}
let str13 = 'MTMQRTMRTQQQQ'
let k13 = 10
// console.log(fun13(str13, k13))

// 去除区间使得数组元素相乘末尾至少k个0
function fun14(arr, k) {
    let product = arr.reduce((p, cur) => p * cur, arr[0])
    let area = []
    for (let i = 0; i <= arr.length; i++) {
        for (let j = i; j <= arr.length; j++) {
            let a = arr.slice(i, j).reduce((p, cur) => p / cur, product)
            if (a % Math.pow(10, k) === 0) {
                area.push([i, j, a])
            }
        }
    }
    return area
}
let arr14 = [1, 2, 3, 4, 5, 6, 5, 8, 9, 10] // 数组
let k = 3 // 至少k个0
// console.log(fun14(arr14, k))

// 顺序数组循环删除
function fun15(arr) {
    let n = arr.length
    let delArr = []
    let stepArr = []
    let count = n
    let idx = 2
    while (n > 1) {
        stepArr.push(arr[idx])
        idx += 3
        n--
        while (idx > count - 1) {
            idx = idx % count
            stepArr.forEach((item) => {
                arr.splice(arr.indexOf(item), 1)
            })
            delArr.push(...stepArr)
            stepArr = []
            count = arr.length
        }
    }
    console.log(delArr)
    return arr[0]
}
let arr15 = [0, 1, 2, 3, 4, 5, 6, 7]
// console.log(fun15(arr15))

// 统计字符集合
function fun16(arr) {
    let n = arr.length - 1
    let res = []
    while (n >= 0) {
        let map = new Map()
        for (let i = 0; i < arr[n].length; i++) {
            if (!map.has(arr[n][i])) {
                map.set(arr[n][i], 1)
            } else {
                let count = map.get(arr[n][i])
                count++
                map.set(arr[n][i], count)
            }
        }
        res.push(map)
        n--
    }
    res.forEach((item) => {
        let arr = Array.from(item)
        arr.sort((a, b) => a[0].localeCompare(b[0]))
        item = new Map(arr)
    })
    return res
}
let arr16 = ['asfga', 'qghsfs', 'agascvadswh', 'qwertyuioplkjhgfdsazxcvbnm', 'asdfghjk', 'aaassdddfff']
// console.log(fun16(arr16))

// 数独解决
function fun17(arr) {
    // 初始判断
    function solveSudoku(board) {
        if (solveBoard(board)) {
            return board
        } else {
            return null //无解
        }
    }

    // 回溯解决每一个元素
    function solveBoard(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                // 检查是否需要填入元素 ，0是默认值，元素范围1~9
                if (board[row][col] === 0) {
                    // 从元素范围 1~9 填入数字挨个测试
                    for (let num = 9; num > 0; num--) {
                        // 调用检查方法，检查合格则进行赋值
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num
                            // 从当前填入值进行递归填入，检查后续是否能够完成填写
                            if (solveBoard(board)) {
                                return true
                            }
                            // 递归失败则重新赋值 num
                            board[row][col] = 0
                        }
                    }
                    return false
                }
            }
        }
        return true
    }

    // 检查填入元素是否合适
    function isValid(board, row, col, num) {
        // 行检查
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num && i !== col) {
                return false
            }
        }
        // 列检查
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num && i !== row) {
                return false
            }
        }
        // 3*3格内检查
        const startRow = Math.floor(row / 3) * 3 // 范围内的起始行索引
        const startCol = Math.floor(col / 3) * 3 // 范围内的起始列索引
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num && i !== row && j !== col) {
                    return false
                }
            }
        }
        return true
    }

    // 初始数独版填入
    const solvedBoard = solveSudoku(arr)
    if (solvedBoard) {
        solvedBoard.forEach(row => console.log(row.join(' ')))
    } else {
        return '无解'
    }

    return solvedBoard
}
let arr17 = [
    [0, 0, 8, 7, 1, 9, 2, 4, 5],
    [9, 0, 5, 2, 3, 4, 0, 8, 6],
    [0, 7, 4, 8, 0, 6, 1, 0, 3],
    [7, 0, 3, 0, 9, 2, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 6, 1, 4, 0, 3, 5, 2, 9],
    [4, 0, 0, 0, 2, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 0, 0, 7, 0],
    [1, 0, 7, 0, 6, 8, 0, 5, 0]
]
// console.log(fun17(arr17))

// 生成数独题目
function fun18(spaceNull) {
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    let N = 9
    let board = Array(9).fill(0)
    board.forEach((item, index) => {
        board[index] = Array(9).fill(0)
    })

    function creatBoard(row, col) {
        if (col >= N) {
            col = 0
            row++
        }
        if (row >= N) {
            return true
        }
        if (board[row][col] !== 0) {
            return creatBoard(row, col + 1)
        }
        for (let num = 1; num <= N; num++) {
            let item = getRandom(1, 9)
            if (isValid(board, row, col, item)) {
                board[row][col] = item
                if (creatBoard(row, col + 1)) {
                    return true
                }
                board[row][col] = 0
            }
        }
        return false
    }

    // 检查填入元素是否合适
    function isValid(board, row, col, num) {
        for (let i = 0; i < N; i++) {
            if (board[row][i] === num || board[i][col] === num) {
                return false
            }
        }
        // 3*3格内检查
        const startRow = Math.floor(row / 3) * 3 // 范围内的起始行索引
        const startCol = Math.floor(col / 3) * 3 // 范围内的起始列索引
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num) {
                    return false
                }
            }
        }
        return true
    }

    // 移除部分元素
    function removeValue(spaceNull) {
        let removeArr = []
        while (removeArr.length < spaceNull) {
            let row = Math.floor(Math.random() * 8)
            let col = Math.floor(Math.random() * 8)
            if (board[row][col] !== 0 && !removeArr.includes([row, col])) {
                removeArr.push([row, col])
                board[row][col] = 0
            }
        }
    }
    creatBoard(0, 0)
    removeValue(spaceNull)
    return board
}
let spaceNull18 = 40
// console.log(fun18(spaceNull18))


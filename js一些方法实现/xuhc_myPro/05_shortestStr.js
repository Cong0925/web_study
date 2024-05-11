let str = 'qwertyuiop'
let str1 = 'asdfghgfds'
let str2 = 'sdfghgfdsa'
// 添加字符形成最短回文串
function fun(str) {
    if (str.length >= 3) {
        let cur = 1 //str.length%2 === 0 ? str.length/2-1 : (str.length -1)/2
        let pre = 0
        let nxt = 2
        let flag = null

        while (cur < str.length / 2) {
            if (str[pre] === str[nxt]) {
                if (pre === 0) {
                    flag = true
                    break
                }
                pre--
                nxt++
            } else {
                cur++
                pre = cur - 1
                nxt = cur + 1
            }
        }
        if(flag){
            return str.slice(nxt+1).split('').reverse().join('') + str
        }else{
            return str.slice(1).split('').reverse().join('') + str
        }
    } else if (str.length === 2) {
        return str[0] === str[1] ? str : str[1] + str
    } else if (str.length === 1) {
        return str[0] + str[0]
    } else {
        return 'str长度不为0'
    }

}

console.log(fun(str))
console.log(fun(str1))
console.log(fun(str2))

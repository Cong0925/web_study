
function getreplaceCount(arr, str) {
    let count = 0
    arr.forEach(item => {
        if (str.includes(item)) {
            count++
        }
    })
    return count
}
function replaceFun() {
    // let str = 'asdga????dasgfdasgf?ds???by??te??s??t?bb???e??te??dsgh??das??'
    let str = 'a????e'

    let arr = ['b???','?y??','??t?','???e', 'by??', 'byt?', '??te', '?yte', '????', 'b?t?', '?y?e', '?yt?', 'b??e', 'b?te', 'by?e']
    let count = getreplaceCount(arr, str)
    for(let i=0;i<count;i++){
        arr.forEach(item => {
            str = str.replace(item, 'BYTE')
        })
    }
    while(str.includes('?')){
        str = str.replace('?','A')
    }
    console.log(str)
}
replaceFun()



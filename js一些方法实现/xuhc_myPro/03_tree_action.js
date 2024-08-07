class Tree {
    constructor(data) {
        this.data = data
        this.children = []
    }

    addChild(...children) {
        children.forEach((item) => {
            if (item instanceof Tree) {
                this.children.push(item)
            } else {
                this.children.push(new Tree(item))
            }
        })
    }
    addChildToSpecifiedNode(nodeName, data) {
        this.traverseBFS(item => {
            if (item.data === nodeName) {
                item.addChild(new Tree(data));
            }
        });
    }
    traverseDFS(callback) {
        callback(this)
        this.children.forEach((item) => {
            item.traverseDFS(callback)
        })
    }
    traverseBFS(callback) {
        callback(this)
        let queue = this.children.slice()
        while (queue.length > 0) {
            let cur = queue.shift()
            callback(cur)
            queue = queue.concat(cur.children)
        }
    }
}

let root = new Tree('root')

root.addChild('c1', 'c2', 'c3', 'c4', 'c5')
root.children[0].addChild('cc1', 'cc2', 'cc3', 'cc4', 'cc5')
root.children[1].addChild('bb1', 'cc2', 'cc3', 'cc4', 'cc5')
root.children[2].addChild('dd1', 'cc2', 'cc3', 'cc4', 'cc5')
root.children[3].addChild('ee1', 'cc2', 'cc3', 'cc4', 'cc5')
root.children[4].addChild('ff1', 'cc2', 'cc3', 'cc4', 'cc5')

let a
root.traverseBFS(item => {
    if (item.data === 'c1') {
        a = item.children.length
    }
})
console.log(a)


let nodeName = 'cc4'
let data = { name: 'cc4-child', age: 18 }
root.addChildToSpecifiedNode(nodeName, data)
console.log(root[0])

// root.traverseDFS(item =>{
//     console.log('DFS',item.data)
// })
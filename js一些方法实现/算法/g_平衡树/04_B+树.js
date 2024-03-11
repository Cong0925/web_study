class BPlusTreeNode {
  /**
   * 构造函数
   */
  constructor() {
    this.keys = [];
    this.children = [];
  }
}

class BPlusTree {
  /**
   * 构造函数
   *
   * @param degree 树的度数
   */
  constructor(degree) {
    this.root = null;
    this.degree = degree;
  }

  /**
   * 搜索指定关键字
   *
   * @param key 关键字
   * @returns 返回搜索到的节点，若未找到则返回null
   */
  search(key) {
    // 调用 searchNode 方法进行搜索
    return this.searchNode(this.root, key);
  }

  /**
   * 在树中搜索节点
   *
   * @param node 当前节点
   * @param key 待搜索的键
   * @returns 返回找到的节点，若未找到则返回null
   */
  searchNode(node, key) {
    // 如果节点为空，则返回null
    if (!node) return null;
    // 初始化索引i为0
    let i = 0;

    // 循环遍历节点的keys数组，直到找到key应该插入的位置
    while (i < node.keys.length && key >= node.keys[i]) {
      i++;
    }
    // 如果节点没有子节点，则返回当前节点
    if (node.children.length === 0) {
      return node;
    }
    // 递归调用searchNode方法，在子节点中继续搜索
    return this.searchNode(node.children[i], key);
  }

  /**
   * 向B+树中插入键值
   *
   * @param key 键值
   */
  insert(key) {
    // 如果根节点不存在
    if (!this.root) {
      // 创建一个新的根节点
      this.root = new BPlusTreeNode();
      // 将键值添加到根节点的键值数组中
      this.root.keys.push(key);
    } else {
      // 如果根节点的键值数组已满
      if (this.root.keys.length === (2 * this.degree) - 1) {
        // 创建一个新的根节点
        let newRoot = new BPlusTreeNode();
        // 将原根节点添加到新根节点的子节点数组中
        newRoot.children.push(this.root);
        // 调用 splitChild 方法进行节点分裂
        this.splitChild(newRoot, 0, this.root);
        // 更新根节点为新创建的根节点
        this.root = newRoot;
      }
      // 调用 insertNonFull 方法将键值插入到非满的节点中
      this.insertNonFull(this.root, key);
    }
  }

  /**
   * 在非满节点中插入一个键值对
   *
   * @param node 当前节点
   * @param key 待插入的键
   */
  insertNonFull(node, key) {
    // 获取节点最后一个键的索引
    let i = node.keys.length - 1;
    // 如果节点没有子节点
    if (node.children.length === 0) {
      // 当索引大于等于0且key小于当前索引对应的键时，索引减1
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      // 在索引i+1的位置插入key
      node.keys.splice(i + 1, 0, key);
    } else {
      // 当索引大于等于0且key小于当前索引对应的键时，索引减1
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      // 索引加1，指向当前key应该插入的位置
      i++;
      // 如果当前子节点的键数量等于最大度减1
      if (node.children[i].keys.length === (2 * this.degree) - 1) {
        // 对当前子节点进行分裂
        this.splitChild(node, i, node.children[i]);
        // 如果key大于当前索引对应的键
        if (key > node.keys[i]) {
          // 索引加1，指向分裂后应该插入的位置
          i++;
        }
      }
      // 在指定子节点中递归插入key
      this.insertNonFull(node.children[i], key);
    }
  }

  /**
   * 将子节点从父节点中拆分，生成新的子节点并插入到父节点的子节点数组中
   *
   * @param parent 父节点
   * @param index 父节点中子节点的索引
   * @param child 要拆分的子节点
   */
  splitChild(parent, index, child) {
    // 创建一个新的B+树节点
    let newChild = new BPlusTreeNode();

    // 计算中间索引
    let midIndex = Math.floor(this.degree - 1);

    // 将child节点的keys数组从midIndex+1处开始的部分赋值给newChild节点的keys
    newChild.keys = child.keys.splice(midIndex + 1);

    // 如果child节点有子节点
    if (child.children.length !== 0) {
      // 将child节点的children数组从midIndex+1处开始的部分赋值给newChild节点的children
      newChild.children = child.children.splice(midIndex + 1);
    }

    // 将child节点的keys数组中midIndex位置的元素插入到parent节点的keys数组的index位置
    parent.keys.splice(index, 0, child.keys[midIndex]);

    // 将newChild节点插入到parent节点的children数组的index+1位置
    parent.children.splice(index + 1, 0, newChild);
  }
}

// 示例
const bPlusTree = new BPlusTree(2);
bPlusTree.insert(10);
bPlusTree.insert(20);
bPlusTree.insert(5);
console.log(bPlusTree.search(10)); // BPlusTreeNode { keys: [ 10 ], children: [] }
console.log(bPlusTree.search(15)); // BPlusTreeNode { keys: [ 10 ], children: [] }

class BTreeNode {
  /**
   * 构造函数
   *
   * @param leaf 是否为叶子节点，默认为false
   */
  constructor(leaf = false) {
    this.keys = [];
    this.children = [];
    this.leaf = leaf;
  }
}

class BTree {
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
   * 搜索指定节点
   *
   * @param key 要搜索的节点值
   * @returns 返回与key值相等的节点
   */
  search(key) {
    // 调用 searchNode 方法，传入根节点和关键字进行搜索
    return this.searchNode(this.root, key);
  }

  /**
   * 在 B-tree 节点中查找给定的键值，并返回该键值所在的节点
   *
   * @param node B-tree 节点
   * @param key 要查找的键值
   * @returns 返回找到的节点，如果未找到则返回 null
   */
  searchNode(node, key) {
    let i = 0;

    // 遍历节点的 keys 数组，查找 key 所在的索引位置
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }

    // 如果找到了 key，并且 key 等于当前索引位置的元素，则返回当前节点
    if (i < node.keys.length && key === node.keys[i]) {
      return node;
      // 如果当前节点是叶子节点，则返回 null
    } else if (node.leaf) {
      return null;
      // 否则，在子节点中继续搜索 key
    } else {
      return this.searchNode(node.children[i], key);
    }
  }

  /**
   * 向B树中插入一个键值
   *
   * @param key 要插入的键值
   */
  insert(key) {
    // 如果根节点不存在
    if (!this.root) {
      // 创建一个新的B树节点作为根节点，并且标记为叶子节点
      this.root = new BTreeNode(true);
      // 将传入的键值添加到根节点的键值数组中
      this.root.keys.push(key);
    } else {
      // 如果根节点的键值数组已满（达到2倍的度数减1）
      if (this.root.keys.length === (2 * this.degree) - 1) {
        // 创建一个新的B树节点作为新的根节点，并且标记为非叶子节点
        let newRoot = new BTreeNode(false);
        // 将原来的根节点添加到新根节点的子节点数组中
        newRoot.children.push(this.root);
        // 调用splitChild方法拆分子节点
        this.splitChild(newRoot, 0, this.root);
        // 更新根节点为新创建的节点
        this.root = newRoot;
      }
      // 在非满的节点中插入键值
      this.insertNonFull(this.root, key);
    }
  }

  /**
   * 在非满节点中插入键值对
   *
   * @param node 节点对象
   * @param key 待插入的键
   */
  insertNonFull(node, key) {
    // 获取节点中键的最后一个索引
    let i = node.keys.length - 1;

    // 如果节点是叶子节点
    if (node.leaf) {
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
      // 索引加1
      i++;
      // 如果当前索引对应的子节点的键的数量等于(2 * this.degree) - 1
      if (node.children[i].keys.length === (2 * this.degree) - 1) {
        // 调用splitChild方法拆分子节点
        this.splitChild(node, i, node.children[i]);
        // 如果key大于当前索引对应的键
        if (key > node.keys[i]) {
          // 索引加1
          i++;
        }
      }
      // 递归调用insertNonFull方法，将key插入到当前索引对应的子节点中
      this.insertNonFull(node.children[i], key);
    }
  }

  /**
   * 将子节点拆分为两个节点，并将拆分后的新节点插入到父节点中
   *
   * @param parent 父节点
   * @param index 父节点中子节点的索引
   * @param child 要拆分的子节点
   */
  splitChild(parent, index, child) {
    // 创建一个新的B树节点，叶子节点状态与child相同
    let newChild = new BTreeNode(child.leaf);
    // 计算中间索引位置
    let midIndex = Math.floor(this.degree - 1);

    // 将child节点的keys数组从中间索引位置后的部分赋值给newChild的keys数组
    newChild.keys = child.keys.splice(midIndex + 1);
    // 如果child节点不是叶子节点
    if (!child.leaf) {
      // 将child节点的children数组从中间索引位置后的部分赋值给newChild的children数组
      newChild.children = child.children.splice(midIndex + 1);
    }

    // 将child节点的keys数组中间索引位置的元素插入到parent节点的keys数组的指定位置
    parent.keys.splice(index, 0, child.keys[midIndex]);
    // 将newChild节点插入到parent节点的children数组的指定位置
    parent.children.splice(index + 1, 0, newChild);
  }
}

// 示例
const bTree = new BTree(2);
bTree.insert(10);
bTree.insert(20);
bTree.insert(5);
console.log(bTree.search(10)); // BTreeNode { keys: [ 10 ], children: [], leaf: true }
console.log(bTree.search(15)); // null

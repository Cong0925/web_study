class AVLNode {
  /**
   * 构造函数，用于创建一棵二叉树节点
   *
   * @param key 节点的键值
   */
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  /**
   * 构造函数
   *
   * @returns 无返回值
   */
  constructor() {
    this.root = null;
  }

  /**
   * 获取节点高度
   *
   * @param node 节点对象
   * @returns 返回节点高度，如果节点不存在则返回0
   */
  getHeight(node) {
    // 如果节点存在，则返回节点的高度，否则返回0
    return node ? node.height : 0;
  }

  /**
   * 获取节点的平衡因子
   *
   * @param node 节点对象
   * @returns 返回节点的平衡因子，若节点为空则返回0
   */
  getBalanceFactor(node) {
    // 如果节点存在，则返回节点的高度，否则返回0
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  /**
   * 更新节点高度
   *
   * @param node 节点对象
   */
  updateHeight(node) {
    // 更新节点的高度为左子树和右子树中较高的高度加1
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  /**
   * 将节点y进行右旋操作
   *
   * @param y 要进行右旋操作的节点
   * @returns 返回旋转后的新根节点
   */
  rotateRight(y) {
    // 将y的左子节点赋值给x
    let x = y.left;
    // 将x的右子节点赋值给T2
    let T2 = x.right;

    // 将y赋值给x的右子节点
    x.right = y;
    // 将T2赋值给y的左子节点
    y.left = T2;

    // 更新y的高度
    this.updateHeight(y);
    // 更新x的高度
    this.updateHeight(x);

    // 返回x
    return x;
  }

  /**
   * 左旋操作
   *
   * @param x 待旋转的节点
   * @returns 返回旋转后的新根节点
   */
  rotateLeft(x) {
    // 将节点x的右子节点赋值给y
    let y = x.right;
    // 将节点y的左子节点赋值给T2
    let T2 = y.left;

    // 将节点x赋值给节点y的左子节点
    y.left = x;
    // 将T2赋值给节点x的右子节点
    x.right = T2;

    // 更新节点x的高度
    this.updateHeight(x);
    // 更新节点y的高度
    this.updateHeight(y);

    // 返回旋转后的新根节点y
    return y;
  }

  /**
   * 向AVL树中插入节点
   *
   * @param node 当前节点
   * @param key 待插入节点的键值
   * @returns 返回插入后的节点
   */
  insert(node, key) {
    // 如果节点为空，则创建一个新的节点并返回
    if (!node) {
      return new AVLNode(key);
    }

    // 如果插入的键小于节点的键，则在左子树中插入
    if (key < node.key) {
      node.left = this.insert(node.left, key);
    }
    // 如果插入的键大于节点的键，则在右子树中插入
    else if (key > node.key) {
      node.right = this.insert(node.right, key);
    }
    // 如果插入的键等于节点的键，则直接返回该节点
    else {
      return node;
    }

    // 更新节点的高度
    this.updateHeight(node);

    // 获取节点的平衡因子
    let balance = this.getBalanceFactor(node);

    // 左左情况：左子树高度大于右子树高度2及以上，且插入的键小于左子树的最小键
    // 右旋
    // 左左情况
    if (balance > 1 && key < node.left.key) {
      return this.rotateRight(node);
    }

    // 右右情况：右子树高度大于左子树高度2及以上，且插入的键大于右子树的最大键
    // 左旋
    // 右右情况
    if (balance < -1 && key > node.right.key) {
      return this.rotateLeft(node);
    }

    // 左右情况：左子树高度大于右子树高度2及以上，且插入的键大于左子树的最小键
    // 先左旋，再右旋
    // 左右情况
    if (balance > 1 && key > node.left.key) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    // 右左情况：右子树高度大于左子树高度2及以上，且插入的键小于右子树的最大键
    // 先右旋，再左旋
    // 右左情况
    if (balance < -1 && key < node.right.key) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    // 返回插入后的节点
    return node;
  }
}

// 示例
const avlTree = new AVLTree();
avlTree.root = avlTree.insert(avlTree.root, 10);
avlTree.root = avlTree.insert(avlTree.root, 20);
avlTree.root = avlTree.insert(avlTree.root, 30);
console.log(avlTree.root); // AVLNode { key: 20, left: AVLNode { key: 10, ... }, right: AVLNode { key: 30, ... }, ... }

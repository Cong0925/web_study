const RED = 'red';
const BLACK = 'black';

class RedBlackNode {
  /**
   * 构造函数，用于创建一个节点对象
   *
   * @param key 节点的键值
   * @param color 节点的颜色
   */
  constructor(key, color) {
    this.key = key; // 设置当前节点的键值
    this.left = null; // 初始化左子节点为 null
    this.right = null;// 初始化右子节点为 null
    this.parent = null; // 初始化父节点为 null
    this.color = color;// 设置当前节点的颜色
  }
}

class RedBlackTree {
  /**
   * 构造函数
   */
  constructor() {
    // 初始化根节点为null
    this.root = null;
  }

  /**
    * 将二叉树节点左旋转
    *
    * @param node 需要左旋转的节点
    */
  rotateLeft(node) {
    // 获取当前节点的右子节点
    let rightChild = node.right;
    // 将当前节点的右子节点的左子节点赋值给当前节点的右子节点
    node.right = rightChild.left;
    // 如果当前节点的右子节点的左子节点不为空
    if (rightChild.left !== null) {
      // 将当前节点的右子节点的左子节点的父节点指向当前节点
      rightChild.left.parent = node;
    }

    // 将当前节点的右子节点的父节点指向当前节点的父节点
    rightChild.parent = node.parent;

    // 如果当前节点的父节点为空
    if (node.parent === null) {
      // 将当前节点的右子节点设置为根节点
      this.root = rightChild;
      // 如果当前节点是其父节点的左子节点
    } else if (node === node.parent.left) {
      // 将当前节点的父节点的左子节点设置为当前节点的右子节点
      node.parent.left = rightChild;
      // 如果当前节点是其父节点的右子节点
    } else {
      // 将当前节点的父节点的右子节点设置为当前节点的右子节点
      node.parent.right = rightChild;
    }

    // 将当前节点的右子节点的左子节点设置为当前节点
    rightChild.left = node;
    // 将当前节点的父节点设置为当前节点的右子节点
    node.parent = rightChild;
  }

  /**
   * 将节点右旋
   *
   * @param node 要旋转的节点
   */
  rotateRight(node) {
    // 获取当前节点的左子节点
    let leftChild = node.left;
    // 将当前节点的左子节点指向左子节点的右子节点
    node.left = leftChild.right;
    // 如果左子节点的右子节点不为空
    if (leftChild.right !== null) {
      // 将左子节点的右子节点的父节点指向当前节点
      leftChild.right.parent = node;
    }
    // 将左子节点的父节点指向当前节点的父节点
    leftChild.parent = node.parent;
    // 如果当前节点的父节点为空
    if (node.parent === null) {
      // 将根节点指向左子节点
      this.root = leftChild;
      // 如果当前节点是父节点的右子节点
    } else if (node === node.parent.right) {
      // 将父节点的右子节点指向左子节点
      node.parent.right = leftChild;
      // 否则
    } else {
      // 将父节点的左子节点指向左子节点
      node.parent.left = leftChild;
    }
    // 将左子节点的右子节点指向当前节点
    leftChild.right = node;
    // 将当前节点的父节点指向左子节点
    node.parent = leftChild;
  }

  /**
   * 插入节点
   *
   * @param key 节点值
   */
  insert(key) {
    // 创建一个新的红黑树节点，颜色为红色
    let newNode = new RedBlackNode(key, RED);

    // 将新节点插入到红黑树中，并返回更新后的根节点
    this.root = this.insertNode(this.root, newNode);

    // 修复红黑树的性质
    this.fixTreeProperties(newNode);
  }

  /**
   * 在二叉搜索树中插入节点
   *
   * @param root 二叉搜索树的根节点
   * @param node 要插入的节点
   * @returns 返回插入节点后的二叉搜索树的根节点
   */
  insertNode(root, node) {
    // 如果根节点为空，直接返回新节点作为根节点
    if (root === null) {
      return node;
    }
    // 如果新节点的键值小于根节点的键值，则递归地将新节点插入到左子树中
    if (node.key < root.key) {
      root.left = this.insertNode(root.left, node);
      // 将新节点的父节点设置为当前根节点
      root.left.parent = root;
      // 如果新节点的键值大于根节点的键值，则递归地将新节点插入到右子树中
    } else if (node.key > root.key) {
      root.right = this.insertNode(root.right, node);
      // 将新节点的父节点设置为当前根节点
      root.right.parent = root;
    }

    // 返回根节点
    return root;
  }

  /**
   * 修复树属性
   *
   * @param node 当前节点
   */
  fixTreeProperties(node) {
    // 当当前节点不是根节点且其父节点颜色为红色时，执行循环
    while (node !== this.root && node.parent.color === RED) {
      // 获取当前节点的父节点和祖父节点
      let parentNode = node.parent;
      let grandParentNode = node.parent.parent;

      // 如果父节点是祖父节点的左子节点
      if (parentNode === grandParentNode.left) {
        // 获取叔叔节点
        let uncleNode = grandParentNode.right;

        // 如果叔叔节点不为空且颜色为红色
        if (uncleNode !== null && uncleNode.color === RED) {
          // 将祖父节点颜色设为红色
          grandParentNode.color = RED;
          // 将父节点颜色设为黑色
          parentNode.color = BLACK;
          // 将叔叔节点颜色设为黑色
          uncleNode.color = BLACK;
          // 将当前节点更新为祖父节点，继续下一轮循环
          node = grandParentNode;
        } else {
          // 如果当前节点是父节点的右子节点
          if (node === parentNode.right) {
            // 执行左旋操作
            this.rotateLeft(parentNode);
            // 将当前节点更新为父节点
            node = parentNode;
            // 更新父节点为当前节点的父节点
            parentNode = node.parent;
          }
          // 执行右旋操作
          this.rotateRight(grandParentNode);
          // 交换父节点和祖父节点的颜色
          [parentNode.color, grandParentNode.color] = [grandParentNode.color, parentNode.color];
          // 将当前节点更新为父节点，继续下一轮循环
          node = parentNode;
        }
      } else {
        // 如果父节点是祖父节点的右子节点
        // 获取叔叔节点
        let uncleNode = grandParentNode.left;

        // 如果叔叔节点不为空且颜色为红色
        if (uncleNode !== null && uncleNode.color === RED) {
          // 将祖父节点颜色设为红色
          grandParentNode.color = RED;
          // 将父节点颜色设为黑色
          parentNode.color = BLACK;
          // 将叔叔节点颜色设为黑色
          uncleNode.color = BLACK;
          // 将当前节点更新为祖父节点，继续下一轮循环
          node = grandParentNode;
        } else {
          // 如果当前节点是父节点的左子节点
          if (node === parentNode.left) {
            // 执行右旋操作
            this.rotateRight(parentNode);
            // 将当前节点更新为父节点
            node = parentNode;
            // 更新父节点为当前节点的父节点
            parentNode = node.parent;
          }
          // 执行左旋操作
          this.rotateLeft(grandParentNode);
          // 交换父节点和祖父节点的颜色
          [parentNode.color, grandParentNode.color] = [grandParentNode.color, parentNode.color];
          // 将当前节点更新为父节点，继续下一轮循环
          node = parentNode;
        }
      }
    }
    // 将根节点颜色设为黑色
    this.root.color = BLACK;
  }
}

// 示例
const rbTree = new RedBlackTree();
rbTree.insert(10);
rbTree.insert(20);
rbTree.insert(30);
console.log(rbTree.root); // RedBlackNode { key: 20, color: 'black', ... }

export  class Tree {
  constructor(data, child) {
    this.data = data
    this.children = child || []
  }

  // 基础遍历方法 - 深度优先搜索（DFS）
  traverseDFS(callback) {
    callback(this);
    this.children.forEach((item) => {
      item.traverseDFS(callback);
    });
  }

  // 基础遍历方法 - 广度优先搜索（BFS）
  traverseBFS(callback) {
    callback(this);
    let queue = this.children.slice();
    while (queue.length > 0) {
      let cur = queue.shift();
      callback(cur);
      queue = queue.concat(cur.children);
    }
  }

  // 查找具有特定名称的节点
  findNodeByName(name) {
    return this._findNodeByName(name, this);
  }

  _findNodeByName(name, currentNode) {
    if (currentNode.data.node === name) {
      return currentNode;
    }
    for (const child of currentNode.children) {
      const foundNode = child._findNodeByName(name, child);
      if (foundNode) {
        return foundNode;
      }
    }
    return null;
  }

  // 判断节点 b 是否是节点 a 的后代的方法
  isDescendantOf(aName, b) {
    const aNode = this.findNodeByName(aName);
    if (!aNode) {
      throw new Error(`节点 '${aName}' 未找到`);
    }
    return aNode._dfsIsDescendant(aNode.data.node, b);
  }

  // 私有方法，用于深度优先搜索判断后代关系
  _dfsIsDescendant(a, b) {
    if (this.data.node === b) {
      return true;
    }
    for (const child of this.children) {
      if (child._dfsIsDescendant(a, b)) {
        return true;
      }
    }
    return false;
  }

  // 根据节点名称 修改数据
  modifyNodeContent(nodeName, newVal) {
    this.traverseBFS(item => {
      if (item.data.node === nodeName) {
        item.data = {
          ...item.data,
          ...newVal
        }
      }
    });
  }
  // 添加节点
  addChild(...children) {
    children.forEach((item) => {
      if (item instanceof Tree) {
        this.children.push(item)
      } else {
        this.children.push(new Tree(item))
      }
    })
  }
  // 添加 指定节点 的子节点
  addChildToSpecifiedNode(nodeName, data) {
    this.traverseBFS(item => {
      if (item.data.node === nodeName) {
        item.addChild(new Tree(data));
      }
    });
  }
  // 获取指定节点的最后一个子节点
  getLastChildOfNode(nodeName) {
    let foundNode = null;
    this.traverseBFS(item => {
      if (item.data.node === nodeName) {
        foundNode = item;
      }
    });
    if (!foundNode) {
      return null
    }
    if (foundNode.children.length > 0) {
      return foundNode.children[foundNode.children.length - 1].data.node;
    } else {
      return '0';
    }
  }
  // 删除指定节点
  removeNodeByNodeName(nodeName) {
    this.children = this.children.filter(child => {
      if (child.data.node === nodeName) {
        return false;
      }
      child.removeNodeByNodeName(nodeName);
      return true;
    });
  }
  // 删除所有空节点
  removeEmptyNodes() {
    this.children = this.children.filter(child => {
      if (child.data.title === '' && child.data.content === '') {
        return false;
      }
      child.removeEmptyNodes();
      return true;
    });
  }
  // 获取指定节点 的深度
  getDepthOfData(nodeName) {
    let depth = 0;
    let queue = [this];
    while (queue.length > 0) {
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        let current = queue.shift();
        if (current.data.node === nodeName) {
          return depth;
        }
        queue = queue.concat(current.children);
      }
      depth++;
    }
    return -1; // 如果未找到，返回 -1
  }
}

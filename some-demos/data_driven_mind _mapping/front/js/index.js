import { Tree } from './treeClass.js';
import { Popup } from './createPopup.js';

// 创建 vue  实例
export const vm = new Vue({
  el: '#create-mind-map',
  data: {
    popup: new Popup('提示'),
    isShowPopup: false,
    root: new Tree({ node: 'root', title: '', content: '' }),
    leaderLineMap: {},
  },
  watch: {
    'input-root': (that, newValue, oldValue) => {
      if (newValue.length >= that.MaxFontCount && !that.isShowPopup) {
        that.isShowPopup = true
        that.popup.show('提示', `输入文字已超出限制（最多${that.MaxFontCount}个字符）`, () => { that.isShowPopup = false })
      }
      that.root.modifyNodeContent('root', { title: newValue });
    },
    'inputArea-root': (that, newValue, oldValue) => {
      that.root.modifyNodeContent('root', { content: newValue });
    },
  },
  mounted() {
    // 为按钮添加点击事件处理函数
    document.getElementById('sendButton').addEventListener('click', () => {
      this.methods.sendToServer();
    });
    this.methods.startMonitoringMousePosition()
    const rootDiv = document.getElementById('create-mind-map')

    // 创建一个新的 div 元素 用来 盛放 input，button 元素
    let newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'div-root');

    // 创建 第一行 元素储存容器
    let line1Box = document.createElement('div');
    line1Box.setAttribute('class', 'line-box');

    // 标题文字容器
    const div_tip_title = document.createElement('div');
    div_tip_title.setAttribute('class', 'title-style');
    div_tip_title.innerHTML = '主题：'

    // 创建一个新的 input 元素
    const div_title = document.createElement('div'); // 创建新的 div 元素
    div_title.setAttribute('class', 'div-child-input'); // 设置新创建的 div 元素的 class
    let input_title = document.createElement('input');
    input_title.setAttribute('type', 'text');
    input_title.setAttribute('placeholder', '主题');
    input_title.setAttribute('maxlength', this.data.MaxFontCount);// 设置字数限制为 20
    input_title.setAttribute('id', 'input-root');
    div_title.appendChild(input_title);

    // 创建 新增 按钮 容器
    const div_create = document.createElement('div'); // 创建新的 div 元素
    div_create.setAttribute('class', 'div-child-btn'); // 设置新创建的 div 元素的 class
    let btn_create = document.createElement('button');
    btn_create.setAttribute('id', 'btn-root');
    btn_create.innerHTML = '添加子元素';
    // 添加点击事件
    function addChild(event) {
      vm.addChild(event);
    }
    btn_create.addEventListener('click', addChild);
    div_create.appendChild(btn_create); // div 元素 添加子元素 btnDom

    // 创建 删除 按钮 容器
    const div_del = document.createElement('div'); // 创建新的 div 元素
    div_del.setAttribute('class', 'div-child-btn'); // 设置新创建的 div 元素的 class
    let btn_del = document.createElement('button'); // 设置新创建的 button 元素的 type
    btn_del.setAttribute('id', `btn-root`); // 设置新创建的 button 元素的 id
    btn_del.innerHTML = '删除'; // 设置新创建的 button 元素的 innerHTML
    // 添加点击事件
    function delChild(event) {
      vm.delChild(event);
    }
    btn_del.addEventListener('click', delChild);
    div_del.appendChild(btn_del); // div 元素 添加子元素 btnDom

    line1Box.appendChild(div_tip_title);
    line1Box.appendChild(div_title);
    line1Box.appendChild(div_create);
    line1Box.appendChild(div_del);

    let line2Box = document.createElement('div');
    line2Box.setAttribute('class', 'line-box');

    const div_tip_content = document.createElement('div');
    div_tip_content.setAttribute('class', 'title-style');
    div_tip_content.innerHTML = '内容：'
    // 创建一个新的 input 元素
    const div_content = document.createElement('div');
    div_content.setAttribute('class', 'div-child-input');
    let inputAreaDom = document.createElement('textarea');
    inputAreaDom.setAttribute('placeholder', '内容描述');
    inputAreaDom.setAttribute('id', 'inputArea-root');
    inputAreaDom.style.width = '420px';
    inputAreaDom.rows = 3;
    div_content.appendChild(inputAreaDom);

    line2Box.appendChild(div_tip_content);
    line2Box.appendChild(div_content);

    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', `card-box card-box-root`);
    cardDiv.setAttribute('id', `card-box-root`);

    cardDiv.appendChild(line1Box)
    cardDiv.appendChild(line2Box)
    newDiv.appendChild(cardDiv);

    rootDiv.appendChild(newDiv);

    // 鼠标按下事件
    this.methods.bindDragEvent(this, cardDiv)

  },
  methods: {
    //测试
    saveLeaderLine: function () {

    },
    // 鼠标移动事件
    startMonitoringMousePosition() {
      /* 
      document.addEventListener('mousemove', (e) => {
        // 获取鼠标到 body 左右边缘的距离
        const distanceFromLeft = e.clientX;
        const distanceFromRight = window.innerWidth - e.clientX;
        // 获取鼠标到 body 上下边缘的距离
        const distanceFromTop = e.clientY;
        const distanceFromBottom = window.innerHeight - e.clientY;
      });
      */
    },
    // 发送到后端
    sendToServer: function () {
      vm.root.removeEmptyNodes()

      const data = JSON.stringify({
        data: vm.root,
      });
      fetch('http://localhost:8888/api/generateMindMap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    },
    // 元素绑定拖拽事件
    bindDragEvent: function (target, DOM) {
      let that = target
      let targetData = target.data ? target.data : target
      let targetMethods = target.methods ? target.methods : target
      let DOMStyle = window.getComputedStyle(DOM, null); // 读取通过css设置的样式

      DOM.addEventListener('mousedown', (e) => {
        if (e.target.nodeName !== 'BUTTON') {

          const startX = e.clientX;
          const startY = e.clientY;

          const initialLeft = DOM.offsetLeft;
          const initialTop = DOM.offsetTop;
          // 获取当前卡片对应的 LeaderLine 实例
          let leaderLines = targetData.leaderLineMap[DOM.id];

          let preTop = DOM.style.top
          let preRight = window.innerWidth - Number(DOM.style.left.split('px')[0]) - Number(DOMStyle.width.split('px')[0])
          // 鼠标移动事件
          const onMouseMove = (moveEvent) => {

            // 获取鼠标到 body 左右边缘的距离
            const distanceFromLeft = moveEvent.clientX;
            const distanceFromRight = window.innerWidth - moveEvent.clientX;
            // 获取鼠标到 body 上下边缘的距离
            const distanceFromTop = moveEvent.clientY;
            const distanceFromBottom = window.innerHeight - moveEvent.clientY;

            // 当前元素距离顶部距离
            let curTop = DOM.style.top
            // 当前元素 右侧 距离 窗口右边距离
            let curRight = window.innerWidth - Number(DOM.style.left.split('px')[0]) - Number(DOMStyle.width.split('px')[0])

            if (distanceFromBottom <= 200 && curTop.split('px')[0] - preTop.split('px')[0] > 20) {
              document.body.style.height = `${Number(document.body.style.height.split('px')[0]) + 50}px`;
            }
            if (distanceFromRight < 200 && preRight - curRight > 50) {
              document.body.style.width = `${Number(document.body.style.width.split('px')[0]) + 50}px`;
            }

            //元素添加类名
            DOM.classList.add('z-index-max');
            const offsetX = moveEvent.clientX - startX;
            const offsetY = moveEvent.clientY - startY;

            DOM.style.left = initialLeft + offsetX + 'px';
            DOM.style.top = initialTop + offsetY + 'px';
            // 在元素移动时更新 LeaderLine 的位置
            if (leaderLines && leaderLines.length > 0) {
              leaderLines.forEach(item => {
                item.example.position();
              })
            }
          };

          document.addEventListener('mousemove', onMouseMove);

          // 鼠标抬起事件
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
            // 元素移除类名
            DOM.classList.remove('z-index-max');
            // 恢复默认鼠标样式
            document.body.style.cursor = 'default'
          });
          // 设置鼠标样式 抓手
          document.body.style.cursor = 'grab';

        }
      });

    },
    // 创建 元素之间连线
    createLeaderLine: function (staretDOM, endDOM) {
      let startElementID = `card-box-${staretDOM}`
      let endElementID = `card-box-${endDOM}`

      const startElement = document.getElementById(startElementID);
      const endElement = document.getElementById(endElementID);
      // 创建 LeaderLine 实例并设置相关参数
      const leaderLine = new LeaderLine(startElement, endElement, {
        size: 3,
        path: 'magnet',
        startPlug: 'behind',
        endPlug: 'disc',
        startPlugColor: '#14a2f5',
        endPlugColor: '#28a745',
        gradient: true,
        dash: { animation: true },
      });
      if (!vm.leaderLineMap[startElementID]) {
        vm.leaderLineMap[startElementID] = [];
      }

      if (!vm.leaderLineMap[endElementID]) {
        vm.leaderLineMap[endElementID] = [];
      }
      let parent_child = `${startElementID}&${endElementID}`
      vm.leaderLineMap[startElementID].push({ name: parent_child, example: leaderLine });
      vm.leaderLineMap[endElementID].push({ name: parent_child, example: leaderLine });
    },
    // 获取指定节点的子节点数量
    getChildrenCount: function (root, targetData) {
      let count = 0
      root.traverseBFS(item => {
        if (item.data.node === targetData) {
          count = item.children.length
        }
      })
      return count
    },
    // 删除节点
    delChild: function (event) {
      // 通过 event.target 获取触发事件的元素
      let element = event.target;
      let idSplitArr = element.id.split('-') //将id字符串拆分为数组
      let curNodeName = idSplitArr.slice(1).join('-') // 获取当前节点名称
      let parentNodeName = idSplitArr.slice(1, -1).join('-') // 获取父节点名称

      const parentCardElementID = `card-box-${parentNodeName}`;
      const curCardElementID = `card-box-${curNodeName}`;
      let parent_child = `${parentCardElementID}&${curCardElementID}`

      // 删除 leaderLine 实例
      let alreadyDel = []
      Object.keys(this.leaderLineMap).forEach((item, index) => {
        if (this.root.isDescendantOf(curNodeName, item.split('-').slice(2).join('-'))) {
          this.leaderLineMap[item].forEach((itm, idx) => {
            if (!alreadyDel.includes(itm.name)) {
              itm.example.remove();
              alreadyDel.push(itm.name)
            }
          })
          delete this.leaderLineMap[item];
        }
      })

      if (curNodeName === 'root') {
        const rootDiv = document.getElementById('div-root'); // 获取父节点对应的 div 元素
        const divBoxElements = rootDiv.querySelectorAll('.div-box');

        this.leaderLineMap = {
          [curCardElementID]: []
        }
        divBoxElements.forEach(element => {
          if (element.parentNode === rootDiv) {
            rootDiv.removeChild(element);
            this.root.children = []
          }
        });
        return
      }

      this.leaderLineMap[parentCardElementID].forEach((item, index) => {
        if (item.name === parent_child) {
          this.leaderLineMap[parentCardElementID].splice(index, 1);
        }
      })

      // 删除元素以及树结构
      let curElementName = `div-${curNodeName}`
      let curElement = document.getElementById(curElementName)
      curElement.remove()
      this.root.removeNodeByNodeName(curNodeName)
    },
    // 添加节点
    addChild: function (event) {
      // 通过 event.target 获取触发事件的元素
      let element = event.target;

      let idSplitArr = element.id.split('-') //将id字符串拆分为数组

      let parentNodeName = idSplitArr.slice(1).join('-') // 获取父节点名称

      let childrenCount = this.getChildrenCount(this.root, parentNodeName); // 获取父节点下子节点的数量

      if (childrenCount !== 0) {
        childrenCount = Number(this.root.getLastChildOfNode(parentNodeName).split('-').slice(-1)[0]) + 1
      }

      let nodeName = `${parentNodeName}-${childrenCount}` // 获取新节点的名称

      const rootDiv = document.getElementById(`div-${parentNodeName}`); // 获取父节点对应的 div 元素
      let newDiv = document.createElement('div'); // 创建新的 div 元素
      newDiv.setAttribute('class', `div-box div-box-${nodeName}`); // 设置新创建的 div 元素的 class
      newDiv.setAttribute('id', `div-${nodeName}`); // 设置新创建的 div 元素的 id
      newDiv.style.marginLeft = `${this.margingVal}px`; // 设置新创建的 div 元素的 margin-left

      // 创建 第一行 容器
      let line1Box = document.createElement('div');
      line1Box.setAttribute('class', 'line-box');

      // 创建标题 容器
      const div_tip_title = document.createElement('div');
      div_tip_title.setAttribute('class', 'title-style');
      let deep = this.root.getDepthOfData(parentNodeName) + 1
      div_tip_title.innerHTML = `${deep}级节点：`;

      // 创建 输入框 容器
      const div_title = document.createElement('div'); // 创建新的 div 元素
      div_title.setAttribute('class', 'div-child-input'); // 设置新创建的 div 元素的 class
      let inputDom = document.createElement('input');// 创建新的 input 元素
      inputDom.setAttribute('type', 'text'); // 设置新创建的 input 元素的 type
      inputDom.setAttribute('placeholder', '主题'); // 设置新创建的 input 元素的 placeholder
      inputDom.setAttribute('id', `input-${nodeName}`); // 设置新创建的 input 元素的 id

      let that = this;
      inputDom.addEventListener('input', function () {
        that.root.modifyNodeContent(nodeName, { title: this.value });
      });

      div_title.appendChild(inputDom); // div 元素 添加子元素 inputDom

      // 创建 新增 按钮 容器
      const div_create = document.createElement('div'); // 创建新的 div 元素
      div_create.setAttribute('class', 'div-child-btn'); // 设置新创建的 div 元素的 class
      let btn_create = document.createElement('button'); // 设置新创建的 button 元素的 type
      btn_create.setAttribute('id', `btn-${nodeName}`); // 设置新创建的 button 元素的 id
      btn_create.innerHTML = '添加子元素'; // 设置新创建的 button 元素的 innerHTML
      // 添加点击事件
      function addChild(event) {
        vm.addChild(event);
      }
      btn_create.addEventListener('click', addChild);

      div_create.appendChild(btn_create); // div 元素 添加子元素 btnDom

      // 创建 删除 按钮 容器
      const div_del = document.createElement('div'); // 创建新的 div 元素
      div_del.setAttribute('class', 'div-child-btn'); // 设置新创建的 div 元素的 class
      let btn_del = document.createElement('button'); // 设置新创建的 button 元素的 type
      btn_del.setAttribute('id', `btn-${nodeName}`); // 设置新创建的 button 元素的 id
      btn_del.innerHTML = '删除'; // 设置新创建的 button 元素的 innerHTML
      // 添加点击事件
      function delChild(event) {
        vm.delChild(event);
      }
      btn_del.addEventListener('click', delChild);
      div_del.appendChild(btn_del); // div 元素 添加子元素 btnDom

      line1Box.appendChild(div_tip_title);
      line1Box.appendChild(div_title);
      line1Box.appendChild(div_create);
      line1Box.appendChild(div_del);

      let line2Box = document.createElement('div');
      line2Box.setAttribute('class', 'line-box');

      const div_tip_content = document.createElement('div');
      div_tip_content.setAttribute('class', 'title-style');
      div_tip_content.innerHTML = '内容：'
      // 创建一个新的 input 元素
      const div_content = document.createElement('div');
      div_content.setAttribute('class', 'div-child-input');
      let inputAreaDom = document.createElement('textarea');
      inputAreaDom.setAttribute('placeholder', '内容描述');
      inputAreaDom.setAttribute('id', 'input-root');
      inputAreaDom.style.width = '420px';
      inputAreaDom.rows = 3;

      inputAreaDom.addEventListener('input', function () {
        that.root.modifyNodeContent(nodeName, { content: this.value });
      });

      div_content.appendChild(inputAreaDom);

      line2Box.appendChild(div_tip_content);
      line2Box.appendChild(div_content);

      // 容器引入
      const cardDiv = document.createElement('div');
      cardDiv.setAttribute('class', `card-box card-box-${nodeName}`);
      cardDiv.setAttribute('id', `card-box-${nodeName}`);
      const parentElement = document.getElementById(`card-box-${parentNodeName}`)
      cardDiv.style.top = `${parentElement.getBoundingClientRect().top + Math.floor(Math.random() * (400 - 200 + 1) + 200)}px`;
      cardDiv.style.left = `${parentElement.getBoundingClientRect().left + Math.floor(Math.random() * (200 - 100 + 1) + 100)}px`;

      cardDiv.appendChild(line1Box)
      cardDiv.appendChild(line2Box)
      newDiv.appendChild(cardDiv);

      // 鼠标按下事件
      this.bindDragEvent(this, cardDiv)

      // 将新创建的 div 元素添加到 body 中
      rootDiv.appendChild(newDiv);

      // 在 树中 添加新的节点
      this.root.addChildToSpecifiedNode(parentNodeName, { node: nodeName, title: '', content: '' })

      //
      this.createLeaderLine(parentNodeName, nodeName)
    }
  }
})

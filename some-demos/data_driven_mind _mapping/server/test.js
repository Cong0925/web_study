// // const { createCanvas, loadImage } = require('canvas');
// // const fs = require('fs');

// // let data = {
// //   data: {
// //     node: "root",
// //     content: "前端学习"
// //   },
// //   children: [
// //     {
// //       data: {
// //         node: "root-0",
// //         content: "js"
// //       },
// //       children: [
// //         {
// //           data: {
// //             node: "root-0-0",
// //             content: "123"
// //           },
// //           children: [
// //             {
// //               data: {
// //                 node: "root-0-0-0",
// //                 content: "123"
// //               },
// //               children: [
// //                 {
// //                   data: {
// //                     node: "root-0-0-0-0",
// //                     content: "123"
// //                   },
// //                   children: [
// //                     {
// //                       data: {
// //                         node: "root-0-0-0-0-0",
// //                         content: "css"
// //                       },
// //                       children: [
// //                         {
// //                           data: {
// //                             node: "root-0-0-0-0-0-0",
// //                             content: "数组方法"
// //                           },
// //                           children: [
// //                             {
// //                               data: {
// //                                 node: "root-0-0-0-0-0-0-0",
// //                                 content: "afaf"
// //                               },
// //                               children: [
// //                                 {
// //                                   data: {
// //                                     node: "root-0-0-0-0-0-0-0-0",
// //                                     content: "asdafdf"
// //                                   },
// //                                   children: [
// //                                     {
// //                                       data: {
// //                                         node: "root-0-0-0-0-0-0-0-0-0",
// //                                         content: "egfwegsdfas"
// //                                       },
// //                                       children: [
// //                                         {
// //                                           data: {
// //                                             node: "root-0-0-0-0-0-0-0-0-0-0",
// //                                             content: "agsdgsdzxvswdgv"
// //                                           },
// //                                           children: []
// //                                         }
// //                                       ]
// //                                     }
// //                                   ]
// //                                 }
// //                               ]
// //                             }
// //                           ]
// //                         }
// //                       ]
// //                     }
// //                   ]
// //                 }
// //               ]
// //             }
// //           ]
// //         }
// //       ]
// //     },
// //     {
// //       data: {
// //         node: "root-1",
// //         content: "vue"
// //       },
// //       children: [
// //         {
// //           data: {
// //             node: "root-1-0",
// //             content: "对象方法"
// //           },
// //           children: []
// //         }
// //       ]
// //     },
// //     {
// //       data: {
// //         node: "root-2",
// //         content: "123"
// //       },
// //       children: [
// //         {
// //           data: {
// //             node: "root-2-0",
// //             content: "asfd"
// //           },
// //           children: []
// //         }
// //       ]
// //     },
// //     {
// //       data: {
// //         node: "root-3",
// //         content: "as"
// //       },
// //       children: [
// //         {
// //           data: {
// //             node: "root-3-0",
// //             content: "asdfad"
// //           },
// //           children: []
// //         }
// //       ]
// //     },
// //     {
// //       data: {
// //         node: "root-4",
// //         content: "afasf"
// //       },
// //       children: [
// //         {
// //           data: {
// //             node: "root-4-0",
// //             content: "da"
// //           },
// //           children: []
// //         }
// //       ]
// //     },
// //     {
// //       data: {
// //         node: "root-5",
// //         content: "fgweggg"
// //       },
// //       children: []
// //     }
// //   ]
// // }

// // console.log(data.data)

// // function draw() {
// //   // 创建一个新的画布
// //   const canvas = createCanvas(800, 600);
// //   const ctx = canvas.getContext('2d');

//   // // 绘制方框
//   // ctx.beginPath();
//   // ctx.rect(50, 50, 100, 100);
//   // ctx.fillStyle = 'red';
//   // ctx.fill();

// //   // 绘制连线
// //   ctx.beginPath();
// //   ctx.moveTo(100, 100);
// //   ctx.lineTo(200, 200);
// //   ctx.strokeStyle = 'blue';
// //   ctx.stroke();

// //   // 将画布保存为图片
// //   const out = fs.createWriteStream(__dirname + '/output.png');
// //   const stream = canvas.createPNGStream();
// //   stream.pipe(out);
// //   out.on('finish', () => console.log('The PNG file was created.'));
// // }

// // // draw();


// // function drawWithSettings() {
// //   // 创建一个 500x500 的画布
// //   const canvas = createCanvas();
// //   const ctx = canvas.getContext('2d');

// //   // 设置背景颜色为蓝色
// //   ctx.fillStyle = 'rgb(243, 244, 246)';
// //   ctx.fillRect(0, 0, 500, 500);



// //   // 将画布保存为图片
// //   const out = fs.createWriteStream(__dirname + '/output.png');
// //   const stream = canvas.createPNGStream();
// //   stream.pipe(out);
// //   out.on('finish', () => console.log('The PNG file was created.'));
// // }

// // // drawWithSettings();


// // function drawMindMap(data, canvas, ctx) {
// //   const xStart = 50;
// //   const yStart = 50;
// //   const levelSpacing = 50;
// //   const nodeSpacing = 100;

// //   function drawNode(node, x, y, level) {
// //     ctx.beginPath();
// //     ctx.rect(x - 50, y - 20, 100, 40);
// //     ctx.fillStyle ='red';
// //     ctx.fill();

// //     ctx.fillStyle = 'white';
// //     ctx.font = '16px Arial';
// //     ctx.fillText(node.data.node, x - 40, y + 15);

// //     if (node.children.length > 0) {
// //       for (let i = 0; i < node.children.length; i++) {
// //         const child = node.children[i];
// //         const newX = x + (i - (node.children.length - 1) / 2) * nodeSpacing;
// //         const newY = y + levelSpacing;
// //         ctx.beginPath();
// //         ctx.moveTo(x, y + 40);
// //         ctx.lineTo(newX, newY);
// //         ctx.strokeStyle = 'black';
// //         ctx.stroke();

// //         drawNode(child, newX, newY, level + 1);
// //       }
// //     }
// //   }

// //   drawNode(data, xStart, yStart, 0);
// // }

// // function generateMindMap(data) {
// //   const canvas = createCanvas(800, 600);
// //   const ctx = canvas.getContext('2d');

// //   drawMindMap(data, canvas, ctx);

// //   const out = fs.createWriteStream(__dirname + '/mindmap.png');
// //   const stream = canvas.createPNGStream();
// //   stream.pipe(out);
// //   out.on('finish', () => console.log('Mind map created successfully.'));
// // }


// // generateMindMap(data);
// console.log('1');
// setTimeout(function () {
//   console.log('2');
//   Promise.resolve().then(function () {
//     console.log('3');
//     setTimeout(function () {
//       console.log('4');
//     }, 0);
//   });
// }, 0);
// Promise.resolve().then(function () {
//   console.log('5');
//   setTimeout(function () {
//     console.log('6');
//     Promise.resolve().then(function () {
//     console.log('7');
//     });
//   }, 0);
// });
// console.log('8');
const fs = require('fs');

function generateMdFromTree(treeData, filePath) {
    let mdContent = '';
    mdContent += `# ${treeData.data.title}\n`;
    mdContent += `${treeData.data.content}\n\n`;

    const generateChildrenMd = (data, level, indexStr = '') => {
        if (level > 1) {
            mdContent += `${'#'.repeat(level)} ${indexStr}. ${data.data.title}\n`;
            mdContent += `${data.data.content}\n\n`;
        }
        data.children.forEach((child, childIndex) => {
            const newIndexStr = indexStr? `${indexStr}.${childIndex + 1}` : `${childIndex + 1}`;
            generateChildrenMd(child, level + 1, newIndexStr);
        });
    };

    generateChildrenMd(treeData, 1);

    fs.writeFileSync(filePath, mdContent);
}


const tree = {
  data: {
      node: "root",
      title: "前端学习",
      content: "前端学习概览"
  },
  children: [
      {
          data: {
              node: "root-0",
              title: "js学习",
              content: "js学习js学习js学习js学习"
          },
          children: [
              {
                  data: {
                      node: "root-0-0",
                      title: "数据类型",
                      content: "数据类型数据类型数据类型数据类型"
                  },
                  children: [
                      {
                          data: {
                              node: "root-0-0-0",
                              title: "基本数据类型",
                              content: "基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型基本数据类型"
                          },
                          children: []
                      },
                      {
                          data: {
                              node: "root-0-0-1",
                              title: "引用类型",
                              content: "引用类型引用类型引用类型引用类型引用类型引用类型引用类型引用类型引用类型引用类型引用类型引用类型"
                          },
                          children: []
                      }
                  ]
              }
          ]
      },
      {
          data: {
              node: "root-1",
              title: "css",
              content: "csscsscsscsscss"
          },
          children: [
              {
                  data: {
                      node: "root-1-0",
                      title: "scss",
                      content: "scssscssscssscssscssv"
                  },
                  children: []
              },
              {
                  data: {
                      node: "root-1-1",
                      title: "less",
                      content: "lesslesslesslesslesslesslesslesslesslesslessless"
                  },
                  children: []
              }
          ]
      },
      {
          data: {
              node: "root-2",
              title: "vue",
              content: "vuevuevuevue"
          },
          children: [
              {
                  data: {
                      node: "root-2-0",
                      title: "vue-router",
                      content: "vue-routervue-routervue-routervue-routervue-routervue-routervue-routervue-routervue-routervue-routervue-routervue-router"
                  },
                  children: []
              },
              {
                  data: {
                      node: "root-2-1",
                      title: "vuex",
                      content: "vuexvuexvuexvuexvuexvuexvuexvuexvuex"
                  },
                  children: []
              }
          ]
      },
      {
          data: {
              node: "root-3",
              title: "html",
              content: "htmlhtmlhtmlhtml"
          },
          children: []
      },
      {
          data: {
              node: "root-4",
              title: "react",
              content: "reactreactreactreactreactreact"
          },
          children: []
      }
  ]
}

const filePath = 'frontend_study.md';  // 替换为您想要的文件名
generateMdFromTree(tree, filePath);
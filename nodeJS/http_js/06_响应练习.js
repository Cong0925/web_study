// 1.引入HTTP模块
const http = require('http');

// 2.创建服务对象
const server = http.createServer((request, response) => {
  response.end(`
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset='utf-8'>
     <title>前端学习</title>
     <style>
    td {
      padding: 20px 40px;
    }
    tr:nth-child(2n){
      background-color: #aef;
     }
     tr:nth-child(2n+1){
      background-color: #fcb;
     }
    table,
    td {
      border-collapse: collapse;
    }
  </style>
   </head>
   
   <body>
   <table border='1'>
   <tr>
     <td></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td></td>
     <td></td>
     <td></td>
   </tr>
 </table>
    <script>
     let tds = document.querySelectorAll('td');
     //遍历
     tds.forEach(item =>{
       item.onclick = function(){
         this.style.background ='#222';
       }
     })
    </script>
   </body>
   </html>
   `)
})

// 3.监听端口，启动服务
server.listen(9000, () => {
  console.log('server start...');
})
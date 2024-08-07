const Koa = require('koa');
const serve = require('koa-static');
const { koaBody } = require('koa-body')

const path = require('path')
const fs = require('fs');

const config = require('./config/index.js')
const routers = require('./routes/index.js')

const app = new Koa();

app.use(koaBody({
  // 支持文件格式
  multipart: true,
  formidable: {
    // 上传目录
    uploadDir: path.join(__dirname, './fileChunks'),
    onFileBegin: (name, file) => {
      const dir = path.join(__dirname, `./fileChunks/${file.originalFilename}`)
      fs.mkdirSync(dir, { recursive: true })
      file.filepath = `${dir}/${name}`
      app.body = {
        code: "2000",
        message: "上传成功",
      }
    },
    onError: (error) => {
      app.body = {
        code: "2001",
        message: error,
      }
      return;
    },
    // 保留文件扩展名
    keepExtensions: true,
  }
}))

const main = serve(path.join(__dirname, '../front'));
app.use(main);


app.use(routers.routes())

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
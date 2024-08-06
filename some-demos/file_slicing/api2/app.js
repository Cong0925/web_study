const Koa = require('koa');
const serve = require('koa-static');
const { koaBody } = require('koa-body')
const Router = require('koa-router');
const router = new Router()
const path = require('path')
const fs = require('fs');
const fsp = require('fs/promises');

const app = new Koa();
const port = 9999
const fileTypeExtensions = {
  'video/mp4': '.mp4',
  'video/mov': '.mov',
  'video/wmv': '.wmv',
  'video/flv': '.flv',
  'video/avi': '.avi',
  'video/webm': '.webm',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'application/pdf': '.pdf',
  'text/plain': '.txt',
  'audio/mpeg': '.mp3',
  'audio/wav': '.wav'
};



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

const routes_get = {
  verifyFile: async (ctx) => {
    const fileNameHash = ctx.query.fileNameHash;

    const filesDir = path.join(__dirname, './files');
    const fileChunksDir = path.join(__dirname, `./fileChunks`);

    try {
      const files = await fsp.readdir(filesDir);
      const fileExists = files.some(file => file.split('.')[0] === fileNameHash);

      if (fileExists) {
        ctx.body = {
          code: "2000",
          data: {
            alreadyUploadChunk: -1
          },
          message: "文件已上传",
        };
        return
      }

      const chunksFile = await fsp.readdir(fileChunksDir);
      const chunksFileExists = chunksFile.some(file => file === fileNameHash);

      if (chunksFileExists) {
        const chunks = await fsp.readdir(path.join(__dirname, `./fileChunks/${fileNameHash}`));
        ctx.body = {
          code: "2001",
          data: {
            alreadyUploadChunk: chunks
          },
          message: "文件上传缺失",
        };
        return
      }
      ctx.body = {
        code: "2002",
        data: {
          alreadyUploadChunk: 0
        },
        message: "文件未上传",
      };


    } catch (err) {
      ctx.body = {
        code: "-1",
        message: "error",
      };
      console.error(`读取文件夹时出错: ${err}`);
    }


  },
};
router.get('/verifyFile', routes_get.verifyFile);

const routes_post = {
  uploadChunk: async (ctx) => {
    ctx.body = {
      code: "2000",
      message: "上传成功",
    };
  },
  mergeChunks: async (ctx) => {
    const fileNameHash = ctx.request.body.fileNameHash
    const chunkCount = ctx.request.body.chunkCount
    const fileType = ctx.request.body.fileType

    const dir = path.join(__dirname, `./fileChunks/${fileNameHash}`)
    const files = (await fsp.readdir(dir)).sort()
    if (files.length !== Number(chunkCount)) {
      ctx.body = {
        code: "2001",
        message: "上传失败，文件内容错误",
      };
      return
    }


    let extension;
    if (fileTypeExtensions[fileType]) {
      extension = fileTypeExtensions[fileType];
    } else {
      // // 处理不支持的文件类型的情况
      // throw new Error(`不支持的文件类型: ${fileType}`);
      extension = ''
    }
    const target = path.join(__dirname, `./files/${fileNameHash}`)
    for (const fileName of files) {
      const data = await fsp.readFile(`${dir}/${fileName}`)
      await fsp.appendFile(target + extension, data,)
    }

    ctx.body = {
      code: "2000",
      message: "上传成功！",
    }

  },
};
router.post('/uploadChunk', routes_post.uploadChunk);
router.post('/mergeChunks', routes_post.mergeChunks);
app.use(router.routes())

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
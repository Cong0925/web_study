const fsp = require('fs/promises');
const path = require('path')
const Router = require('koa-router');
const router = new Router()
const config = require('../config/index')

const routes_get = {
  verifyFile: async (ctx) => {
    const fileNameHash = ctx.query.fileNameHash;

    const filesDir = path.join(__dirname, '../files');
    const fileChunksDir = path.join(__dirname, `../fileChunks`);

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
        const chunks = await fsp.readdir(path.join(__dirname, `../fileChunks/${fileNameHash}`));
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

    const dir = path.join(__dirname, `../fileChunks/${fileNameHash}`)
    const files = (await fsp.readdir(dir)).sort()
    if (files.length !== Number(chunkCount)) {
      ctx.body = {
        code: "2001",
        message: "上传失败，文件内容错误",
      };
      return
    }

    let extension;
    if (config.fileTypeExtensions[fileType]) {
      extension = config.fileTypeExtensions[fileType];
    } else {
      // // 处理不支持的文件类型的情况
      // throw new Error(`不支持的文件类型: ${fileType}`);
      extension = ''
    }
    const target = path.join(__dirname, `../files/${fileNameHash}`)
    for (const fileName of files) {
      const data = await fsp.readFile(`${dir}/${fileName}`)
      await fsp.appendFile(target + extension, data,)
      fsp.unlink(path.join(__dirname,`../fileChunks/${fileNameHash}/${fileName}`))
    }

    fsp.rmdir(dir)

    ctx.body = {
      code: "2000",
      message: "上传成功！",
    }

  },
};
router.post('/uploadChunk', routes_post.uploadChunk);
router.post('/mergeChunks', routes_post.mergeChunks);

module.exports = router

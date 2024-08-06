const multer = require('multer');// 导入multer中间件 用于处理文件上传 或者 form-data格式的请求数据

const multerLoader = async (app) => {

  // 文件上传中间件 设置
  const storage = multer.diskStorage({
    // 设置上传文件的存储路径
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    // 设置上传文件的文件名
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  app.use(multer({ storage: storage }).array('formData', 12));

  return app
}

module.exports = { multerLoader }
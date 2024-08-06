const { expressLoader } = require('./express') // express模块
const { routesLoader } = require('./routes') //  routes 路由模块
const { multerLoader } = require('./multer')  // multer 模块

const init = async (expressApp) => {
  // 注意引入顺序，顺序错误，可能导致报错
  await expressLoader(expressApp);
  console.log('expressLoader Intialized');  // 初始化express，建议放前面

  await multerLoader(expressApp);
  console.log('multerLoader Intialized'); // 初始化multer，建议放前面，它会影响req.body的读取


  await routesLoader(expressApp)
  console.log('routesLoader Intialized'); // 路由模块，建议放最后

  // ... more loaders can be here
}

module.exports = { init }
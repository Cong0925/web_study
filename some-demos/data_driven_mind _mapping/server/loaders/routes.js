const routes = require('../routes');  // 引入 routes/index.js 文件

const routesLoader = async (app) => {
  
  // 使用挂载的路由
  app.use('/api', routes);
  return app
}

module.exports = { routesLoader }

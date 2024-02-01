const userModel = require('../models/userModel.js');
const responseHandler = require('../utils/responseHandler');

// 示例数据库操作函数
const getAllUsers = (req, res) => {
  // 从请求中获取页码和每页的数量，默认为第一页，每页显示 10 条记录
  const page = req.query.Page || 1;
  const pageSize = req.query.Size || 10;

  // 计算 OFFSET，以便在查询时跳过相应的记录
  const offset = (page - 1) * pageSize;
  // 获取所有用户的逻辑
  userModel.getAllUsers(offset, pageSize,(error, user,totalCount) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (user) {
      responseHandler.handleSuccessResponse(res, user,totalCount);
    } else {
      responseHandler.handleNotFoundResponse(res,404, 'Users not found');
    }})
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  userModel.getUserById(userId, (error, user) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      responseHandler.handleNotFoundResponse(res,500, 'Internal Server Error');
      return;
    }

    if (user) {
      responseHandler.handleSuccessResponse(res, user);
    } else {
      responseHandler.handleNotFoundResponse(res,404, 'User not found');
    }
  });
};

const createUser = (req, res) => {
  const { username, IPAddress } = req.body;
  const newUser = { username, IPAddress };

  userModel.createUser(newUser, (error, createdUser) => {
    if (error) {
      console.error('Error creating user: ' + error.stack);
      responseHandler.handleNotFoundResponse(res,500, 'Internal Server Error');
      return;
    }
    responseHandler.handleSuccessResponse(res, createdUser);

  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser
};

// responseHandler.js
const handleSuccessResponse = (res, data,totalCount) => {
  const response = {
    code: '2000',
    data: data,
    totalCount: totalCount || data.length || 1,
    message: 'Successfully!',
  };
  res.status(200).json(response);

};

const handleNotFoundResponse = (res,code, message = 'Not found') => {
  const response = {
    code: code,
    message:message,
  };
  res.status(code).json(response);
};

module.exports = {
  handleSuccessResponse,
  handleNotFoundResponse,
};

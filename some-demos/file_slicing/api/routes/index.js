const express = require('express');
const router = express.Router();

router.get('/verifyFile', (req, res) => {
  console.log(req)
  const response = {
    code: '2000', // 2000 是上传完成，2001未上传完成
    // data: data,
    // totalCount: totalCount || data.length || 1,
    message: 'Successfully!',
  };
  res.status(200).json(response);
})
router.post('/uploadChunk', () => {

})
router.post('/mergeChunks', () => {

})
module.exports = router;

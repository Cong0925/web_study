var express = require('express');
var router = express.Router();
const formidable = require('formidable')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/protrait', function(req, res, next) {
  res.render('protrait');
});
router.post('/protrait', function(req, res, next) {
  const form = formidable({
    multiples:true,
    uploadDir:__dirname+'/../public/images',
    keepExtensions:true
  });

  form.parse(req,(err,fields,files)=>{
    if(err){
      next(err);
      return 
    }
    console.log(files.files.newFilename);
    let url = '/images/'+ files.files.newFilename
    // res.json({fields,files})
    res.send(url)
  })
});

module.exports = router;

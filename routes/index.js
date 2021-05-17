var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('index2', { title: 'Express', name: 'han sh' });
});

/*로그인 화면*/
router.get('/test2', function(req, res, next){
  res.render('signin', { title: 'Express' });
}); 

/*회원가입 화면*/
router.get('/test3', function(req, res, next){
  res.render('signup', { title: 'Express' });
}); 

/*nav_개발자*/
router.get('/nav_developer', function(req, res, next){
  res.render('nav_develop', { title: 'Express' });
});

/*nav_경영진*/
router.get('/nav_management', function(req, res, next){
  res.render('nav_management', { title: 'Express' });
});

/*프로젝트 등록 페이지*/
router.get('/addproject', function(req, res, next){
  res.render('addProject', { title: 'Express' });
});

module.exports = router;

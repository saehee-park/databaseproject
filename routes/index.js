var express = require('express');
var router = express.Router();
var Employee = require('../models/emp');
const catchErrors = require('../lib/async-error');
var bcrypt = require('bcrypt');

function generateHash(password){
  return bcrypt.hash(password, 10);
}

function comparePassword(password, hash){
  return bcrypt.compare(password, hash);
}

function validateForm(form){
  var name = form.name || "";
  var id = form.id || "";
  var password = form.password || "";

  if(!name) {
    return '이름을 입력해주세요.';
  }

  if(name.length < 2) {
    return '이름은 두 글자 이상 입력해주세요.';
  }

  if (!id) {
    return 'ID를 입력해주세요.';
  }

  if (!password) {
    return '비밀번호를 입력해주세요.';
  }

  // if (password !== password_confirmation) {
  //   return '비밀번호가 일치하지 않습니다.';
  // }

  if (password.length < 7) {
    return '비밀번호가 너무 짧습니다. (8자 이상)';
  }

  return null;
}

/* GET index listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/signup', (req, res) => {
  res.render('signup', {});
});

router.route('/signin')
  .get((req, res) => {
    res.render('signin', {});
  })

  .post(catchErrors(async (req, res, next) => {
    console.log(req.body);

    const user = await Employee.findOne({ where: { ID: req.body.id } });
    if(!user){
      req.flash('danger', 'Not exist user.');
      return res.redirect('back');
    }

    const compare = await comparePassword(req.body.password, user.PWD);
    if(!compare){
      req.flash('danger', 'Passsword do not match.');
      return res.redirect('back');
    }

    req.session.user = user;
    req.session.authorization = user.authorization_no;
    req.flash('success', 'Welcome!');
    return res.redirect('/');
  }));

router.post('/signup', catchErrors(async (req, res, next) => {
  console.log(req.body);

  var err = validateForm(req.body);
  if(err){
    req.flash('danger', err);
    return res.redirect('back');
  }

  var user = await Employee.findOne({id: req.body.id});

  if(user) {
    req.flash('danger', '이미 존재하는 ID 입니다.');
    return res.redirect('back');
  }

  var password = await generateHash(req.body.password);

  user = await Employee.create({
    name: req.body.name,
    ID: req.body.id,
    PWD: password,
    dept_no: null,
    authorization_no: null,
    education: null,
    work_experience: null
  });

  req.flash('success', 'Registered successfully. Please sign in.');
  res.redirect('/');
}));

router.get('/signout', (req, res, next) => {
  delete req.session.user;
  req.flash('success', 'Successfully signed out.');
  res.redirect('/');
});


router.get('/test', function(req, res, next) {
  res.render('index2', { title: 'Express', name: 'han sh' });
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

/*개인정보 수정*/
router.get('/myprofileedit', function(req, res, next){
  res.render('myProfileEdit', { title: 'Express' });
});

module.exports = router;

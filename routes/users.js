var express = require('express');
var router = express.Router();
var Employee = require('../models/employee');
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

  if (password !== password_confirmation) {
    return '비밀번호가 일치하지 않습니다.';
  }

  if (password.length < 7) {
    return '비밀번호가 너무 짧습니다. (8자 이상)';
  }

  return null;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Users' });
});

router.get('/sign_up', (req, res) => {
  res.render('signup', {});
});

router.route('/signin')
  .get((req, res) => {
    res.render('signin', {});
  })
  .post(catchErrors(async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.body.id } });
    if(!user){
      req.flash('danger', 'Not exist user.');
      return res.redirect('back');
    }

    const compare = await comparePassword(req.body.password, user.password);
    if(!compare){
      req.flash('danger', 'Passsword do not match.');
      return res.redirect('back');
    }

    const partner = await Partner.findOne({ where: { user_id: user.id } }); // 파트너 등록이 안 되어 있으면 return null

    req.session.user = user;
    req.session.partner = partner;
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

  var employee = await Employee.findOne({id: req.body.id});

  if(employee) {
    req.flash('danger', '이미 존재하는 ID 입니다.');
    return res.redirect('back');
  }

  var password = await generateHash(req.body.password);
  user = await Employee.create({
    name: req.body.name,
    id: req.body.id,
    password: password
  });
  req.flash('success', 'Registered successfully. Please sign in.');
  res.redirect('/');
}));

router.get('/sign_out', (req, res, next) => {
  delete req.session.user;
  req.flash('success', 'Successfully signed out.');
  res.redirect('/');
});

module.exports = router;
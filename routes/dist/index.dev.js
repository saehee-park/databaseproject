"use strict";

var express = require('express');

var router = express.Router();

var Employee = require('../models/emp');

var catchErrors = require('../lib/async-error');

var bcrypt = require('bcrypt');

function generateHash(password) {
  return bcrypt.hash(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function validateForm(form) {
  var name = form.name || "";
  var id = form.id || "";
  var password = form.password || "";

  if (!name) {
    return '이름을 입력해주세요.';
  }

  if (name.length < 2) {
    return '이름은 두 글자 이상 입력해주세요.';
  }

  if (!id) {
    return 'ID를 입력해주세요.';
  }

  if (!password) {
    return '비밀번호를 입력해주세요.';
  } // if (password !== password_confirmation) {
  //   return '비밀번호가 일치하지 않습니다.';
  // }


  if (password.length < 7) {
    return '비밀번호가 너무 짧습니다. (8자 이상)';
  }

  return null;
}
/* GET index listing. */


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Index'
  });
});
router.get('/signup', function (req, res) {
  res.render('signup', {});
});
router.route('/signin').get(function (req, res) {
  res.render('signin', {});
}).post(catchErrors(function _callee(req, res, next) {
  var user, compare;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          _context.next = 3;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: {
              ID: req.body.id
            }
          }));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          req.flash('danger', 'Not exist user.');
          return _context.abrupt("return", res.redirect('back'));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(comparePassword(req.body.password, user.PWD));

        case 9:
          compare = _context.sent;

          if (compare) {
            _context.next = 13;
            break;
          }

          req.flash('danger', 'Passsword do not match.');
          return _context.abrupt("return", res.redirect('back'));

        case 13:
          req.session.user = user;
          req.session.authorization = user.authorization_no;
          req.flash('success', 'Welcome!');
          return _context.abrupt("return", res.redirect('/'));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
}));
router.post('/signup', catchErrors(function _callee2(req, res, next) {
  var err, user, password;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.body);
          err = validateForm(req.body);

          if (!err) {
            _context2.next = 5;
            break;
          }

          req.flash('danger', err);
          return _context2.abrupt("return", res.redirect('back'));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(Employee.findOne({
            id: req.body.id
          }));

        case 7:
          user = _context2.sent;

          if (!user) {
            _context2.next = 11;
            break;
          }

          req.flash('danger', '이미 존재하는 ID 입니다.');
          return _context2.abrupt("return", res.redirect('back'));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(generateHash(req.body.password));

        case 13:
          password = _context2.sent;
          _context2.next = 16;
          return regeneratorRuntime.awrap(Employee.create({
            name: req.body.name,
            ID: req.body.id,
            PWD: password,
            dept_no: null,
            authorization_no: null,
            education: null,
            work_experience: null
          }));

        case 16:
          user = _context2.sent;
          req.flash('success', 'Registered successfully. Please sign in.');
          res.redirect('/');

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  });
}));
router.get('/signout', function (req, res, next) {
  delete req.session.user;
  req.flash('success', 'Successfully signed out.');
  res.redirect('/');
});
router.get('/test', function (req, res, next) {
  res.render('index2', {
    title: 'Express',
    name: 'han sh'
  });
});
/*회원가입 화면*/

router.get('/test3', function (req, res, next) {
  res.render('signup', {
    title: 'Express'
  });
});
/*nav_개발자*/

router.get('/nav_developer', function (req, res, next) {
  res.render('nav_develop', {
    title: 'Express'
  });
});
/*nav_경영진*/

router.get('/nav_management', function (req, res, next) {
  res.render('nav_management', {
    title: 'Express'
  });
});
/*프로젝트 등록 페이지*/

router.get('/addproject', function (req, res, next) {
  res.render('addProject', {
    title: 'Express'
  });
});
/*개인정보 수정*/

router.get('/myprofileedit', function (req, res, next) {
  res.render('myProfileEdit', {
    title: 'Express'
  });
});
/*project list*/

router.get('/project/list', function (req, res, next) {
  res.render('project/list', {
    title: 'Express'
  });
});
/*project create*/

router.get('/project/new', function (req, res, next) {
  res.render('project/new', {
    title: 'Express'
  });
});
/*project details*/

router.get('/project/details', function (req, res, next) {
  res.render('project/details', {
    title: 'Express'
  });
});
/*project modify*/

router.get('/project/modify', function (req, res, next) {
  res.render('project/modify', {
    title: 'Express'
  });
});
/*add Client*/

router.get('/addclient', function (req, res, next) {
  res.render('addclient', {
    title: 'Express'
  });
});
module.exports = router;
//# sourceMappingURL=index.dev.js.map

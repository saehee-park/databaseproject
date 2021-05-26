"use strict";

var express = require("express");

var router = express.Router();

var Employee = require("../models/employee");

var Skill = require("../models/skill");

var EmpSkill = require("../models/emp_skill");

var Project = require('../models/project');

var catchErrors = require("../lib/async-error");

var bcrypt = require("bcrypt");

var Peer = require("../models/peer_evaluation");

var admin = require("firebase-admin");

var serAccount = require("../node-7fe56-firebase-adminsdk-6a08y-3ebbb95309.json");

admin.initializeApp({
  credential: admin.credential.cert(serAccount)
});
express().set("admin", admin);

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
    return "이름을 입력해주세요.";
  }

  if (name.length < 2) {
    return "이름은 두 글자 이상 입력해주세요.";
  }

  if (!id) {
    return "ID를 입력해주세요.";
  }

  if (!password) {
    return "비밀번호를 입력해주세요.";
  } // if (password !== password_confirmation) {
  //   return '비밀번호가 일치하지 않습니다.';
  // }


  if (password.length < 7) {
    return "비밀번호가 너무 짧습니다. (8자 이상)";
  }

  return null;
}

function getDday(end) {
  var today = new Date();
  var year = today.getFullYear(); // 년도

  var month = today.getMonth() + 1; // 월

  var day = today.getDate(); // 날짜

  var endArray = end.toString().split(" ");
  var end_date = endArray[0];
  var dateArray = end_date.split("-");

  if (year == dateArray[0]) {
    if (month == dateArray[1]) {
      if (dateArray[2] - day <= 7) {
        return dateArray[2] - day;
      }
    }
  }

  return null;
}
/* GET index listing. */


router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Index"
  });
});
router.get("/signup", catchErrors(function _callee(req, res, next) {
  var skills;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Skill.findAll());

        case 2:
          skills = _context.sent;
          res.render("signup", {
            skills: skills
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}));
router.get("/mypage", function _callee2(req, res) {
  var user, id, pwd, education, name, work_experience, emp_no, userSkills;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.session.authorization) res.json({
            message: "you should login"
          });
          _context2.next = 3;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: {
              authorization_no: req.session.authorization
            }
          }));

        case 3:
          user = _context2.sent;
          id = user.id, pwd = user.pwd, education = user.education, name = user.name, work_experience = user.work_experience, emp_no = user.emp_no;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Skill.findAll({
            include: [{
              model: EmpSkill,
              where: ["emp_no = ".concat(emp_no)]
            }],
            attributes: ["skill_name"]
          }));

        case 7:
          userSkills = _context2.sent;
          res.json({
            id: id,
            pwd: pwd,
            education: education,
            skill: userSkills,
            name: name,
            work_experience: work_experience
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.route("/signin").get(function (req, res) {
  res.render("signin", {});
}).post(catchErrors(function _callee3(req, res, next) {
  var user, projects, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, project, d_day;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.body);
          _context3.next = 3;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: {
              ID: req.body.id
            }
          }));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 7;
            break;
          }

          req.flash("danger", "존재하지 않는 ID 입니다.");
          return _context3.abrupt("return", res.redirect("back"));

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(Project.findAll({
            where: {
              state: '진행중'
            },
            include: [{
              model: Employee,
              as: 'project_emp',
              through: {
                where: {
                  emp_no: user.emp_no
                }
              }
            }]
          }));

        case 9:
          projects = _context3.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 13;

          for (_iterator = projects[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            project = _step.value;
            d_day = getDday(project.dataValues.end_date);

            if (d_day) {
              req.flash("warning", "".concat(project.project_name, " \uD504\uB85C\uC81D\uD2B8\uC758 \uB9C8\uAC10\uC77C\uC790\uAE4C\uC9C0 ").concat(d_day, "\uC77C \uB0A8\uC558\uC2B5\uB2C8\uB2E4."));
            }
          }

          _context3.next = 21;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](13);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 21:
          _context3.prev = 21;
          _context3.prev = 22;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 24:
          _context3.prev = 24;

          if (!_didIteratorError) {
            _context3.next = 27;
            break;
          }

          throw _iteratorError;

        case 27:
          return _context3.finish(24);

        case 28:
          return _context3.finish(21);

        case 29:
          req.session.user = user;
          req.session.authorization = user.authorization_no;
          req.flash("success", "".concat(user.name, "\uB2D8 \uD658\uC601\uD569\uB2C8\uB2E4!"));
          return _context3.abrupt("return", res.redirect("/"));

        case 33:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[13, 17, 21, 29], [22,, 24, 28]]);
}));
router.post("/signup", catchErrors(function _callee4(req, res, next) {
  var err, user, password, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, skill;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log(req.body);
          err = validateForm(req.body);

          if (!err) {
            _context4.next = 5;
            break;
          }

          req.flash("danger", err);
          return _context4.abrupt("return", res.redirect("back"));

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: {
              ID: req.body.id
            }
          }));

        case 7:
          user = _context4.sent;

          if (!user) {
            _context4.next = 11;
            break;
          }

          req.flash("danger", "이미 존재하는 ID 입니다.");
          return _context4.abrupt("return", res.redirect("back"));

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap(generateHash(req.body.password));

        case 13:
          password = _context4.sent;
          _context4.next = 16;
          return regeneratorRuntime.awrap(Employee.create({
            name: req.body.name,
            ID: req.body.id,
            PWD: password,
            dept_no: req.body.department,
            authorization_no: null,
            education: req.body.education,
            work_experience: null
          }));

        case 16:
          user = _context4.sent;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context4.prev = 20;
          _iterator2 = req.body.skills[Symbol.iterator]();

        case 22:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context4.next = 29;
            break;
          }

          skill = _step2.value;
          _context4.next = 26;
          return regeneratorRuntime.awrap(EmpSkill.create({
            emp_no: user.emp_no,
            skill_no: skill
          }));

        case 26:
          _iteratorNormalCompletion2 = true;
          _context4.next = 22;
          break;

        case 29:
          _context4.next = 35;
          break;

        case 31:
          _context4.prev = 31;
          _context4.t0 = _context4["catch"](20);
          _didIteratorError2 = true;
          _iteratorError2 = _context4.t0;

        case 35:
          _context4.prev = 35;
          _context4.prev = 36;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 38:
          _context4.prev = 38;

          if (!_didIteratorError2) {
            _context4.next = 41;
            break;
          }

          throw _iteratorError2;

        case 41:
          return _context4.finish(38);

        case 42:
          return _context4.finish(35);

        case 43:
          req.flash("success", "정상적으로 회원가입되었습니다.");
          res.redirect("/");

        case 45:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[20, 31, 35, 43], [36,, 38, 42]]);
}));
router.get("/signout", function (req, res, next) {
  delete req.session.user;
  req.flash("success", "정상적으로 로그아웃 되었습니다.");
  res.redirect("/");
});
router.get("/test", function (req, res, next) {
  res.render("index2", {
    title: "Express",
    name: "han sh"
  });
}); // router.get("/project/:id", catchErrors( async (req, res) => {
//     const { id } = req.params;
//     if (!req.session.authorization) res.json({ message: "you should login" });
//     const user = await Employee.findOne({
//         where: { id },
//     });
//     let total = 0;
//     const scores = await Peer.findAll({
//         where: {
//             evaluation_no: user.emp_no,
//         },
//     });
//     scores.forEach((val) => {
//         total += val.evaluation_score1;
//         total += val.evaluation_score2;
//     });
//     res.json({
//         total,
//         average: total / (scores.length * 2),
//     });
// }));
// router.get("/project", catchErrors( async (req, res) => {
//     let max = -1;
//     let index = -1;
//     const scores = await Peer.findAll({});
//     scores.forEach((val, i) => {
//         const temp = val.evaluation_score1 + val.evaluation_score2;
//         if (max < temp) index = i;
//     });
//     const user = await Employee.findOne({
//         where: { emp_no: scores[index].evaluation_no },
//     });
//     res.json(user);
// }));
// mypage router 사용

var mypage = require("./mypage");

express().use("/mypage", mypage);
/*회원가입 화면*/

router.get("/test3", function (req, res, next) {
  res.render("signup", {
    title: "Express"
  });
});
/*nav_개발자*/

router.get("/navbar", function (req, res, next) {
  res.render("includes/navbar", {
    title: "Express"
  });
});
/*프로젝트 등록 페이지*/

router.get("/addproject", function (req, res, next) {
  res.render("addProject", {
    title: "Express"
  });
});
/*마이페이지*/

router.get("/mypage", function (req, res, next) {
  res.render("mypage/mypageview", {
    title: "Express"
  });
});
/*개인정보 수정*/

router.get("/myprofileedit", function (req, res, next) {
  res.render("mypage/myProfileEdit", {
    title: "Express"
  });
});
/*고객평가 해당 직원 리스트 페이지*/

router.get('/evaluation/customer_evaluation', function (req, res, next) {
  res.render('evaluation/customer_evaluation', {
    title: 'Express'
  });
});
/*고객평가 입력페이지*/

router.get('/evaluation/inputCustomer_evaluation', function (req, res, next) {
  res.render('evaluation/inputCustomer_evaluation', {
    title: 'Express'
  });
});
/*동료평가 해당 직원 리스트 페이지*/

router.get('/evaluation/peer_evaluation', function (req, res, next) {
  res.render('evaluation/peer_evaluation', {
    title: 'Express'
  });
});
/*동료평가 입력페이지*/

router.get('/evaluation/inputPeer_evaluation', function (req, res, next) {
  res.render('evaluation/inputPeer_evaluation', {
    title: 'Express'
  });
});
/*PM평가 해당 직원 리스트 페이지*/

router.get('/evaluation/pm_evaluation', function (req, res, next) {
  res.render('evaluation/pm_evaluation', {
    title: 'Express'
  });
});
/*PM평가 입력페이지*/

router.get('/evaluation/inputPm_evaluation', function (req, res, next) {
  res.render('evaluation/inputPm_evaluation', {
    title: 'Express'
  });
});
/*고객평가 해당 직원 리스트 페이지*/

router.get('/evaluation/customer_evaluation', function (req, res, next) {
  res.render('evaluation/customer_evaluation', {
    title: 'Express'
  });
});
/*고객평가 입력페이지*/

router.get('/evaluation/inputCustomer_evaluation', function (req, res, next) {
  res.render('evaluation/inputCustomer_evaluation', {
    title: 'Express'
  });
});
/*고객평가서 항목 수정페이지*/

router.get('/evaluation/modification_customerEval', function (req, res, next) {
  res.render('evaluation/modification_customerEval', {
    title: 'Express'
  });
});
/*업무능력서 항목 수정페이지*/

router.get('/evaluation/modification_peerEval', function (req, res, next) {
  res.render('evaluation/modification_peerEval', {
    title: 'Express'
  });
});
/*특정직원의 동료,pm,peer평가 결과(점수,합계,평균)를 확인하는 페이지*/

router.get('/management/evaluationResult_inquiry', function (req, res, next) {
  res.render('management/evaluationResult_inquiry', {
    title: 'Express'
  });
});
/*특정직원의 고객평가 상세결과 페이지*/

router.get('/evaluation/resultCustomer_eval', function (req, res, next) {
  res.render('evaluation/resultCustomer_eval', {
    title: 'Express'
  });
});
/*특정직원의 PM평가 상세결과 페이지*/

router.get('/evaluation/resultPm_eval', function (req, res, next) {
  res.render('evaluation/resultPm_eval', {
    title: 'Express'
  });
});
/*특정직원의 동료평가 상세결과 페이지*/

router.get('/evaluation/resultPeer_eval', function (req, res, next) {
  res.render('evaluation/resultPeer_eval', {
    title: 'Express'
  });
});
/*project list*/

router.get('/project/list', function (req, res, next) {
  res.render('project/list', {
    title: "Express"
  });
});
/*project create*/

router.get("/project/new", function (req, res, next) {
  res.render("project/new", {
    title: "Express"
  });
});
/*project details*/

router.get("/project/details", function (req, res, next) {
  res.render("project/details", {
    title: "Express"
  });
});
/*project modify*/

router.get("/project/modify", function (req, res, next) {
  res.render("project/modify", {
    title: "Express"
  });
});
/*project task*/

router.get("/project/checkTask", function (req, res, next) {
  res.render("project/checkTask", {
    title: "Express"
  });
});
/*add Client*/

router.get("/addclient", function (req, res, next) {
  res.render("addclient", {
    title: "Express"
  });
});
/*add Task*/

router.get("/project/addTask", function (req, res, next) {
  res.render("project/addTask", {
    title: "Express"
  });
});
/*project finish*/

router.get("/project/finish", function (req, res, next) {
  res.render("project/finish", {
    title: "Express"
  });
});
/*inquiry Employee*/

router.get("/employee/inquiryEmployee", function (req, res, next) {
  res.render("employee/inquiryEmployee", {
    title: "Express"
  });
});
/*inquiry Employee*/

router.get("/employee/detailEmployee", function (req, res, next) {
  res.render("employee/detailEmployee", {
    title: "Express"
  });
});
module.exports = router;
//# sourceMappingURL=index.dev.js.map

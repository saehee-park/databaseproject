"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var express = require('express');

var Participation = require('../models/participation');

var Project = require('../models/project');

var Customer = require('../models/customer');

var Employee = require('../models/employee');

var EmpSkill = require('../models/emp_skill');

var Task = require('../models/task');

var catchErrors = require('../lib/async-error');

var _require = require('../models/customer'),
    rawAttributes = _require.rawAttributes;

var router = express.Router();
router.get('/', catchErrors(function _callee(req, res, next) {
  var projects;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Project.findAll({
            include: [{
              model: Employee,
              as: 'project_emp',
              through: {
                where: {
                  emp_no: req.session.user.emp_no
                }
              }
            }]
          }));

        case 2:
          projects = _context.sent;
          res.render('project/index', {
            projects: projects
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}));
router.get('/:project_no', catchErrors(function _callee2(req, res, next) {
  var project;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Project.findOne({
            where: {
              project_no: req.params.project_no
            },
            include: [{
              model: Employee,
              as: 'project_emp'
            }, {
              model: Customer
            }]
          }));

        case 2:
          project = _context2.sent;
          console.log(project.project_emp[0]);
          res.render('project/details', {
            project: project
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
})); // 업무 진척도 조회 페이지

router.get('/tasks/:project_no/:emp_no', catchErrors(function _callee3(req, res) {
  var projectPercent, employeePercent, employee, tasks, endTasks, empTasks, empEndTasks, verifyTask, progressTask, uncheckTask;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          projectPercent = 0;
          employeePercent = 0;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Task.findAll({
            where: {
              project_no: req.params.project_no
            }
          }));

        case 4:
          tasks = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Task.findAll({
            where: {
              project_no: req.params.project_no,
              current_state: 'end'
            }
          }));

        case 7:
          endTasks = _context3.sent;
          _context3.next = 10;
          return regeneratorRuntime.awrap(Task.findAll({
            where: {
              project_no: req.params.project_no,
              emp_no: req.params.emp_no
            }
          }));

        case 10:
          empTasks = _context3.sent;
          _context3.next = 13;
          return regeneratorRuntime.awrap(Task.findAll({
            where: {
              project_no: req.params.project_no,
              emp_no: req.params.emp_no,
              current_state: 'end'
            }
          }));

        case 13:
          empEndTasks = _context3.sent;
          _context3.next = 16;
          return regeneratorRuntime.awrap(Task.findAll({
            where: {
              project_no: req.params.project_no,
              emp_no: req.params.emp_no,
              current_state: 'verify'
            }
          }));

        case 16:
          verifyTask = _context3.sent;
          _context3.next = 19;
          return regeneratorRuntime.awrap(Task.findAll({
            where: {
              project_no: req.params.project_no,
              emp_no: req.params.emp_no,
              current_state: 'progress'
            }
          }));

        case 19:
          progressTask = _context3.sent;
          _context3.next = 22;
          return regeneratorRuntime.awrap(Task.findAll({
            where: {
              project_no: req.params.project_no,
              emp_no: req.params.emp_no,
              current_state: 'uncheck'
            }
          }));

        case 22:
          uncheckTask = _context3.sent;
          projectPercent = String(Math.round(endTasks.length / tasks.length * 100));
          employeePercent = String(Math.round(empEndTasks.length / empTasks.length * 100)); // employeeTaskList.push(Math.round(endTasks.length / tasks.length * 100));
          // employeeTaskList.push(endTasks.length);
          // employeeTaskList.push(verifyTask.length);
          // employeeTaskList.push(progressTask.length);
          // employeeTaskList.push(uncheckTask.length);

          res.render('project/checkTask', {
            projectPercent: projectPercent,
            employeePercent: employeePercent
          });

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  });
})); // addTask 페이지 응답 

router.get('/addTask', catchErrors(function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.render('/project/addTask', {});

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
})); // 업무를 DB에 추가

router.post('/addTask', catchErrors(function _callee5(req, res) {
  var task;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Task.create({}));

        case 2:
          task = _context5.sent;

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
})); // 스킬셋이 HTML & JAVASCRIPT인 직원 리스트 응답

router.get('/addTask/HJ', catchErrors(function _callee6(req, res) {
  var empList, empSkill, i, emp, set;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          // 직원 리스트 선언
          empList = []; // EmpSkill 가져오기

          _context6.next = 3;
          return regeneratorRuntime.awrap(EmpSkill.findAll({
            where: {
              skill_no: [1, 2]
            }
          }));

        case 3:
          empSkill = _context6.sent;
          i = 0;

        case 5:
          if (!(i < empSkill.length)) {
            _context6.next = 13;
            break;
          }

          _context6.next = 8;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: {
              emp_no: empSkill[i].emp_no
            },
            attributes: ['name']
          }));

        case 8:
          emp = _context6.sent;
          // 모든 직원 추가
          empList.push([empSkill[i].emp_no, emp.name]);

        case 10:
          i++;
          _context6.next = 5;
          break;

        case 13:
          // 중복 제거
          set = new Set(empList);
          console.log(set);
          empList = _toConsumableArray(set);
          console.log(empList[1][0] == empList[3][0]); // 최종 리스트 전달

          res.send(empList);

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  });
})); // 스킬셋이 C# & C/C++인 직원 리스트 응답

router.get('addTask/CCC', catchErrors(function _callee7(req, res) {
  var empSkill;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(EmpSkill.findAll({
            where: {
              skill_no: [3, 4]
            }
          }));

        case 2:
          empSkill = _context7.sent;

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
})); // 스킬셋이 Dart/Flutter & Java 인 직원 리스트 응답

router.get('addTask/DFJ', catchErrors(function _callee8(req, res) {
  var empSkill;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(EmpSkill.findAll({
            where: {
              skill_no: [5, 6]
            }
          }));

        case 2:
          empSkill = _context8.sent;

        case 3:
        case "end":
          return _context8.stop();
      }
    }
  });
})); // 스킬셋이 Dart/Flutter & Java 인 직원 리스트 응답

router.get('addTask/Python', catchErrors(function _callee9(req, res) {
  var empSkill;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(EmpSkill.findAll({
            where: {
              skill_no: 7
            }
          }));

        case 2:
          empSkill = _context9.sent;

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
}));
module.exports = router;
//# sourceMappingURL=projects.dev.js.map

"use strict";

var express = require("express");

var router = express.Router();

var Employee = require("../models/employee");

var Participation = require("../models/participation");

var Customer = require("../models/customer");

var Project = require("../models/project");

var catchErrors = require("../lib/async-error");

router.get('/', function (req, res, next) {
  res.render('management/index', {});
});
router.get('/customer/register', catchErrors(function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('management/registerCustomer', {});

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}));
router.get('/customer/list', catchErrors(function _callee2(req, res, next) {
  var customers;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Customer.findAll());

        case 2:
          customers = _context2.sent;
          res.render('management/customerList', {
            customers: customers
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}));
router.post('/customer/register', catchErrors(function _callee3(req, res, next) {
  var customer;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Customer.create({
            customer_name: req.body.name
          }));

        case 2:
          customer = _context3.sent;
          req.flash("success", "정상적으로 등록되었습니다.");
          res.redirect('/');

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}));
router.get('/project/register', catchErrors(function _callee4(req, res, next) {
  var customers, marketing, research, business, development;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Customer.findAll());

        case 2:
          customers = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Employee.findAll({
            where: {
              dept_no: 1
            }
          }));

        case 5:
          marketing = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(Employee.findAll({
            where: {
              dept_no: 2
            }
          }));

        case 8:
          research = _context4.sent;
          _context4.next = 11;
          return regeneratorRuntime.awrap(Employee.findAll({
            where: {
              dept_no: 3
            }
          }));

        case 11:
          business = _context4.sent;
          _context4.next = 14;
          return regeneratorRuntime.awrap(Employee.findAll({
            where: {
              dept_no: 4
            }
          }));

        case 14:
          development = _context4.sent;
          res.render('management/registerProject', {
            customers: customers,
            marketing: marketing,
            research: research,
            business: business,
            development: development
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
}));
router.get('/project/search', catchErrors(function _callee5(req, res, next) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.render('management/searchProject', {});

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}));
router.post('/project/register', catchErrors(function _callee6(req, res, next) {
  var project, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, employee;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          //새로운 프로젝트를 생성하면서 동시에 participation 생성해야함.
          console.log(req.body);
          _context6.next = 3;
          return regeneratorRuntime.awrap(Project.create({
            project_name: req.body.name,
            start_date: req.body.start,
            end_date: req.body.end,
            state: req.body.state,
            description: req.body.description,
            customer_id: req.body.customer
          }));

        case 3:
          project = _context6.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context6.prev = 7;
          _iterator = req.body.employee[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context6.next = 16;
            break;
          }

          employee = _step.value;
          _context6.next = 13;
          return regeneratorRuntime.awrap(Participation.create({
            emp_no: employee,
            project_no: project.project_no,
            participation_date: project.start_date
          }));

        case 13:
          _iteratorNormalCompletion = true;
          _context6.next = 9;
          break;

        case 16:
          _context6.next = 22;
          break;

        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context6.t0;

        case 22:
          _context6.prev = 22;
          _context6.prev = 23;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 25:
          _context6.prev = 25;

          if (!_didIteratorError) {
            _context6.next = 28;
            break;
          }

          throw _iteratorError;

        case 28:
          return _context6.finish(25);

        case 29:
          return _context6.finish(22);

        case 30:
          req.flash('success', '정상적으로 등록되었습니다.');
          res.render('project/list', {});

        case 32:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[7, 18, 22, 30], [23,, 25, 29]]);
}));
module.exports = router;
//# sourceMappingURL=management.dev.js.map

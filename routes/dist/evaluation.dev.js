"use strict";

// 기본 모듈 Import
var express = require('express');

var router = express.Router();

var catchErrors = require("../lib/async-error");

var _require = require('../models'),
    Project = _require.Project,
    Employee = _require.Employee,
    Participation = _require.Participation,
    PeerEvaluation = _require.PeerEvaluation,
    PMEvaluation = _require.PMEvaluation,
    CustomerEvaluation = _require.CustomerEvaluation;

router.get('/peer', function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('evaluation/peer_evaluation');

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/pm', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render('evaluation/pm_evaluation');

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/customer', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render('evaluation/customer_evaluation');

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get('/inputPm_evaluation', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.render('evaluation/inputPm_evaluation.');

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.get('/inputCustomer_evaluation', function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.render('evaluation/inputCustomer_evaluation.');

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.get('/inquiry', function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          res.render('management/evaluationResult_inquiry');

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.get('/evaluate', function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          res.render('management/registerEvaluation');

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
});
router.get('/index', function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          res.render('evaluation/index');

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
});
router.get('/project_list', catchErrors(function _callee9(req, res) {
  var project_list, projects, i;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          // 빈 리스트
          project_list = []; // 모든 프로젝트를 가져옴

          _context9.next = 3;
          return regeneratorRuntime.awrap(Project.findAll({
            attributes: ['project_no', 'project_name']
          }));

        case 3:
          projects = _context9.sent;

          // 모든 프로젝트의 정보를 담음 (project_no, project_name) 쌍으로
          for (i = 0; i < projects.length; i++) {
            project_list.push([projects[i].project_no, projects[i].project_name]);
          } // 참여한 리스트 전달


          res.send(project_list);

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
}));
router.get('/employee_list/:project_no', catchErrors(function _callee10(req, res) {
  var employee_list, participations, i, employee;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          // 빈 리스트
          employee_list = []; // 해당 프로젝트에 대해 참여하고 있는 참여직원 튜플들을 가져옴

          _context10.next = 3;
          return regeneratorRuntime.awrap(Participation.findAll({
            where: {
              project_no: req.params.project_no
            }
          }));

        case 3:
          participations = _context10.sent;
          i = 0;

        case 5:
          if (!(i < participations.length)) {
            _context10.next = 13;
            break;
          }

          _context10.next = 8;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: {
              emp_no: participations[i].emp_no
            },
            attributes: ['name']
          }));

        case 8:
          employee = _context10.sent;
          employee_list.push([participations[i].emp_no, employee.name]);

        case 10:
          i++;
          _context10.next = 5;
          break;

        case 13:
          // 참여한 리스트 전달
          res.send(employee_list);

        case 14:
        case "end":
          return _context10.stop();
      }
    }
  });
})); // 모든 프로젝트의 직원들에 대한 평가 리스트를 

router.get('/result/all', catchErrors(function _callee11(req, res) {
  var allEvaluationList, participations, i, evaluationResult, employee, _project, sum, peer_eval, _evaluation_score, j, pm_eval, evaluation_score2, customer_eval, evaluation_score3;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          allEvaluationList = []; //모든 프로젝트에 참여자

          _context11.next = 3;
          return regeneratorRuntime.awrap(Participation.findAll({}));

        case 3:
          participations = _context11.sent;
          i = 0;

        case 5:
          if (!(i < participations.length)) {
            _context11.next = 38;
            break;
          }

          evaluationResult = []; // 직원 이름 추가

          _context11.next = 9;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: {
              emp_no: participations[i].emp_no
            }
          }));

        case 9:
          employee = _context11.sent;
          evaluationResult.push(employee.emp_no);
          evaluationResult.push(employee.name); // 프로젝트 이름 추가

          _context11.next = 14;
          return regeneratorRuntime.awrap(Project.findOne({
            where: {
              project_no: participations[i].project_no
            }
          }));

        case 14:
          _project = _context11.sent;
          evaluationResult.push(_project.project_name); // 동료 평가 점수 추가

          sum = 0;
          _context11.next = 19;
          return regeneratorRuntime.awrap(PeerEvaluation.findAll({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 19:
          peer_eval = _context11.sent;
          _evaluation_score = 0;

          if (peer_eval.length != 0) {
            for (j = 0; j < peer_eval.length; j++) {
              if (peer_eval[j] != null) sum += (peer_eval[j].evaluation_score1 + peer_eval[j].evaluation_score2) / 2;
            }

            _evaluation_score = Math.round(sum / peer_eval.length);
            evaluationResult.push(_evaluation_score + "점");
          } // PM 평가 점수 추가


          _context11.next = 24;
          return regeneratorRuntime.awrap(PMEvaluation.findOne({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 24:
          pm_eval = _context11.sent;
          evaluation_score2 = 0;

          if (pm_eval != null) {
            evaluation_score2 = (pm_eval.evaluation_score1 + pm_eval.evaluation_score2) / 2;
            evaluationResult.push(evaluation_score2 + "점");
          } // 고객 평가 점수 추가


          _context11.next = 29;
          return regeneratorRuntime.awrap(CustomerEvaluation.findOne({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 29:
          customer_eval = _context11.sent;
          evaluation_score3 = 0;

          if (customer_eval != null) {
            evaluation_score3 = (customer_eval.evaluation_score1 + customer_eval.evaluation_score2) / 2;
            evaluationResult.push(evaluation_score3 + "점");
          } // 총합 점수 추가


          evaluationResult.push(Math.round(_evaluation_score + evaluation_score2 + evaluation_score3) + "점"); // 평균 추가

          evaluationResult.push(Math.round((_evaluation_score + evaluation_score2 + evaluation_score3) / 3) + "점"); // 평가 정보 리스트 전달

          if (evaluationResult.length == 8) allEvaluationList.push(evaluationResult);

        case 35:
          i++;
          _context11.next = 5;
          break;

        case 38:
          res.send(allEvaluationList);

        case 39:
        case "end":
          return _context11.stop();
      }
    }
  });
}));
router.get('/result/empName', catchErrors(function _callee12(req, res) {
  var allEvaluationList, participations, i, evaluationResult, employee, _project2, sum, peer_eval, _evaluation_score2, j, pm_eval, evaluation_score2, customer_eval, evaluation_score3;

  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          allEvaluationList = []; //모든 프로젝트에 참여자

          _context12.next = 3;
          return regeneratorRuntime.awrap(Participation.findAll({}));

        case 3:
          participations = _context12.sent;
          i = 0;

        case 5:
          if (!(i < participations.length)) {
            _context12.next = 37;
            break;
          }

          evaluationResult = []; // 직원 이름 추가

          _context12.next = 9;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: {
              emp_no: participations[i].emp_no
            }
          }));

        case 9:
          employee = _context12.sent;
          evaluationResult.push(employee.name); // 프로젝트 이름 추가

          _context12.next = 13;
          return regeneratorRuntime.awrap(Project.findOne({
            where: {
              project_no: participations[i].project_no
            }
          }));

        case 13:
          _project2 = _context12.sent;
          evaluationResult.push(_project2.project_name); // 동료 평가 점수 추가

          sum = 0;
          _context12.next = 18;
          return regeneratorRuntime.awrap(PeerEvaluation.findAll({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 18:
          peer_eval = _context12.sent;
          _evaluation_score2 = 0;

          if (peer_eval.length != 0) {
            for (j = 0; j < peer_eval.length; j++) {
              if (peer_eval[j] != null) sum += (peer_eval[j].evaluation_score1 + peer_eval[j].evaluation_score2) / 2;
            }

            _evaluation_score2 = Math.round(sum / peer_eval.length);
            evaluationResult.push(_evaluation_score2);
          } // PM 평가 점수 추가


          _context12.next = 23;
          return regeneratorRuntime.awrap(PMEvaluation.findOne({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 23:
          pm_eval = _context12.sent;
          evaluation_score2 = 0;

          if (pm_eval != null) {
            evaluation_score2 = (pm_eval.evaluation_score1 + pm_eval.evaluation_score2) / 2;
            evaluationResult.push(evaluation_score2);
          } // 고객 평가 점수 추가


          _context12.next = 28;
          return regeneratorRuntime.awrap(CustomerEvaluation.findOne({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 28:
          customer_eval = _context12.sent;
          evaluation_score3 = 0;

          if (customer_eval != null) {
            evaluation_score3 = (customer_eval.evaluation_score1 + customer_eval.evaluation_score2) / 2;
            evaluationResult.push(evaluation_score3);
          } // 총합 점수 추가


          evaluationResult.push(Math.round(_evaluation_score2 + evaluation_score2 + evaluation_score3)); // 평균 추가

          evaluationResult.push(Math.round((_evaluation_score2 + evaluation_score2 + evaluation_score3) / 3)); // 평가 정보 리스트 전달

          if (evaluationResult.length == 7) allEvaluationList.push(evaluationResult);

        case 34:
          i++;
          _context12.next = 5;
          break;

        case 37:
          res.send(allEvaluationList);

        case 38:
        case "end":
          return _context12.stop();
      }
    }
  });
}));
router.get('/result/empNum/:emp_no', catchErrors(function _callee13(req, res) {
  var allEvaluationList, participations, i, evaluationResult, employee, _project3, sum, peer_eval, _evaluation_score3, j, pm_eval, evaluation_score2, customer_eval, evaluation_score3;

  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          allEvaluationList = []; //모든 프로젝트에 참여자

          _context13.next = 3;
          return regeneratorRuntime.awrap(Participation.findAll({
            where: {
              emp_no: req.params.emp_no
            }
          }));

        case 3:
          participations = _context13.sent;
          i = 0;

        case 5:
          if (!(i < participations.length)) {
            _context13.next = 37;
            break;
          }

          evaluationResult = []; // 직원 이름 추가

          _context13.next = 9;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: {
              emp_no: participations[i].emp_no
            }
          }));

        case 9:
          employee = _context13.sent;
          evaluationResult.push(employee.name); // 프로젝트 이름 추가

          _context13.next = 13;
          return regeneratorRuntime.awrap(Project.findOne({
            where: {
              project_no: participations[i].project_no
            }
          }));

        case 13:
          _project3 = _context13.sent;
          evaluationResult.push(_project3.project_name); // 동료 평가 점수 추가

          sum = 0;
          _context13.next = 18;
          return regeneratorRuntime.awrap(PeerEvaluation.findAll({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 18:
          peer_eval = _context13.sent;
          _evaluation_score3 = 0;

          if (peer_eval.length != 0) {
            for (j = 0; j < peer_eval.length; j++) {
              if (peer_eval[j] != null) sum += (peer_eval[j].evaluation_score1 + peer_eval[j].evaluation_score2) / 2;
            }

            _evaluation_score3 = Math.round(sum / peer_eval.length);
            evaluationResult.push(_evaluation_score3);
          } // PM 평가 점수 추가


          _context13.next = 23;
          return regeneratorRuntime.awrap(PMEvaluation.findOne({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 23:
          pm_eval = _context13.sent;
          evaluation_score2 = 0;

          if (pm_eval != null) {
            evaluation_score2 = (pm_eval.evaluation_score1 + pm_eval.evaluation_score2) / 2;
            evaluationResult.push(evaluation_score2);
          } // 고객 평가 점수 추가


          _context13.next = 28;
          return regeneratorRuntime.awrap(CustomerEvaluation.findOne({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 28:
          customer_eval = _context13.sent;
          evaluation_score3 = 0;

          if (customer_eval != null) {
            evaluation_score3 = (customer_eval.evaluation_score1 + customer_eval.evaluation_score2) / 2;
            evaluationResult.push(evaluation_score3);
          } // 총합 점수 추가


          evaluationResult.push(Math.round(_evaluation_score3 + evaluation_score2 + evaluation_score3)); // 평균 추가

          evaluationResult.push(Math.round((_evaluation_score3 + evaluation_score2 + evaluation_score3) / 3)); // 평가 정보 리스트 전달

          if (evaluationResult.length == 7) allEvaluationList.push(evaluationResult);

        case 34:
          i++;
          _context13.next = 5;
          break;

        case 37:
          res.send(allEvaluationList);

        case 38:
        case "end":
          return _context13.stop();
      }
    }
  });
}));
router.get('/result/projectName', catchErrors(function _callee14(req, res) {
  var allEvaluationList, participations, i, evaluationResult, employee, _project4, sum, peer_eval, _evaluation_score4, j, pm_eval, evaluation_score2, customer_eval, evaluation_score3;

  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          allEvaluationList = []; //모든 프로젝트에 참여자

          _context14.next = 3;
          return regeneratorRuntime.awrap(Participation.findAll({}));

        case 3:
          participations = _context14.sent;
          i = 0;

        case 5:
          if (!(i < participations.length)) {
            _context14.next = 37;
            break;
          }

          evaluationResult = []; // 직원 이름 추가

          _context14.next = 9;
          return regeneratorRuntime.awrap(Employee.findOne({
            where: {
              emp_no: participations[i].emp_no
            }
          }));

        case 9:
          employee = _context14.sent;
          evaluationResult.push(employee.name); // 프로젝트 이름 추가

          _context14.next = 13;
          return regeneratorRuntime.awrap(Project.findOne({
            where: {
              project_no: participations[i].project_no
            }
          }));

        case 13:
          _project4 = _context14.sent;
          evaluationResult.push(_project4.project_name); // 동료 평가 점수 추가

          sum = 0;
          _context14.next = 18;
          return regeneratorRuntime.awrap(PeerEvaluation.findAll({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 18:
          peer_eval = _context14.sent;
          _evaluation_score4 = 0;

          if (peer_eval.length != 0) {
            for (j = 0; j < peer_eval.length; j++) {
              if (peer_eval[j] != null) sum += (peer_eval[j].evaluation_score1 + peer_eval[j].evaluation_score2) / 2;
            }

            _evaluation_score4 = Math.round(sum / peer_eval.length);
            evaluationResult.push(_evaluation_score4 + "점");
          } // PM 평가 점수 추가


          _context14.next = 23;
          return regeneratorRuntime.awrap(PMEvaluation.findOne({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 23:
          pm_eval = _context14.sent;
          evaluation_score2 = 0;

          if (pm_eval != null) {
            evaluation_score2 = (pm_eval.evaluation_score1 + pm_eval.evaluation_score2) / 2;
            evaluationResult.push(evaluation_score2 + "점");
          } // 고객 평가 점수 추가


          _context14.next = 28;
          return regeneratorRuntime.awrap(CustomerEvaluation.findOne({
            where: {
              non_evaluator_no: participations[i].emp_no,
              project_no: participations[i].project_no
            }
          }));

        case 28:
          customer_eval = _context14.sent;
          evaluation_score3 = 0;

          if (customer_eval != null) {
            evaluation_score3 = (customer_eval.evaluation_score1 + customer_eval.evaluation_score2) / 2;
            evaluationResult.push(evaluation_score3 + "점");
          } // 총합 점수 추가


          evaluationResult.push(Math.round(_evaluation_score4 + evaluation_score2 + evaluation_score3) + "점"); // 평균 추가

          evaluationResult.push(Math.round((_evaluation_score4 + evaluation_score2 + evaluation_score3) / 3) + "점"); // 평가 정보 리스트 전달

          if (evaluationResult.length == 7) allEvaluationList.push(evaluationResult);

        case 34:
          i++;
          _context14.next = 5;
          break;

        case 37:
          res.send(allEvaluationList);

        case 38:
        case "end":
          return _context14.stop();
      }
    }
  });
})); // 특정 프로젝트의 특정 직원에 대한 평과 결과들에 대한 리스트 응답 

router.get('/result/:emp_no/:project_no', catchErrors(function _callee15(req, res) {
  var evaluation_result_list, peer_result, pm_result, evaluation_score2, customer_result, evaluation_score3;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          // 빈 리스트
          evaluation_result_list = [];
          evaluation_result_list.push(project.project_name); // 동료 평가에 대한 평가 점수들의 평균을 푸쉬하기 위한 과정

          _context15.next = 4;
          return regeneratorRuntime.awrap(PeerEvaluation.findOne({
            where: {
              project_no: req.params.project_no,
              non_evaluator_no: req.params.emp_no
            }
          }));

        case 4:
          peer_result = _context15.sent;
          evaluation_result_list.push(evaluation_score1); // PM 평가에 대한 평가 점수들의 평균을 푸쉬하기 위한 과정

          _context15.next = 8;
          return regeneratorRuntime.awrap(PMEvaluation.findOne({
            where: {
              project_no: req.params.project_no,
              non_evaluator_no: req.params.emp_no
            }
          }));

        case 8:
          pm_result = _context15.sent;
          evaluation_score2 = (pm_result.evaluation_score1 + pm_result.evaluation_score2) / 2;
          evaluation_result_list.push(evaluation_score2); // 고객 평가에 대한 평가 점수들의 평균을 푸쉬하기 위한 과정

          _context15.next = 13;
          return regeneratorRuntime.awrap(CustomerEvaluation.findOne({
            where: {
              project_no: req.params.project_no,
              non_evaluator_no: req.params.emp_no
            }
          }));

        case 13:
          customer_result = _context15.sent;
          evaluation_score3 = (customer_result.evaluation_score1 + customer_result.evaluation_score2) / 2;
          evaluation_result_list.push(evaluation_score3);

        case 16:
        case "end":
          return _context15.stop();
      }
    }
  });
}));
module.exports = router;
//# sourceMappingURL=evaluation.dev.js.map

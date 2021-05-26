var express = require('express');
var Participation = require('../models/participation');
var Project = require('../models/project');
var Customer = require('../models/customer');
var Employee = require('../models/employee');
var Task = require('../models/task');

const catchErrors = require('../lib/async-error');
var router = express.Router();

router.get('/', catchErrors(async (req, res, next) => {
  const projects = await Project.findAll({
    include: [
      {    
        model: Employee,
        as: 'project_emp',
        through: {
          where: { emp_no: req.session.user.emp_no }
        }
      }
    ]
  });
  res.render('project/list', { projects: projects });
}));

router.get('/:project_no', catchErrors(async (req, res, next) => {
  const project = await Project.findOne({
    where: { project_no: req.params.project_no },
    include: [
      {
        model: Employee,
        as: 'project_emp'
      },
      {
        model: Customer
      }
    ]
  });
  console.log(project.project_emp[0]);
  res.render('project/details', { project: project });
}));

// 업무 진척도 조회 페이지
router.get('/tasks/:project_no/:emp_no', catchErrors(async (req, res) => {
  var projectPercent = 0;
  var employeePercent = 0;
  var employee;

  // 모든 태스크 가져오기
  const tasks = await Task.findAll({
      where: { project_no: req.params.project_no }
  });

  // 모든 end 태스크 가져오기
  const endTasks = await Task.findAll({
      where: {
          project_no: req.params.project_no,
          current_state: 'end',
      }
  });

  // 직원의 모든 태스크 가져오기
  const empTasks = await Task.findAll({
    where: {
        project_no: req.params.project_no,
        emp_no: req.params.emp_no,            
    }
  });

  // 직원의 모든 end 태스크 가져오기
  const empEndTasks = await Task.findAll({
      where: {
          project_no: req.params.project_no,
          emp_no: req.params.emp_no,
          current_state: 'end',
      }
  });

  // 사용자의 verify 태스크 개수 추가
  const verifyTask = await Task.findAll({
      where: {
          project_no: req.params.project_no,
          emp_no: req.params.emp_no,
          current_state: 'verify',
      }
  });

  // 사용자의 progress 태스크 개수 추가
  const progressTask = await Task.findAll({
      where: {
          project_no: req.params.project_no,
          emp_no: req.params.emp_no,
          current_state: 'progress',
      }
  });

  // 사용자의 uncheck 태스크 개수 추가
  const uncheckTask = await Task.findAll({
      where: {
          project_no: req.params.project_no,
          emp_no: req.params.emp_no,
          current_state: 'uncheck',
      }
  });


  projectPercent = String(Math.round(endTasks.length / tasks.length * 100));
  employeePercent = String(Math.round(empEndTasks.length / empTasks.length * 100));
  console.log(projectPercent);
  res.render('project/checkTask', { projectPercent, employeePercent });
}));




module.exports = router;

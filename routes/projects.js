var express = require('express');
var Participation = require('../models/participation');
var Project = require('../models/project');
var Customer = require('../models/customer');
var Employee = require('../models/employee');
var EmpSkill = require('../models/emp_skill');
var Task = require('../models/task');

const catchErrors = require('../lib/async-error');
const { rawAttributes } = require('../models/customer');
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
  res.render('project/index', { projects: projects });
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

  // employeeTaskList.push(Math.round(endTasks.length / tasks.length * 100));
  // employeeTaskList.push(endTasks.length);
  // employeeTaskList.push(verifyTask.length);
  // employeeTaskList.push(progressTask.length);
  // employeeTaskList.push(uncheckTask.length);

  res.render('project/checkTask', { projectPercent, employeePercent });
}));

// addTask 페이지 응답 
router.get('/addTask', catchErrors(async (req, res) => {
  res.render('/project/addTask', {});
}));

// 업무를 DB에 추가
router.post('/addTask', catchErrors(async (req, res) => {
  const task = await Task.create({
    
  });
}));

// 스킬셋이 HTML & JAVASCRIPT인 직원 리스트 응답
router.get('/addTask/HJ', catchErrors(async (req, res) => {
  // 직원 리스트 선언
  let empList = [];

  // EmpSkill 가져오기
  const empSkill = await EmpSkill.findAll({
    where: {
      skill_no: [1, 2],
    }
  });
  
  // 해당 스킬셋을 가진 직원들에 대해 모든 이름 값을 가져오기 위한 반복문
  for (let i=0; i<empSkill.length; i++) {
    // Employee 가져오기
    const emp = await Employee.findOne({
      where: {
        emp_no: empSkill[i].emp_no,
      },
      attributes: ['name'],
    });

    // 모든 직원 추가
    empList.push([empSkill[i].emp_no, emp.name]);
  }
  // 중복 제거
  const set = new Set(empList);
  console.log(set);
  empList = [...set];
  console.log(empList[1][0] == empList[3][0]);
  // 최종 리스트 전달
  res.send(empList);
}));

// 스킬셋이 C# & C/C++인 직원 리스트 응답
router.get('addTask/CCC', catchErrors(async (req, res) => {
  const empSkill = await EmpSkill.findAll({
    where: {
      skill_no: [3, 4],
    }
  });
}));

// 스킬셋이 Dart/Flutter & Java 인 직원 리스트 응답
router.get('addTask/DFJ', catchErrors(async (req, res) => {
  const empSkill = await EmpSkill.findAll({
    where: {
      skill_no: [5, 6],
    }
  });
}));

// 스킬셋이 Dart/Flutter & Java 인 직원 리스트 응답
router.get('addTask/Python', catchErrors(async (req, res) => {
  const empSkill = await EmpSkill.findAll({
    where: {
      skill_no: 7,
    }
  });
}));

module.exports = router;

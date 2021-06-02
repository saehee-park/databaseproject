// 기본 모듈 Import
var express = require('express');
const db = require('../models');
const catchErrors = require("../lib/async-error");
var router = express.Router();
const { PeerEvaluation, Participation, Employee, Project, Task } = require('../models');

// 라우터 설정
router.get('/project/:project_no', catchErrors(async (req, res) => {
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
    
    res.send([Math.round(endTasks.length / tasks.length * 100)]);

}));

router.get('/employee/:project_no/:emp_no', catchErrors(async (req, res) => {
    let employeeTaskList = [];

    // 직원의 모든 태스크 가져오기
    const tasks = await Task.findAll({
        where: {
            project_no: req.params.project_no,
            emp_no: req.params.emp_no,            
        }
    });

    // 직원의 모든 end 태스크 가져오기
    const endTasks = await Task.findAll({
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

    res.send(employeeTaskList);

}));

module.exports = router;
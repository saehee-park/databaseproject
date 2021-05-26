// 기본 모듈 Import
var express = require('express');
var router = express.Router();
const catchErrors = require("../lib/async-error");
const { Project, Employee, Participation, PeerEvaluation, PMEvaluation, CustomerEvaluation } = require('../models');


router.get('/peer', async (req, res, next) => {
    res.render('evaluation/peer_evaluation');
});

router.get('/pm', async (req, res) => {
    res.render('evaluation/pm_evaluation');
});

router.get('/customer', async (req, res) => {
    res.render('evaluation/customer_evaluation');
});

router.get('/inputPm_evaluation', async (req, res) => {
    res.render('evaluation/inputPm_evaluation.');
});

router.get('/inputCustomer_evaluation', async (req, res) => {
    res.render('evaluation/inputCustomer_evaluation.');
});

router.get('/inputPeer_evaluation', async (req, res) => {
    res.render('evaluation/inputPeer_evaluation.');
});

router.get('/inquiry', async (req, res) => {
    res.render('management/evaluationResult_inquiry');
});

router.get('/project_list', catchErrors(async (req, res) => {
    // 빈 리스트
    var project_list = [];

    // 모든 프로젝트를 가져옴
    const projects = await Project.findAll({
        attributes: ['project_no', 'project_name']
    });

    // 모든 프로젝트의 정보를 담음 (project_no, project_name) 쌍으로
    for(let i=0; i<projects.length; i++) {
      project_list.push([projects[i].project_no, projects[i].project_name]);
    }
    
    // 참여한 리스트 전달
    res.send(project_list);
}));

router.get('/employee_list/:project_no', catchErrors(async (req, res) => {
    // 빈 리스트
    var employee_list = [];

    // 해당 프로젝트에 대해 참여하고 있는 참여직원 튜플들을 가져옴
    const participations = await Participation.findAll({
        where: {
            project_no: req.params.project_no
        },
    });

    // 모든 프로젝트의 정보를 담음 (employee_no, employee_name) 쌍으로
    for(let i=0; i<participations.length; i++) {
        const employee = await Employee.findOne({
            where: { emp_no: participations[i].emp_no },
            attributes: ['name'],
        });
        employee_list.push([participations[i].emp_no, employee.name]);
    }
    
    // 참여한 리스트 전달
    res.send(employee_list);
}));

// 모든 프로젝트의 직원들에 대한 평과 리스트를 
router.get('/result/all', catchErrors(async (req, res) => {
    //
}));

router.get('/result/empName', catchErrors(async (req, res) => {

}));

router.get('/result/empNum', catchErrors(async (req, res) => {

}));

router.get('/result/projectName', catchErrors(async (req, res) => {

}));

// 특정 프로젝트의 특정 직원에 대한 평과 결과들에 대한 리스트 응답 
router.get('/result/:emp_no/:project_no', catchErrors(async (req, res) => {
    // 빈 리스트
    var evaluation_result_list = [];

    // 직원 이름 추가
    const employee = await Employee.findOne({
        where: {
            emp_no: req.params.emp_no
        },
    });
    evaluation_result_list.push(employee.name);
    // 프로젝트 이름 추가
    const project = await Project.findOne({
        where: {
            project_no: req.params.project_no
        },
    });
    evaluation_result_list.push(project.project_name);
    // 동료 평가에 대한 평가 점수들의 평균을 푸쉬하기 위한 과정
    const peer_result = await PeerEvaluation.findOne({
        where: {
            project_no: req.params.project_no,
            non_evaluator_no: req.params.emp_no
        },
    });
    var evaluation_score1 = (peer_result.evaluation_score1 + peer_result.evaluation_score2)/2;
    evaluation_result_list.push(evaluation_score1);
    // PM 평가에 대한 평가 점수들의 평균을 푸쉬하기 위한 과정
    const pm_result = await PMEvaluation.findOne({
        where: {
            project_no: req.params.project_no,
            non_evaluator_no: req.params.emp_no
        },
    });
    var evaluation_score2 = (pm_result.evaluation_score1 + pm_result.evaluation_score2)/2;
    evaluation_result_list.push(evaluation_score2);
    // 고객 평가에 대한 평가 점수들의 평균을 푸쉬하기 위한 과정
    const customer_result = await CustomerEvaluation.findOne({
        where: {
            project_no: req.params.project_no,
            non_evaluator_no: req.params.emp_no
        },
    });
    var evaluation_score3 = (customer_result.evaluation_score1 + customer_result.evaluation_score2)/2;
    evaluation_result_list.push(evaluation_score3);
    
    // 총합 추가
    evaluation_result_list.push(evaluation_score1 + evaluation_score2 + evaluation_score3);
    // 평균 추가
    evaluation_result_list.push((evaluation_score1 + evaluation_score2 + evaluation_score3)/3);
    // 평가 정보 리스트 전달
    res.send(evaluation_result_list);
}));

module.exports = router;
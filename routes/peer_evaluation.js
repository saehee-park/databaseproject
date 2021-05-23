// 기본 모듈 Import
var express = require('express');
const db = require('../models');
var router = express.Router();
const { PeerEvaluation, Participation, Employee, Project } = require('../models');


// 라우터 설정
router.route('/')
.get(async (req, res, next) => {
    res.render('evaluation/peer_evaluation');
})
.post(async (req, res, next) => {
    try {
        const peerEvaluation = await PeerEvaluation.create({
            evaluation_content1:  req.body.content1,
            evaluation_score1:  parseInt(req.body.score1),
            evaluation_content2:  req.body.content2,
            evaluation_score2:  parseInt(req.body.score2),
            evaluator_no: req.session.user.emp_no,
            non_evaluator_no: parseInt(req.body.non_evaluator_no),
            project_no: parseInt(req.body.project_no),
        });
        console.log('새로운 고객 평가가 등록되었습니다.');
        return res.send('true');
    } catch (err) {
        console.log("고객 평가가 등록되지 않았습니다.");
        console.error(err);
        return res.send('false');
    }

});

// 참여한 프로젝트에 대한 GET 요청 처리 
router.route('/project_list')
.get(async (req, res, next) => {
  try {
    // 빈 리스트
    var project_list = [];

    // 사용자가 참여한 모든 프로젝트 쿼리
    const participations = await Participation.findAll({
        where: { emp_no: req.session.user.emp_no }
    });

    // 참여한 프로젝트에 대한 프로젝트 명과 no을 리스트에 담음
    for(let i=0; i<participations.length; i++) {
      const project = await Project.findOne({
        where: { project_no: participations[i].project_no }
      });
      project_list.push([participations[i].project_no, project.project_name]);
    }
    
    // 참여한 리스트 전달
    res.send(project_list);
  }
  catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/employee_list/:project_no')
.get(async (req, res, next) => {
    try {
        // 빈 리스트
        var employee_list = [];

        // 프로젝트에 해당되는 참여 테이블 쿼리
        const participations = await Participation.findAll({
            where: { project_no: req.params.project_no }
        });

        // 참여한 프로젝트에 대한 참여직원 이름과 번호를 리스트에 담음
        for(let i=0; i<participations.length; i++) {
          const employee = await Employee.findOne({
            where: { emp_no: participations[i].emp_no }
          });
          if(participations[i].emp_no != req.session.user.emp_no){
            employee_list.push([participations[i].emp_no, employee.name]);
          }
        }
        
        // 참여한 리스트 전달
        res.send(employee_list);
      } catch (err) {
        console.error(err);
        next(err);
      }
});

router.route('/:id')
.delete(async (req, res, next) => {
    try {
        const result = await PeerEvaluation.destroy({ where: { id: req.params.id } });
        res.json(result);
      } catch (err) {
        console.error(err);
        next(err);
      }
});

module.exports = router;
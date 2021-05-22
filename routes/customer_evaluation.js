// 기본 모듈 Import
var express = require('express');
var router = express.Router();
const { CustomerEvaluation, Project, Employee } = require('../models');

// 라우터 설정
router.route('/')
.get(async (req, res, next) => {
    res.render('evaluation/customer_evaluation');
})

.post(anync (req, res, next) => {
    console.log(req.session.user);
    console.log(req.session.authorization);
    console.log(req.session.user.emp_no);
    console.log(req.body.content1);    
    console.log(req.body.score1);
    console.log(req.body.content2);    
    console.log(req.body.score2);
    console.log(req.body.non_evaluator_no);
    console.log(req.body.project_no);
    console.log(req.body.customer_no);

    try {
        const CustomerEvaluation = await CustomerEvaluation.create({
            evaluation_content1: req.body.content1,
            evaluation_score1: parseInt(req.body.score1),
            evaluation_content2: req.body.content2,
            evaluation_score2: parseInt(req.body.score2),
            evaluator_no: req.session.user.emp_no,
            non_evaluator_no: parseInt(req.body.non_evaluator_no),
            project_no: parseInt(req.body.project_no),
            customer_no: pasresInt(req.body.customer_no),
        });
        console.log('새로운 고객 평가가 등록되었습니다.');
        res.status(201).json(CustomerEvaluation);
    } catch (err) {
        console.log('고객 평가가 등록되지 않았습니다.');
        console.errer(err);
        next(err);
    }

});

router.route('/:id')
.delete(async (req, res, next) => {
    try {
        const result = await PMEvaluation.destroy({ where: { id: req.params.id } });
        res.json(result);
      } catch (err) {
        console.error(err);
        next(err);
      }
});

module.exports = router;

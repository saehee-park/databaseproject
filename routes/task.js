// 기본 모듈 Import
var express = require('express');
const db = require('../models');
var router = express.Router();
const { PeerEvaluation, Participation, Employee, Project, Task } = require('../models');


// 라우터 설정
router.get('/:project_no/:emp_no', async (req, res, next) => {
    try {
        // 빈 리스트
        var task_object = {};

        // 모든 전체 태스크 개수 추가
        const all_task = await Task.findAll({
            where: { project_no: req.params.project_no }
        });
        task_object.cnt_all = all_task.length;

        // 모든 전체 end 태스크 개수 추가
        const all_end_task = await Task.findAll({
            where: {
                project_no: req.params.project_no,
                current_state: 'end',
            }
        });
        task_object.cnt_all_end = all_end_task.length;

        // 사용자의 모든 태스크 개수 추가
        const my_all_task = await Task.findAll({
            where: {
                project_no: req.params.project_no,
                emp_no: req.params.emp_no,
            }
        });
        task_object.cnt_my_all = my_all_task.length;

        // 사용자의 end 태스크 개수 추가
        const my_all_end_task = await Task.findAll({
            where: {
                project_no: req.params.project_no,
                emp_no: req.params.emp_no,
                current_state: 'end',
            }
        });
        task_object.cnt_my_all_end = my_all_end_task.length;

        // 사용자의 end 태스크 개수 추가
        const my_all_verify_task = await Task.findAll({
            where: {
                project_no: req.params.project_no,
                emp_no: req.params.emp_no,
                current_state: 'verify',
            }
        });
        task_object.cnt_my_all_verify = my_all_verify_task.length;

        // 사용자의 end 태스크 개수 추가
        const my_all_progress_task = await Task.findAll({
            where: {
                project_no: req.params.project_no,
                emp_no: req.params.emp_no,
                current_state: 'progress',
            }
        });
        task_object.cnt_my_all_progress = my_all_progress_task.length;

        // 사용자의 end 태스크 개수 추가
        const my_all_uncheck_task = await Task.findAll({
            where: {
                project_no: req.params.project_no,
                emp_no: req.params.emp_no,
                current_state: 'uncheck',
            }
        });
        task_object.cnt_my_all_uncheck = my_all_uncheck_task.length;
        
        // 참여한 리스트 전달
        res.json(task_object);
      } catch (err) {
        console.error(err);
        next(err);
      }
});

module.exports = router;
var express = require('express');
var Participation = require('../models/participation');
var Project = require('../models/project');
var Customer = require('../models/customer');
var router = express.Router();


router.post('/list', catchErrors(async (req, res, next) => {
  const participations = await Participation.findAll({
    where: { emp_no: req.session.user.emp_no },
    include:[
      {
        model: Project,
        attributes: ['project_name', 'start_date', 'end_date', 'state']
      }    
    ]
  });
  res.render('project/list', {projects: participations});
}));

router.post('/detail', catchErrors(async (req, res, next) => {
  const projects = await Project.findAll({
    where: { project_no: req.body.proejct_no },
    include: [
      {
        model: Participation
      },
      {
        model: Customer
      }
    ]
  });
  res.render('project/detail', { projects: projects });
}));

router.get('/new', function (req, res, next) {
  //customer list를 res로 전달
  res.render('project/new', {});
});

router.post('/new', catchErrors(async (req, res, next) => {
  //새로 추가한 customer이면 customer create하고 id 받아서 적용
  //아니면 그냥 바로 때리면 됨.
  console.log(req.body);
  const proejct = await Project.create({
    project_name: req.body.project_name,
    start_date: req.body.start,
    end_date: req.body.end,
    state: req.body.state,
    customer_id: req.body.customer_id
  });

  req.flash('success', 'Successfully Registered.');
  res.render('project/list', {});
}));

module.exports = router;

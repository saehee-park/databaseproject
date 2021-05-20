var express = require('express');
var Participation = require('../models/participation');
var Project = require('../models/project');
var Customer = require('../models/customer');
var router = express.Router();
const catchErrors = require('../lib/async-error');


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

router.get('/new', catchErrors(async (req, res, next) => {
  const customer = await Customer.findAll
  res.render('project/new', {});
}));

router.post('/new', catchErrors(async (req, res, next) => {
  console.log(req.body);
  const proejct = await Project.create({
    customer_id: req.body.customer_id,

  });
}));

module.exports = router;

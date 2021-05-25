var express = require('express');
var Participation = require('../models/participation');
var Project = require('../models/project');
var Customer = require('../models/customer');
var Employee = require('../models/employee');
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
  console.log(projects);
  res.render('project/list', { projects: projects });
}));

router.post('/detail', catchErrors(async (req, res, next) => {
  const project = await Project.findOne({
    where: { project_no: req.body.proejct_no },
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
  res.render('project/detail', { project: project });
}));


module.exports = router;

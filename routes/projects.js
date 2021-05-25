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

module.exports = router;

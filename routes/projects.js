var express = require('express');
var Participation = require('../models/participation');
var Project = require('../models/project');
var Customer = require('../models/customer');
const catchErrors = require('../lib/async-error');
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

router.get('/new', catchErrors(async (req, res, next) => {
  const customers = await Customer.findAll();
  res.render('project/new', { customers: customers });
}));

router.post('/new', catchErrors(async (req, res, next) => {
  //새로운 프로젝트를 생성하면서 동시에 participation 생성해야함.

  console.log(req.body);

  if(req.body.customer_id == null){
    const customer = await Customer.create({
      customer_name: req.body.customer_name
    });

    const proejct = await Project.create({
      project_name: req.body.project_name,
      start_date: req.body.start,
      end_date: req.body.end,
      state: req.body.state,
      customer_id: customer.customer_id
    });
  }
  
  else {
    const proejct = await Project.create({
      project_name: req.body.project_name,
      start_date: req.body.start,
      end_date: req.body.end,
      state: req.body.state,
      customer_id: req.body.customer_id
    });
  }

  req.flash('success', 'Successfully Registered.');
  res.render('project/list', {});
}));

module.exports = router;

var express = require("express");
var router = express.Router();
var Employee = require("../models/employee");
var Participation = require("../models/participation");
var Customer = require("../models/customer");
var Project = require("../models/project");
const catchErrors = require("../lib/async-error");

router.get('/', function (req, res, next) {
  res.render('management/index',{});
});

router.get('/customer/register', catchErrors(async (req, res, next) => {
  res.render('management/registerCustomer', {});
}));

router.get('/customer/list', catchErrors(async (req, res, next) => {
  const customers = await Customer.findAll();
  res.render('management/customerList', {customers: customers});
}));

router.post('/customer/register', catchErrors(async (req, res, next) => {
  const customer = await Customer.create({
    customer_name: req.body.name
  });
  req.flash("success", "정상적으로 등록되었습니다.");
  res.redirect('/');
}));

router.get('/project/register', catchErrors(async (req, res, next) => {
  const customers = await Customer.findAll();
  const marketing = await Employee.findAll({ where: { dept_no: 1 } });
  const research = await Employee.findAll({ where: { dept_no: 2 } });
  const business = await Employee.findAll({ where: { dept_no: 3 } });
  const development = await Employee.findAll({ where: { dept_no: 4 } });
  res.render('management/registerProject', { 
    customers: customers, marketing: marketing, research: research, business: business, development: development });
}));

router.post('/project/register', catchErrors(async (req, res, next) => {
  //새로운 프로젝트를 생성하면서 동시에 participation 생성해야함.

  console.log(req.body);

  const project = await Project.create({
    project_name: req.body.name,
    start_date: req.body.start,
    end_date: req.body.end,
    state: req.body.state,
    description: req.body.description,
    customer_id: req.body.customer
  });

  for(let employee of req.body.employee) {
    await Participation.create({
      emp_no: employee,
      project_no: project.project_no,
      participation_date: project.start_date,
      participate: "Y"
    });
  }

  req.flash('success', '정상적으로 등록되었습니다.');
  res.render('project/list', {});
}));

router.get('/project/:project_no/edit', catchErrors(async (req, res, next) => {
  const project = await Project.findOne({ where: {project_no: req.params.project_no} });
  const customers = await Customer.findAll();
  const marketing = await Employee.findAll({ where: { dept_no: 1 } });
  const research = await Employee.findAll({ where: { dept_no: 2 } });
  const business = await Employee.findAll({ where: { dept_no: 3 } });
  const development = await Employee.findAll({ where: { dept_no: 4 } });
  res.render('management/editProject', { project: project,
    customers: customers, marketing: marketing, research: research, business: business, development: development });
}));

router.put('/project/:project_no/edit', catchErrors(async (req, res, next) => {
  const project = await Project.findOne({ where: {project_no: req.params.project_no} });
  project.project_name = req.body.name;
  project.start_date = req.body.start;
  project.end_date = req.body.end;
  project.state = req.body.state;
  project.description = req.body.description;
  project.customer_id = req.body.customer;
  await project.save();

  const participations = await Participation.findAll({ where: { project_no: req.params.project_no } });
  for(let participation of participations) {
    participation.participate = "N";
    participation.save();
  }

  for(let employee of req.body.employee) {
    const participation = await Participation.findOne({ where: { emp_no: employee, project_no: req.params.project_no } });
    if(participation) {
      participation.participate = "Y";
      participation.save();
    }
    else{
      await Participation.create({
        emp_no: employee,
        project_no: project.project_no,
        participation_date: project.start_date,
        participate: "Y"
      });
    }
  }
}));

router.post('/project/search', catchErrors(async (req, res, next) => {
  console.log(req.body);

  const projects = await Project.findAll({
    where: {
      [Op.or] : [
        {end_date: {
          [Op.gte]: req.body.search_start
        }},
        {start_date: {
          [Op.lte]: req.body.search_end
        }}
      ]
    },
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
  res.render('project/list', { projects: projects });
}));

module.exports = router;
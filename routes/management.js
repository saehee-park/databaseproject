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
      participation_date: project.start_date
    });
  }

  req.flash('success', '정상적으로 등록되었습니다.');
  res.render('project/list', {});
}));

// 평가 항목 등록
router.get('/evaluation/register', catchErrors(async (req, res, next) => {
  res.render('management/registerEvaluation', {});
}));

module.exports = router;
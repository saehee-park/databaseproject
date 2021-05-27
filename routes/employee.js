var express = require('express');
const db = require('../models');
var router = express.Router();
const catchErrors = require("../lib/async-error");
const { PMEvaluation, Department, Employee, Project, Skill } = require('../models');

router.get('/inquiry', catchErrors(async (req, res, next) => {
  const employees = await Employee.findAll();
  res.render('employee/inquiryEmployee', {employees: employees});
}));

router.get('/detail/:id', catchErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ 
    where: {emp_no: req.params.id },
    include: [
      {    
        model: Department
      },
      {    
        model: Skill,
        as: 'emp_skill',
        through: {
          where: { emp_no: req.params.id }
        }
      }
    ]
  });
  console.log(employee);
  res.render('employee/detailEmployee', {employee: employee});
}));



module.exports = router;
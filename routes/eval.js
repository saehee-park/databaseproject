var express = require("express");
var router = express.Router();
var Employee = require("../models/employee");
var Skill = require("../models/skill");
var EmpSkill = require("../models/emp_skill");
var Project = require('../models/project');
var Participation = require('../models/participation');
var EvaluationItem = require('../models/evaluation_items');
const catchErrors = require("../lib/async-error");
var bcrypt = require("bcrypt");
const Peer = require("../models/peer_evaluation");

router.get('/list', catchErrors(async (req, res, next) => {
  const projects = await Project.findAll({
    where: { state: "종료" },
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

  res.render('eval/list', {  projects: projects });
}));

router.get('/evalute/:proejct_no', catchErrors(async (req, res, next) => {
  const participations = await Participation.findAll({ where: { project_no: req.params.project_no }});
  if(req.session.authorization == 0) {
    const items = await EvaluationItem.findAll({ where: { evaluation_type: "동료"}});
    res.render('eval/evaluation_form', { type: "동료", items: items, participations: participations });
  }
  else if(req.session.authorization == 1) {
    const items = await EvaluationItem.findAll({ where: { evaluation_type: "PM"}});
    res.render('eval/evaluation_form', { type: "PM", items: items, participations: participations });
  }
  else {
    const items = await EvaluationItem.findAll({ where: { evaluation_type: "고객"}});
    res.render('eval/evaluation_form', { type: "고객", items: items, participations: participations });
  }
}));

module.exports = router;
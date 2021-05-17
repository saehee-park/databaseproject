const Sequelize = require('sequelize');
const Department = require('./department');
const Employee = require('./employee');
const EmpSkill = require('./emp_skill');
const Skill = require('./skill');
const Task = require('./task');



const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Employee = Employee;
db.Task = Task;
db.Skill = Skill;
db.EmpSkill = EmpSkill;
db.Department = Department;

Department.init(sequelize);
Employee.init(sequelize);
EmpSkill.init(sequelize);
Skill.init(sequelize);
Task.init(sequelize);

Department.associate(db);
Employee.associate(db);
EmpSkill.associate(db);
Skill.associate(db);
Task.associate(db);

module.exports = db;

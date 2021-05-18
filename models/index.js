const Sequelize = require('sequelize');
const Authorization = require('./authorization');
const Customer = require('./customer');
const CustomerEvaluation = require('./customer_evaluation');
const Department = require('./department');
const Employee = require('./employee');
const EmpSkill = require('./emp_skill');
const Participation = require('./participation');
const PeerEvaluation = require('./peer_evaluation');
const PMEvaluation = require('./pm_evaluation');
const Project = require('./project');
const Skill = require('./skill');
const Task = require('./task');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Authorization = Authorization;
db.Customer = Customer;
db.CustomerEvaluation = CustomerEvaluation;
db.Department = Department;
db.Employee = Employee;
db.EmpSkill = EmpSkill;
db.Participation = Participation;
db.PeerEvaluation = PeerEvaluation;
db.PMEvaluation = PMEvaluation;
db.Project = Project;
db.Skill = Skill;
db.Task = Task;

Authorization.init(sequelize);
Customer.init(sequelize);
CustomerEvaluation.init(sequelize);
Department.init(sequelize);
Employee.init(sequelize);
EmpSkill.init(sequelize);
Participation.init(sequelize);
PeerEvaluation.init(sequelize);
PMEvaluation.init(sequelize);
Project.init(sequelize);
Skill.init(sequelize);
Task.init(sequelize);
 
Authorization.associate(db);
Customer.associate(db);
CustomerEvaluation.associate(db);
Department.associate(db);
Employee.associate(db);
EmpSkill.associate(db);
Participation.associate(db);
PeerEvaluation.associate(db);
PMEvaluation.associate(db);
Project.associate(db);
Skill.associate(db);
Task.associate(db);

module.exports = db;

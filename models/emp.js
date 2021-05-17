const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('./index');
const sequelize = db.sequelize;

class Employee extends Model {}

Employee.init({
  ID: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  PWD: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  dept_no: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  authorization_no: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  education: {
    type: Sequelize.ENUM(['high-school', 'college', 'master', 'ph-d']),
    allowNull: true,
  },
  work_experience: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  emp_no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'Employee',
  tableName: 'employee'
});

module.exports = Employee;


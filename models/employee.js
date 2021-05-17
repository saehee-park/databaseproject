const Sequelize = require('sequelize');

module.exports = class Employee extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            emp_no: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            id: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            resident_registeration_number: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            education: {
                type: Sequelize.ENUM(['high-school', 'college', 'master', 'ph-d']),
                allowNull: false,
            },
            work_experience: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },

        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Employee',
            tableName: 'employees',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Employee.hasMany(db.Task, { foreinKey: 'taskID', targetKey: 'id'});
        db.Employee.hasMany(db.EmpSkill, { foreinKey: 'empID', sourceKey: 'emp_no'});
        db.Employee.belongsTo(db.Department, { foreinKey: 'departmentId', targetKey: 'dept_no'});
        
    }
};

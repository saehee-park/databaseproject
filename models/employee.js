const Sequelize = require('sequelize');

module.exports = class Employee extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
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
        db.Employee.hasMany(db.Task, { foreinKey: 'taskID', departmenttargetKey: 'id'});
        db.Employee.hasMany(db.Department, { foreinKey: 'departmentID', sourceKey: 'id'});
        db.Employee.hasMany(db.EmpSkill, { foreinKey: 'empSkillID', sourceKey: 'id'});

    }
};

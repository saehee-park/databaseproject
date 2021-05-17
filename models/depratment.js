const Sequelize = require('sequelize');

module.exports = class Department extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            dept_name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            dept_leader_no: {
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
            modelName: 'Department',
            tableName: 'departments',
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

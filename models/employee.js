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
            education: {
                type: Sequelize.ENUM(['high-school', 'college', 'master', 'ph-d']),
                allowNull: false,
            },
            dept_no: {
                type: Sequelize.INTEGER,
                
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
            tableName: 'employee',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        // Skill Model과 연결
        db.Employee.belongsToMany(db.Skill, { through: 'EmpSkill', foreignKey: 'emp_no'});

        // Participation Model과 연결
<<<<<<< HEAD
        db.Employee.belongsToMany(db.Project, { through: 'Participation', foreignKey: 'emp_no'});
=======
        db.Employee.belongsToMany(db.Project, { foreignKey: 'emp_no', as: 'Emp_no', through: 'Participation' });
>>>>>>> 5e69274a1c31dec3c5028a3165bd33ced8a550bc

        // Authorization Model과 연결
        db.Employee.belongsTo(db.Authorization, { foreignKey: 'authorization_no', targetKey: 'authorization_no'});
        
        // Department Model과 연결
        db.Employee.belongsTo(db.Department, { foreignKey: 'dept_no', targetKey: 'dept_no'});

        // 동료 평가 Model과 연결
        db.Employee.hasMany(db.PeerEvaluation, { foreignKey: 'evaluator_no', sourceKey: 'emp_no'});
        db.Employee.hasMany(db.PeerEvaluation, { foreignKey: 'non_evaluator_no', sourceKey: 'emp_no'});

        // PM 평가 Model과 연결
        db.Employee.hasMany(db.PMEvaluation, { foreignKey: 'evaluator_no', sourceKey: 'emp_no'});
        db.Employee.hasMany(db.PMEvaluation, { foreignKey: 'non_evaluator_no', sourceKey: 'emp_no'});

        // 고객 평가 Model과 연결
        db.Employee.hasMany(db.PeerEvaluation, { foreignKey: 'non_evaluator_no', sourceKey: 'emp_no'});

        // Task Model과 연결
        db.Employee.hasMany(db.Task, { foreignKey: 'emp_no', sourceKey: 'emp_no'});

    }
};

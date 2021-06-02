const Sequelize = require('sequelize');

module.exports = class PMEvaluation extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            evaluation_content1: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            evaluation_score1: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            evaluation_content2: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            evaluation_score2: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'PMEvaluation',
            tableName: 'pm_evaluation',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        // Employee Model과 연결
        db.PMEvaluation.belongsTo(db.Employee, { foreignKey: 'evaluator_no', targetKey: 'emp_no'});
        db.PMEvaluation.belongsTo(db.Employee, { foreignKey: 'non_evaluator_no', targetKey: 'emp_no'});

        // Project Model과 연결
        db.PMEvaluation.belongsTo(db.Project, { foreignKey: 'project_no', targetKey: 'project_no'});
    }
};

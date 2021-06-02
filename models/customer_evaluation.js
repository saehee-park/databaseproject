const Sequelize = require('sequelize');

module.exports = class CustomerEvaluation extends Sequelize.Model {
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
            modelName: 'CustomerEvaluation',
            tableName: 'customer_evaluation',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        // Employee Model과 연결
        db.CustomerEvaluation.belongsTo(db.Employee, { foreignKey: 'non_evaluator_no', targetKey: 'emp_no'});

        // Customer Model과 연결
        db.CustomerEvaluation.belongsTo(db.Customer, { foreignKey: 'customer_id', targetKey: 'customer_id'});

        // Project Model과 연결
        db.CustomerEvaluation.belongsTo(db.Project, { foreignKey: 'project_no', targetKey: 'project_no'});
    }
};

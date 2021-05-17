const Sequelize = require('sequelize');

module.exports = class Task extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            deadline: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            submit_status: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            current_status: {
                type: Sequelize.ENUM(['uncheck', 'progress', 'verify', 'end']),
                defaultValue: 'uncheck',
            },

        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Task',
            tableName: 'tasks',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Task.belongsTo(db.Project, { foreinKey: 'projectID',targetKey: 'id'});
        db.Task.belongsTo(db.Employee, { foreinKey: 'employeeID', 'targetKey': 'id'});
    }
};
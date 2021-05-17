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

/*
TABLE[Task]

업무 번호 AUTO_INCREMENT
프로젝트 번호 FK
사원 번호 FK

업무 제목 = Varchar(50)
업무 내용 = Text
마감일 = DATETIME
제출 파일 = {}
현재 상태 = {시작 전, 진행 중, 검증 중, 완료}
제출 여부 = { True, False } => 제출 파일이 NULL이면 False
*/
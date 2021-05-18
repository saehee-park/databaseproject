const Sequelize = require('sequelize');

module.exports = class EmpSkill extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'EmpSkill',
            tableName: 'emp_skill',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
    }
};

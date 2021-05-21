const Sequelize = require('sequelize');

module.exports = class Skill extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            skill_no: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            skill_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Skill',
            tableName: 'skills',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Skill.belongsToMany(db.Employee, { through: 'EmpSkill', foreignKey: 'skill_no' });
    }
};

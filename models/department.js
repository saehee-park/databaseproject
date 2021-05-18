const Sequelize = require('sequelize');

module.exports = class Department extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            dept_no: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            dept_name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            dept_leader_no: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Department',
            tableName: 'department',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Department.hasMany(db.Employee, { foreignKey: 'dept_no', sourceKey: 'dept_no'});
    }
};

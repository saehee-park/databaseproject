const Sequelize = require('sequelize');

module.exports = class Authorization extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            authorization_no: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            authorization_name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Authorization',
            tableName: 'authorization',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Authorization.hasOne(db.Employee, { foreignKey: 'authorization_no', sourceKey: 'authorization_no'});
    }
};

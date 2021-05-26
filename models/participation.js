const Sequelize = require('sequelize');

module.exports = class Participation extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            participation_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            duty: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            participate: {
                type: Sequelize.STRING(45),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Participation',
            tableName: 'participation',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
    }
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Mount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Mount.belongsToMany(models.Character, {
                through: "CharMount",
                foreignKey: "mountId",
                otherKey: "charId",
            });
        }
    }
    Mount.init(
        {
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
            desc: {
                type: DataTypes.TEXT,
            },
            imgUrl: {
                type: DataTypes.STRING(512),
            },
        },
        {
            sequelize,
            modelName: "Mount",
        }
    );
    return Mount;
};

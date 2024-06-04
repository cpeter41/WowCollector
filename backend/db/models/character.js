"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Character extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Character.belongsTo(models.User, { foreignKey: "userId" });

            Character.belongsToMany(models.Achievement, {
                through: "CharAchvmnt",
                foreignKey: "charId",
                otherKey: "achvmntId"
            });

            Character.belongsToMany(models.Mount, {
                through: "CharMount",
                foreignKey: "charId",
                otherKey: "mountId"
            });
        }
    }
    Character.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "Users", key: "id" },
                onDelete: "CASCADE",
            },
            serverSlug: {
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(12),
                allowNull: false,
            },
            isPrimary: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Character",
        }
    );
    return Character;
};

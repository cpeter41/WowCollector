"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Achievement extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Achievement.belongsToMany(models.Character, {
            //     through: "CharAchvmnt",
            //     foreignKey: "achvmntId",
            //     otherKey: "charId"
            // });
            Achievement.belongsTo(models.Character, {
                foreignKey: "characterId",
            });
        }
    }
    Achievement.init(
        {
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            characterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "Characters", key: "id" },
            },
            blizzId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            note: {
                type: DataTypes.TEXT,
            },
            // desc: {
            //     type: DataTypes.TEXT,
            // },
            // points: {
            //     type: DataTypes.INTEGER,
            // },
            // imgUrl: {
            //     type: DataTypes.STRING(512),
            // },
        },
        {
            sequelize,
            modelName: "Achievement",
            indexes: [
                {
                    fields: ["characterId", "blizzId"],
                    unique: true,
                },
            ],
        }
    );
    return Achievement;
};

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
            Mount.belongsTo(models.Character, {
                foreignKey: "characterId",
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
        },
        {
            sequelize,
            modelName: "Mount",
            indexes: [
                {
                    fields: ["characterId", "blizzId"],
                    unique: true,
                },
            ],
        }
    );
    return Mount;
};

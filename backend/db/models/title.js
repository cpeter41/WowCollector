"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Title extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Title.belongsTo(models.Character, {
                foreignKey: "characterId",
            });
        }
    }
    Title.init(
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
        },
        {
            sequelize,
            modelName: "Title",
            indexes: [
                {
                    fields: ["characterId", "blizzId"],
                    unique: true,
                },
            ],
        }
    );
    return Title;
};

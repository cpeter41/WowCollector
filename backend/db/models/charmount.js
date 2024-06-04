"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CharMount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CharMount.init(
        {
            charId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "Characters", key: "id" },
                onDelete: "CASCADE",
            },
            mountId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "Mounts", key: "id" },
                onDelete: "CASCADE",
            },
        },
        {
            sequelize,
            modelName: "CharMount",
            indexes: [
                /**
                 * prevents same mount from being 
                 * added more than once per character
                 */
                {
                    fields: ["charId", "mountId"],
                    unique: true,
                },
            ],
        }
    );
    return CharMount;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CharAchvmnt extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CharAchvmnt.init(
        {
            charId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "Characters", key: "id" },
                onDelete: "CASCADE",
            },
            achvmntId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "Achievements", key: "id" },
                onDelete: "CASCADE",
            },
        },
        {
            sequelize,
            modelName: "CharAchvmnt",
            indexes: [
                /**
                 * prevents same achievement from being 
                 * added more than once per character
                 */
                {
                    fields: ["charId", "achvmntId"],
                    unique: true,
                },
            ],
        }
    );
    return CharAchvmnt;
};

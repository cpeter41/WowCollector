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

            Character.hasMany(models.Achievement, {
                foreignKey: "characterId",
                onDelete: "CASCADE",
                hooks: true,
            });

            Character.hasMany(models.Mount, {
                foreignKey: "characterId",
                onDelete: "CASCADE",
                hooks: true,
            });
            
            Character.hasMany(models.Title, {
                foreignKey: "characterId",
                onDelete: "CASCADE",
                hooks: true,
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
            region: {
                type: DataTypes.STRING(2),
                allowNull: false,
            },
            serverName: {
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
            /**
             * prevents same character from being
             * added more than once per user
             * NOTE: needs a sync() call to apply index (happens in app.js)
             */
            indexes: [
                {
                    fields: ["userId", "region", "serverName", "name"],
                    unique: true,
                },
            ],
        }
    );
    return Character;
};

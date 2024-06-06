"use strict";
const { Model, ExclusionConstraintError } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Character, {
                foreignKey: "userId",
                onDelete: "CASCADE",
                hooks: true,
            });
        }
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING(64),
                unique: true,
                allowNull: false,
                validate: {
                    len: [4, 30],
                },
            },
            email: {
                type: DataTypes.STRING(256),
                unique: true,
                allowNull: false,
                validate: {
                    len: [3, 256],
                    isEmail: true,
                },
            },
            hashedPassword: {
                type: DataTypes.STRING.BINARY,
                allowNull: false,
                validate: {
                    len: [60, 60],
                },
            },
            imageId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
            defaultScope: {
                attributes: {
                    exclude: [
                        "hashedPassword",
                        "createdAt",
                        "updatedAt",
                    ],
                },
            },
        }
    );
    return User;
};

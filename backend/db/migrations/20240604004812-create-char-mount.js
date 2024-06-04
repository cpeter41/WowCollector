"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "CharMounts",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                charId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: "Characters", key: "id" },
                    onDelete: "CASCADE",
                },
                mountId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: "Mounts", key: "id" },
                    onDelete: "CASCADE",
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
            },
            options
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("CharMounts", options);
    },
};

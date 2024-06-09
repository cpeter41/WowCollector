"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "Achievements",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                characterId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                blizzId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                note: {
                    type: Sequelize.TEXT,
                },
                // desc: {
                //     type: Sequelize.TEXT,
                // },
                // points: {
                //     type: Sequelize.INTEGER,
                // },
                // imgUrl: {
                //     type: Sequelize.STRING,
                // },
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
        await queryInterface.dropTable("Achievements", options);
    },
};

"use strict";

const { Character } = require("../models");

let options = { validate: true };
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await Character.bulkCreate(
            [
                {
                    userId: 1,
                    region: "us",
                    serverName: "Borean Tundra",
                    name: "Christopher",
                    isPrimary: true,
                },
                {
                    userId: 1,
                    region: "us",
                    serverName: "Borean Tundra",
                    name: "Anaverina",
                    isPrimary: false,
                },
                {
                    userId: 1,
                    region: "us",
                    serverName: "Tichondrius",
                    name: "Twooloo",
                    isPrimary: false,
                },
            ],
            options
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        options.tableName = "Characters";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            "Characters",
            {
                name: "Christopher",
                serverName: "Borean Tundra",
            },
            {
                name: "Anaverina",
                serverName: "Borean Tundra",
            },
            {
                name: "Twooloo",
                serverName: "Tichondrius",
            },
            options
        );
    },
};

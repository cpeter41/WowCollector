"use strict";

const { Title } = require("../models");

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
        await Title.bulkCreate([
            // character 1
            {
                name: "the Insane",
                characterId: 1,
                blizzId: 112,
            },
            {
                name: "Emerald Ace",
                characterId: 1,
                blizzId: 524,
            },
            // character 2
            {
                name: "Vicious Gladiator",
                characterId: 2,
                blizzId: 191,
            },
            {
                name: "Masked Chuckler",
                characterId: 2,
                blizzId: 287,
            },
            // character 3
            {
                name: "Killer of Kezan",
                characterId: 3,
                blizzId: 273,
            },
            {
                name: "the Fearless",
                characterId: 3,
                blizzId: 198,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};

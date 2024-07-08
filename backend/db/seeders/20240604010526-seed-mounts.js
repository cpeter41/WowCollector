"use strict";

const { Mount } = require("../models");

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
        await Mount.bulkCreate(
            [
                // character 1
                {
                    name: "Pinto",
                    characterId: 1,
                    blizzId: 11,
                },
                {
                    name: "Invincible",
                    characterId: 1,
                    blizzId: 363,
                },
                {
                    name: "Swift Zulian Tiger",
                    characterId: 1,
                    blizzId: 111,
                },
                // character 2
                {
                    name: "Scintillating Mana Ray",
                    characterId: 1,
                    blizzId: 976,
                },
                {
                    name: "Heavenly Onyx Cloud Serpent",
                    characterId: 1,
                    blizzId: 473,
                },
                {
                    name: "Grey Riding Camel",
                    characterId: 1,
                    blizzId: 400,
                },
                {
                    name: "Ashes of Al'ar",
                    characterId: 1,
                    blizzId: 183,
                },
                // character 3
                {
                    name: "Mimiron's Head",
                    characterId: 1,
                    blizzId: 304,
                },
                {
                    name: "Alabaster Stormtalon",
                    characterId: 1,
                    blizzId: 1266,
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
        options.tableName = "Mounts";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            "Mounts",
            {
                id: {
                    [Op.lte]: 9,
                },
            },
            options
        );
    },
};

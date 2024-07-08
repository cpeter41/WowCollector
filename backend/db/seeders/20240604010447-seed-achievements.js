"use strict";

const { Achievement } = require("../models");

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
        await Achievement.bulkCreate([
            // character 1
            {
                name: "Going Down?",
                characterId: 1,
                blizzId: 964,
            },
            {
                name: "Mountain o' Mounts",
                characterId: 1,
                blizzId: 2537,
            },
            {
                name: "To All The Squirrels I've Loved Before",
                characterId: 1,
                blizzId: 1206,
            },
            // character 2
            {
                name: "To All The Squirrels Who Shared My Life",
                characterId: 2,
                blizzId: 2557,
            },
            {
                name: "Lodi Dodi We Loves the Skadi",
                characterId: 2,
                blizzId: 1873,
            },
            // character 3
            {
                name: "Mythic Remix: Siege of Orgrimmar",
                characterId: 3,
                blizzId: 19961,
            },
            {
                name: "Torch Juggler",
                characterId: 3,
                blizzId: 272,
            },
            {
                name: "Get to the Choppa!",
                characterId: 3,
                blizzId: 2097,
            },
        ], options);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        options.tableName = "Achievements";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            "Achievements",
            {
                id: {
                    [Op.lte]: 8,
                },
            },
            options
        );
    },
};

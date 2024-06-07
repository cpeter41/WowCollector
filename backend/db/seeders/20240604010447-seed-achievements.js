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
            {
                name: "Going Down?",
                characterId: 1,
                blizzId: 964,
                // desc: "Fall 65 yards without dying.",
                // points: 10,
                // imgUrl: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_twistedfaith.jpg",
            },
            {
                name: "Mountain o' Mounts",
                characterId: 1,
                blizzId: 2537,
                // desc: "Obtain 100 mounts (usable by a single character).",
                // points: 10,
                // imgUrl: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_pet_dragonhawk.jpg",
            },
            {
                name: "To All The Squirrels I've Loved Before",
                characterId: 1,
                blizzId: 1206,
                // desc: "Show the critters of Azeroth how much you /love them.",
                // points: 10,
                // imgUrl: "https://wow.zamimg.com/images/wow/icons/large/inv_jewelcrafting_crimsonhare.jpg",
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
        options.tableName = "Achievements";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            "Achievements",
            {
                name: {
                    [Op.in]: [
                        "Going Down?",
                        "Mountain o' Mounts",
                        "To All The Squirrels I've Loved Before",
                    ],
                },
            },
            options
        );
    },
};

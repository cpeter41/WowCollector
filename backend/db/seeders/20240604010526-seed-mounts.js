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
        await Mount.bulkCreate([
            {
                name: "Pinto",
                characterId: 1,
                blizzId: 11,
                // desc: "Its calm temperament makes it ideal to train young children in horseback riding.",
                // imgUrl: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_ridinghorse.jpg",
            },
            {
                name: "Invincible",
                characterId: 1,
                blizzId: 363,
                //     desc: "The famous steed of Arthas Menethil, who serves its master in life and in death. Riding him is truly a feat of strength.",
                //     imgUrl: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_pegasus.jpg",
            },
            {
                name: "Swift Zulian Tiger",
                characterId: 1,
                blizzId: 111,
                // desc: "The last known Zulian tigers were kept by High Priest Thekal, deep within Zul'Gurub. They are said to have been hunted into extinction.",
                // imgUrl: "https://wow.zamimg.com/images/wow/icons/large/ability_mount_jungletiger.jpg",
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
        options.tableName = "Mounts";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            "Mounts",
            {
                name: {
                    [Op.in]: ["Pinto", "Invincible", "Swift Zulian Tiger"],
                },
            },
            options
        );
    },
};

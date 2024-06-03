"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

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
        await User.bulkCreate(
            [
                {
                    email: "demo@user.io",
                    username: "DemoUser",
                    hashedPassword: bcrypt.hashSync("password"),
                    imageId: 1,
                },
                {
                    email: "chris@aa.io",
                    username: "spingo",
                    hashedPassword: bcrypt.hashSync("password"),
                    imageId: 2,
                },
                {
                    email: "user2@user.io",
                    username: "FakeUser",
                    hashedPassword: bcrypt.hashSync("password"),
                    imageId: 3,
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
        options.tableName = "Users";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            "Users",
            // {
            //     username: {
            //         [Op.in]: ["Demo-lition", "spingo", "FakeUser"],
            //     },
            // },
            null,
            options
        );
    },
};

const express = require("express");
const router = express.Router();
// const { Op } = require("sequelize");
const {
    Character,
    User,
    CharAchvmnt,
    Achievement,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { checkCharacter } = require("../../utils/bnet")

// --------------------- CHARACTER ROUTES ---------------------

// add a character to an account
router.post("/", [requireAuth, checkCharacter], async (req, res) => {
    const { user } = req;
    const { serverSlug, name } = req.body;

    const formatName = (name) => {
        const lcName = name.toString().toLowerCase();
        return lcName.charAt(0).toUpperCase() + lcName.slice(1);
    }

    const newCharacter = await Character.create({
        userId: user.id,
        serverSlug,
        name: formatName(name),
    });

    return res.status(200).json({ character: newCharacter.toJSON() });
});

// get all characters on current account
router.get("/", requireAuth, async (req, res) => {
    const { user } = req;

    const characters = await Character.findAll({
        include: [
            {
                model: User,
                where: { id: user.id },
            },
        ],
    });

    return res.status(200).json(characters);
});

// remove character from account
router.delete("/:charId", requireAuth, async (req, res, next) => {
    const { user } = req;
    const { charId } = req.params;

    const foundChar = await Character.findByPk(charId);
    if (!foundChar)
        return res
            .status(404)
            .json({ message: "Character couldn't be found." });

    // authorization
    // consider moving this to middleware
    if (foundChar.toJSON().userId !== user.id)
        return next(new Error("Forbidden"));

    await foundChar.destroy();

    return res.status(200).json({ message: "Character successfully removed" });
});

// ---------------- ACHIEVEMENT TRACKER ROUTES ----------------

// add an achievement to tracker
router.post(
    "/:charId/achievements/:achvmntId/new",
    requireAuth,
    async (req, res, next) => {
        const { user } = req;
        const { charId, achvmntId } = req.params;

        const foundChar = await Character.findByPk(charId);
        if (!foundChar)
            return res
                .status(404)
                .json({ message: "Character couldn't be found." });

        // authorization
        // consider moving this to middleware
        if (foundChar.toJSON().userId !== user.id)
            return next(new Error("Forbidden"));

        const newTrackedAchievement = await CharAchvmnt.create({
            charId,
            achvmntId,
        });

        return res.status(200).json({ charAchvmnt: newTrackedAchievement.toJSON() });
    }
);

// get all tracked achievements
router.get("/:charId/achievements", requireAuth, async (req, res, next) => {
    const { user } = req;
    const { charId } = req.params;

    const foundChar = await Character.findByPk(charId);
    if (!foundChar)
        return res
            .status(404)
            .json({ message: "Character couldn't be found." });

    // authorization
    // consider moving this to middleware
    if (foundChar.toJSON().userId !== user.id)
        return next(new Error("Forbidden"));

    const trackedAchievements = await Achievement.findAll({
        include: [
            {
                model: Character,
                through: { where: { charId }, attributes: [] },
            },
        ],
    });

    return res.status(200).json(trackedAchievements);
});

// remove achievement from tracker
router.delete(
    "/:charId/achievements/:achvmntId",
    requireAuth,
    async (req, res, next) => {
        const { user } = req;
        const { charId, achvmntId } = req.params;

        const foundChar = await Character.findByPk(charId);
        if (!foundChar)
            return res
                .status(404)
                .json({ message: "Character couldn't be found." });

        // authorization
        // consider moving this to middleware
        if (foundChar.toJSON().userId !== user.id)
            return next(new Error("Forbidden"));

        const foundTrackedAchievement = await CharAchvmnt.findOne({
            where: { charId, achvmntId },
        });

        if (!foundTrackedAchievement)
            return res
                .status(404)
                .json({ message: "Tracked achievement couldn't be found." });

        await foundTrackedAchievement.destroy();

        return res.status(200).json({
            message: "Tracked achievement successfully removed",
        });
    }
);

/**
 * TODO: test these routes!
 *
 * TODO: update tracked achievement order?
 * try to incorporate into backend, not just frontend
 */

// ------------------- MOUNT TRACKER ROUTES -------------------

// TODO: mount routes

module.exports = router;

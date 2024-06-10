const express = require("express");
const router = express.Router();
const {
    Character,
    User,
    Mount,
    Achievement,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { checkCharacter } = require("../../utils/bnet");
const app = require("../../app.js");
const config = require("../../bnetConfig.js");

/**
 * slugifies a server name (e.g. "Borean Tundra" -> "borean-tundra" or
 * "Mok'Nathal" -> "moknathal"). necessary for pinging Blizz API characters.
 */
const _slug = (name) => {
    const singleName = name.replace("'", "");
    const parts = singleName.split(" ");
    const lcParts = parts.map((part) => part.toLowerCase());
    return lcParts.join("-");
};

// --------------------- CHARACTER ROUTES ---------------------

// add a character to an account
router.post("/", [requireAuth, checkCharacter], async (req, res) => {
    const { user } = req;
    const { region, serverName, name } = req.body;

    /**
     * formatName capitalizes first letter for display purposes.
     * Blizz API URI requires all lowercase name, this is accounted for in
     * the utils function at backend/utils/bnet.js
     */
    const formatName = (name) => {
        const lcName = name.toString().toLowerCase();
        return lcName.charAt(0).toUpperCase() + lcName.slice(1);
    };

    const newCharacter = await Character.create({
        userId: user.id,
        region,
        serverName,
        name: formatName(name),
    });

    // console.log(res.locals.character);

    const data = newCharacter.toJSON();
    // data.faction = res.locals.character.faction;
    // data.gender = res.locals.character.gender;
    // data.race = res.locals.character.race;
    // data.class = res.locals.character.character_class;
    // data.spec = res.locals.character.active_spec;

    return res.status(200).json(data);
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

    await foundChar?.destroy();

    return res.status(204).json({ message: "Character successfully removed" });
});

// ---------------- ACHIEVEMENT TRACKER ROUTES ----------------

// gets achievement status of all achievements on a character
// displays obtained and in-progress achievements only
router.get("/achievements", requireAuth, async (req, res, next) => {
    const { serverName, name, region } = req.query;

    // obtain oauth access token for API usage
    const oAuthToken = await app.oAuthClient.getToken();

    // format API request URI
    // const region = "us";
    const host = config.apiHosts[region];
    const namespace = config.namespaces.profile[region];
    const formattedName = encodeURIComponent(name).toLocaleLowerCase("en-US");
    const URL = `${host}/profile/wow/character/${_slug(
        serverName
    )}/${formattedName}/achievements`;
    const queryParams = new URLSearchParams({ locale: "en_US", namespace });
    const formattedURI = `${URL}?${queryParams}`;

    // attach oauth token
    const headers = { Authorization: `Bearer ${oAuthToken}` };
    const response = await fetch(formattedURI, { headers });

    const data = await response.json();
    // achievements are uncategorized and are in a single giant array
    // thank you blizzard
    return res.json(data.achievements);
});

// add an achievement to tracker
router.post("/:charId/achievements", requireAuth, async (req, res, next) => {
    const { user } = req;
    const { charId } = req.params;
    const { name, achvmntId } = req.body;

    const foundChar = await Character.findByPk(charId);
    if (!foundChar)
        return res
            .status(404)
            .json({ message: "Character couldn't be found." });

    // authorization
    // consider moving this to middleware
    if (foundChar.toJSON().userId !== user.id)
        return next(new Error("Forbidden"));

    const newTrackedAchievement = await Achievement.create({
        name,
        characterId: parseInt(charId),
        blizzId: achvmntId,
    });

    return res.status(201).json(newTrackedAchievement);
});

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
                where: { id: charId },
                attributes: [],
            },
        ],
    });

    return res.status(200).json(trackedAchievements);
});

// add/modify note set on achievement
router.put("/:charId/achievements", requireAuth, async (req, res, next) => {
    const { user } = req;
    const { charId } = req.params;
    const { note, achvmntId } = req.body;

    const foundChar = await Character.findByPk(charId);
    if (!foundChar)
        return res
            .status(404)
            .json({ message: "Character couldn't be found." });

    // authorization
    // consider moving this to middleware
    if (foundChar.toJSON().userId !== user.id)
        return next(new Error("Forbidden"));

    const foundAch = await Achievement.findOne({
        where: { blizzId: achvmntId },
    });
    if (!foundAch)
        return res
            .status(404)
            .json({ message: "Tracked achievement couldn't be found." });

    foundAch.note = note;
    await foundAch.save();

    return res.status(200).json(foundAch)
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

        const foundTrackedAchievement = await Achievement.findOne({
            where: { characterId: charId, blizzId: achvmntId },
        });

        if (!foundTrackedAchievement)
            return res
                .status(404)
                .json({ message: "Tracked achievement couldn't be found." });

        await foundTrackedAchievement.destroy();

        return res.status(204).json({
            message: "Tracked achievement successfully removed",
        });
    }
);

// ------------------- MOUNT TRACKER ROUTES -------------------

// add a mount to tracker
router.post("/:charId/mounts", requireAuth, async (req, res, next) => {
    const { user } = req;
    const { charId } = req.params;
    const { name, mountId } = req.body;

    const foundChar = await Character.findByPk(charId);
    if (!foundChar)
        return res
            .status(404)
            .json({ message: "Character couldn't be found." });

    // authorization
    // consider moving this to middleware
    if (foundChar.toJSON().userId !== user.id)
        return next(new Error("Forbidden"));

    const newTrackedMount = await Mount.create({
        name,
        characterId: parseInt(charId),
        blizzId: mountId,
    });

    return res.status(201).json(newTrackedMount);
});

// get all tracked mounts
router.get("/:charId/mounts", requireAuth, async (req, res, next) => {
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

    const trackedMounts = await Mount.findAll({
        include: [
            {
                model: Character,
                where: { id: charId },
                attributes: [],
            },
        ],
    });

    return res.status(200).json(trackedMounts);
});

// add/modify note set on mount
router.put("/:charId/mounts", requireAuth, async (req, res, next) => {
    const { user } = req;
    const { charId } = req.params;
    const { note, mountId } = req.body;

    const foundChar = await Character.findByPk(charId);
    if (!foundChar)
        return res
            .status(404)
            .json({ message: "Character couldn't be found." });

    // authorization
    // consider moving this to middleware
    if (foundChar.toJSON().userId !== user.id)
        return next(new Error("Forbidden"));

    const foundMnt = await Mount.findOne({
        where: { blizzId: mountId },
    });
    if (!foundMnt)
        return res
            .status(404)
            .json({ message: "Tracked mount couldn't be found." });

    foundMnt.note = note;
    await foundMnt.save();

    return res.status(200).json(foundMnt)
});

// remove mount from tracker
router.delete(
    "/:charId/mounts/:mountId",
    requireAuth,
    async (req, res, next) => {
        const { user } = req;
        const { charId, mountId } = req.params;

        const foundChar = await Character.findByPk(charId);
        if (!foundChar)
            return res
                .status(404)
                .json({ message: "Character couldn't be found." });

        // authorization
        // consider moving this to middleware
        if (foundChar.toJSON().userId !== user.id)
            return next(new Error("Forbidden"));

        const foundTrackedMount = await Mount.findOne({
            where: { characterId: charId, blizzId: mountId },
        });

        if (!foundTrackedMount)
            return res
                .status(404)
                .json({ message: "Tracked mount couldn't be found." });

        await foundTrackedMount.destroy();

        return res.status(204).json({
            message: "Tracked mount successfully removed",
        });
    }
);

module.exports = router;

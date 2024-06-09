const express = require("express");
const router = express.Router();
const app = require("../../app.js");
const config = require("../../bnetConfig.js");

// ------------- BLIZZARD API ACHIEVEMENT ROUTES -------------
/**
 * These routes are for obtaining all of the achievements from
 * the Blizzard API. Should only need to be run when new
 * achievements are added to the game.
 */

// gets a list of all categories of achievements
router.get("/achievements/categories", async (req, res, next) => {
    // obtain oauth access token for API usage
    console.log("called!")
    const oAuthToken = await app.oAuthClient.getToken();

    // format API request URI
    const region = "us";
    const host = config.apiHosts[region];
    const namespace = config.namespaces.static[region];
    const URL = `${host}/data/wow/achievement-category/index`;
    const queryParams = new URLSearchParams({ locale: "en_US", namespace });
    const formattedURI = `${URL}?${queryParams}`;

    // attach oauth token
    const headers = { Authorization: `Bearer ${oAuthToken}` };
    const response = await fetch(formattedURI, { headers });

    const data = await response.json();
    for (const rCat of data.root_categories) {
        // format API request URI
        // console.log("----------------- RCAT ", rCat);
        const URL = `${host}/data/wow/achievement-category/${rCat.id}`;
        const queryParams = new URLSearchParams({ locale: "en_US", namespace });
        const formattedURI = `${URL}?${queryParams}`;

        // attach oauth token
        const headers = { Authorization: `Bearer ${oAuthToken}` };
        const response = await fetch(formattedURI, { headers });
        const data = await response.json();
        // console.log("data for ", rCat, " : ", data.subcategories);
        rCat.subcategories = data.subcategories;
        // console.log("rcat: ", rCat.subcategories);
    }
    // data.root_categories.forEach(async (rCat) => {
    //     // format API request URI
    //     console.log("----------------- RCAT ", rCat);
    //     const URL = `${host}/data/wow/achievement-category/${rCat.id}`;
    //     const queryParams = new URLSearchParams({ locale: "en_US", namespace });
    //     const formattedURI = `${URL}?${queryParams}`;

    //     // attach oauth token
    //     const headers = { Authorization: `Bearer ${oAuthToken}` };
    //     const response = await fetch(formattedURI, { headers });
    //     const data = await response.json();
    //     // console.log("data for ", rCat, " : ", data.subcategories);
    //     rCat.subcategories = data.subcategories;
    //     // console.log("rcat: ", rCat.subcategories);
    // });
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!FINALLY: ", data.root_categories);
    return res.json(data.root_categories);
});

/**
 * gets a list of global achievements for a category
 * and a list of its subcategories (if they exist)
 */
router.get("/achievements/categories/:categoryId", async (req, res, next) => {
    const { categoryId } = req.params;
    // obtain oauth access token for API usage
    const oAuthToken = await app.oAuthClient.getToken();

    // format API request URI
    const region = "us";
    const host = config.apiHosts[region];
    const namespace = config.namespaces.static[region];
    const URL = `${host}/data/wow/achievement-category/${categoryId}`;
    const queryParams = new URLSearchParams({ locale: "en_US", namespace });
    const formattedURI = `${URL}?${queryParams}`;

    // attach oauth token
    const headers = { Authorization: `Bearer ${oAuthToken}` };
    const response = await fetch(formattedURI, { headers });

    const data = await response.json();
    return res.json({
        id: data.id,
        name: data.name,
        achievements_in_category: data.achievements,
        subcategories: data.subcategories,
    });
});

// gets the full details of an achievement
router.get("/achievements/:achievementId", async (req, res, next) => {
    const { achievementId } = req.params;

    // obtain oauth access token for API usage
    const oAuthToken = await app.oAuthClient.getToken();

    // format API request URI
    const region = "us";
    const host = config.apiHosts[region];
    const namespace = config.namespaces.static[region];
    const URL = `${host}/data/wow/achievement/${achievementId}`;
    const queryParams = new URLSearchParams({ locale: "en_US", namespace });
    const formattedURI = `${URL}?${queryParams}`;

    // attach oauth token
    const headers = { Authorization: `Bearer ${oAuthToken}` };
    const response = await fetch(formattedURI, { headers });
    // console.log(response);
    const data = await response.json();
    return res.json(data);
});

// ---------------- BLIZZARD API MOUNT ROUTES ----------------
/**
 * These routes are for obtaining all of the mounts from the
 * Blizzard API. Should only need to be run when new mounts
 * are added to the game.
 */

module.exports = router;

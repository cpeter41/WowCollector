const express = require("express");
const router = express.Router();
const app = require("../../app.js");
const config = require("../../bnetConfig.js");

// ------------- BLIZZARD API ACHIEVEMENT ROUTES -------------
/**
 * These routes are for obtaining all of the achievements from
 * the Blizzard API.
 */

// gets a list of all categories of achievements
router.get("/achievements/categories", async (req, res, next) => {
    // obtain oauth access token for API usage
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
        const URL = `${host}/data/wow/achievement-category/${rCat.id}`;
        const queryParams = new URLSearchParams({ locale: "en_US", namespace });
        const formattedURI = `${URL}?${queryParams}`;

        // attach oauth token
        const headers = { Authorization: `Bearer ${oAuthToken}` };
        const response = await fetch(formattedURI, { headers });
        const data = await response.json();
        rCat.subcategories = data.subcategories;
    }
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
    const data = await response.json();
    return res.json(data);
});

// ---------------- BLIZZARD API MOUNT ROUTES ----------------
/**
 * These routes are for obtaining all of the mounts from the
 * Blizzard API.
 */
router.get("/mounts", async (req, res, next) => {
    const oAuthToken = await app.oAuthClient.getToken();

    // format API request URI
    const region = "us";
    const host = config.apiHosts[region];
    const namespace = config.namespaces.static[region];
    const URL = `${host}/data/wow/mount/index`;
    const queryParams = new URLSearchParams({ locale: "en_US", namespace });
    const formattedURI = `${URL}?${queryParams}`;

    // attach oauth token
    const headers = { Authorization: `Bearer ${oAuthToken}` };
    const response = await fetch(formattedURI, { headers });
    const data = await response.json();

    data.mounts.sort((a, b) => {
        if (a.name < b.name) return -1;
        else return 1;
    });

    // categorized into keys of each letter of the alphabet
    const categorizedMounts = {};
    data.mounts.forEach((mount) => {
        const key = mount.name[0];
        if (categorizedMounts[key]) {
            categorizedMounts[key].push(mount);
        } else categorizedMounts[key] = [mount];
    });

    return res.json(categorizedMounts);
});

router.get("/mounts/:mountId", async (req, res, next) => {
    const { mountId } = req.params;

    const oAuthToken = await app.oAuthClient.getToken();

    // format API request URI
    const region = "us";
    const host = config.apiHosts[region];
    const namespace = config.namespaces.static[region];
    const URL = `${host}/data/wow/mount/${mountId}`;
    const queryParams = new URLSearchParams({ locale: "en_US", namespace });
    const formattedURI = `${URL}?${queryParams}`;

    // attach oauth token
    const headers = { Authorization: `Bearer ${oAuthToken}` };
    const response = await fetch(formattedURI, { headers });
    const data = await response.json();

    return res.json(data);
});

// ---------------- BLIZZARD API TITLE ROUTES ----------------
/**
 * These routes are for obtaining all of the titles from the
 * Blizzard API.
 */
router.get("/titles", async (req, res, next) => {
    const oAuthToken = await app.oAuthClient.getToken();

    // format API request URI
    const region = "us";
    const host = config.apiHosts[region];
    const namespace = config.namespaces.static[region];
    const URL = `${host}/data/wow/title/index`;
    const queryParams = new URLSearchParams({ locale: "en_US", namespace });
    const formattedURI = `${URL}?${queryParams}`;

    // attach oauth token
    const headers = { Authorization: `Bearer ${oAuthToken}` };
    const response = await fetch(formattedURI, { headers });
    const data = await response.json();

    console.log(data);

    const filterName = (name) => {
        return name.replace("of ", "").replace("the ", "").replace('"', "");
    };

    data.titles.sort((a, b) => {
        let first = filterName(a.name);
        let second = filterName(b.name);
        if (first < second) return -1;
        else return 1;
    });

    // categorized into keys of each letter of the alphabet
    const categorizedTitles = {};
    data.titles.forEach((title) => {
        const key = filterName(title.name)[0];
        if (categorizedTitles[key]) {
            categorizedTitles[key].push(title);
        } else categorizedTitles[key] = [title];
    });

    return res.json(categorizedTitles);
});

router.get("/mounts/:mountId", async (req, res, next) => {
    const { mountId } = req.params;

    const oAuthToken = await app.oAuthClient.getToken();

    // format API request URI
    const region = "us";
    const host = config.apiHosts[region];
    const namespace = config.namespaces.static[region];
    const URL = `${host}/data/wow/mount/${mountId}`;
    const queryParams = new URLSearchParams({ locale: "en_US", namespace });
    const formattedURI = `${URL}?${queryParams}`;

    // attach oauth token
    const headers = { Authorization: `Bearer ${oAuthToken}` };
    const response = await fetch(formattedURI, { headers });
    const data = await response.json();

    return res.json(data);
});

module.exports = router;

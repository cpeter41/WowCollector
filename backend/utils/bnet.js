const config = require("../bnetConfig.js");
const app = require("../app.js")

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

// middleware for checking if character exists before adding to account
const checkCharacter = async (req, res, next) => {
    // obtain oauth access token for API usage
    const oAuthToken = await app.oAuthClient.getToken();

    // format API request URI
    const { region, serverName, name } = req.body;
    const host = config.apiHosts[region];
    const namespace = config.namespaces.profile[region];
    const formattedName = encodeURIComponent(name).toLocaleLowerCase("en-US");
    const URL = `${host}/profile/wow/character/${_slug(serverName)}/${formattedName}`;
    const queryParams = new URLSearchParams({ locale: "en_US", namespace });
    const formattedURI = `${URL}?${queryParams}`;

    // attach oauth token
    const headers = { Authorization: `Bearer ${oAuthToken}` };

    const response = await fetch(formattedURI, { headers });
    const data = await response.json();
    // for passing more data into character if need be (see in characters route)
    res.locals.character = data;
    if (response.ok) next();
    else
        next({
            message: "Character not found on Blizzard API",
            status: 404,
        });
};

module.exports = { checkCharacter };

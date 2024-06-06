const OAuthClient = require("../oauth/oAuthClient");
const config = require("../bnetConfig.js");

const oauthOptions = {
    client: {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
    },
    auth: {
        tokenHost: process.env.OAUTH_TOKEN_HOST || "https://us.battle.net",
    },
};

// slugifies a server name (e.g. "Borean Tundra" -> "borean-tundra" or "Mok'Nathal" -> "moknathal")
// necessary for submitting to Blizz API
const slug = (name) => {
    const singleName = name.replace("'", "");
    const parts = singleName.split(" ");
    const lcParts = parts.map((part) => part.toLowerCase());
    return lcParts.join("-");
}

// middleware for checking if character exists before adding to account
const checkCharacter = async (req, _res, next) => {
    // obtain oauth access token for API usage
    const oAuthClient = new OAuthClient({ oauthOptions });
    const oAuthToken = await oAuthClient.getToken();
    
    // format API request URI
    const { region, serverName, name } = req.body;
    const host = config.apiHosts[region];
    const namespace = config.namespaces.profile[region];
    const formattedName = encodeURIComponent(name).toLocaleLowerCase("en-US");
    const URL = `${host}/profile/wow/character/${slug(serverName)}/${formattedName}`;
    const queryParams = new URLSearchParams({ locale: "en_US", namespace });
    const formattedURI = `${URL}?${queryParams}`;
    
    // attach oauth token
    const headers = { Authorization: `Bearer ${oAuthToken}` };

    const res = await fetch(formattedURI, { headers });
    if (res.ok) next();
    else
        next({
            message: "Character not found on Blizzard API",
            status: 404,
        });
};

module.exports = { checkCharacter };

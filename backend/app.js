const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { ValidationError } = require("sequelize");
const { Character, Achievement, Mount, Title } = require("./db/models");

const { environment } = require("./config");
const isProduction = environment === "production";

const OAuthClient = require("./oauth/oAuthClient");
const oauthOptions = {
    client: {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
    },
    auth: {
        tokenHost: process.env.OAUTH_TOKEN_HOST || "https://us.battle.net",
    },
};
const oAuthClient = new OAuthClient({ oauthOptions });

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// enable cors only in development
if (!isProduction) app.use(cors());

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin",
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);

// apply routes after security middleware
app.use(routes);

// sync models to db to apply unique indices from models
Character.sync();
Achievement.sync();
Mount.sync();
Title.sync();

// Error Handling

// 404 error
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        // check for index unique-constraint errors:
        if (err.name === "SequelizeUniqueConstraintError") {
            err.status = 400; // bad request
            err.title = "Unique Constraint Error";
            err.message = "Duplicate item found.";
        }
        // non-unique-constraint validation errors:
        else {
            let errors = {};
            for (let error of err.errors) {
                errors[error.path] = error.message;
            }
            err.title = "Validation error";
            err.errors = errors;
        }
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
    // quick check for 403 errors
    if (err.message === "Forbidden") {
        return res.status(403).json({ message: "Forbidden" });
    }
    res.status(err.status || 500);
    // console.error(err);
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

// when importing, these 2 components are alias.app and
// alias.oAuthClient, respectively
exports.app = app;
exports.oAuthClient = oAuthClient;

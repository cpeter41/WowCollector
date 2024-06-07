const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const charactersRouter = require("./characters.js");
const resourcesRouter = require("./resources.js");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/characters", charactersRouter);
router.use("/resources", resourcesRouter);

router.get("/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        "XSRF-Token": csrfToken,
    });
});

module.exports = router;

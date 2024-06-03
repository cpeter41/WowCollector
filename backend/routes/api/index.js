const router = require("express").Router();
const {
    // setTokenCookie,
    restoreUser,
    // requireAuth,
} = require("../../utils/auth.js");
// const { User } = require("../../db/models");

router.use(restoreUser);

// router.get("/restore-user", (req, res) => {
//     return res.json(req.user);
// });

// // GET /api/set-token-cookie
// router.get("/set-token-cookie", async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: "DemoUser",
//         },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user: user });
// });

// router.get("/require-auth", requireAuth, (req, res) => {
//     return res.json(req.user);
// });

router.get("/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        "XSRF-Token": csrfToken,
    });
});

module.exports = router;

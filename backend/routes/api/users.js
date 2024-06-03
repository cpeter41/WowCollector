const express = require("express");
const bcrypt = require("bcryptjs");
const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();

// signup user
router.post("/", async (req, res) => {
    const { email, password, username, imageId } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword, imageId });

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser,
    });
});

module.exports = router;

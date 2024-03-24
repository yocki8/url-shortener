const express = require("express");
const {
    getUsersJson,
    loginPage,
    createUser,
} = require("../controllers/user");
const router = express.Router();

router.route("/api").get(getUsersJson);
router.route("/").get(loginPage);

module.exports = router;


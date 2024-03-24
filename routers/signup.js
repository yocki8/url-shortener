const express = require("express");
const { getUsersJson ,signUpPage, createUser, openUserProfile} = require("../controllers/user");
const router = express.Router();

router.route("/api").get(getUsersJson);
router.route("/").get(signUpPage).post(createUser);
router.route("/user/:name").get(openUserProfile);
module.exports = router;

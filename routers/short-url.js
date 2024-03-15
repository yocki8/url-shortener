const express = require("express");
const {
    getAllUrl,
    postUrl,
    getThisUrl,
    getUrlAnalytics,
} = require("../controllers/short-url");
const router = express.Router();

router.route("/").get(getAllUrl).post(postUrl);
router.route("/:id").get(getThisUrl);
router.route("/analytics/:id").get(getUrlAnalytics);
module.exports = router;

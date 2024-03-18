const express = require("express");
const {
    getAllUrl,
    postUrl,
    getThisUrl,
    getUrlAnalytics,
    getAllUrlJson,
} = require("../controllers/short-url");
const router = express.Router();

router.route("/").get(getAllUrl).post(postUrl);
router.route("/api").get(getAllUrlJson);
router.route("/:id").get(getThisUrl);
router.route("/analytics/:id").get(getUrlAnalytics);
module.exports = router;

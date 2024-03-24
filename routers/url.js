const express = require("express");
const router = express.Router();
const Url = require('../models/url');
const { getShortenerPage, postUrl, getThisUrl } = require("../controllers/url");

router.route('/').get(getShortenerPage).post(postUrl);
router.route('/:id').get(getThisUrl);
module.exports = router;

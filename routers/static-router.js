const express = require("express");
const router = express.Router();
const signupRoute = require("./signup");

const app = express();

app.use('/signup',signupRoute);
router.get('/',(req,res)=>res.json({hello:'hello'}));

module.exports = router;
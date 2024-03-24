const express = require('express');
const { getAllUsers, signUpUser, getThisUser, logInUser } = require("../controllers/user");
const router = express.Router();

router.route('/').get((req,res)=>{res.render('user')});
router.route('/api').get(getAllUsers);
router.route('/api/:id').get(getThisUser);
router.route('/signup').get((req,res)=>{
    res.render('signUp');
}).post(signUpUser);

router.route('/login').get((req,res)=>{
    res.render('logIn');
}).post(logInUser);
module.exports = router;
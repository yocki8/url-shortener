const User = require("../models/user");
const {v4: uuid4} = require('uuid');
const { setUser } = require("../service/auth");


async function getAllUsers(req, res) {
    const data = await User.find({});
    res.json(data);
}

async function getThisUser(req, res) {
    const name = req.params.id;
    const data = await User.findOne({ name });
    res.json(data);
}


function configureCookie(data,res){
    const sessionId = uuid4();
    setUser(sessionId, data);
    res.cookie("uid", sessionId);
}
async function signUpUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const data = await User.create({
            name,
            email,
            password,
        });
        
        configureCookie(data,res);
        res.redirect('/');
    } catch (err) {
        const { code } = err;
        if (code === 11000)
            res.status(400).json({
                error: "Duplicate value found",
            });
        else
            res.status(500).json({
                error: "internal error",
            });
    }
}

async function logInUser(req, res) {
    const { name, password } = req.body;
    try {
        const data = await User.findOne({ name });
        if (data == null)
            res.json({ err: "user not found" });
        else if (data.password !== password)
            res.json({ error: "Wrong Password" });
        else
        {
            configureCookie(data,res);
            return res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({err:"error"});
    }
}

module.exports = {
    getAllUsers,
    signUpUser,
    logInUser,
    getThisUser,
};

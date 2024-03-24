const User = require("../models/user");

async function getAllUsers(req, res) {
    const data = await User.find({});
    res.json(data);
}

async function getThisUser(req, res) {
    const name = req.params.id;
    const data = await User.findOne({ name });
    res.json(data);
}

async function signUpUser(req, res) {
    const { name, email, password } = req.body;
    try {
        await User.create({
            name,
            email,
            password,
        });

        res.redirect(`/users/api/${name}`);
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
        else res.json(data);
    } catch (err) {
        const { msg } = err;
        res.status(500).json({
            error: msg,
        });
    }
}

module.exports = {
    getAllUsers,
    signUpUser,
    logInUser,
    getThisUser,
};

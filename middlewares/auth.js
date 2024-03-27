const { getUser } = require("../service/auth");

async function restrictToAuthenticatedUserOnly(req, res, next) {
    const uid = req.cookies.uid;

    if (!uid) return res.redirect("/users/");

    const user = getUser(uid);
    if (!user) return res.redirect("/users/");

    req.user = user;
    next();
}

module.exports = { restrictToAuthenticatedUserOnly };
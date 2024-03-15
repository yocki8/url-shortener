const fs = require("fs");

function logData(fileName) {
    return (req, res, next) => {
        fs.appendFile(
            fileName,
            `${Date.now()} : ${req.ip} : ${req.method} : ${req.path}\n`,
            (err) => next()
        );
    };
}

module.exports = { logData };

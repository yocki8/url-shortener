const express = require("express");
const fs = require("fs");

function logData(path) {
    return (req, res, next) => {
        fs.appendFile(
            path,
            `${Date.now()} ${req.path} ${req.ip} ${
                req.method
            }\n`,
            (err) => next()
        );
    };
}

module.exports = logData;
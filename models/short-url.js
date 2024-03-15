const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
    mapping: {
        short_url: {
            type: String,
            unique: true,
        },

        real_url: {
            type: String,
            required: true,
            unique: true,
        },
    },

    analytics: {
        times_visited: {
            type: Number,
        },

        history: [{
            timestamps:{
                type: Number,
            }
            ,operation:{
                type: String,
            }
        }],
    },
});

const ShortUrl = mongoose.model("shortUrl", shortUrlSchema);

module.exports = ShortUrl;

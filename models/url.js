const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    short_url: {
        type: String,
        unique: true,
    },

    real_url: {
        type: String,
        required: true,
        unique: true,
    },

    analytics: {
        clicked: {
            default: 0,
            type: Number,
        },

        history: [{ type: Number }],
    },
},{timeseries: true});

const Url = mongoose.model("urlData",urlSchema);

module.exports = Url;



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

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timeseries: true});

const Url = mongoose.model("url-data",urlSchema);
module.exports = Url;



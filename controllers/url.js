const { nanoid } = require("nanoid");
const Url = require("../models/url");

async function getShortenerPage(req, res) {
    const data = await Url.find({});
    res.render("url", { data });
}
async function postUrl(req, res) {
    const { real_url } = req.body;
    const short_url = nanoid(8); //generated random string

    const result = Url.create({
        real_url,
        short_url,
    });

    res.json(result);
}

async function getThisUrl(req, res) {
    const short_url = req.params.id;

    const url = await Url.findOneAndUpdate(
        { short_url },
        {
            $inc:{
                'analytics.clicked': 1
            },
            $push:{
                'analytics.history': Date.now()
            }
        }
    );
    if(url) res.redirect('https://'+url.real_url);
    else res.json({status: "url not found"});
}
module.exports = { getShortenerPage, postUrl, getThisUrl };

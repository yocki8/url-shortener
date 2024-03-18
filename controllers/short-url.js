const ShortUrl = require("../models/short-url");

async function getAllUrl(req, res) {
    const data = await ShortUrl.find({});
    res.render("home",{data});
}

async function getAllUrlJson(req, res) {
    const data = await ShortUrl.find({});
    res.json(data);
}

async function postUrl(req, res) {
    const body = req.body;

    if (!body || !body.real_url)
        res.status(400).json({
            error: "please provide a url",
        });

    /******* generated random string*********/
    function getRand() {
        return Math.random()
            .toString(36)
            .substring(0, 10)
            .slice(2, 10);
    }
    /****************/

    /*******check if url is already registered or not */
    async function alreadyRegistered(realUrl) {
        const data = await ShortUrl.findOne({
            "mapping.real_url": realUrl,
        });

        if (data == null) return null;
        else return data;
    }
    /**************************** */

    /********** checks if random string generated is unique or not********/
    async function randomStringIsUnique(rand) {
        const data = await ShortUrl.findOne({
            mapping: {
                shortenUrl: rand,
            },
        });

        if (data == null) return false;
        else return true;
    }
    /******************************* */

    let ret;
    let realUrl = body.real_url;
    if(!realUrl.includes("https://") || !realUrl.includes("https://"))
    {
        realUrl = "https://"+realUrl;
    }
    const data = await alreadyRegistered(realUrl);
    if (data == null) {
        let generatedShortUrl = getRand();
        while (!randomStringIsUnique(generatedShortUrl)) {
            generatedShortUrl = getRand();
        }

        ret = {
            "mapping.short_url": generatedShortUrl,
            "mapping.real_url": realUrl,
            analytics: {
                times_visited: 0,
                history: [
                    {
                        timestamps: Date.now(),
                        operation: "created",
                    },
                ],
            },
        };

        ShortUrl.create(ret);
    } else ret = data;

    res.redirect("/");
}

async function getThisUrl(req, res) {
    const id = req.params.id;
    const data = await ShortUrl.findOne({
        "mapping.short_url": id,
    });

    console.log(120);

    if (data != null) {
        data.analytics.times_visited++;
        const history = data.analytics.history;
        history.push({
            timestamps: Date.now(),
            operation: "visited",
        });
        await data.save();
        res.status(200).redirect(data.mapping.real_url);
    } else {
        res.status(404).json({
            status: "url not found 😔",
        });
    }
}

async function getUrlAnalytics(req, res) {
    const id = req.params.id;

    const data = await ShortUrl.findOne({
        "mapping.short_url": id,
    });

    if (data == null)
        res.status(404).json({
            status: "url not found 😔",
        });
    else {
        res.json(data.analytics);
    }
}

module.exports = {
    getAllUrl,
    postUrl,
    getAllUrlJson,
    getThisUrl,
    getUrlAnalytics,
};

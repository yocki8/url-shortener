const ShortUrl = require("../models/short-url");

async function getAllUrl(req, res) {
    const data = await ShortUrl.find({});
    res.json(data);
}

async function postUrl(req, res) {
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
    const realUrl = req.body.real_url;
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

    res.json(ret);
}

async function getThisUrl(req, res) {
    const id = req.params.id;
    const data = await ShortUrl.findOne({
        "mapping.short_url": id,
    });

    if (data == null)
        res.status(404).json({
            status: "url not found 😔",
        });
    else {
        const timeVisited = data.analytics.times_visited++;
        const history = data.analytics.history;
        history.push({
            timestamps: Date.now(),
            operation: "visited",
        });
        data.save();
        res.json(data);
    }
}

async function getUrlAnalytics(req, res) {
    const id = req.params.id;

    const data = await ShortUrl.findOne({
        "mapping.short_url": id,
    });

    if(data == null)
    res.status(404).json({status: "url not found 😔"});

    else{
        res.json(data.analytics);
    }
}

module.exports = {
    getAllUrl,
    postUrl,
    getThisUrl,
    getUrlAnalytics
};

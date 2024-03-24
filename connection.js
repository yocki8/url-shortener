const mongoose = require('mongoose');

async function connectToMongo(url){
    mongoose.connect(url).then(()=>console.log('MongoDb connection Established'));
}

module.exports = connectToMongo;
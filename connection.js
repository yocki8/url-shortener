const mongoose = require('mongoose');

async function connectMongoDB(url){
    mongoose.connect(url).then(()=>console.log("Mongodb connection established"));
}

module.exports = connectMongoDB;
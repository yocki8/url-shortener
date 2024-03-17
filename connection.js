const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

async function connectMongoDB(url){
    mongoose.connect(url).then(()=>console.log("Mongodb connection established"));
}

module.exports = connectMongoDB;
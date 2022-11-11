// require dotenv 
require('dotenv').config();
const { MongoClient } = require('mongodb');


async function main(callback) {
    // const URI = process.env.MONGO_URI;
    const URI = process.env.MONGO_URI;
    const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await callback(client);
        console.log("database connected");
    } catch (e) {
        // Catch any errors
        console.log(e);
        throw new Error('Unable to Connect to Database')
    }

};

module.exports = main;
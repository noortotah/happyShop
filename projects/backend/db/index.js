//Import the mongoose module
const mongoose = require('mongoose');
require('dotenv').config();
//Set up default mongoose connection
const db = process.env.DATABASE;
// var mongoDB = `${process.env.MONGO_SERVER}/qasryan`;
// console.log(process.env.MONGO_SERVER)
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

//Get the default connection
var dbConnect = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
dbConnect.on('connected', () => {
    console.log('database connected...');
});
dbConnect.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = dbConnect;


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://noortotah:50RNntEpa6ucgTpm@happyshop-cluster-0.djr5v.mongodb.net/shop?retryWrites=true&w=majority";
// let _db;

// const mongoConnect = callback => {
//   MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//             .then(client => {
//               console.log('connected to Atlas');
//               _db = client.db();
//               // callback();
//             })
//             .catch(error => {
//               console.log('Error')
//             });
// }

// const getDB = () => {
//   if( typeof _db !== "undefined" ){
//     return _db;
//   }
//   throw 'No Database Found!';
// }

// exports.mongoConnect = mongoConnect;
// exports.getDB = getDB;


const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const MongoUrl =
  "mongodb+srv://root:Ravi511104%40@learing.5i39vit.mongodb.net/?retryWrites=true&w=majority&appName=Learing";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MongoUrl)
    .then((client) => {
      _db = client.db("airbnb");
      callback();
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error while connecting to Mongo: ", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Mongo not connected");
  }
  return _db;
};

module.exports = {
  mongoConnect,
  getDb,
};

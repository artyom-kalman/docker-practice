import { MongoClient } from "mongodb";
const DB_URL = "mongodb://localhost:27017";

export const connectToDb = async () => {
  console.log("openning a db...");
  MongoClient.connect(DB_URL, function (err, mongo) {
    if (err) {
      console.log("error conneting to DB");
      throw err;
    }
    const db = mongo.db("sogaz");
  });
};

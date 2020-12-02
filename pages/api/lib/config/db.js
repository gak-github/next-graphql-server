import mongoose from 'mongoose';

//1 . Using mongoose module
const PASSWORD = process.env.MONGO_PWD; // comes from netlify environment variable setting
const MONGO_URI = `mongodb+srv://ashok:${PASSWORD}@mern-stack-tw5cv.mongodb.net/mernstack?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
  
// Create cached connection variable
const connection = {};
const mongooseConnect = async () => {
  if (connection.isConnected) {
    // use cached connection when available
    return;
  }
  try {
    const dbConnection = await mongoose.connect(MONGO_URI, options);
    connection.isConnected = dbConnection.connections[0].readyState;
  } catch (err) {
    logger.error(`error connecting to db ${err.message || err}`);
  }
};

export { mongooseConnect }

// import { MongoClient } from 'mongodb'

// 2. directly using mongodb module
/*
const connectDB = async (db) => {
  if (!db) {
    const PASSWORD = process.env.MONGO_PWD // comes from netlify environment variable setting
    const MONGO_URI = `mongodb+srv://ashok:${PASSWORD}@mern-stack-tw5cv.mongodb.net/mernstack?retryWrites=true&w=majority`;
    
    try {
      const dbClient = new MongoClient(
        MONGO_URI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )

      if (!dbClient.isConnected()) await dbClient.connect()
      db = dbClient.db('mernstack') // database name
    } catch (e) {
      console.log('--->error while connecting with graphql context (db)', e)
    }
  }

  return { db }
};
*/
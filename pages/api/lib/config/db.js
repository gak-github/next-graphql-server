import mongoose from 'mongoose';
import TodoSchema from '../models/Todos';

//1 . Using mongoose module
const PASSWORD = process.env.MONGO_PWD; // comes from netlify environment variable setting
const MONGO_URI = `mongodb+srv://ashok:${PASSWORD}@mern-stack-tw5cv.mongodb.net/mernstack?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

/*
const mongooseConnect = async () => {
  const connection = {};
  try {
    console.log("=====before connecting the DB=======");
    const dbConnection = await mongoose.connect(MONGO_URI, options);
    connection.isConnected = dbConnection.connections[0].readyState;
    console.log("=========after connecting DB=======", connection.isConnected);
    return connection;
  } catch (err) {
    logger.error(`error connecting to db ${err.message || err}`);
  }
};

export { mongooseConnect }
*/

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

const connect = async () => {
  await mongoose
 .connect(MONGO_URI, options)
 .then(() => console.log('Mongo DB is connected'))
 .catch(err => console.log(err))
}

const connectDB = (handler) => async (req, res) => {
  console.log("=========mongoose connection state ====", mongoose.connection.readyState);
   if(mongoose.connection.readyState !== 1) {
      console.log("=========before mongoose model mapping");
      await mongoose.model('Todo', TodoSchema);
      await connect();
   }
   return handler(req, res);
};

export  { connect };

export default connectDB;
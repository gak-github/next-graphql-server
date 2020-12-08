import  {  ApolloServer }  from  "apollo-server-micro";
import  {  typeDefs  }  from  "./schemas";
import  {  resolvers  }  from  "./resolvers";
import { makeExecutableSchema } from 'graphql-tools';
import TodoSchema from './lib/models/Todos';
import mongoose from 'mongoose';

// import { mongooseConnect } from './lib/config/db';
import connectDB, { connect } from './lib/config/db';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

let db = {};
let Todo;

const  apolloServer  =  new  ApolloServer({
    schema,
    context: async () => {
      if (!db.isConnected) {
        await connect();
        db.isConnected = mongoose.connection.readyState ? true: false;
        Todo = await mongoose.model('Todo', TodoSchema);
      }
      console.log("=======db.isConnected====", db.isConnected);
      return { Todo };
    }
});

export  const  config  =  {
    api: {
        bodyParser:  false
    }
};

// export  default  connectDB(apolloServer.createHandler({
//     path: "/api/graphql", 
//     cors: {
//       origin: '*',
//       credentials: true,
//   }
// }));

export  default  apolloServer.createHandler({ path: "/api/graphql" });

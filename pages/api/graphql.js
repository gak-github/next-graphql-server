import  {  ApolloServer }  from  "apollo-server-micro";
import  {  typeDefs  }  from  "./schemas";
import  {  resolvers  }  from  "./resolvers";
import { makeExecutableSchema } from 'graphql-tools'
import { mongooseConnect } from './functions/config/db'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

let db;
const  apolloServer  =  new  ApolloServer({
    schema,
    context: async () => {
      return await mongooseConnect();
    }
});

export  const  config  =  {
    api:  {
        bodyParser:  false
    }
};

export  default  apolloServer.createHandler({ path:  "/api/graphql"  });
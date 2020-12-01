import  {  gql  }  from  "apollo-server-micro"; 

export  const  typeDefs  =  gql`
    type Todo {
        _id: String,
        title: String,
        completed: Boolean
    }
      
    type Mutation {
        addTodo(title: String!, completed: Boolean!): Todo
    }`;
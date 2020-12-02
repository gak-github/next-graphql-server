import  {  gql  }  from  "apollo-server-micro"; 

export  const  typeDefs  =  gql`
    type Todo {
        _id: String,
        title: String,
        completed: Boolean
    }

    type  Query {
        todos: [Todo]
    }

    type Obj {
        _id: String
    }
      
    type Mutation {
        addTodo(title: String!, completed: Boolean!): Todo,
        deleteTodo(id: String!): Obj,
        updateTodo(id: String!, completed: Boolean!): Todo,
    }`;
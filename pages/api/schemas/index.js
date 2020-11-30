import  {  gql  }  from  "apollo-server-micro"; 

export  const  typeDefs  =  gql`
    type  User {
        name: String!,
        age: String!
    }

    type Todo {
        _id: String,
        title: String,
        completed: Boolean
    }

    type  Query {
        getUsers: [User]
        getUser(name: String!): User!
        todos: [Todo]
    }
      
    type Mutation {
        addTodo(title: String!, completed: Boolean!): Todo
    }`;
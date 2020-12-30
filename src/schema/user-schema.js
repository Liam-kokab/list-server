const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        user(id: ID!): User
        me: User
    }
    
    extend type Mutation {
        signUp(name: String!, email: String!, password: String!): User
        signIn(email: String!, password: String!): User
        updateUser(name: String!): User!
        deleteUser(id: ID!): Boolean!
    }
    
    type User {
        id: String
        name: String
        email: String
        root_list_id: String
        token: String
    }
`;

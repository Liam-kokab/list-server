const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        element(id: String!): Element
    }
    
    extend type Mutation {
        createElement(element: ElemmentInput): Element
        updateElement(elemnt: ElemmentInput): Element
        deleteElement(id: String!): Boolean
    }
    
    input ElemmentInput {
        id: String
        name: String
        owner_id: String
        parent_id: String
        status: String
    }
    
    type Element {
        id: String
        name: String
        owner_id: String
        parent_id: String
        children: [Element]
    }
`;

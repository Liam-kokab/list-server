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
        description: String
        parent_id: String
        color: String
        status: Int
    }
    
    type Element {
        id: String
        name: String
        description: String
        parent_id: String
        has_write_access: Boolean
        color: String
        children: [Element]
        status: Int
    }
`;

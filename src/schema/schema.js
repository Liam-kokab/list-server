const { gql } = require('apollo-server-express');

const userSchema = require('./user-schema');
const elementSchema = require('./element-schema');

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

module.exports = [linkSchema, userSchema, elementSchema];

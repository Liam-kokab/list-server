const { gql } = require('apollo-server-express');

const userSchema = require('./userSchema');
const elementSchema = require('./elementSchema');

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

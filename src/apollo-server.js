const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');

const schema = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');
const { models, sequelize } = require('./models/models');
const loaders = require('./loaders/loaders');

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return { ...error, message };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models
      };
    }

    if (req) {
      return {
        models,
        secret: process.env.SECRET,
      };
    }
  },
   /* if (connection) {
      return { token: connection.context.userId };
    }

    const token = req?.headers?.authorization || '';
    if (token) {
      const { userId = '' } = jwt.verify(token, 'shhhhh') || {};
      if (userId) return userId;
    }
  },*/
});

module.exports = {
  server,
  sequelize,
};

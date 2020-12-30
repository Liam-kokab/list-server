const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const schema = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');
const { models, sequelize } = require('./models/models');

const getMe = async req => {
  const token = req.headers?.authorization;

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {}
  }
};

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
      console.log('a connection happened!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      return {
        models
      };
    }

    if (req) {
      return {
        me: await getMe(req),
        models,
        secret: process.env.SECRET,
      };
    }
  },
});

module.exports = {
  server,
  sequelize,
};

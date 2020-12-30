const { signIn, signUp } = require('./user-resolver');
const { createElement, getElement, UpdateElement } = require('./element-resolver');

const resolvers = {
  Query: {
    // user query resolvers
    user: async (_, { id }, { models }) => await models.User.findById(id),

    // element query resolvers
    element: async (_, { id }, context) => await getElement(id, context),
  },
  Mutation: {
    // user mutation resolvers
    signUp: async (_, args, context) => await signUp(args, context),
    signIn: async (_, args, context) => await signIn(args, context),

    // element mutation resolvers
    createElement: async (_, args, context) => await createElement(args, context),
    updateElement: async (_, args, context) => await UpdateElement(args, context),
  }
}

module.exports = resolvers;

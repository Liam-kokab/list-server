const { signIn, signUp } = require('./user-resolver');
const { createElement } = require('./element-resolver');

const resolvers = {
  Query: {
    // user query resolvers
    user: async (parent, { id }, { models }) => await models.User.findById(id),

    // element query resolvers
    element: async (parent, { id }, { models }) => await models.element.findById(id),
  },
  Mutation: {
    // user mutation resolvers
    signUp: async (_, args, context) => await signUp(args, context),
    signIn: async (_, args, context) => await signIn(args, context),

    // element mutation resolvers
    createElement: async (_, args, context) => await createElement(args, context),
  }
}

module.exports = resolvers;

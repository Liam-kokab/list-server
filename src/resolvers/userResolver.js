const { signUp, signIn } = require('./resolverFunctions/userResolverFunctions');

const userResolver = {
  Query: {
    user: async (parent, { id }, { models }) => await models.User.findById(id),
  },
  Mutation: {
    signUp: async (_, args, context) => await signUp(args, context),
    signIn: async (_, args, context) => await signIn(args, context),
  }
};

module.exports = userResolver;

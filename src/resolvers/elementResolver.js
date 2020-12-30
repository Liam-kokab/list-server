const { createElement } = require('./resolverFunctions/elementResolverFunctions');

const elementResolver = {
  Query: {
    element: async (parent, { id }, { models }) => await models.element.findById(id),
  },
  Mutation: {
    createElement: async (_, args, context) => await createElement(args, context),
  }
};

module.exports = elementResolver;

const { v4: uuid } = require('uuid');
const { parseJson } = require('../helpers/json-helper');

const createElement = async ({ element = {} }, { models }) => {
  const { name, owner_id, parent_id, status = {} } = element
  const id = uuid();

  const newElement = {
    id,
    name,
    owner_id,
    parent_id,
    children_ids: [],
    status: parseJson(status),
  };

  const { dataValues } = await models.Element.create(newElement)
    .catch(err => {
      console.log('error occurred while inserting new element \n\n', err);
    });

  return dataValues;
};

module.exports = {
  createElement,
};

const { v4: uuid } = require('uuid');
const { removeDuplicates } = require('../helpers/array-helper');

const createElement = async ({ element = {} }, { models }) => {
  const { name, owner_id, description, parent_id, status = 0, read_access = [], write_access = [], color } = element
  const id = uuid();

  const { read_access: parent_read_access = [], write_access: parent_write_access = [], color: parent_color = '#fff' } = parent_id
    ? await models.Element.findByPk(parent_id) || {}
    : {}

  const newElement = {
    id,
    name,
    description,
    read_access: removeDuplicates([...read_access, ...parent_read_access, owner_id ]),
    write_access: removeDuplicates([...write_access, ...parent_write_access, owner_id ]),
    parent_id,
    children_ids: [],
    status,
    color: color || parent_color,
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

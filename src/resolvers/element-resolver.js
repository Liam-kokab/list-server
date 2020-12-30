const { v4: uuid } = require('uuid');
const { AuthenticationError } = require('apollo-server-express');

const { getUserById } = require('./user-resolver');
const { removeDuplicates } = require('../helpers/array-helper');

const getElementById = async (id, models) => await models.Element.findByPk(id);

const addChildToElement = async (models, { id: user_id }, parent_id, id) => {
  const { children_ids = [], write_access = [] } = await getElementById(parent_id, models);
  if (write_access.includes(user_id)) {
    try {
      await models.Element.update(
        { children_ids: [ ...children_ids, id ] },
        { where: { id: parent_id } },
      );
      return true;
    } catch (e) {}
  }
}

// use on share (not complete)
const getListParentIdPair = async (parent_read_access, parent_id, models) =>
  await Promise.allSettled(parent_read_access.map(async user_id => {
    const { root_list_id: parent_id } = await getUserById(user_id, models);
    return { user_id, parent_id };
  }));

const createElement = async ({ element = {} }, { models, me }) => {
  const { id: owner_id } = me || {};
  if (!owner_id) {
    return AuthenticationError;
  }
  const { name, description, parent_id, status = 0, color } = element
  const id = uuid();

  // if there is a parent_id yet unable to add to parent, stop
  if (parent_id && !await addChildToElement(models, me, parent_id, id)) return;

  const { read_access: parent_read_access = [], write_access: parent_write_access = [], color: parent_color = '#fff' } = parent_id
    ? await models.Element.findByPk(parent_id) || {}
    : {};

  const write_access = removeDuplicates([ ...parent_write_access, owner_id ]);
  const read_access = removeDuplicates([ ...parent_read_access, ...write_access, owner_id ]);

  const newElement = {
    id,
    name,
    description,
    read_access,
    write_access,
    parent_id: parent_id ? read_access.map(user_id => ({ user_id, parent_id })) : null,
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

const UpdateElement = async ({ element = {} }, { models, me }) => {
  const { id: user_id } = me || {};
  if (!user_id) {
    return AuthenticationError;
  }

  const old_element = await getElementById(parent_id, models);
  if (element.id && old_element?.write_access.includes(user_id)) {
    try {
      return await models.Element.update(
        { ...element.id, ...element },
        { where: { id: element.id } },
      );
    } catch (e) {}
  }
}

const getElement = async (id, { models, me }) => {
  const { id: user_id } = me || {};
  if (!user_id) {
    return AuthenticationError;
  }
  const element = await getElementById(id, models);
  return element?.read_access?.contains(user_id) ? element : AuthenticationError;
}

module.exports = {
  createElement,
  UpdateElement,
  getElement
};

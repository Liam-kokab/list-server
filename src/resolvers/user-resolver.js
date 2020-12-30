const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');

const { createElement } = require('./element-resolver');

const createToken = (secret, payload = {}) => jwt.sign(payload, secret, { expiresIn: '30d' });
const sanitizeAndAddToken = ({ id, name, email, root_list_id, token }, secret) =>
  ({ id, name, email, root_list_id, token: createToken(secret, { id, name, email, root_list_id }) });

const signUp = async ({ email, name, password }, { models, secret }) => {
  const id = uuid();

  // create root list for new user
  const element = { name: 'root list', owner_id: id }
  const { id: root_list_id } = await createElement({ element }, { models });
  if (!root_list_id) return;


  // salting and hashing password.
  const salt = await bcrypt.genSalt(12);
  const passHash = await bcrypt.hash(password, salt);

  const newUser = {
    name,
    email,
    id,
    root_list_id,
    password: passHash,
  };

  const { dataValues } = await models.User.create(newUser)
    .catch(err => {
      console.log('error occurred while inserting new user \n\n', err);
    });

  if (!dataValues) return;

  return sanitizeAndAddToken({ ...dataValues }, secret);
};

const signIn = async ({ email, password }, { models, secret }) => {
  const { dataValues } = await models.User.findOne({ where: { email } }) || {};
  if (dataValues && await bcrypt.compare(password, dataValues.password)) {
    return sanitizeAndAddToken({ ...dataValues }, secret);
  }
};

module.exports = {
  signUp,
  signIn
};

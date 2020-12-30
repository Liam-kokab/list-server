const { Sequelize } = require('sequelize');

const { DB_USER_NAME, DB_PASSWORD, DB_URL, DB_PORT, DB_NAME } =  process.env || {};

const sequelize = new Sequelize(`postgres://${DB_USER_NAME}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`);

const models = {
  User: sequelize.import('./user-module'),
  Element: sequelize.import('./element-module'),
};

module.exports = {
  sequelize,
  models
};

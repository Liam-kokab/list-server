const elementModule = (sequelize, DataTypes) =>
  sequelize.define('element', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    description: {
      type: DataTypes.TEXT,
    },

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    read_access: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    write_access: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    parent_id: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
    },

    children_ids: {
      type: DataTypes.ARRAY(DataTypes.UUID),
    },

    status: {
      type: DataTypes.SMALLINT
    },

    color: {
      type: DataTypes.STRING
    },

  });


module.exports = elementModule;

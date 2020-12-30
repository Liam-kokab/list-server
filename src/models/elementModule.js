const elementModule = (sequelize, DataTypes) =>
  sequelize.define('element', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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

    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    parent_id: {
      type: DataTypes.UUID,
    },

    children_ids: {
      type: DataTypes.ARRAY(DataTypes.UUID),
    },

    status: {
      type: DataTypes.JSONB,
    }

  });


module.exports = elementModule;

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.belongsToMany(models.User, { as: "person", through:  models.Subscription, unique: false, foreignKey: "subscriber_id" })
      models.User.belongsToMany(models.User, { as: "subscribers", through:  models.Subscription, unique: false, foreignKey : "person_id"})
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(6),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};
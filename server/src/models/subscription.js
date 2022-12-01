'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {}
  }
  Subscription.init({
    person_id: DataTypes.INTEGER,
    subscriber_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscription',
    timestamps: false
  });
  return Subscription;
};
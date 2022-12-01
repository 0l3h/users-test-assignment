'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscriptions', {
      person_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Users',
        //   as: 'person',
        //   foreignKey: 'id'
        // },
        onDelete: 'CASCADE'
      },
      subscriber_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Users',
        //   as: 'subscribers',
        //   foreignKey: 'id'
        // },
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subscriptions');
  }
};
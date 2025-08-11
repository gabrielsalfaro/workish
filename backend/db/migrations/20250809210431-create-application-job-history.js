'use strict';
// /** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ApplicationJobHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      applicationId: {
        type: Sequelize.INTEGER,
        refernces: {
          model: 'JobApplications',
          key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
      },
      jobHistoryId: {
        type: Sequelize.INTEGER,
        refernces: {
          model: 'JobHistory',
          key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ApplicationJobHistories', options);
  }
};